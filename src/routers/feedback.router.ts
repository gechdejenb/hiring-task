
import { Router } from "express";
import { FeedbackController } from "@/controllers/feedback.controller";
import { authMiddleware, isAdmin } from "@/middlewares";

export const feedbackRouter = Router();

feedbackRouter.post(
  "/feedback",
  authMiddleware,
  FeedbackController.submitFeedback
);

feedbackRouter.get(
  "/feedback",
  authMiddleware,
  isAdmin,
  FeedbackController.getAllFeedbacks
);