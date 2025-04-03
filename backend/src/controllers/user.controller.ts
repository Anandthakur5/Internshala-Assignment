import { Request, Response } from "express";
import { User } from "../models/user.model"; // Ensure the correct path
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import { z } from "zod";

dotenv.config();

// validation schema using Zod
const userSchema = z.object({
    email: z.string().email({ message: "Invalid email format" }),
    password: z.string().min(6, { message: "Password must be at least 6 characters long" }),
});

export const createUser = async (req: Request, res: Response): Promise<void> => {
    try {
        const parsedData = userSchema.parse(req.body);

        const existingUser = await User.findOne({ email: parsedData.email });
        if (existingUser) {
            res.status(400).json({ message: "User already exists" });
            return;
        }

        // Hash password
        const hashPassword = await bcrypt.hash(parsedData.password, 10);

        // Create new user
        const newUser = await User.create({
            email: parsedData.email,
            password: hashPassword,
        });

        // Generate JWT token
        const token = jwt.sign(
            { id: newUser._id, email: newUser.email },
            process.env.JWT_SECRET || "yourSecretKey",
            { expiresIn: "1h" }
        );

        res.status(201).json({ message: "User created successfully", token });
    } catch (error) {
        if (error instanceof z.ZodError) {
            res.status(400).json({ message: "Validation error", errors: error.errors });
            return;
        }
        console.error("Error creating user:", error);
        res.status(500).json({ message: "Internal server error" });
    }
};

export const loginUser = async (req: Request, res: Response): Promise<void> => {
    try {
        const parsedData = userSchema.parse(req.body);

        // Find user
        const user = await User.findOne({ email: parsedData.email });
        if (!user) {
            res.status(404).json({ message: "User not found" });
            return;
        }

        // Check password
        const isMatch = await bcrypt.compare(parsedData.password, user.password);
        if (!isMatch) {
            res.status(401).json({ message: "Invalid credentials" });
            return;
        }

        // Generate JWT token
        const token = jwt.sign(
            { id: user._id, email: user.email },
            process.env.JWT_SECRET || "yourSecretKey",
            { expiresIn: "1h" }
        );

        res.status(200).json({ message: "Login successful", token });
    } catch (error) {
        if (error instanceof z.ZodError) {
            res.status(400).json({ message: "Validation error", errors: error.errors });
            return;
        }
        console.error("Login error:", error);
        res.status(500).json({ message: "Internal server error" });
    }
};
