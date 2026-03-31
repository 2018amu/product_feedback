import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY!);

export const analyzeFeedback = async (title: string, description: string) => {
  try {
    const model = genAI.getGenerativeModel({
      model: "gemini-1.5-flash",
    });

    const prompt = `
    Analyse this product feedback and return ONLY valid JSON.

    Feedback:
    Title: ${title}
    Description: ${description}

    Required JSON format:
    {
      "category": "Bug | Feature Request | Improvement | Other",
      "sentiment": "Positive | Neutral | Negative",
      "priority_score": number (1-10),
      "summary": "short summary",
      "tags": ["tag1", "tag2"]
    }
    `;

    const result = await model.generateContent(prompt);
    const response = result.response.text();

    // Clean JSON (IMPORTANT)
    const cleaned = response.replace(/```json|```/g, "").trim();

    return JSON.parse(cleaned);
  } catch (error) {
    console.error("Gemini error:", error);
    return null; // VERY IMPORTANT → do not crash app
  }
};