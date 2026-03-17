import { Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import { PlatformUser } from "@enterprise-commerce/core/platform/types"
import { createUser } from "../models/User"

export const registerUser = async (req: Request, res: Response): Promise<void> => {
  try {
    const { email, password } = req.body;

    // 1. Validate input
    if (!email || !password) {
      res.status(400).json({ message: "Missing email or password" });
      return;
    }

    const newUser: PlatformUser = {
      id: null,
      email,
      password
    };

    // 2. Store user in DB
    const createdUser = await createUser(newUser);

    // 3. Send success response
    res.status(201).json({
      message: "User created successfully",
      user: createdUser
    });

  } catch (error) {
    console.error("Register error:", error);

    res.status(500).json({
      message: "Something went wrong"
    });
  }
};