import express from "express";
import {
    createFeedback,
    getAllFeedback,
    getFeedbackById,
    updateStatus,
    deleteFeedback,
    getAISummary
  } from "../controllers/feedback.controller";

  const router = express.Router();
  
  router.post("/", createFeedback);
  router.get("/", getAllFeedback);
  router.get("/:id", getFeedbackById);
  router.patch("/:id", updateStatus);
  router.delete("/:id", deleteFeedback);
  router.get("/summary", getAISummary);




export default router;