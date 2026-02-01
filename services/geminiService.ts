import { GoogleGenAI } from "@google/genai";

// Initialize the Gemini AI client
// Note: process.env.API_KEY is injected by the environment
const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

export interface ImageEditResponse {
  imageUrl?: string;
  error?: string;
}

export const editImage = async (
  base64Image: string,
  prompt: string,
  mimeType: string = 'image/jpeg'
): Promise<ImageEditResponse> => {
  try {
    // Clean base64 string if it contains data URI header
    const cleanBase64 = base64Image.replace(/^data:image\/(png|jpeg|jpg|webp);base64,/, '');

    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash-image',
      contents: {
        parts: [
          {
            inlineData: {
              mimeType: mimeType,
              data: cleanBase64,
            },
          },
          {
            text: prompt,
          },
        ],
      },
      // Note: responseMimeType is NOT supported for nano banana series (gemini-2.5-flash-image)
    });

    // Parse the response to find the image part
    if (response.candidates && response.candidates[0].content.parts) {
      for (const part of response.candidates[0].content.parts) {
        if (part.inlineData && part.inlineData.data) {
          const newBase64 = part.inlineData.data;
          // Gemini usually returns image/png or image/jpeg
          const newMimeType = part.inlineData.mimeType || 'image/png';
          return { imageUrl: `data:${newMimeType};base64,${newBase64}` };
        }
      }
    }

    return { error: 'No image generated. The model might have returned only text.' };

  } catch (error: any) {
    console.error("Gemini API Error:", error);
    return { error: error.message || "Failed to process image." };
  }
};
