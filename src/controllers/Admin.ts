import {  Request, Response } from 'express';
import AdminService from '../service/Admin';

class AdminController {
  static async getAllPost(req: Request, res: Response)  {
    try {
      const posts = await AdminService.allPost();
      return res.status(200).json({
        success: true,
        message: 'Post data gotten',
        data: posts
      })
    }catch(error) {
      return res.status(500).json({
        success: false,
        message: 'An error occurred',
        data: error
      });
    }
  }

  static async getSinglePost(req: Request, res: Response) {
    try {
      const post = await AdminService.singlePost(req.params.id);
      return res.status(200).json({
        success: true,
        message: 'Post found',
        data: post
      })
    } catch(error) {
        return res.status(400).json({
          success: false,
          message: 'Post not found',
          data: error
      })
    }
  }

  static async updatePost(req: Request, res: Response) {
    try {
      const postId = req.params.id;
      const edit = await AdminService.updatePost(req.body, postId);

      return res.status(200).json({
        success: true,
        message: 'Post updated',
        data: edit
      })
    } catch(error) {
      return res.status(400).json({
        success: false,
          message: 'Post not found',
          data: error
      })
    }
  }


  static async deletePost(req: Request, res: Response) {
    try {
      const postId = req.params.id;
      const deletedPost = await AdminService.deletePost(postId);

      return res.status(200).json({
        success: true,
        message: 'Post deleted',
        data: deletedPost
      })
    } catch(error) {
      return res.status(400).json({
        success: true,
        message: 'Post not found',
        data: error
      })
    }
  }

  static async updateUserRole(req: Request, res: Response) {
    try {
      const changeRole = await AdminService.updateUserRole(req.body.email);
      return res.status(200).json({
        success: true,
        message: 'Role updated',
        data: changeRole
      })
    }catch(error) {
      return res.status(400).json({
        success: true,
        message: 'Post not found',
        data: error
      })
    }
  }
}

export default AdminController;
