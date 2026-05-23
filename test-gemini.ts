import { GoogleGenAI } from "@google/genai";
import { config } from "dotenv";
config();

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });
async function run() {
    try {
        const chat = ai.chats.create({
            model: "gemini-1.5-flash",
            config: {
              systemInstruction: "You are a helpful assistant.",
            }
          });
          
        let response = await chat.sendMessage({ message: "Hello" });
        console.log(response.text);
    } catch(err) {
        console.error("FAILED:::", err);
    }
}
run();
