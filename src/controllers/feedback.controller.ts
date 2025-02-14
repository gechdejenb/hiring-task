/** @format */

import { Request, Response } from "express";
import { getRepository } from "typeorm";
import { Feedback } from "@/entities";
import { UserEntity } from "@/entities"; 
import { calculateSentiment } from "@/utils/sentiment";
import { errorHandlerWrapper } from "@/utils";

declare module "express" {
  interface Request {
    user?: UserEntity;
  }
}

export class FeedbackController {
  static submitFeedback = errorHandlerWrapper(
     // #swagger.tags = ['Feedback']

    async (req: Request, res: Response) => {
      const { text } = req.body;
      
      if (!text || text.length > 1000) {
        return res.status(400).json({ message: "Invalid text (1-1000 chars)" });
      }

      const feedbackRepo = getRepository(Feedback);
      const sentiment = calculateSentiment(text);

      // Create and save feedback properly
      const feedback = feedbackRepo.create({
        text,
        sentiment,
        user: req.user 
      });

      await feedbackRepo.save(feedback);
      res.status(201).json(feedback);
    }
  );

  static getAllFeedbacks = errorHandlerWrapper(
        // #swagger.tags = ['Feedback']

    async (req: Request, res: Response) => {
      const feedbackRepo = getRepository(Feedback);
      
      const feedbacks = await feedbackRepo.find({
        relations: ["user"],
        select: ["uuid", "text", "sentiment", "createdAt"]
      });

      const response = feedbacks.map(fb => ({
        ...fb,
        user: { name: fb.user.name, role: fb.user.role }
      }));

      res.json(response);
    }
  );
}