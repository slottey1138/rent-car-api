import { Request, Response, NextFunction } from "express";
import * as userService from "./user.service";
import { query, validationResult } from "express-validator";

// export const createUser = async (
//   req: Request,
//   res: Response,
//   next: NextFunction
// ) => {
//   try {
//     const user = await userService.createUser(req.body);
//     res.status(201).json(user);
//   } catch (err) {
//     next(err);
//   }
// };

export const getUsers = async (_: Request, res: Response) => {
  const users = await userService.getUsers();
  res.json(users);
};

export const getUserById = async (req: Request, res: Response) => {
  const user = await userService.getUserById(+req.params.id);
  user ? res.json(user) : res.status(404).json({ message: "User not found" });
};

export const updateUser = async (req: Request, res: Response) => {
  const user = await userService.updateUser(+req.params.id, req.body);
  res.json(user);
};

export const deleteUser = async (req: Request, res: Response) => {
  await userService.deleteUser(+req.params.id);
  res.status(204).send();
};

//---
export const register = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const tokens = await userService.register(req.body);
    res.status(201).json(tokens);
  } catch (err) {
    next(err);
  }
};

export const login = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const tokens = await userService.login(req.body);
    res.json(tokens);
  } catch (err) {
    next(err);
  }
};

export const refreshToken = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const tokens = await userService.refresh(req.body.refreshToken);
    res.json(tokens);
  } catch (err) {
    next(err);
  }
};

export const forgotPassword = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const result = await userService.forgotPassword(req.body.email);
    res.json(result);
  } catch (err) {
    next(err);
  }
};
