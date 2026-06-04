import { useState, useRef, useEffect } from 'react';
import { chatWithData } from '../services/api';
import { mockCustomers, mockRevenueData, dashboardSummary } from '../data/mockData';
import { Send, Bot, User, Loader2, AlertCircle } from 'lucide-react';

export default function Chatbot() {
  const [messages, setMessages] = useState([
    { role: 'assistant', content: 'Hello! I am your CRM data assistant. Ask me anything about your customer data, revenue, or campaigns.' }
  ]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, loading]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!input.trim() || loading) return;

    const userMessage = input.trim();
    setInput('');
    setMessages(prev => [...prev, { role: 'user', content: userMessage }]);
    setLoading(true);
    setError(null);

    try {
      const dataContext = {
        summary: dashboardSummary,
        recentCustomers: mockCustomers.slice(0, 5),
        revenueTrend: mockRevenueData.slice(-3)
      };

      const response = await chatWithData(userMessage, dataContext);
      
      setMessages(prev => [...prev, { 
        role: 'assistant', 
        content: response.text || (typeof response === 'string' ? response : JSON.stringify(response)) 
      }]);
    } catch (err) {
      console.error(err);
      setError("Unable to get a response. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto h-[calc(100vh-8rem)] flex flex-col bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
      {/* Chat Header */}
      <div className="px-6 py-4 border-b border-gray-200 bg-gray-50 flex items-center space-x-3">
        <div className="p-2 bg-indigo-100 text-indigo-600 rounded-lg">
          <Bot className="w-6 h-6" />
        </div>
        <div>
          <h2 className="text-lg font-bold text-gray-900">Ask Your Data</h2>
          <p className="text-sm text-gray-500">Powered by AI</p>
        </div>
      </div>

      {/* Error State */}
      {error && (
        <div className="bg-red-50 p-3 flex items-center space-x-2 text-red-700 text-sm border-b border-red-100">
          <AlertCircle className="w-4 h-4" />
          <span>{error}</span>
        </div>
      )}

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-6 space-y-6 bg-gray-50/30">
        {messages.map((msg, idx) => (
          <div key={idx} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
            <div className={`flex max-w-[80%] ${msg.role === 'user' ? 'flex-row-reverse' : 'flex-row'}`}>
              {/* Avatar */}
              <div className={`flex-shrink-0 h-8 w-8 rounded-full flex items-center justify-center ${
                msg.role === 'user' ? 'bg-indigo-600 text-white ml-3' : 'bg-indigo-100 text-indigo-600 mr-3'
              }`}>
                {msg.role === 'user' ? <User className="w-5 h-5" /> : <Bot className="w-5 h-5" />}
              </div>
              
              {/* Message Bubble */}
              <div className={`px-4 py-3 rounded-2xl ${
                msg.role === 'user' 
                  ? 'bg-indigo-600 text-white rounded-tr-sm' 
                  : 'bg-white border border-gray-200 text-gray-800 rounded-tl-sm shadow-sm'
              }`}>
                <p className="whitespace-pre-wrap text-sm leading-relaxed">{msg.content}</p>
              </div>
            </div>
          </div>
        ))}
        
        {loading && (
          <div className="flex justify-start">
            <div className="flex flex-row max-w-[80%]">
              <div className="flex-shrink-0 h-8 w-8 rounded-full bg-indigo-100 text-indigo-600 mr-3 flex items-center justify-center">
                <Bot className="w-5 h-5" />
              </div>
              <div className="px-5 py-4 rounded-2xl bg-white border border-gray-200 text-gray-800 rounded-tl-sm shadow-sm flex items-center space-x-1">
                <div className="w-2 h-2 bg-indigo-400 rounded-full animate-bounce"></div>
                <div className="w-2 h-2 bg-indigo-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                <div className="w-2 h-2 bg-indigo-400 rounded-full animate-bounce" style={{ animationDelay: '0.4s' }}></div>
              </div>
            </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Input Area */}
      <div className="p-4 bg-white border-t border-gray-200">
        <form onSubmit={handleSubmit} className="relative flex items-center">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            disabled={loading}
            placeholder="Ask about revenue, campaigns, or specific segments..."
            className="w-full pl-4 pr-12 py-3 border border-gray-300 rounded-xl shadow-sm focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 bg-gray-50 focus:bg-white transition-colors disabled:opacity-50"
          />
          <button
            type="submit"
            disabled={!input.trim() || loading}
            className="absolute right-2 p-2 rounded-lg text-white bg-indigo-600 hover:bg-indigo-700 disabled:opacity-50 disabled:bg-gray-400 transition-colors"
          >
            <Send className="w-5 h-5" />
          </button>
        </form>
      </div>
    </div>
  );
}
