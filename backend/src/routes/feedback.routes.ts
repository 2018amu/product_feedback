import express from "express";
import {
  createFeedback,
  getAllFeedback,
  getFeedbackById,
  updateStatus,
  deleteFeedback,
  getAISummary,
  getStats,
} from "../controllers/feedback.controller";

import { feedbackLimiter } from "../middleware/rateLimiter";

const router = express.Router();

//  IMPORTANT: specific routes FIRST
router.get("/stats", getStats);
router.get("/summary", getAISummary);

//  CRUD routes
router.post("/", feedbackLimiter, createFeedback);
router.get("/", getAllFeedback);
router.get("/:id", getFeedbackById);
router.patch("/:id", updateStatus);
router.delete("/:id", deleteFeedback);

export default router;