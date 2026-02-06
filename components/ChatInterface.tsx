
import React, { useState, useRef, useEffect } from 'react';
import { Send, Terminal, X, MessageSquare, Shield, Lock, Activity } from 'lucide-react';
import { sendMessageToGemini } from '../services/geminiService';
import { ChatMessage } from '../types';

const ChatInterface: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 'init',
      role: 'model',
      text: 'OPERATOR IDENTIFIED. SECURE CHANNEL ESTABLISHED. HOW CAN I ASSIST IN TODAY\'S DEPLOYMENT?',
      timestamp: new Date()
    }
  ]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isOpen]);

  const handleSend = async () => {
    if (!input.trim()) return;

    const userMsg: ChatMessage = {
      id: Date.now().toString(),
      role: 'user',
      text: input,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMsg]);
    setInput('');
    setIsTyping(true);

    const history = messages.map(m => ({
      role: m.role,
      parts: [{ text: m.text }]
    }));

    const responseText = await sendMessageToGemini(input, history);

    const botMsg: ChatMessage = {
      id: (Date.now() + 1).toString(),
      role: 'model',
      text: responseText.toUpperCase(),
      timestamp: new Date()
    };

    setMessages(prev => [...prev, botMsg]);
    setIsTyping(false);
  };

  return (
    <div className="fixed bottom-10 right-10 z-[1000] flex flex-col items-end font-mono">
      {/* Trigger Button */}
      {!isOpen && (
        <button
          onClick={() => setIsOpen(true)}
          className="group relative"
        >
          <div className="absolute inset-0 bg-cyber-yellow blur-md opacity-20 group-hover:opacity-40 transition-opacity"></div>
          <div className="relative bg-cyber-black text-cyber-yellow p-5 border-2 border-cyber-yellow hover:bg-cyber-yellow hover:text-black transition-all duration-300 transform hover:-translate-y-2 flex items-center justify-center">
             <MessageSquare size={24} />
             <div className="absolute -top-1 -right-1 w-3 h-3 bg-red-600 rounded-full animate-ping"></div>
          </div>
        </button>
      )}

      {/* Chat Window */}
      {isOpen && (
        <div className="w-[380px] md:w-[450px] h-[600px] bg-cyber-black/95 border-2 border-cyber-yellow flex flex-col shadow-[20px_20px_0px_rgba(255,255,0,0.1)] backdrop-blur-xl animate-[popup_0.3s_ease-out]">
          <div className="absolute top-0 right-0 p-1 bg-cyber-yellow/10 text-[8px] font-bold text-cyber-yellow uppercase tracking-widest pr-4">ENC_STREAMS_ACTIVE</div>
          
          {/* Header */}
          <div className="bg-cyber-yellow text-black p-4 flex justify-between items-center font-black uppercase tracking-widest relative overflow-hidden">
            <div className="absolute inset-0 bg-white/10 mix-blend-overlay"></div>
            <div className="flex items-center gap-3 relative z-10">
              <Activity size={18} className="animate-pulse" />
              <span>CIPHER.OS // UPLINK</span>
            </div>
            <button onClick={() => setIsOpen(false)} className="hover:rotate-90 transition-transform duration-300 relative z-10">
              <X size={24} />
            </button>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-6 space-y-6 font-mono text-xs custom-scrollbar">
            {messages.map((msg) => (
              <div
                key={msg.id}
                className={`flex flex-col ${msg.role === 'user' ? 'items-end' : 'items-start'}`}
              >
                <div className={`text-[8px] uppercase tracking-widest mb-1 ${msg.role === 'user' ? 'text-cyber-yellow/40' : 'text-green-500/60'}`}>
                  {msg.role === 'user' ? 'OPERATOR_1' : 'SYSTEM_AI'} // {msg.timestamp.toLocaleTimeString()}
                </div>
                <div
                  className={`max-w-[90%] p-4 relative group transition-all duration-300 ${
                    msg.role === 'user'
                      ? 'bg-cyber-yellow/10 border-r-4 border-cyber-yellow text-cyber-yellow'
                      : 'bg-white/5 border-l-4 border-white text-white/90'
                  }`}
                >
                  <p className="leading-relaxed whitespace-pre-wrap">{msg.text}</p>
                </div>
              </div>
            ))}
            {isTyping && (
              <div className="flex items-center gap-3 text-cyber-yellow">
                <Shield size={14} className="animate-spin" />
                <span className="animate-pulse uppercase tracking-widest">DECRYPTING_RESPONSE...</span>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Input Area */}
          <div className="p-4 border-t-2 border-cyber-yellow/20 bg-cyber-dark/80 relative">
             <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-cyber-yellow/40 to-transparent"></div>
             <div className="flex items-center gap-3 bg-cyber-black border border-cyber-yellow/30 p-2 focus-within:border-cyber-yellow transition-colors">
                <span className="text-cyber-yellow font-bold text-lg animate-pulse">$</span>
                <input
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && handleSend()}
                  placeholder="EXECUTE_COMMAND..."
                  className="flex-1 bg-transparent text-cyber-yellow placeholder-cyber-yellow/20 focus:outline-none font-mono text-sm uppercase"
                />
                <button
                  onClick={handleSend}
                  className="text-cyber-yellow hover:text-white transition-colors p-2"
                >
                  <Send size={20} />
                </button>
             </div>
             <div className="flex justify-between mt-3 px-1">
                <div className="flex gap-4 text-[8px] text-cyber-yellow/30 font-bold tracking-widest">
                   <div className="flex items-center gap-1"><Lock size={8} /> SECURE</div>
                   <div className="flex items-center gap-1"><Terminal size={8} /> RAW_PCM</div>
                </div>
                <div className="text-[8px] text-cyber-yellow/30 font-bold uppercase">BUFFER: 2.4KB</div>
             </div>
          </div>
        </div>
      )}
      <style>{`
        @keyframes popup {
          from { opacity: 0; transform: scale(0.9) translateY(20px); }
          to { opacity: 1; transform: scale(1) translateY(0); }
        }
        .custom-scrollbar::-webkit-scrollbar {
          width: 4px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: rgba(255, 255, 0, 0.2);
        }
      `}</style>
    </div>
  );
};

export default ChatInterface;
