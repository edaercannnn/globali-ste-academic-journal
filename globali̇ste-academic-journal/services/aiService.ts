import { GoogleGenAI, Chat } from "@google/genai";

// HARDCODED KEY AS REQUESTED
const FIXED_API_KEY = "AIzaSyCQ_ZBObjrnwFB6AZzEoo9bOwQgJGPbzVQ";
const LOCAL_STORAGE_KEY = 'globaliste_gemini_api_key';

let ai: GoogleGenAI | null = null;
let chatSession: Chat | null = null;

// Helper to clean API key
const cleanApiKey = (key: string | undefined | null) => {
  if (!key) return '';
  return key.replace(/^["']|["']$/g, '').trim();
};

export const initializeService = () => {
  try {
    // Priority 1: Use the fixed key requested by the user
    let apiKey = FIXED_API_KEY;
    
    // Fallback logic (optional, but kept for robustness if fixed key is removed later)
    if (!apiKey) {
        apiKey = cleanApiKey(localStorage.getItem(LOCAL_STORAGE_KEY));
    }
    if (!apiKey) {
      apiKey = cleanApiKey(process.env.API_KEY);
    }
  
    if (apiKey) {
      console.log("GlobalİSTE AI: Fixed API Key found, initializing service...");
      ai = new GoogleGenAI({ apiKey });
      chatSession = null; // Reset session on new init
      return true;
    } else {
      console.warn("GlobalİSTE AI: API Key is missing. Running in Demo Mode.");
      ai = null;
      return false;
    }
  } catch (error) {
    console.error("Failed to initialize GoogleGenAI:", error);
    ai = null;
    return false;
  }
};

// Initialize on load
initializeService();

export const setApiKey = (key: string) => {
  localStorage.setItem(LOCAL_STORAGE_KEY, key);
  return initializeService();
};

export const removeApiKey = () => {
  localStorage.removeItem(LOCAL_STORAGE_KEY);
  return initializeService();
};

export const hasValidKey = () => !!ai;

const SYSTEM_INSTRUCTION = `
You are the intelligent assistant for "GlobalİSTE", the official academic journal platform of İskenderun Technical University (İSTE). 
Your role is to assist researchers, authors, librarians, and students.

Key Responsibilities:
1. Guide authors on how to submit papers (refer to the 'Submit' tab).
2. Explain the scope of journals (Clinical Medicine, Engineering, etc.).
3. Assist with finding articles or understanding metrics like Impact Factor.
4. Provide information about İSTE (İskenderun Technical University).
5. Be polite, academic, and professional.

Tone: Professional, helpful, and academic.
Language: Respond in the language the user speaks (English, Turkish, or Arabic). Default to Turkish if unsure.

If you don't know an answer, suggest they contact 'support@globaliste.com'.
`;

// Mock Response Generator for fallback mode
const getMockResponse = (text: string) => {
    const lower = text.toLowerCase();
    
    if (lower.includes('merhaba') || lower.includes('selam') || lower.includes('hi') || lower.includes('hello')) {
        return "Merhaba! GlobalİSTE akademik asistanınızım. Size nasıl yardımcı olabilirim?";
    }
    if (lower.includes('gönder') || lower.includes('submit') || lower.includes('yükle')) {
        return "Makale göndermek için üst menüdeki 'Makale Gönder' (Submit your paper) sekmesini kullanabilirsiniz. Gönderim süreci 5 adımdan oluşmaktadır ve PDF/DOCX formatlarını desteklemekteyiz.";
    }
    if (lower.includes('dergi') || lower.includes('journal') || lower.includes('kategori')) {
        return "GlobalİSTE bünyesinde Tıp, Mühendislik, Fen Bilimleri ve Sosyal Bilimler gibi çeşitli alanlarda yayın yapan yüksek etkili dergilerimiz bulunmaktadır. 'Dergiler' sekmesinden detaylara ulaşabilirsiniz.";
    }
    if (lower.includes('iletişim') || lower.includes('contact') || lower.includes('destek')) {
        return "Bize 'support@globaliste.com' adresinden veya sayfanın altındaki 'İletişim' bölümünden ulaşabilirsiniz.";
    }
    
    return "Şu anda bağlantı sorunları yaşıyorum. Lütfen daha sonra tekrar deneyiniz.";
};

export const getChatSession = () => {
  if (!ai) return null;
  
  if (!chatSession) {
    try {
      chatSession = ai.chats.create({
        model: 'gemini-2.5-flash',
        config: {
          systemInstruction: SYSTEM_INSTRUCTION,
        },
      });
    } catch (e) {
      console.error("Failed to create chat session:", e);
      return null;
    }
  }
  return chatSession;
};

export const sendMessageToGemini = async (message: string): Promise<string> => {
  try {
    const chat = getChatSession();
    
    // If chat initialization failed (e.g. no key), fall back to mock
    if (!chat) {
      return getMockResponse(message);
    }

    const result = await chat.sendMessage({ message });
    return result.text || "I'm sorry, I couldn't generate a response.";
    
  } catch (error: any) {
    console.error("Gemini API Error:", error);
    
    // Even with a fixed key, errors can happen (quota, network). Fallback gracefully.
    return getMockResponse(message) + "\n\n(Bağlantı hatası oluştu, demo yanıt gösteriliyor.)";
  }
};