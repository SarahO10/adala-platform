import React, { useState } from 'react';
import { 
  Bot, 
  Send, 
  Plus, 
  MessageSquare, 
  Brain, 
  Zap,
  Lightbulb,
  BookOpen,
  Scale,
  TrendingUp,
  Clock,
  Star,
  Shield,
  Users,
  FileText,
  Search,
  Filter,
  X,
  Trash2,
  Edit,
  Copy,
  Download
} from 'lucide-react';

interface Message {
  id: string;
  content: string;
  isUser: boolean;
  timestamp: Date;
  type: 'text' | 'code' | 'list' | 'table';
}

interface Conversation {
  id: string;
  title: string;
  lastMessage: string;
  timestamp: Date;
  messageCount: number;
  tags: string[];
}

const AISection: React.FC = () => {
  const [conversations, setConversations] = useState<Conversation[]>([
    {
      id: "conv-1",
      title: "استشارة في قانون العمل",
      lastMessage: "ما هي حقوق العامل في حالة إنهاء الخدمة؟",
      timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000),
      messageCount: 8,
      tags: ["عمل", "حقوق", "إنهاء خدمة"]
    },
    {
      id: "conv-2",
      title: "قضية تجارية",
      lastMessage: "كيف يمكن إثبات مخالفة العقد؟",
      timestamp: new Date(Date.now() - 24 * 60 * 60 * 1000),
      messageCount: 12,
      tags: ["تجاري", "عقود", "مخالفات"]
    },
    {
      id: "conv-3",
      title: "أحكام الطلاق",
      lastMessage: "ما هي شروط الطلاق الرجعي؟",
      timestamp: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000),
      messageCount: 15,
      tags: ["أحوال شخصية", "طلاق", "شريعة"]
    }
  ]);

  const [currentConversation, setCurrentConversation] = useState<string | null>(null);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "msg-1",
      content: "مرحباً! أنا المساعد الذكي لمنصة عدالة. كيف يمكنني مساعدتك اليوم؟",
      isUser: false,
      timestamp: new Date(),
      type: 'text'
    }
  ]);

  const [inputMessage, setInputMessage] = useState('');
  const [showNewChatModal, setShowNewChatModal] = useState(false);
  const [newChatTitle, setNewChatTitle] = useState('');
  const [isTyping, setIsTyping] = useState(false);

  const aiFeatures = [
    {
      icon: <Brain className="h-8 w-8" />,
      title: "ذكاء اصطناعي متقدم",
      description: "تقنيات AI حديثة لفهم وتحليل الاستفسارات القانونية",
      color: "from-green-500 to-green-600"
    },
    {
      icon: <Scale className="h-8 w-8" />,
      title: "معرفة قانونية شاملة",
      description: "قاعدة معرفة تضم جميع القوانين واللوائح السعودية",
      color: "from-blue-500 to-blue-600"
    },
    {
      icon: <Zap className="h-8 w-8" />,
      title: "استجابة فورية",
      description: "إجابات سريعة ودقيقة على الاستفسارات القانونية",
      color: "from-orange-500 to-orange-600"
    },
    {
      icon: <Shield className="h-8 w-8" />,
      title: "أمان وخصوصية",
      description: "حماية كاملة للمحادثات والبيانات القانونية",
      color: "from-purple-500 to-purple-600"
    }
  ];

  const quickQuestions = [
    "ما هي حقوق العامل في حالة إنهاء الخدمة؟",
    "كيف يمكن إثبات مخالفة العقد؟",
    "ما هي شروط الطلاق الرجعي؟",
    "كيف يتم حساب التعويضات في الحوادث؟",
    "ما هي إجراءات رفع الدعوى؟",
    "كيف يمكن حماية العلامة التجارية؟"
  ];

  const handleSendMessage = async () => {
    if (!inputMessage.trim()) return;

    const userMessage: Message = {
      id: `msg-${Date.now()}`,
      content: inputMessage,
      isUser: true,
      timestamp: new Date(),
      type: 'text'
    };

    setMessages(prev => [...prev, userMessage]);
    setInputMessage('');
    setIsTyping(true);

    // Simulate AI response
    setTimeout(() => {
      const aiResponse: Message = {
        id: `msg-${Date.now() + 1}`,
        content: generateAIResponse(inputMessage),
        isUser: false,
        timestamp: new Date(),
        type: 'text'
      };
      setMessages(prev => [...prev, aiResponse]);
      setIsTyping(false);
    }, 2000);
  };

  const generateAIResponse = (question: string): string => {
    const responses = [
      "بناءً على القانون السعودي، يمكنني مساعدتك في هذا الموضوع. دعني أقدم لك الإجابة التفصيلية...",
      "هذا سؤال مهم في القانون السعودي. وفقاً للنظام المعمول به...",
      "أرى أنك تبحث عن معلومات في مجال قانوني محدد. دعني أشرح لك التفاصيل...",
      "هذا الموضوع منصوص عليه في النظام السعودي. إليك الشرح التفصيلي...",
      "بناءً على أحدث التعديلات في القانون السعودي، الإجابة هي..."
    ];
    return responses[Math.floor(Math.random() * responses.length)];
  };

  const createNewChat = () => {
    if (!newChatTitle.trim()) return;

    const newChat: Conversation = {
      id: `conv-${Date.now()}`,
      title: newChatTitle,
      lastMessage: "محادثة جديدة",
      timestamp: new Date(),
      messageCount: 0,
      tags: []
    };

    setConversations(prev => [newChat, ...prev]);
    setCurrentConversation(newChat.id);
    setMessages([{
      id: "msg-1",
      content: "مرحباً! أنا المساعد الذكي لمنصة عدالة. كيف يمكنني مساعدتك اليوم؟",
      isUser: false,
      timestamp: new Date(),
      type: 'text'
    }]);
    setShowNewChatModal(false);
    setNewChatTitle('');
  };

  const deleteConversation = (id: string) => {
    if (confirm('هل أنت متأكد من حذف هذه المحادثة؟')) {
      setConversations(prev => prev.filter(conv => conv.id !== id));
      if (currentConversation === id) {
        setCurrentConversation(null);
        setMessages([{
          id: "msg-1",
          content: "مرحباً! أنا المساعد الذكي لمنصة عدالة. كيف يمكنني مساعدتك اليوم؟",
          isUser: false,
          timestamp: new Date(),
          type: 'text'
        }]);
      }
    }
  };

  const formatTime = (date: Date) => {
    const now = new Date();
    const diff = now.getTime() - date.getTime();
    const hours = Math.floor(diff / (1000 * 60 * 60));
    const days = Math.floor(hours / 24);

    if (days > 0) return `${days} يوم`;
    if (hours > 0) return `${hours} ساعة`;
    return 'الآن';
  };

  return (
    <div className="space-y-12">
      {/* Hero Section */}
      <div className="relative text-center space-y-8">
        {/* Decorative Shapes */}
        <div className="absolute top-0 left-0 w-32 h-32 bg-gradient-to-br from-green-200 to-green-300 rounded-full opacity-20 blur-3xl"></div>
        <div className="absolute top-20 right-0 w-24 h-24 bg-gradient-to-br from-green-300 to-green-400 rounded-full opacity-20 blur-2xl"></div>
        <div className="absolute bottom-0 left-1/4 w-20 h-20 bg-gradient-to-br from-green-400 to-green-500 rounded-full opacity-20 blur-xl"></div>
        
        <div className="relative z-10">
          <h1 className="text-5xl md:text-6xl font-bold text-gray-900 dark:text-white mb-6">
            المساعد الذكي
            <span className="block text-4xl md:text-5xl text-green-600 dark:text-green-400 mt-2">
              استشارات قانونية ذكية ومتقدمة
            </span>
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto leading-relaxed">
            مساعد ذكي متقدم يستخدم تقنيات الذكاء الاصطناعي لتقديم استشارات قانونية دقيقة ومفصلة
          </p>
        </div>
      </div>

      {/* AI Features */}
      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
        {aiFeatures.map((feature, index) => (
          <div
            key={index}
            className="group relative bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-soft border border-gray-200 dark:border-gray-700 hover:shadow-medium transition-all duration-300 transform hover:-translate-y-2"
          >
            {/* Decorative Corner */}
            <div className={`absolute top-0 right-0 w-16 h-16 bg-gradient-to-br ${feature.color} rounded-bl-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300`}></div>
            
            <div className="relative z-10">
              <div className={`w-16 h-16 bg-gradient-to-br ${feature.color} rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300`}>
                <div className="text-white">
                  {feature.icon}
                </div>
              </div>
              
              <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-3">
                {feature.title}
              </h3>
              
              <p className="text-gray-600 dark:text-gray-300 text-sm leading-relaxed">
                {feature.description}
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* Quick Actions */}
      <div className="flex flex-wrap gap-4 justify-center">
        <button 
          onClick={() => setShowNewChatModal(true)}
          className="btn-primary flex items-center space-x-2 space-x-reverse text-lg px-8 py-4"
        >
          <Plus className="h-6 w-6" />
          <span>محادثة جديدة</span>
        </button>
        <button className="btn-secondary flex items-center space-x-2 space-x-reverse text-lg px-8 py-4">
          <BookOpen className="h-6 w-6" />
          <span>المحادثات السابقة</span>
        </button>
        <button className="btn-outline flex items-center space-x-2 space-x-reverse text-lg px-8 py-4">
          <TrendingUp className="h-6 w-6" />
          <span>التقارير والإحصائيات</span>
        </button>
      </div>

      {/* Quick Questions */}
      <div className="bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-soft border border-gray-200 dark:border-gray-700">
        <div className="text-center mb-8">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
            أسئلة سريعة
          </h2>
          <p className="text-gray-600 dark:text-gray-300">
            اختر من هذه الأسئلة الشائعة أو اطرح سؤالك الخاص
          </p>
        </div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
          {quickQuestions.map((question, index) => (
            <button
              key={index}
              onClick={() => setInputMessage(question)}
              className="p-4 text-right bg-gray-50 dark:bg-gray-700 rounded-xl hover:bg-gray-100 dark:hover:bg-gray-600 transition-colors duration-200 text-sm text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white"
            >
              {question}
            </button>
          ))}
        </div>
      </div>

      {/* Chat Interface */}
      <div className="grid lg:grid-cols-4 gap-6">
        {/* Conversations Sidebar */}
        <div className="lg:col-span-1 space-y-4">
          <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-soft border border-gray-200 dark:border-gray-700">
            <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-4">المحادثات</h3>
            <div className="space-y-3">
              {conversations.map((conv) => (
                <div
                  key={conv.id}
                  className={`p-3 rounded-lg cursor-pointer transition-all duration-200 ${
                    currentConversation === conv.id
                      ? 'bg-green-100 dark:bg-green-900/20 border border-green-200 dark:border-green-800'
                      : 'hover:bg-gray-50 dark:hover:bg-gray-700'
                  }`}
                  onClick={() => setCurrentConversation(conv.id)}
                >
                  <div className="flex items-center justify-between mb-2">
                    <h4 className="font-medium text-gray-900 dark:text-white text-sm truncate">
                      {conv.title}
                    </h4>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        deleteConversation(conv.id);
                      }}
                      className="text-gray-400 hover:text-red-500 transition-colors duration-200"
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </div>
                  <p className="text-xs text-gray-500 dark:text-gray-400 truncate mb-2">
                    {conv.lastMessage}
                  </p>
                  <div className="flex items-center justify-between text-xs text-gray-400 dark:text-gray-500">
                    <span>{formatTime(conv.timestamp)}</span>
                    <span>{conv.messageCount} رسالة</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Chat Area */}
        <div className="lg:col-span-3 bg-white dark:bg-gray-800 rounded-2xl shadow-soft border border-gray-200 dark:border-gray-700">
          <div className="flex flex-col h-96">
            {/* Chat Header */}
            <div className="p-4 border-b border-gray-200 dark:border-gray-700">
              <div className="flex items-center space-x-3 space-x-reverse">
                <div className="w-10 h-10 bg-gradient-to-br from-green-500 to-green-600 rounded-xl flex items-center justify-center">
                  <Bot className="h-6 w-6 text-white" />
                </div>
                <div>
                  <h3 className="font-bold text-gray-900 dark:text-white">المساعد الذكي</h3>
                  <p className="text-sm text-gray-500 dark:text-gray-400">متصل الآن</p>
                </div>
              </div>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4">
              {messages.map((message) => (
                <div
                  key={message.id}
                  className={`flex ${message.isUser ? 'justify-start' : 'justify-end'}`}
                >
                  <div
                    className={`max-w-xs lg:max-w-md p-3 rounded-2xl ${
                      message.isUser
                        ? 'bg-green-500 text-white'
                        : 'bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-white'
                    }`}
                  >
                    <p className="text-sm">{message.content}</p>
                    <p className={`text-xs mt-2 ${
                      message.isUser ? 'text-green-100' : 'text-gray-500 dark:text-gray-400'
                    }`}>
                      {message.timestamp.toLocaleTimeString('ar-SA', { hour: '2-digit', minute: '2-digit' })}
                    </p>
                  </div>
                </div>
              ))}
              
              {isTyping && (
                <div className="flex justify-end">
                  <div className="bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-white max-w-xs lg:max-w-md p-3 rounded-2xl">
                    <div className="flex items-center space-x-2 space-x-reverse">
                      <div className="flex space-x-1 space-x-reverse">
                        <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                        <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                        <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                      </div>
                      <span className="text-sm text-gray-500 dark:text-gray-400">يكتب...</span>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Input Area */}
            <div className="p-4 border-t border-gray-200 dark:border-gray-700">
              <div className="flex space-x-3 space-x-reverse">
                <input
                  type="text"
                  placeholder="اكتب رسالتك هنا..."
                  className="flex-1 px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 transition-all duration-200"
                  value={inputMessage}
                  onChange={(e) => setInputMessage(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                />
                <button
                  onClick={handleSendMessage}
                  disabled={!inputMessage.trim()}
                  className="px-6 py-3 bg-green-500 hover:bg-green-600 disabled:bg-gray-300 disabled:cursor-not-allowed text-white rounded-xl transition-colors duration-200 flex items-center justify-center"
                >
                  <Send className="h-5 w-5" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* New Chat Modal */}
      {showNewChatModal && (
        <div className="modal-overlay">
          <div className="modal-content p-8 max-w-md">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white">محادثة جديدة</h3>
              <button
                onClick={() => setShowNewChatModal(false)}
                className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
              >
                <X className="h-6 w-6" />
              </button>
            </div>
            
            <div className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  عنوان المحادثة
                </label>
                <input
                  type="text"
                  placeholder="مثال: استشارة في قانون العمل"
                  className="input-field"
                  value={newChatTitle}
                  onChange={(e) => setNewChatTitle(e.target.value)}
                />
              </div>
              
              <div className="flex justify-end space-x-3 space-x-reverse">
                <button
                  onClick={() => setShowNewChatModal(false)}
                  className="btn-secondary"
                >
                  إلغاء
                </button>
                <button
                  onClick={createNewChat}
                  disabled={!newChatTitle.trim()}
                  className="btn-primary disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  إنشاء المحادثة
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AISection; 