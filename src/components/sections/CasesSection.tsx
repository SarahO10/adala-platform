import React, { useState } from 'react';
import { 
  FolderOpen, 
  Plus, 
  Search, 
  Filter, 
  Edit, 
  Trash2, 
  Eye,
  Calendar,
  User,
  AlertTriangle,
  CheckCircle,
  Clock,
  TrendingUp,
  BarChart3,
  FileText,
  Users,
  Shield,
  Zap,
  X
} from 'lucide-react';

interface Case {
  id: string;
  title: string;
  client: string;
  type: string;
  court: string;
  description: string;
  priority: 'منخفض' | 'متوسط' | 'عالي' | 'عاجل';
  status: 'جديد' | 'قيد النظر' | 'معلق' | 'مكتمل' | 'ملغي';
  nextHearing: string;
  assignedTo: string;
  createdAt: string;
}

const CasesSection: React.FC = () => {
  const [cases, setCases] = useState<Case[]>([
    {
      id: "CASE-001",
      title: "قضية تجارية - خلاف على عقد",
      client: "شركة التقنية المتقدمة",
      type: "تجاري",
      court: "المحكمة التجارية بالرياض",
      description: "خلاف على عقد توريد أجهزة حاسوب",
      priority: "عالي",
      status: "قيد النظر",
      nextHearing: "2024-02-15",
      assignedTo: "أحمد محمد",
      createdAt: "2024-01-15"
    },
    {
      id: "CASE-002",
      title: "قضية مدنية - تعويضات",
      client: "أحمد الخالد",
      type: "مدني",
      court: "محكمة الأحوال الشخصية",
      description: "طلب تعويضات عن أضرار",
      priority: "متوسط",
      status: "جديد",
      nextHearing: "2024-02-20",
      assignedTo: "فاطمة علي",
      createdAt: "2024-01-20"
    },
    {
      id: "CASE-003",
      title: "قضية إدارية - طعن",
      client: "وزارة التجارة",
      type: "إداري",
      court: "المحكمة الإدارية",
      description: "طعن على قرار إداري",
      priority: "عاجل",
      status: "قيد النظر",
      nextHearing: "2024-02-10",
      assignedTo: "محمد السعد",
      createdAt: "2024-01-25"
    }
  ]);

  const [showAddModal, setShowAddModal] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('الكل');
  const [filterPriority, setFilterPriority] = useState('الكل');
  const [editingCase, setEditingCase] = useState<Case | null>(null);

  const [newCase, setNewCase] = useState({
    title: '',
    client: '',
    type: '',
    court: '',
    description: '',
    priority: 'متوسط' as const,
    assignedTo: ''
  });

  const filteredCases = cases.filter(c => {
    const matchesSearch = c.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         c.client.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         c.id.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = filterStatus === 'الكل' || c.status === filterStatus;
    const matchesPriority = filterPriority === 'الكل' || c.priority === filterPriority;
    return matchesSearch && matchesStatus && matchesPriority;
  });

  const addCase = () => {
    const caseData: Case = {
      id: `CASE-${String(cases.length + 1).padStart(3, '0')}`,
      ...newCase,
      status: 'جديد',
      nextHearing: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
      createdAt: new Date().toISOString().split('T')[0]
    };
    setCases([...cases, caseData]);
    setShowAddModal(false);
    setNewCase({
      title: '',
      client: '',
      type: '',
      court: '',
      description: '',
      priority: 'متوسط',
      assignedTo: ''
    });
  };

  const deleteCase = (id: string) => {
    if (confirm('هل أنت متأكد من حذف هذه القضية؟')) {
      setCases(cases.filter(c => c.id !== id));
    }
  };

  const updateCase = (updatedCase: Case) => {
    setCases(cases.map(c => c.id === updatedCase.id ? updatedCase : c));
    setEditingCase(null);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'جديد': return 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200';
      case 'قيد النظر': return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200';
      case 'معلق': return 'bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-200';
      case 'مكتمل': return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200';
      case 'ملغي': return 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200';
      default: return 'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200';
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'منخفض': return 'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200';
      case 'متوسط': return 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200';
      case 'عالي': return 'bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-200';
      case 'عاجل': return 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200';
      default: return 'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200';
    }
  };

  const caseTypes = ['مدني', 'تجاري', 'جنائي', 'إداري', 'أحوال شخصية', 'أخرى'];
  const upcomingHearings = cases.filter(c => c.status !== 'مكتمل' && c.status !== 'ملغي').length;

  return (
    <div className="space-y-12">
      {/* Hero Section */}
      <div className="relative text-center space-y-8">
        {/* Decorative Shapes */}
        <div className="absolute top-0 left-0 w-32 h-32 bg-gradient-to-br from-green-200 to-green-300 rounded-full opacity-20 blur-3xl"></div>
        <div className="absolute top-20 right-0 w-24 h-24 bg-gradient-to-br from-green-300 to-green-400 rounded-full opacity-20 blur-2xl"></div>
        
        <div className="relative z-10">
          <h1 className="text-5xl md:text-6xl font-bold text-gray-900 dark:text-white mb-6">
            تنظيم القضايا
            <span className="block text-4xl md:text-5xl text-green-600 dark:text-green-400 mt-2">
              إدارة شاملة للقضايا والملفات القانونية
            </span>
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto leading-relaxed">
            منصة متكاملة لإدارة القضايا القانونية مع نظام تصنيف ذكي وجدولة الجلسات
          </p>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="flex flex-wrap gap-4 justify-center">
        <button 
          onClick={() => setShowAddModal(true)}
          className="btn-primary flex items-center space-x-2 space-x-reverse text-lg px-8 py-4"
        >
          <Plus className="h-6 w-6" />
          <span>إضافة قضية جديدة</span>
        </button>
        <button className="btn-secondary flex items-center space-x-2 space-x-reverse text-lg px-8 py-4">
          <BarChart3 className="h-6 w-6" />
          <span>التقارير والإحصائيات</span>
        </button>
        <button className="btn-outline flex items-center space-x-2 space-x-reverse text-lg px-8 py-4">
          <Calendar className="h-6 w-6" />
          <span>جدولة الجلسات</span>
        </button>
      </div>

      {/* Statistics Cards */}
      <div className="grid md:grid-cols-4 gap-6">
        <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-soft border border-gray-200 dark:border-gray-700">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600 dark:text-gray-400">إجمالي القضايا</p>
              <p className="text-3xl font-bold text-gray-900 dark:text-white">{cases.length}</p>
            </div>
            <div className="w-12 h-12 bg-gradient-to-br from-green-100 to-green-200 dark:from-green-800 dark:to-green-900 rounded-xl flex items-center justify-center">
              <FolderOpen className="h-6 w-6 text-green-600 dark:text-green-400" />
            </div>
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-soft border border-gray-200 dark:border-gray-700">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600 dark:text-gray-400">قضايا نشطة</p>
              <p className="text-3xl font-bold text-green-600">{cases.filter(c => c.status !== 'مكتمل' && c.status !== 'ملغي').length}</p>
            </div>
            <div className="w-12 h-12 bg-gradient-to-br from-blue-100 to-blue-200 dark:from-blue-800 dark:to-blue-900 rounded-xl flex items-center justify-center">
              <TrendingUp className="h-6 w-6 text-blue-600 dark:text-blue-400" />
            </div>
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-soft border border-gray-200 dark:border-gray-700">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600 dark:text-gray-400">جلسات قادمة</p>
              <p className="text-3xl font-bold text-orange-600">{upcomingHearings}</p>
            </div>
            <div className="w-12 h-12 bg-gradient-to-br from-orange-100 to-orange-200 dark:from-orange-800 dark:to-orange-900 rounded-xl flex items-center justify-center">
              <Calendar className="h-6 w-6 text-orange-600 dark:text-orange-400" />
            </div>
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-soft border border-gray-200 dark:border-gray-700">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600 dark:text-gray-400">معدل الإنجاز</p>
              <p className="text-3xl font-bold text-purple-600">
                {Math.round((cases.filter(c => c.status === 'مكتمل').length / cases.length) * 100)}%
              </p>
            </div>
            <div className="w-12 h-12 bg-gradient-to-br from-purple-100 to-purple-200 dark:from-purple-800 dark:to-purple-900 rounded-xl flex items-center justify-center">
              <CheckCircle className="h-6 w-6 text-purple-600 dark:text-purple-400" />
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
              placeholder="البحث في القضايا..."
              className="w-full pl-10 pr-4 py-3 border border-gray-300 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 transition-all duration-200"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          
          <select
            className="px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
          >
            <option value="الكل">كل الحالات</option>
            <option value="جديد">جديد</option>
            <option value="قيد النظر">قيد النظر</option>
            <option value="معلق">معلق</option>
            <option value="مكتمل">مكتمل</option>
            <option value="ملغي">ملغي</option>
          </select>
          
          <select
            className="px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
            value={filterPriority}
            onChange={(e) => setFilterPriority(e.target.value)}
          >
            <option value="الكل">كل الأولويات</option>
            <option value="منخفض">منخفض</option>
            <option value="متوسط">متوسط</option>
            <option value="عالي">عالي</option>
            <option value="عاجل">عاجل</option>
          </select>
        </div>
      </div>

      {/* Cases Table */}
      <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-soft border border-gray-200 dark:border-gray-700 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 dark:bg-gray-700">
              <tr>
                <th className="px-6 py-4 text-right text-sm font-semibold text-gray-700 dark:text-gray-300">رقم القضية</th>
                <th className="px-6 py-4 text-right text-sm font-semibold text-gray-700 dark:text-gray-300">العنوان</th>
                <th className="px-6 py-4 text-right text-sm font-semibold text-gray-700 dark:text-gray-300">العميل</th>
                <th className="px-6 py-4 text-right text-sm font-semibold text-gray-700 dark:text-gray-300">النوع</th>
                <th className="px-6 py-4 text-right text-sm font-semibold text-gray-700 dark:text-gray-300">الحالة</th>
                <th className="px-6 py-4 text-right text-sm font-semibold text-gray-700 dark:text-gray-300">الأولوية</th>
                <th className="px-6 py-4 text-right text-sm font-semibold text-gray-700 dark:text-gray-300">الجلسة القادمة</th>
                <th className="px-6 py-4 text-right text-sm font-semibold text-gray-700 dark:text-gray-300">الإجراءات</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
              {filteredCases.map((caseItem) => (
                <tr key={caseItem.id} className="hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors duration-200">
                  <td className="px-6 py-4 text-sm font-medium text-gray-900 dark:text-white">{caseItem.id}</td>
                  <td className="px-6 py-4 text-sm text-gray-900 dark:text-white">
                    <div className="font-medium">{caseItem.title}</div>
                    <div className="text-gray-500 dark:text-gray-400 text-xs">{caseItem.court}</div>
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-900 dark:text-white">{caseItem.client}</td>
                  <td className="px-6 py-4 text-sm text-gray-900 dark:text-white">{caseItem.type}</td>
                  <td className="px-6 py-4">
                    <span className={`inline-flex px-3 py-1 text-xs font-medium rounded-full ${getStatusColor(caseItem.status)}`}>
                      {caseItem.status}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <span className={`inline-flex px-3 py-1 text-xs font-medium rounded-full ${getPriorityColor(caseItem.priority)}`}>
                      {caseItem.priority}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-900 dark:text-white">{caseItem.nextHearing}</td>
                  <td className="px-6 py-4 text-sm font-medium">
                    <div className="flex items-center space-x-2 space-x-reverse">
                      <button className="text-green-600 hover:text-green-900 dark:text-green-400 dark:hover:text-green-300">
                        <Eye className="h-4 w-4" />
                      </button>
                      <button className="text-blue-600 hover:text-blue-900 dark:text-blue-400 dark:hover:text-blue-300">
                        <Edit className="h-4 w-4" />
                      </button>
                      <button 
                        className="text-red-600 hover:text-red-900 dark:text-red-400 dark:hover:text-red-300"
                        onClick={() => deleteCase(caseItem.id)}
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Add Case Modal */}
      {showAddModal && (
        <div className="modal-overlay">
          <div className="modal-content p-8">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white">إضافة قضية جديدة</h3>
              <button
                onClick={() => setShowAddModal(false)}
                className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
              >
                <X className="h-6 w-6" />
              </button>
            </div>
            
            <div className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">عنوان القضية</label>
                  <input
                    type="text"
                    className="input-field"
                    value={newCase.title}
                    onChange={(e) => setNewCase({...newCase, title: e.target.value})}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">اسم العميل</label>
                  <input
                    type="text"
                    className="input-field"
                    value={newCase.client}
                    onChange={(e) => setNewCase({...newCase, client: e.target.value})}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">نوع القضية</label>
                  <select
                    className="input-field"
                    value={newCase.type}
                    onChange={(e) => setNewCase({...newCase, type: e.target.value})}
                  >
                    <option value="">اختر النوع</option>
                    {caseTypes.map(type => (
                      <option key={type} value={type}>{type}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">المحكمة</label>
                  <input
                    type="text"
                    className="input-field"
                    value={newCase.court}
                    onChange={(e) => setNewCase({...newCase, court: e.target.value})}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">الأولوية</label>
                  <select
                    className="input-field"
                    value={newCase.priority}
                    onChange={(e) => setNewCase({...newCase, priority: e.target.value as any})}
                  >
                    <option value="منخفض">منخفض</option>
                    <option value="متوسط">متوسط</option>
                    <option value="عالي">عالي</option>
                    <option value="عاجل">عاجل</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">المحامي المسؤول</label>
                  <input
                    type="text"
                    className="input-field"
                    value={newCase.assignedTo}
                    onChange={(e) => setNewCase({...newCase, assignedTo: e.target.value})}
                  />
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">وصف القضية</label>
                <textarea
                  className="input-field resize-none"
                  rows={4}
                  value={newCase.description}
                  onChange={(e) => setNewCase({...newCase, description: e.target.value})}
                />
              </div>
              
              <div className="flex justify-end space-x-3 space-x-reverse">
                <button
                  onClick={() => setShowAddModal(false)}
                  className="btn-secondary"
                >
                  إلغاء
                </button>
                <button
                  onClick={addCase}
                  className="btn-primary"
                >
                  إضافة القضية
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CasesSection; 