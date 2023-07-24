import express from 'express';
import UserController from '../controllers/User';
import PostController from '../controllers/Post';
import Auth from '../middleware/Auth'; 
import AdminController from '../controllers/Admin';
import { 
  signUpValidation, 
  signInValidation, 
  checkValidationError,
  postValidation,
  validateParams,
  roleUpdate,
} from '../middleware/Validation';

import VerifyRole from '../middleware/Admin';

const router = express.Router();

router.get('/', (req, res) => {
  res.status(200)
    .json({
      success: true,
      message: 'Welcome to blog API V1'
    });
});

router.post(
  '/user/signup', 
  signUpValidation,
  checkValidationError,
  UserController.signup
);

router.post(
  '/user/signin',
  signInValidation,
  checkValidationError,
  UserController.signin);

router.post(
  '/post', 
  Auth.verifyAuth,
  postValidation,
  checkValidationError,
  PostController.addPost
);

router.get(
  '/post', 
  Auth.verifyAuth, 
  PostController.getAllPost
);

router.get(
  '/post/:id',
  Auth.verifyAuth,
  validateParams,
  checkValidationError,
  PostController.getSinglePost);

router.patch(
  '/post/:id', 
  Auth.verifyAuth,
  postValidation,
  validateParams,
  checkValidationError, 
  PostController.updatePost);

router.delete(
  '/post/:id', 
  Auth.verifyAuth,
  validateParams,
  checkValidationError, 
  PostController.deletePost);

router.get(
  '/admin/all-post', 
  Auth.verifyAuth,
  VerifyRole.iSAdmin,
  AdminController.getAllPost
);

router.get(
  '/admin/single-post/:id',
  Auth.verifyAuth,
  VerifyRole.iSAdmin,
  postValidation,
  checkValidationError,
  AdminController.getAllPost
);

router.patch(
  '/admin/update-post/:id',
  Auth.verifyAuth,
  VerifyRole.iSAdmin,
  postValidation,
  checkValidationError,
  AdminController.updatePost
);

router.delete(
  '/admin/delete-post/:id',
  Auth.verifyAuth,
  VerifyRole.iSAdmin,
  validateParams,
  checkValidationError,
  AdminController.deletePost
);

router.patch(
  '/admin/update-role',
  Auth.verifyAuth,
  roleUpdate,
  checkValidationError,
  AdminController.updateUserRole
);

router.use('*', (req, res) =>
  res.status(404).json({
    message: 'That url does not exist on this server 🙅 🚫 🙅 🚫 🙅 🚫 🙅 🚫',
}));



export default router;
