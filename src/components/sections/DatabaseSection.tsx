import React, { useState } from 'react';
import { 
  Database, 
  Search, 
  Filter, 
  Bookmark, 
  Download, 
  Share, 
  Eye,
  FileText,
  BookOpen,
  Scale,
  Gavel,
  Users,
  Calendar,
  TrendingUp,
  Shield,
  Zap,
  Star,
  Clock,
  Tag,
  Plus,
  X
} from 'lucide-react';

interface Document {
  id: string;
  title: string;
  category: string;
  type: string;
  description: string;
  author: string;
  publishDate: string;
  views: number;
  downloads: number;
  tags: string[];
  isBookmarked: boolean;
}

const DatabaseSection: React.FC = () => {
  const [documents, setDocuments] = useState<Document[]>([
    {
      id: "DOC-001",
      title: "نظام الإجراءات الجزائية السعودي",
      category: "قوانين جنائية",
      type: "قانون",
      description: "النظام الأساسي للإجراءات الجزائية في المملكة العربية السعودية",
      author: "وزارة العدل",
      publishDate: "2024-01-15",
      views: 1250,
      downloads: 340,
      tags: ["جنائي", "إجراءات", "قانون"],
      isBookmarked: false
    },
    {
      id: "DOC-002",
      title: "نظام العمل والعمال السعودي",
      category: "قوانين عمالية",
      type: "قانون",
      description: "النظام المنظم لعلاقات العمل والعمال في المملكة",
      author: "وزارة العمل",
      publishDate: "2024-01-10",
      views: 890,
      downloads: 210,
      tags: ["عمالي", "عمل", "حقوق"],
      isBookmarked: true
    },
    {
      id: "DOC-003",
      title: "نظام الشركات السعودي",
      category: "قوانين تجارية",
      type: "قانون",
      description: "النظام المنظم للشركات والتجارة في المملكة",
      author: "وزارة التجارة",
      publishDate: "2024-01-05",
      views: 1560,
      downloads: 420,
      tags: ["تجاري", "شركات", "استثمار"],
      isBookmarked: false
    },
    {
      id: "DOC-004",
      title: "أحكام الطلاق في الشريعة الإسلامية",
      category: "أحوال شخصية",
      type: "فتوى",
      description: "مجموعة من الفتاوى المتعلقة بأحكام الطلاق",
      author: "هيئة كبار العلماء",
      publishDate: "2024-01-20",
      views: 720,
      downloads: 180,
      tags: ["أحوال شخصية", "طلاق", "شريعة"],
      isBookmarked: false
    },
    {
      id: "DOC-005",
      title: "قانون الإيجار الجديد",
      category: "قوانين مدنية",
      type: "قانون",
      description: "التعديلات الجديدة على قانون الإيجار",
      author: "وزارة الإسكان",
      publishDate: "2024-01-25",
      views: 980,
      downloads: 250,
      tags: ["مدني", "إيجار", "عقارات"],
      isBookmarked: true
    }
  ]);

  const [searchTerm, setSearchTerm] = useState('');
  const [filterCategory, setFilterCategory] = useState('الكل');
  const [filterType, setFilterType] = useState('الكل');
  const [showDocumentModal, setShowDocumentModal] = useState(false);
  const [selectedDocument, setSelectedDocument] = useState<Document | null>(null);

  const categories = ['الكل', 'قوانين جنائية', 'قوانين عمالية', 'قوانين تجارية', 'أحوال شخصية', 'قوانين مدنية', 'قوانين إدارية'];
  const types = ['الكل', 'قانون', 'فتوى', 'قرار', 'تعميم', 'مذكرة'];

  // Helper functions
  const getDocumentTypeColor = (type: string) => {
    switch (type) {
      case 'قانون': return 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200';
      case 'لائحة': return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200';
      case 'فتوى': return 'bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200';
      case 'حكم': return 'bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-200';
      default: return 'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200';
    }
  };

  const downloadDocument = (id: string) => {
    // Handle document download
    console.log('Downloading document:', id);
  };

  const shareDocument = (id: string) => {
    // Handle document sharing
    console.log('Sharing document:', id);
  };

  const bookmarkDocument = (id: string) => {
    // Handle document bookmarking
    toggleBookmark(id);
  };

  const filteredDocuments = documents.filter(doc => {
    const matchesSearch = doc.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         doc.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = filterCategory === '' || doc.category === filterCategory;
    const matchesType = filterType === '' || doc.type === filterType;
    return matchesSearch && matchesCategory && matchesType;
  });

  const toggleBookmark = (id: string) => {
    setDocuments(docs => docs.map(doc => 
      doc.id === id ? { ...doc, isBookmarked: !doc.isBookmarked } : doc
    ));
  };

  const handleDocumentClick = (doc: Document) => {
    setSelectedDocument(doc);
    setShowDocumentModal(true);
  };

  const totalDocuments = documents.length;
  const totalViews = documents.reduce((sum, doc) => sum + doc.views, 0);
  const totalDownloads = documents.reduce((sum, doc) => sum + doc.downloads, 0);
  const bookmarkedCount = documents.filter(doc => doc.isBookmarked).length;

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
            قاعدة البيانات القانونية
            <span className="block text-4xl md:text-5xl text-green-700 dark:text-green-300 mt-2">
              مكتبة شاملة للقوانين واللوائح السعودية
            </span>
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto leading-relaxed">
            منصة متكاملة تحتوي على جميع القوانين واللوائح والفتاوى القانونية مع محرك بحث متقدم
          </p>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="flex flex-wrap gap-4 justify-center">
        <button className="btn-primary flex items-center space-x-2 space-x-reverse text-lg px-8 py-4">
          <Plus className="h-6 w-6" />
          <span>إضافة وثيقة جديدة</span>
        </button>
        <button className="btn-secondary flex items-center space-x-2 space-x-reverse text-lg px-8 py-4">
          <TrendingUp className="h-6 w-6" />
          <span>التقارير والإحصائيات</span>
        </button>
        <button className="btn-outline flex items-center space-x-2 space-x-reverse text-lg px-8 py-4">
          <BookOpen className="h-6 w-6" />
          <span>المجلدات الشخصية</span>
        </button>
      </div>

      {/* Statistics Cards */}
      <div className="grid md:grid-cols-4 gap-6">
        <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-soft border border-gray-200 dark:border-gray-700">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600 dark:text-gray-400">إجمالي الوثائق</p>
              <p className="text-3xl font-bold text-gray-900 dark:text-white">{totalDocuments}</p>
            </div>
            <div className="w-12 h-12 bg-gradient-to-br from-green-100 to-green-200 dark:from-green-800 dark:to-green-900 rounded-xl flex items-center justify-center">
              <Database className="h-6 w-6 text-green-600 dark:text-green-400" />
            </div>
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-soft border border-gray-200 dark:border-gray-700">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600 dark:text-gray-400">إجمالي المشاهدات</p>
              <p className="text-3xl font-bold text-green-700 dark:text-green-300">{totalViews.toLocaleString()}</p>
            </div>
            <div className="w-12 h-12 bg-gradient-to-br from-green-100 to-green-200 dark:from-green-800 dark:to-green-900 rounded-xl flex items-center justify-center">
              <Eye className="h-6 w-6 text-green-700 dark:text-green-300" />
            </div>
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-soft border border-gray-200 dark:border-gray-700">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600 dark:text-gray-400">إجمالي التحميلات</p>
              <p className="text-3xl font-bold text-green-700 dark:text-green-300">{totalDownloads.toLocaleString()}</p>
            </div>
            <div className="w-12 h-12 bg-gradient-to-br from-green-100 to-green-200 dark:from-green-800 dark:to-green-900 rounded-xl flex items-center justify-center">
              <Download className="h-6 w-6 text-green-700 dark:text-green-300" />
            </div>
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-soft border border-gray-200 dark:border-gray-700">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600 dark:text-gray-400">المحفوظات</p>
              <p className="text-3xl font-bold text-green-700 dark:text-green-300">{bookmarkedCount}</p>
            </div>
            <div className="w-12 h-12 bg-gradient-to-br from-green-100 to-green-200 dark:from-green-800 dark:to-green-900 rounded-xl flex items-center justify-center">
              <Bookmark className="h-6 w-6 text-green-700 dark:text-green-300" />
            </div>
          </div>
        </div>
      </div>

      {/* Search and Filter */}
      <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-soft border border-gray-200 dark:border-gray-700">
        <div className="flex flex-wrap gap-4 items-center">
          <div className="relative flex-1 min-w-64">
            <Search className="h-5 w-5 absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 dark:text-gray-500" />
            <input
              type="text"
              placeholder="البحث في الوثائق..."
              className="w-full pl-10 pr-4 py-3 border border-gray-300 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 transition-all duration-200"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          
          <select
            className="px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
            value={filterCategory}
            onChange={(e) => setFilterCategory(e.target.value)}
          >
            {categories.map(category => (
              <option key={category} value={category}>{category}</option>
            ))}
          </select>
          
          <select
            className="px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
            value={filterType}
            onChange={(e) => setFilterType(e.target.value)}
          >
            {types.map(type => (
              <option key={type} value={type}>{type}</option>
            ))}
          </select>
        </div>
      </div>

      {/* Documents Grid */}
      <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-soft border border-gray-200 dark:border-gray-700 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full min-w-[700px]">
            <thead className="bg-gray-50 dark:bg-gray-700">
              <tr>
                <th className="px-3 sm:px-6 py-3 sm:py-4 text-right text-xs sm:text-sm font-semibold text-gray-700 dark:text-gray-300 whitespace-nowrap">اسم الوثيقة</th>
                <th className="px-3 sm:px-6 py-3 sm:py-4 text-right text-xs sm:text-sm font-semibold text-gray-700 dark:text-gray-300 whitespace-nowrap">النوع</th>
                <th className="px-3 sm:px-6 py-3 sm:py-4 text-right text-xs sm:text-sm font-semibold text-gray-700 dark:text-gray-300 whitespace-nowrap">التاريخ</th>
                <th className="px-3 sm:px-6 py-3 sm:py-4 text-right text-xs sm:text-sm font-semibold text-gray-700 dark:text-gray-300 whitespace-nowrap">الحجم</th>
                <th className="px-3 sm:px-6 py-3 sm:py-4 text-right text-xs sm:text-sm font-semibold text-gray-700 dark:text-gray-300 whitespace-nowrap">المشاهدات</th>
                <th className="px-3 sm:px-6 py-3 sm:py-4 text-right text-xs sm:text-sm font-semibold text-gray-700 dark:text-gray-300 whitespace-nowrap">الإجراءات</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
              {filteredDocuments.map((doc) => (
                <tr key={doc.id} className="hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors duration-200">
                  <td className="px-3 sm:px-6 py-3 sm:py-4">
                    <div className="flex items-center space-x-3 space-x-reverse">
                      <div className="w-8 h-8 bg-gradient-to-br from-green-100 to-green-200 dark:from-green-800 dark:to-green-900 rounded-lg flex items-center justify-center">
                        <FileText className="h-4 w-4 text-green-700 dark:text-green-300" />
                      </div>
                      <div>
                        <div className="text-xs sm:text-sm font-medium text-gray-900 dark:text-white">{doc.title}</div>
                        <div className="text-xs text-gray-500 dark:text-gray-400">{doc.description}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-3 sm:px-6 py-3 sm:py-4">
                    <span className={`inline-flex px-2 sm:px-3 py-1 text-xs font-medium rounded-full ${getDocumentTypeColor(doc.type)}`}>
                      {doc.type}
                    </span>
                  </td>
                  <td className="px-3 sm:px-6 py-3 sm:py-4 text-xs sm:text-sm text-gray-900 dark:text-white">{doc.publishDate}</td>
                  <td className="px-3 sm:px-6 py-3 sm:py-4 text-xs sm:text-sm text-gray-900 dark:text-white">{doc.downloads.toLocaleString()}</td>
                  <td className="px-3 sm:px-6 py-3 sm:py-4 text-xs sm:text-sm text-gray-900 dark:text-white">{doc.views.toLocaleString()}</td>
                  <td className="px-3 sm:px-6 py-3 sm:py-4 text-xs sm:text-sm font-medium">
                    <div className="flex items-center space-x-1 sm:space-x-2 space-x-reverse">
                      <button 
                        className="text-green-600 hover:text-green-900 dark:text-green-400 dark:hover:text-green-300 p-1"
                        onClick={() => downloadDocument(doc.id)}
                      >
                        <Download className="h-4 w-4" />
                      </button>
                      <button 
                        className="text-blue-600 hover:text-blue-900 dark:text-blue-400 dark:hover:text-blue-300 p-1"
                        onClick={() => shareDocument(doc.id)}
                      >
                        <Share className="h-4 w-4" />
                      </button>
                      <button 
                        className="text-purple-600 hover:text-purple-900 dark:text-purple-400 dark:hover:text-purple-300 p-1"
                        onClick={() => bookmarkDocument(doc.id)}
                      >
                        <Bookmark className="h-4 w-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Document Modal */}
      {showDocumentModal && selectedDocument && (
        <div className="modal-overlay">
          <div className="modal-content p-8 max-w-4xl">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white">تفاصيل الوثيقة</h3>
              <button
                onClick={() => setShowDocumentModal(false)}
                className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
              >
                <X className="h-6 w-6" />
              </button>
            </div>
            
            <div className="space-y-6">
              <div className="bg-gray-50 dark:bg-gray-700 rounded-xl p-6">
                <h4 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
                  {selectedDocument.title}
                </h4>
                <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                  {selectedDocument.description}
                </p>
              </div>
              
              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-gray-500 dark:text-gray-400">رقم الوثيقة:</span>
                    <span className="font-medium text-gray-900 dark:text-white">{selectedDocument.id}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-gray-500 dark:text-gray-400">التصنيف:</span>
                    <span className="font-medium text-gray-900 dark:text-white">{selectedDocument.category}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-gray-500 dark:text-gray-400">النوع:</span>
                    <span className="font-medium text-gray-900 dark:text-white">{selectedDocument.type}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-gray-500 dark:text-gray-400">المؤلف:</span>
                    <span className="font-medium text-gray-900 dark:text-white">{selectedDocument.author}</span>
                  </div>
                </div>
                
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-gray-500 dark:text-gray-400">تاريخ النشر:</span>
                    <span className="font-medium text-gray-900 dark:text-white">{selectedDocument.publishDate}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-gray-500 dark:text-gray-400">المشاهدات:</span>
                    <span className="font-medium text-gray-900 dark:text-white">{selectedDocument.views.toLocaleString()}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-gray-500 dark:text-gray-400">التحميلات:</span>
                    <span className="font-medium text-gray-900 dark:text-white">{selectedDocument.downloads.toLocaleString()}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-gray-500 dark:text-gray-400">الحالة:</span>
                    <span className="font-medium text-green-600 dark:text-green-400">متاح</span>
                  </div>
                </div>
              </div>
              
              <div className="flex flex-wrap gap-2">
                {selectedDocument.tags.map((tag, index) => (
                  <span
                    key={index}
                    className="px-3 py-2 bg-green-100 dark:bg-green-900/20 text-green-700 dark:text-green-300 rounded-lg text-sm font-medium"
                  >
                    {tag}
                  </span>
                ))}
              </div>
              
              <div className="flex justify-end space-x-3 space-x-reverse pt-6 border-t border-gray-200 dark:border-gray-700">
                <button
                  onClick={() => toggleBookmark(selectedDocument.id)}
                  className={`btn-secondary flex items-center space-x-2 space-x-reverse ${
                    selectedDocument.isBookmarked ? 'bg-yellow-100 text-yellow-700 dark:bg-yellow-900/20 dark:text-yellow-300' : ''
                  }`}
                >
                  <Bookmark className={`h-5 w-5 ${selectedDocument.isBookmarked ? 'fill-current' : ''}`} />
                  <span>{selectedDocument.isBookmarked ? 'إزالة من المحفوظات' : 'إضافة للمحفوظات'}</span>
                </button>
                <button className="btn-primary flex items-center space-x-2 space-x-reverse">
                  <Download className="h-5 w-5" />
                  <span>تحميل الوثيقة</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default DatabaseSection; 