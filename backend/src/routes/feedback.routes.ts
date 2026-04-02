import express from "express";
import {
    createFeedback,
    getAllFeedback,
    getFeedbackById,
    updateStatus,
    deleteFeedback,
    getAISummary
  } from "../controllers/feedback.controller";
  import { feedbackLimiter } from "../middleware/rateLimiter";
  import Feedback from "../models/feedback.model"; 

  const router = express.Router();
  
  router.post("/", createFeedback);
  router.get("/", getAllFeedback);
  router.get("/:id", getFeedbackById);
  router.patch("/:id", updateStatus);
  router.delete("/:id", deleteFeedback);
  router.get("/summary", getAISummary);

  router.post("/feedback", feedbackLimiter, async (req, res) => {
    try {
      const feedback = new Feedback(req.body);
      await feedback.save();
  
      res.status(201).json({
        message: "Feedback submitted successfully!",
        data: feedback,
      });
    } catch (error) {
      res.status(500).json({ message: "Error saving feedback" });
    }
  });




export default router;