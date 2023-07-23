import { PrismaClient } from '@prisma/client';
import * as argon from 'argon2';
import jwt from 'jsonwebtoken';
import { userDto, RolesEnum } from '../dto';
import config from '../config';

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

class UserService {
  static async UserExist(email: string) {
    const findUser = await prisma.user.findUnique({
      where: { email },
      include: { role: true },
    });
    return findUser;
  };

  static async createUser(data: userDto) {
    const role = await prisma.userRole.findUnique({
      where: {
        name: RolesEnum.USER
      }
    });
    try {
      const hash = await argon.hash(data.password);
      const user = await prisma.user.create({
        data: {
          name: data.name,
          email: data.email,
          password: hash,
          roleId: role!.id
        }
      });
      return user;
    } catch(error) {
      return error;
    }
  }

  static async signToken(id: string, email: string, role: string) {
    const data = {
      id: id,
      email: email,
      role: role,
    };
    const signToken = jwt.sign(
      data,
      config.SECRET_KEY as string, 
      {
        expiresIn: '200h',
        algorithm: 'HS256'
      },
    );
    return signToken;
  }
  
}

export default UserService;