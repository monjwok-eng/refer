import { SiteConfig } from "../types/site";

export async function generateSiteRationale(prompt: string, onChunk?: (text: string) => void) {
  try {
    const response = await fetch("/api/gemini/rationale-stream", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ prompt }),
    });

    if (response.status === 429) {
      throw new Error("QUOTA_EXCEEDED");
    }
    if (!response.ok) throw new Error("Failed to generate rationale");

    const reader = response.body?.getReader();
    if (!reader) throw new Error("No reader available");

    let fullText = "";
    const decoder = new TextDecoder();
    
    while (true) {
      const { done, value } = await reader.read();
      if (done) break;
      
      const chunk = decoder.decode(value);
      const lines = chunk.split("\n");
      
      for (const line of lines) {
        if (line.startsWith("data: ")) {
          const content = line.slice(6).trim();
          if (content === "[DONE]") break;
          try {
            const data = JSON.parse(content);
            fullText += data.text;
            if (onChunk) onChunk(fullText);
          } catch (e) {
            console.error("Error parsing stream chunk", e);
          }
        }
      }
    }
    return fullText;
  } catch (error) {
    console.error("Gemini API Error in Rationale:", error);
    throw error;
  }
}

export async function generateSiteUpdate(prompt: string, currentConfig: SiteConfig): Promise<Partial<SiteConfig>> {
  try {
    const response = await fetch("/api/gemini/update", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ prompt, currentConfig }),
    });
    
    if (response.status === 429) {
      throw new Error("QUOTA_EXCEEDED");
    }
    if (!response.ok) throw new Error("Failed to generate update");
    return await response.json();
  } catch (error) {
    console.error("Design Update Error:", error);
    throw error;
  }
}

export async function continueChat(messages: {role: 'user' | 'assistant', text: string}[], onChunk?: (text: string) => void) {
  try {
    const response = await fetch("/api/gemini/chat-stream", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ messages }),
    });

    if (response.status === 429) {
      throw new Error("QUOTA_EXCEEDED");
    }
    if (!response.ok) throw new Error("Failed to continue chat");

    const reader = response.body?.getReader();
    if (!reader) throw new Error("No reader available");

    let fullText = "";
    const decoder = new TextDecoder();
    
    while (true) {
      const { done, value } = await reader.read();
      if (done) break;
      
      const chunk = decoder.decode(value);
      const lines = chunk.split("\n");
      
      for (const line of lines) {
        if (line.startsWith("data: ")) {
          const content = line.slice(6).trim();
          if (content === "[DONE]") break;
          try {
            const data = JSON.parse(content);
            fullText += data.text;
            if (onChunk) onChunk(fullText);
          } catch (e) {
            console.error("Error parsing stream chunk", e);
          }
        }
      }
    }
    return fullText;
  } catch (error) {
    console.error("Gemini API Error in Chat:", error);
    throw error;
  }
}
