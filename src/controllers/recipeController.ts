import { Request, Response } from "express";
import { GoogleGenerativeAI } from "@google/generative-ai";

const apiKey = process.env.GEMINI_API_KEY || "";
const genAI = new GoogleGenerativeAI(apiKey);

const generateRecipe = async (req: Request, res: Response) => {
  try {
    const { ingredients, ageGroup } = req.body;

    if (!apiKey) {
      return res
        .status(500)
        .json({ message: "API Key tidak terdeteksi di .env" });
    }

    const model = genAI.getGenerativeModel({
      // Use gemini-2.5-flash (Stable 2026)
      // or gemini-1.5-flash-latest if still supported
      model: "gemini-2.5-flash",
      generationConfig: {
        responseMimeType: "application/json",
      },
    });

    // Prompt diperkuat untuk menjelaskan apa itu TEKSTUR berdasarkan usia
    const prompt = `Anda adalah ahli gizi anak. Buatkan resep MPASI sehat untuk anak usia ${ageGroup} bulan. 
    Bahan tersedia: ${ingredients}. 
    
    Wajib sertakan penjelasan "tekstur" (contoh: "Saring Halus", "Cincang Kasar", atau "Nasi Tim") 
    yang sesuai dengan kemampuan makan bayi usia ${ageGroup} bulan.

    Berikan respons dalam format JSON dengan struktur: 
    { 
      "judul": string, 
      "tekstur": string, 
      "bahan": string[], 
      "langkah": string[],
      "tipsGizi": string
    }`;

    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text();

    if (!text) {
      throw new Error("AI tidak memberikan respon teks");
    }

    const parsedData = JSON.parse(text);
    return res.status(200).json(parsedData);
  } catch (error: any) {
    console.error("Gemini Error:", error.message);
    return res.status(500).json({
      message: "Gagal memproses resep",
      error: error.message,
    });
  }
};

export default generateRecipe;
