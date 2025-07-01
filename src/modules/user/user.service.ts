import prisma from "../../config/db";
import { CreateUserDto, RegisterDto, LoginDto } from "./user.types";
import {
  hashPassword,
  comparePasswords,
  generateToken,
  generateRefreshToken,
} from "./user.utils";
import crypto from "crypto";
import jwt from "jsonwebtoken";

export const getUsers = () => prisma.user.findMany();

export const getUserById = (id: number) =>
  prisma.user.findUnique({ where: { user_id: id } });

export const updateUser = async (id: number, data: Partial<CreateUserDto>) => {
  return prisma.user.update({
    where: { user_id: id },
    data,
  });
};

export const deleteUser = (id: number) =>
  prisma.user.delete({ where: { user_id: id } });

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
      role: "user",
      status: 1,
      createdBy: 1,
      updatedBy: 1,
    },
  });

  return {
    token: generateToken(user.user_id),
    refreshToken: generateRefreshToken(user.user_id),
  };
};

export const login = async (data: LoginDto) => {
  const user = await prisma.user.findUnique({
    where: { username: data.username },
  });
  if (!user) throw new Error("Invalid credentials");

  const valid = await comparePasswords(data.password, user.password);
  if (!valid) throw new Error("Invalid credentials");

  return {
    token: generateToken(user.user_id),
    refreshToken: generateRefreshToken(user.user_id),
  };
};

export const refresh = async (token: string) => {
  const payload: any = jwt.verify(token, process.env.JWT_REFRESH_SECRET!);
  return {
    token: generateToken(payload.userId),
    refreshToken: generateRefreshToken(payload.userId),
  };
};

export const forgotPassword = async (username: string) => {
  const user = await prisma.user.findUnique({ where: { username: username } });
  if (!user) throw new Error("User not found");

  const resetToken = crypto.randomBytes(32).toString("hex");
  const expiry = new Date(Date.now() + 15 * 60 * 1000); // 15 mins

  await prisma.user.update({
    where: { user_id: user.user_id },
    data: {
      resetToken,
      resetTokenExpiry: expiry,
    },
  });

  // TODO: Send email with resetToken (e.g., nodemailer)

  return { message: "Password reset link sent to email", resetToken }; // Remove token in prod
};
