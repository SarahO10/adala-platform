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
  Download,
  Mic,
  FileEdit,
  FileText as FileTextIcon,
  Play,
  Pause,
  Square
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

interface Draft {
  id: string;
  title: string;
  content: string;
  createdAt: Date;
  updatedAt: Date;
  tags: string[];
}

interface Summary {
  id: string;
  title: string;
  content: string;
  originalText: string;
  createdAt: Date;
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

  const [drafts, setDrafts] = useState<Draft[]>([
    {
      id: "draft-1",
      title: "مذكرة دفاع - قضية تجارية",
      content: "بناءً على ما تقدم، فإن المدعى عليه قد أخل بالتزاماته التعاقدية...",
      createdAt: new Date(Date.now() - 2 * 60 * 60 * 1000),
      updatedAt: new Date(Date.now() - 1 * 60 * 60 * 1000),
      tags: ["دفاع", "تجاري", "مذكرة"]
    },
    {
      id: "draft-2",
      title: "لائحة دعوى - تعويضات",
      content: "نحن المدعي فلان بن فلان، نرفع لائحة دعوانا إلى المحكمة...",
      createdAt: new Date(Date.now() - 24 * 60 * 60 * 1000),
      updatedAt: new Date(Date.now() - 12 * 60 * 60 * 1000),
      tags: ["دعوى", "تعويضات", "لائحة"]
    }
  ]);

  const [summaries, setSummaries] = useState<Summary[]>([
    {
      id: "summary-1",
      title: "ملخص جلسة قضية تجارية",
      content: "تم مناقشة النقاط التالية: 1. إثبات العقد 2. تحديد الالتزامات 3. تقييم المخالفات...",
      originalText: "في الجلسة الأولى، تحدث المحامي عن العقد وقال إن المدعى عليه أخل بالتزاماته...",
      createdAt: new Date(Date.now() - 3 * 60 * 60 * 1000),
      tags: ["جلسة", "تجاري", "ملخص"]
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
  const [showNewDraftModal, setShowNewDraftModal] = useState(false);
  const [showNewSummaryModal, setShowNewSummaryModal] = useState(false);
  const [newChatTitle, setNewChatTitle] = useState('');
  const [newDraftTitle, setNewDraftTitle] = useState('');
  const [newDraftContent, setNewDraftContent] = useState('');
  const [newSummaryTitle, setNewSummaryTitle] = useState('');
  const [newSummaryContent, setNewSummaryContent] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [isRecording, setIsRecording] = useState(false);
  const [activeTab, setActiveTab] = useState<'chat' | 'drafts' | 'summaries'>('chat');

  const aiFeatures = [
    {
      icon: <MessageSquare className="h-8 w-8" />,
      title: "استشارات قانونية",
      description: "إجابات فورية على الاستفسارات القانونية",
      color: 'from-green-700 to-green-800'
    },
    {
      icon: <Mic className="h-8 w-8" />,
      title: "تسجيل الجلسات",
      description: "تسجيل وتحويل الجلسات إلى نص قابل للتحرير",
      color: 'from-green-700 to-green-800'
    },
    {
      icon: <FileEdit className="h-8 w-8" />,
      title: "مسودات ذكية",
      description: "إنشاء وتحرير المسودات القانونية",
      color: 'from-green-700 to-green-800'
    },
    {
      icon: <FileTextIcon className="h-8 w-8" />,
      title: "ملخصات تلقائية",
      description: "تلخيص النصوص القانونية الطويلة",
      color: 'from-green-700 to-green-800'
    }
  ];

  const quickQuestions = [
    "ما هي حقوق العامل في حالة إنهاء الخدمة؟",
    "كيف يمكن إثبات مخالفة العقد؟",
    "ما هي شروط الطلاق الرجعي؟",
    "كيف يتم حساب التعويضات؟",
    "ما هي إجراءات الطعن على الحكم؟"
  ];

  const handleSendMessage = async () => {
    if (!inputMessage.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
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
      const aiMessage: Message = {
        id: (Date.now() + 1).toString(),
        content: `شكراً لسؤالك. هذا رد من المساعد الذكي على: "${inputMessage}"`,
        isUser: false,
        timestamp: new Date(),
        type: 'text'
      };
      setMessages(prev => [...prev, aiMessage]);
      setIsTyping(false);
    }, 2000);
  };

  const createNewDraft = () => {
    if (newDraftTitle.trim() && newDraftContent.trim()) {
      const draft: Draft = {
        id: `draft-${Date.now()}`,
        title: newDraftTitle,
        content: newDraftContent,
        createdAt: new Date(),
        updatedAt: new Date(),
        tags: []
      };
      setDrafts(prev => [...prev, draft]);
      setNewDraftTitle('');
      setNewDraftContent('');
      setShowNewDraftModal(false);
    }
  };

  const createNewSummary = () => {
    if (newSummaryTitle.trim() && newSummaryContent.trim()) {
      const summary: Summary = {
        id: `summary-${Date.now()}`,
        title: newSummaryTitle,
        content: newSummaryContent,
        originalText: newSummaryContent,
        createdAt: new Date(),
        tags: []
      };
      setSummaries(prev => [...prev, summary]);
      setNewSummaryTitle('');
      setNewSummaryContent('');
      setShowNewSummaryModal(false);
    }
  };

  const toggleRecording = () => {
    setIsRecording(!isRecording);
    // Here you would implement actual recording functionality
  };

  const deleteDraft = (id: string) => {
    setDrafts(prev => prev.filter(d => d.id !== id));
  };

  const deleteSummary = (id: string) => {
    setSummaries(prev => prev.filter(s => s.id !== id));
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
            <span className="block text-4xl md:text-5xl text-green-700 dark:text-green-300 mt-2">
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
              <div className="w-16 h-16 bg-gradient-to-br from-green-100 to-green-200 dark:from-green-800 dark:to-green-900 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                <div className="text-green-700 dark:text-green-300">
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
                        // This will be implemented later for conversation deletion
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
            {/* Tabs */}
            <div className="flex border-b border-gray-200 dark:border-gray-700">
              <button
                onClick={() => setActiveTab('chat')}
                className={`flex-1 px-4 py-3 text-sm font-medium transition-colors duration-200 ${
                  activeTab === 'chat'
                    ? 'text-green-600 border-b-2 border-green-600 dark:text-green-400 dark:border-green-400'
                    : 'text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300'
                }`}
              >
                المحادثة
              </button>
              <button
                onClick={() => setActiveTab('drafts')}
                className={`flex-1 px-4 py-3 text-sm font-medium transition-colors duration-200 ${
                  activeTab === 'drafts'
                    ? 'text-green-600 border-b-2 border-green-600 dark:text-green-400 dark:border-green-400'
                    : 'text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300'
                }`}
              >
                المسودات
              </button>
              <button
                onClick={() => setActiveTab('summaries')}
                className={`flex-1 px-4 py-3 text-sm font-medium transition-colors duration-200 ${
                  activeTab === 'summaries'
                    ? 'text-green-600 border-b-2 border-green-600 dark:text-green-400 dark:border-green-400'
                    : 'text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300'
                }`}
              >
                الملخصات
              </button>
                      </div>

            {/* Chat Header */}
            <div className="p-4 border-b border-gray-200 dark:border-gray-700">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3 space-x-reverse">
                  <div className="w-10 h-10 bg-gradient-to-br from-green-700 to-green-800 rounded-xl flex items-center justify-center">
                    <Bot className="h-6 w-6 text-white" />
                  </div>
                  <div>
                    <h3 className="font-bold text-gray-900 dark:text-white">المساعد الذكي</h3>
                    <p className="text-sm text-gray-500 dark:text-gray-400">متصل الآن</p>
                  </div>
                </div>
                <div className="flex space-x-2 space-x-reverse">
                  <button
                    onClick={() => setShowNewDraftModal(true)}
                    className="px-4 py-2 bg-green-700 hover:bg-green-800 text-white rounded-lg transition-colors duration-200 flex items-center space-x-2 space-x-reverse text-sm"
                  >
                    <FileEdit className="h-4 w-4" />
                    <span>مسودة</span>
                  </button>
                  <button
                    onClick={() => setShowNewSummaryModal(true)}
                    className="px-4 py-2 bg-green-700 hover:bg-green-800 text-white rounded-lg transition-colors duration-200 flex items-center space-x-2 space-x-reverse text-sm"
                  >
                    <FileTextIcon className="h-4 w-4" />
                    <span>ملخص</span>
                  </button>
                </div>
                    </div>
                  </div>
                  
            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4">
              {messages.map((message) => (
                <div
                  key={message.id}
                  className={`flex ${message.isUser ? 'justify-end' : 'justify-start'} mb-4`}
                >
                  <div
                    className={`max-w-xs lg:max-w-md px-4 py-3 rounded-2xl ${
                      message.isUser
                        ? 'bg-green-700 text-white'
                        : 'bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-white'
                    }`}
                  >
                    <p className="text-sm">{message.content}</p>
                    <p className="text-xs opacity-70 mt-2 text-right">
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
                <button
                  onClick={toggleRecording}
                  className={`px-4 py-3 rounded-xl transition-colors duration-200 flex items-center justify-center ${
                    isRecording
                      ? 'bg-red-600 hover:bg-red-700 text-white'
                      : 'bg-gray-200 hover:bg-gray-300 dark:bg-gray-700 dark:hover:bg-gray-600 text-gray-700 dark:text-gray-300'
                  }`}
                  title={isRecording ? 'إيقاف التسجيل' : 'بدء تسجيل الجلسة'}
                >
                  {isRecording ? <Square className="h-5 w-5" /> : <Mic className="h-5 w-5" />}
                </button>
              <input
                type="text"
                  placeholder="اكتب رسالتك هنا..."
                  className="flex-1 px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-green-700 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 transition-all duration-200"
                  value={inputMessage}
                  onChange={(e) => setInputMessage(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                />
                <button
                  onClick={handleSendMessage}
                  disabled={!inputMessage.trim()}
                  className="px-6 py-3 bg-green-700 hover:bg-green-800 disabled:bg-gray-300 disabled:cursor-not-allowed text-white rounded-xl transition-colors duration-200 flex items-center justify-center"
                >
                <Send className="h-5 w-5" />
              </button>
              </div>
              {isRecording && (
                <div className="mt-3 text-center">
                  <div className="inline-flex items-center space-x-2 space-x-reverse text-red-600 dark:text-red-400">
                    <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse"></div>
                    <span className="text-sm font-medium">جاري التسجيل...</span>
                  </div>
                </div>
              )}
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
                  onClick={() => {
                    // This will be implemented later for creating new chat
                  }}
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

      {/* New Draft Modal */}
      {showNewDraftModal && (
        <div className="modal-overlay">
          <div className="modal-content p-8 max-w-md">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white">مسودة جديدة</h3>
              <button
                onClick={() => setShowNewDraftModal(false)}
                className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
              >
                <X className="h-6 w-6" />
              </button>
        </div>

          <div className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  عنوان المسودة
                </label>
                <input
                  type="text"
                  placeholder="مثال: مذكرة دفاع"
                  className="input-field"
                  value={newDraftTitle}
                  onChange={(e) => setNewDraftTitle(e.target.value)}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  محتوى المسودة
                </label>
                <textarea
                  placeholder="اكتب محتوى المسودة هنا..."
                  className="input-field"
                  rows={10}
                  value={newDraftContent}
                  onChange={(e) => setNewDraftContent(e.target.value)}
                />
            </div>

              <div className="flex justify-end space-x-3 space-x-reverse">
                <button
                  onClick={() => setShowNewDraftModal(false)}
                  className="btn-secondary"
                >
                  إلغاء
                </button>
                <button
                  onClick={createNewDraft}
                  disabled={!newDraftTitle.trim() || !newDraftContent.trim()}
                  className="btn-primary disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  إنشاء المسودة
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* New Summary Modal */}
      {showNewSummaryModal && (
        <div className="modal-overlay">
          <div className="modal-content p-8 max-w-md">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white">ملخص جديد</h3>
              <button
                onClick={() => setShowNewSummaryModal(false)}
                className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
              >
                <X className="h-6 w-6" />
              </button>
      </div>

      <div className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  عنوان الملخص
                </label>
                <input
                  type="text"
                  placeholder="مثال: ملخص جلسة قضية"
                  className="input-field"
                  value={newSummaryTitle}
                  onChange={(e) => setNewSummaryTitle(e.target.value)}
                />
        </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  محتوى الملخص
                </label>
                <textarea
                  placeholder="اكتب محتوى الملخص هنا..."
                  className="input-field"
                  rows={10}
                  value={newSummaryContent}
                  onChange={(e) => setNewSummaryContent(e.target.value)}
                />
          </div>

              <div className="flex justify-end space-x-3 space-x-reverse">
                <button
                  onClick={() => setShowNewSummaryModal(false)}
                  className="btn-secondary"
                >
                  إلغاء
            </button>
                <button
                  onClick={createNewSummary}
                  disabled={!newSummaryTitle.trim() || !newSummaryContent.trim()}
                  className="btn-primary disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  إنشاء الملخص
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