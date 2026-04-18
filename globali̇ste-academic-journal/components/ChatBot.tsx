import React, { useState, useRef, useEffect } from 'react';
import { MessageCircle, X, Send, Bot, Loader2, Minus } from 'lucide-react';
import { sendMessageToGemini, hasValidKey } from '../services/aiService';

interface Message {
  id: string;
  text: string;
  sender: 'user' | 'bot';
  timestamp: Date;
}

export const ChatBot: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isOnline] = useState(hasValidKey()); // Should be true with fixed key
  
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 'welcome',
      text: "Merhaba! GlobalİSTE akademik asistanınızım. Size nasıl yardımcı olabilirim?",
      sender: 'bot',
      timestamp: new Date()
    }
  ]);
  const [inputText, setInputText] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    if (isOpen) {
      scrollToBottom();
    }
  }, [messages, isOpen]);

  const handleSend = async (e?: React.FormEvent) => {
    e?.preventDefault();
    if (!inputText.trim() || isLoading) return;

    const userMsg: Message = {
      id: Date.now().toString(),
      text: inputText,
      sender: 'user',
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMsg]);
    setInputText("");
    setIsLoading(true);

    try {
      const responseText = await sendMessageToGemini(userMsg.text);
      
      const botMsg: Message = {
        id: (Date.now() + 1).toString(),
        text: responseText,
        sender: 'bot',
        timestamp: new Date()
      };
      setMessages(prev => [...prev, botMsg]);
    } catch (err) {
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      {/* Floating Action Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`fixed bottom-6 right-6 z-[60] bg-[#cf1f46] text-white p-4 rounded-full shadow-lg hover:bg-[#a61938] transition-all duration-300 transform hover:scale-110 flex items-center justify-center ${isOpen ? 'rotate-90 opacity-0 pointer-events-none' : 'opacity-100'}`}
        aria-label="Open Chat"
      >
        <MessageCircle className="h-8 w-8" />
      </button>

      {/* Chat Window */}
      <div 
        className={`fixed bottom-6 right-6 z-[60] bg-white w-[350px] md:w-[400px] h-[550px] rounded-xl shadow-2xl flex flex-col transition-all duration-300 transform origin-bottom-right border border-gray-200 overflow-hidden ${
          isOpen ? 'scale-100 opacity-100' : 'scale-0 opacity-0 pointer-events-none'
        }`}
      >
        {/* Header */}
        <div className={`text-white p-4 flex justify-between items-center shadow-md ${isOnline ? 'bg-[#cf1f46]' : 'bg-gray-700'}`}>
          <div className="flex items-center gap-3">
            <div className="bg-white/20 p-2 rounded-full">
              <Bot className="h-6 w-6" />
            </div>
            <div>
              <h3 className="font-bold text-sm">GlobalİSTE AI</h3>
              <p className="text-xs text-red-100 flex items-center gap-1">
                <span className={`w-2 h-2 rounded-full ${isOnline ? 'bg-green-400 animate-pulse' : 'bg-orange-400'}`}></span> 
                {isOnline ? 'Online' : 'Offline'}
              </p>
            </div>
          </div>
          <div className="flex items-center gap-1">
            <button onClick={() => setIsOpen(false)} className="hover:bg-white/20 p-2 rounded transition" title="Close">
              <Minus className="h-4 w-4" />
            </button>
          </div>
        </div>

        {/* Messages Area */}
        <div className="flex-grow overflow-y-auto p-4 bg-[#f9f9f9] space-y-4 custom-scrollbar">
        {messages.map((msg) => (
            <div
            key={msg.id}
            className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
            >
            <div
                className={`max-w-[85%] p-3 rounded-lg text-sm shadow-sm relative whitespace-pre-wrap ${
                msg.sender === 'user'
                    ? 'bg-[#cf1f46] text-white rounded-br-none'
                    : 'bg-white text-gray-800 border border-gray-200 rounded-bl-none'
                }`}
            >
                {msg.text}
                <span className={`text-[10px] block mt-1 opacity-70 ${msg.sender === 'user' ? 'text-red-100' : 'text-gray-400'}`}>
                {msg.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                </span>
            </div>
            </div>
        ))}
        {isLoading && (
            <div className="flex justify-start">
            <div className="bg-white p-3 rounded-lg border border-gray-200 rounded-bl-none shadow-sm flex items-center gap-2">
                <Loader2 className="h-4 w-4 animate-spin text-[#cf1f46]" />
                <span className="text-xs text-gray-500">Yazıyor...</span>
            </div>
            </div>
        )}
        <div ref={messagesEndRef} />
        </div>

        {/* Input Area */}
        <div className="p-4 bg-white border-t border-gray-200 rounded-b-xl">
        <form onSubmit={handleSend} className="flex gap-2">
            <input
            type="text"
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            placeholder="Bir soru sorun..."
            className="flex-grow p-3 bg-gray-50 border border-gray-200 rounded-lg outline-none focus:border-[#cf1f46] focus:ring-1 focus:ring-[#cf1f46] text-sm text-gray-900"
            />
            <button
            type="submit"
            disabled={isLoading || !inputText.trim()}
            className="bg-[#cf1f46] text-white p-3 rounded-lg hover:bg-[#a61938] disabled:opacity-50 disabled:cursor-not-allowed transition"
            >
            <Send className="h-5 w-5" />
            </button>
        </form>
        <div className="text-[10px] text-center text-gray-400 mt-2">
            Powered by Google Gemini
        </div>
        </div>
      </div>
    </>
  );
};