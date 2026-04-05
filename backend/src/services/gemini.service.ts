import { GoogleGenerativeAI } from "@google/generative-ai";

export const analyzeFeedback = async (title: string, description: string) => {
  try {
    const apiKey = process.env.GEMINI_API_KEY;

    console.log("API KEY:", apiKey);

    if (!apiKey) {
      throw new Error("Missing Gemini API key");
    }

    // ✅ Initialize here (AFTER env is available)
    const genAI = new GoogleGenerativeAI(apiKey);

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

    console.log("Gemini Raw Response:", response);

    // Clean JSON
    const cleaned = response.replace(/```json|```/g, "").trim();

    const parsed = JSON.parse(cleaned);

    return parsed;

  } catch (error: any) {
    console.error("Gemini error:", error.message || error);
    return null;
  }
};