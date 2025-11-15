import { GoogleGenAI, Type } from "@google/genai";
import { FlashcardData } from "../types";

const API_KEY = process.env.API_KEY;

if (!API_KEY) {
    throw new Error("API_KEY environment variable not set");
}

const ai = new GoogleGenAI({ apiKey: API_KEY });

const flashcardSchema = {
    type: Type.ARRAY,
    items: {
        type: Type.OBJECT,
        properties: {
            english: {
                type: Type.STRING,
                description: "The word in English."
            },
            indonesian: {
                type: Type.STRING,
                description: "The Indonesian translation of the English word."
            },
            image_prompt: {
                type: Type.STRING,
                description: "A short, simple 2-5 word phrase for generating an image that represents the word."
            }
        },
        required: ["english", "indonesian", "image_prompt"]
    }
};

export const generateFlashcards = async (category: string): Promise<FlashcardData[]> => {
    const prompt = `You are an expert English-Indonesian teacher. Generate a JSON array of 30 basic English flashcards for the category '${category}'. Each object in the array should have three keys: 'english' (the English word), 'indonesian' (the Indonesian translation), and 'image_prompt' (a simple 2-5 word description for an image representing the word, e.g., 'a red apple'). Ensure the vocabulary is suitable for absolute beginners.`;

    try {
        const response = await ai.models.generateContent({
            model: "gemini-2.5-flash",
            contents: prompt,
            config: {
                responseMimeType: "application/json",
                responseSchema: flashcardSchema,
                temperature: 0.7,
            },
        });

        const jsonText = response.text.trim();
        const flashcards = JSON.parse(jsonText) as FlashcardData[];
        
        if (!Array.isArray(flashcards) || flashcards.length === 0) {
            throw new Error("Received empty or invalid data from API.");
        }

        return flashcards;
    } catch (error) {
        console.error("Error generating flashcards with Gemini:", error);
        throw new Error("Failed to fetch flashcards from Gemini API.");
    }
};