import { 
  Request, 
  Response, 
  NextFunction,  
} from 'express';
import { body, validationResult, param } from "express-validator";

export const signUpValidation = [
  body('name')
    .exists({ checkFalsy: true })
    .withMessage("User name is required")
    .isString()
    .withMessage("User name should be string"),
  body("password")
    .exists()
    .withMessage("Password is required")
    .isString()
    .withMessage("Password should be string")
    .isLength({ min: 5 })
    .withMessage("Password should be at least 5 characters"),
  body("email")
    .isEmail()
    .withMessage("Provide valid email"),
];

export const signInValidation = [
  body("password")
    .exists()
    .withMessage("Password is required")
    .isString()
    .withMessage("Password should be string")
    .isLength({ min: 5 })
    .withMessage("Password should be at least 5 characters"),
  body("email")
    .isEmail()
    .withMessage("Provide valid email"),
];

export const postValidation = [
  body("title")
    .exists()
    .withMessage("Title is required")
    .isString()
    .withMessage("Title should be string"),
  body("content")
    .isEmail()
    .withMessage("Provide valid content"),
];

export const validateParams = [
  param('id')
    .exists()
    .withMessage("Id in Param is required")
    .isString()
    .withMessage("Id should be string"),
];

export const roleUpdate = [
  body("email")
    .isEmail()
    .withMessage("Provide valid email")
];

export const checkValidationError = (
  req: Request, 
  res: Response, 
  next: NextFunction
) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({
      success: false,
      errors: errors.array(),
    });
  }
  next()
}