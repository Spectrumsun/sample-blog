import { PrismaClient } from '@prisma/client';
import { postDto, RolesEnum } from '../dto';

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


class AdminService {
  static async allPost() {
    const posts = await prisma.post.findMany();
    return posts
  }

  static async singlePost(postId: string) {
    const posts = await prisma.post.findUnique({
      where: {
        id: postId,
      }
    });
    return posts
  }

  static async updatePost(post: postDto, postId: string) {
    const posts = await prisma.post.update({
      where: {
        id: postId,
      },
      data: {
        title: post.title,
        content: post.content,
      }
    })
    return posts;
  }

  static async deletePost(postId: string) {
    const post = await prisma.post.delete({
      where: {
        id: postId
      }
    })
    return post;
  }

  static async updateUserRole(emailAddress: string) {
    try {
      const user = await prisma.user.findUnique({
        where: { email: emailAddress },
        include: { role: true },
      });

      const updateRole = user?.role.name === RolesEnum.ADMIN ? RolesEnum.USER : RolesEnum.ADMIN;
      const role = await prisma.userRole.findUnique({
        where: {
          name: updateRole,
        }
      });

      if(user) {
        const updateUserRole = await prisma.user.update({
          where: {
            email: emailAddress
          },
          data: {
            roleId: role!.id
          }
      })
      return updateUserRole;
    }
  } catch(error) {
    return error;
  }
  }
}


export default AdminService;
