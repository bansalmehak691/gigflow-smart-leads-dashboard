import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

// 🔐 WHAT WE STORE INSIDE TOKEN
interface JwtPayload {
  id: string;
  role: "admin" | "sales";
}

// 🧑‍💻 ATTACH USER TO REQUEST
export interface AuthRequest extends Request {
  user?: JwtPayload;
}

// ================= AUTH MIDDLEWARE =================
export const protect = (
  req: AuthRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    const authHeader = req.headers.authorization;

    // ❌ NO TOKEN
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res.status(401).json({
        message: "Not authorized, token missing",
      });
    }

    const token = authHeader.split(" ")[1];

    // 🔐 VERIFY TOKEN
    const decoded = jwt.verify(
      token,
      process.env.JWT_SECRET as string
    ) as JwtPayload;

    // 👇 ATTACH USER DATA
    req.user = {
      id: decoded.id,
      role: decoded.role,
    };

    next();

  } catch (error) {
    return res.status(401).json({
      message: "Invalid or expired token",
    });
  }
};