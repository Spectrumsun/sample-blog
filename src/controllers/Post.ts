import {  Request, Response } from 'express';
import PostService from '../service/Post';

import { CustomRequest, postDto } from '../dto';

class PostController {
  static userData(req: any) {
    return req.user.id;
  }
  
  static async addPost(req: Request, res: Response) {
    try {
      const userId = PostController.userData(req);
      const newPost = await PostService.createPost(req.body, userId);
      return res.status(201).json({
        success: false,
        message: 'Email already in use',
        data: newPost
      });
    } catch(error) {
      return res.status(500).json({
        success: false,
        message: 'An error occurred',
        data: error
      });
    }
  }

  static async getAllPost(req: Request, res: Response) {
    try {
      const userId = PostController.userData(req);
      const posts = await PostService.getPost(userId);
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
      const userId = await PostController.userData(req);
      const post = await PostService.singlePost(req.params.id, userId);
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
      const userId = await PostController.userData(req);
      const postId = req.params.id;

      const findPost = await PostService.findPost(postId, userId);
      const edit = await PostService.editPost(req.body, postId);

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
      const userId = await PostController.userData(req);
      const postId = req.params.id;

      const deletedPost = await PostService.deletePost(postId, userId);

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

  
};

export default PostController;
