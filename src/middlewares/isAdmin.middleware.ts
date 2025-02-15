import { Request, Response, NextFunction } from "express";
import { errorHandlerWrapper } from "@/utils";

export const isAdmin = errorHandlerWrapper(
  async (req: Request, res: Response, next: NextFunction) => {
    if (req.user.role !== "admin") {
      return res.status(403).json({ message: "Admin access required" });
    }
    next();
  }
);