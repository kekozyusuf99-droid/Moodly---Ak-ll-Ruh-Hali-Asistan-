
import { GoogleGenAI, Type } from "@google/genai";
import { MoodEntry, AIAnalysis, Language } from "../types";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY || '' });

export const analyzeMoods = async (entries: MoodEntry[], lang: Language = 'tr'): Promise<AIAnalysis> => {
  if (entries.length === 0) {
    return {
      insight: "-",
      recommendation: "-",
      summary: "-"
    };
  }

  const moodData = entries.map(e => ({
    date: new Date(e.timestamp).toLocaleDateString(lang === 'tr' ? 'tr-TR' : lang === 'en' ? 'en-US' : 'de-DE'),
    mood: e.mood,
    note: e.note
  }));

  const prompt = `Analysieren Sie die folgenden Stimmungstaten und geben Sie ein kurzes, sinnvolles Feedback in der Sprache: ${lang}.
  JSON-Format: insight, recommendation, summary.
  Daten: ${JSON.stringify(moodData)}`;

  try {
    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: prompt,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            insight: { type: Type.STRING },
            recommendation: { type: Type.STRING },
            summary: { type: Type.STRING }
          },
          required: ["insight", "recommendation", "summary"]
        }
      }
    });

    return JSON.parse(response.text);
  } catch (error) {
    console.error("AI Analysis failed:", error);
    return {
      insight: "Error",
      recommendation: "Error",
      summary: "Error"
    };
  }
};
