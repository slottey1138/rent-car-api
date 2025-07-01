import prisma from "../../config/db";
import { CreateUserDto, RegisterDto, LoginDto } from "./user.types";
import {
  hashPassword,
  comparePasswords,
  generateToken,
  generateRefreshToken,
} from "./user.utils";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

export const register = async (data: RegisterDto) => {
  const existing = await prisma.user.findUnique({
    where: { username: data.username },
  });
  if (existing) throw new Error("มีผู้ใช้งานนี้ในระบบแล้ว");

  const hashed = await hashPassword(data.password);

  const user = await prisma.user.create({
    data: {
      username: data.username,
      password: hashed,
      role: data.role,
      phone: data.phone,
      createdBy: data.createdBy,
      updatedBy: data.updatedBy,
      status: 1,
    },
  });

  return {
    token: generateToken(user.user_id),
    refreshToken: generateRefreshToken(user.user_id),
  };
};

export const login = async (data: LoginDto) => {
  const { username, password } = data;

  const secret: any = process.env.JWT_SECRET;

  const secretKey = Buffer.from(secret, "utf8");

  const checkUser: any = await prisma.user.findUnique({
    where: { username: username, status: 1 },
  });

  if (!checkUser) {
    throw new Error("ไม่มีผู้ใช้นี้ในระบบ");
  }

  const checkPassword = await comparePasswords(password, checkUser?.password);

  if (!checkPassword) {
    throw new Error("รหัสผ่านไม่ถูกต้อง");
  }

  delete checkUser?.password;

  const token = jwt.sign(checkUser, secretKey, {
    algorithm: "HS256",
    expiresIn: "1h",
  });

  return token;
};

// export const refresh = async (token: string) => {
//   const payload: any = jwt.verify(token, process.env.JWT_REFRESH_SECRET!);
//   return {
//     token: generateToken(payload.userId),
//     refreshToken: generateRefreshToken(payload.userId),
//   };
// };

// export const forgotPassword = async (username: string) => {
//   const user = await prisma.user.findUnique({ where: { username: username } });
//   if (!user) throw new Error("User not found");

//   const resetToken = crypto.randomBytes(32).toString("hex");
//   const expiry = new Date(Date.now() + 15 * 60 * 1000); // 15 mins

//   await prisma.user.update({
//     where: { user_id: user.user_id },
//     data: {
//       resetToken,
//       resetTokenExpiry: expiry,
//     },
//   });

//   // TODO: Send email with resetToken (e.g., nodemailer)

//   return { message: "Password reset link sent to email", resetToken }; // Remove token in prod
// };
