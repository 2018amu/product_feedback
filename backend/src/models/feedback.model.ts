import mongoose, { Schema, Document, Model } from "mongoose";

// Interface for feedback 
export interface IFeedback extends Document {
  title: string;
  description: string;
  category: "Bug" | "Feature Request" | "Improvement" | "Other";
  status: "New" | "In Review" | "Resolved";

  submitterName?: string;
  submitterEmail?: string;

  ip?: string; //  ADD THIS

  ai_category?: string;
  ai_sentiment?: "Positive" | "Neutral" | "Negative";
  ai_priority?: number;
  ai_summary?: string;
  ai_tags?: string[];
  ai_processed: boolean;

  createdAt?: Date;
  updatedAt?: Date;
}

// Schema
const FeedbackSchema = new Schema<IFeedback>(
  {
    title: {
      type: String,
      required: [true, "Title is required"],
      maxlength: 120,
      trim: true,
    },
    description: {
      type: String,
      required: [true, "Description is required"],
      minlength: 20,
      trim: true,
    },
    category: {
      type: String,
      enum: ["Bug", "Feature Request", "Improvement", "Other"],
      required: true,
    },
    status: {
      type: String,
      enum: ["New", "In Review", "Resolved"],
      default: "New",
    },

    submitterName: {
      type: String,
      trim: true,
    },

    submitterEmail: {
      type: String,
      trim: true,
      match: [/^\S+@\S+\.\S+$/, "Please use a valid email"],
    },

    //  IP FIELD (for rate limiting)
    ip: {
      type: String,
      index: true, //  helps querying faster
    },

    // AI fields
    ai_category: {
      type: String,
    },
    ai_sentiment: {
      type: String,
      enum: ["Positive", "Neutral", "Negative"],
    },
    ai_priority: {
      type: Number,
      min: 1,
      max: 10,
    },
    ai_summary: {
      type: String,
    },
    ai_tags: [
      {
        type: String,
      },
    ],
    ai_processed: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

// Indexes (performance)
FeedbackSchema.index({ status: 1 });
FeedbackSchema.index({ category: 1 });
FeedbackSchema.index({ ai_priority: -1 });
FeedbackSchema.index({ createdAt: -1 });

// Optional: compound index for rate limiting queries
FeedbackSchema.index({ ip: 1, createdAt: -1 });

// Prevent model overwrite error
const Feedback: Model<IFeedback> =
  mongoose.models.Feedback ||
  mongoose.model<IFeedback>("Feedback", FeedbackSchema);

export default Feedback;