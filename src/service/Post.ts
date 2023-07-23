import { PrismaClient } from '@prisma/client';
import { postDto } from '../dto';

const prisma = new PrismaClient({
  log: [
    {
      emit: "event",
      level: "query",
    },
  ],
});

prisma.$on("query", (e) => {
  console.log("Query: " + e.query);
  console.log("Params: " + e.params);
  console.log("Duration: " + e.duration + "ms");
});

class PostService {

  static async createPost(data: postDto, userId: string) {
    const post = await prisma.post.create({
      data: {
        ...data,
        authorId: userId
      }
    })
    return post;
  }

  static async getPost(userId: string) {
    const posts = await prisma.post.findMany({
      where: {
        authorId: userId
      }
    })
    return posts
  }

  static async singlePost(postId: string, userId: string) {
    const findPost = await prisma.post.findUnique({
      where: {
        id: postId,
        authorId: userId,
      }
    })
    return findPost;
  }

  static async findPost(postId: string, userId: string) {
    try {
      const post = await prisma.post.findUnique({
        where: {
          id: postId,
          authorId: userId
        }
      });
      return post;
    } catch(error) {
      return error
    }
  }

  static async editPost(
    post: postDto,
    postId: string,
  ) {
      const updatePost = await prisma.post.update({
        where: {
          id: postId,
        },
        data: {
          title: post.title,
          content: post.content
        }
      })
    return updatePost;
  }

  static async deletePost(postId: string, userId: string) {
    const finePostAndDelete = await prisma.post.delete({
      where: {
        id: postId,
        authorId: userId
      }
    })
    return finePostAndDelete;
  }

}

export default PostService;