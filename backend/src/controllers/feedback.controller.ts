import { Request, Response } from "express";
import Feedback from "../models/feedback.model";
import { analyzeFeedback } from "../services/gemini.service";

export const createFeedback = async (req: Request, res: Response) => {
    try {
      const { title, description, category, submitterName, submitterEmail } =
        req.body;
  
      if (!title || !description || !category) {
        return res.status(400).json({
          success: false,
          message: "Missing required fields",
        });
      }
  
      if (description.length < 20) {
        return res.status(400).json({
          success: false,
          message: "Description must be at least 20 characters",
        });
      }
  
      // 1️⃣ Save feedback FIRST (important)
      const feedback = await Feedback.create({
        title,
        description,
        category,
        submitterName,
        submitterEmail,
      });
  
      // 2️⃣ Call Gemini (async)
      const aiResult = await analyzeFeedback(title, description);
  
      // 3️⃣ If AI success → update DB
      if (aiResult) {
        feedback.ai_category = aiResult.category;
        feedback.ai_sentiment = aiResult.sentiment;
        feedback.ai_priority = aiResult.priority_score;
        feedback.ai_summary = aiResult.summary;
        feedback.ai_tags = aiResult.tags;
        feedback.ai_processed = true;
  
        await feedback.save();
      }
  
      return res.status(201).json({
        success: true,
        data: feedback,
        message: "Feedback submitted with AI analysis",
      });
    } catch (error) {
      return res.status(500).json({
        success: false,
        message: "Server error",
      });
    }
  };
export const getAllFeedback = async (req: Request, res: Response) => {
    try {
      const data = await Feedback.find();
  
      res.json({
        success: true,
        data,
      });
    } catch (error) {
      res.status(500).json({ success: false });
    }
  };
  export const getFeedbackById = async (req: Request, res: Response) => {
    try {
      const feedback = await Feedback.findById(req.params.id);
  
      if (!feedback) {
        return res.status(404).json({ success: false, message: "Not found" });
      }
  
      res.json({ success: true, data: feedback });
    } catch {
      res.status(500).json({ success: false });
    }
  };
  export const updateStatus = async (req: Request, res: Response) => {
    try {
      const { status } = req.body;
  
      const updated = await Feedback.findByIdAndUpdate(
        req.params.id,
        { status },
        { new: true }
      );
  
      res.json({ success: true, data: updated });
    } catch {
      res.status(500).json({ success: false });
    }
  };
  export const deleteFeedback = async (req: Request, res: Response) => {
    try {
      await Feedback.findByIdAndDelete(req.params.id);
  
      res.json({ success: true, message: "Deleted" });
    } catch {
      res.status(500).json({ success: false });
    }
  };
  export const getAISummary = async (req: Request, res: Response) => {
    try {
      const feedbacks = await Feedback.find({
        createdAt: {
          $gte: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000),
        },
      });
  
      const summaries = feedbacks.map((f) => f.ai_summary).join("\n");
  
      const aiResult = await analyzeFeedback(
        "Weekly Summary",
        summaries || "No feedback"
      );
  
      res.json({
        success: true,
        data: aiResult,
      });
    } catch {
      res.status(500).json({ success: false });
    }
  };