import React, { useState, useEffect } from 'react';
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
  X,
  DollarSign,
  Timer,
  Gavel,
  Link,
  Paperclip,
  Download,
  Upload,
  DollarSign as DollarSignIcon,
  User as UserIcon,
  ChevronDown
} from 'lucide-react';

interface Case {
  id: string;
  title: string;
  client: string;
  type: string;
  court: string;
  description: string;
  priority: 'منخفض' | 'متوسط' | 'عالي' | 'عاجل';
  status: 'جديدة' | 'حكم ابتدائي' | 'محكوم بحكم استئناف' | 'قيد النظر' | 'منتهية';
  nextHearing: string;
  assignedTo: string;
  createdAt: string;
  fees: number;
  appealDeadline?: string;
  appealDaysLeft?: number;
  hearingLink?: string;
  attachments: Attachment[];
  paidFees: number;
  remainingFees: number;
}

interface Attachment {
  id: string;
  name: string;
  type: 'document' | 'evidence' | 'contract' | 'other';
  size: string;
  uploadedAt: string;
  uploadedBy: string;
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
      createdAt: "2024-01-15",
      fees: 15000,
      hearingLink: "https://meet.google.com/abc-defg-hij",
      attachments: [
        {
          id: "att1",
          name: "العقد الموقع.pdf",
          type: "contract",
          size: "2.5 MB",
          uploadedAt: "2024-01-15",
          uploadedBy: "أحمد محمد"
        },
        {
          id: "att2",
          name: "مستندات الدفع.pdf",
          type: "document",
          size: "1.8 MB",
          uploadedAt: "2024-01-16",
          uploadedBy: "أحمد محمد"
        }
      ],
      paidFees: 8000,
      remainingFees: 7000
    },
    {
      id: "CASE-002",
      title: "قضية مدنية - تعويضات",
      client: "أحمد الخالد",
      type: "مدني",
      court: "محكمة الأحوال الشخصية",
      description: "طلب تعويضات عن أضرار",
      priority: "متوسط",
      status: "حكم ابتدائي",
      nextHearing: "2024-02-20",
      assignedTo: "فاطمة علي",
      createdAt: "2024-01-20",
      fees: 8000,
      hearingLink: "https://meet.google.com/xyz-uvw-rst",
      attachments: [
        {
          id: "att3",
          name: "تقرير الخبراء.pdf",
          type: "evidence",
          size: "3.2 MB",
          uploadedAt: "2024-01-20",
          uploadedBy: "فاطمة علي"
        }
      ],
      paidFees: 4000,
      remainingFees: 4000
    },
    {
      id: "CASE-003",
      title: "قضية إدارية - طعن",
      client: "وزارة التجارة",
      type: "إداري",
      court: "المحكمة الإدارية",
      description: "طعن على قرار إداري",
      priority: "عاجل",
      status: "محكوم بحكم استئناف",
      nextHearing: "2024-02-10",
      assignedTo: "محمد السعد",
      createdAt: "2024-01-25",
      fees: 25000,
      appealDeadline: "2024-03-25",
      appealDaysLeft: 45,
      hearingLink: "https://meet.google.com/def-ghi-jkl",
      attachments: [
        {
          id: "att4",
          name: "القرار الإداري.pdf",
          type: "document",
          size: "1.5 MB",
          uploadedAt: "2024-01-25",
          uploadedBy: "محمد السعد"
        }
      ],
      paidFees: 15000,
      remainingFees: 10000
    }
  ]);

  const [showAddModal, setShowAddModal] = useState(false);
  const [showAppealModal, setShowAppealModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showAttachmentsModal, setShowAttachmentsModal] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('الكل');
  const [filterPriority, setFilterPriority] = useState('');
  const [editingCase, setEditingCase] = useState<Case | null>(null);
  const [selectedCaseForAppeal, setSelectedCaseForAppeal] = useState<Case | null>(null);
  const [selectedCaseForAttachments, setSelectedCaseForAttachments] = useState<Case | null>(null);
  const [showFilterDropdown, setShowFilterDropdown] = useState(false);

  const [newCase, setNewCase] = useState({
    title: '',
    client: '',
    type: '',
    assignedTo: '',
    fees: 0,
    hearingLink: ''
  });

  const [appealDays, setAppealDays] = useState(30);
  const [editCaseData, setEditCaseData] = useState<Partial<Case>>({});
  const [newAttachment, setNewAttachment] = useState({
    name: '',
    type: 'document' as Attachment['type'],
    size: '',
    uploadedBy: ''
  });

  // Update appeal countdown every day
  useEffect(() => {
    const interval = setInterval(() => {
      setCases(prevCases => 
        prevCases.map(c => {
          if (c.appealDeadline && c.appealDaysLeft && c.appealDaysLeft > 0) {
            const newDaysLeft = c.appealDaysLeft - 1;
            
            // Update priority based on days left
            let newPriority = c.priority;
            if (newDaysLeft <= 7) {
              newPriority = 'عاجل';
            } else if (newDaysLeft <= 15) {
              newPriority = 'عالي';
            } else if (newDaysLeft <= 30) {
              newPriority = 'متوسط';
            }

            // Mark as finished if deadline passed
            if (newDaysLeft <= 0) {
              return { ...c, status: 'منتهية', priority: 'منخفض', appealDaysLeft: 0 };
            }

            return { ...c, appealDaysLeft: newDaysLeft, priority: newPriority };
          }
          return c;
        })
      );
    }, 24 * 60 * 60 * 1000); // Update every 24 hours

    return () => clearInterval(interval);
  }, []);

  // Close filter dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const filterButton = document.querySelector('.filter-button');
      const filterDropdown = document.querySelector('.filter-dropdown');
      if (filterButton && filterDropdown && 
          !filterButton.contains(event.target as Node) && 
          !filterDropdown.contains(event.target as Node)) {
        setShowFilterDropdown(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [showFilterDropdown]);

  const filteredCases = cases.filter(case_ => {
    const searchLower = searchTerm.toLowerCase();
    const matchesSearch = case_.title.toLowerCase().includes(searchLower) ||
                         case_.client.toLowerCase().includes(searchLower) ||
                         case_.type.toLowerCase().includes(searchLower) ||
                         case_.assignedTo.toLowerCase().includes(searchLower);
    
    const matchesStatus = filterStatus === 'الكل' || case_.status === filterStatus;
    const matchesPriority = filterPriority === '' || filterPriority === 'الكل' || case_.priority === filterPriority;
    
    return matchesSearch && matchesStatus && matchesPriority;
  });

  const addCase = () => {
    const caseData: Case = {
      id: `CASE-${String(cases.length + 1).padStart(3, '0')}`,
      ...newCase,
      status: 'جديدة',
      nextHearing: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
      createdAt: new Date().toISOString().split('T')[0],
      court: '',
      description: '',
      priority: 'متوسط',
      hearingLink: '',
      attachments: [],
      paidFees: 0,
      remainingFees: newCase.fees
    };
    setCases([...cases, caseData]);
    setShowAddModal(false);
    setNewCase({
      title: '',
      client: '',
      type: '',
      assignedTo: '',
      fees: 0,
      hearingLink: ''
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
    setShowEditModal(false);
    setEditCaseData({});
  };

  const handleEditCase = (caseItem: Case) => {
    setEditingCase(caseItem);
    setEditCaseData({
      title: caseItem.title,
      client: caseItem.client,
      type: caseItem.type,
      court: caseItem.court,
      description: caseItem.description,
      priority: caseItem.priority,
      status: caseItem.status,
      nextHearing: caseItem.nextHearing,
      assignedTo: caseItem.assignedTo,
      fees: caseItem.fees,
      hearingLink: caseItem.hearingLink,
      paidFees: caseItem.paidFees
    });
    setShowEditModal(true);
  };

  const handleStatusChange = (newStatus: Case['status']) => {
    if (editingCase) {
      let updatedCase = { ...editingCase, status: newStatus };
      
      // If changing to appeal status, show appeal modal
      if (newStatus === 'محكوم بحكم استئناف') {
        setShowEditModal(false);
        setSelectedCaseForAppeal(editingCase);
        setShowAppealModal(true);
        return;
      }
      
      // Reset appeal data if changing from appeal status
      if (newStatus !== 'محكوم بحكم استئناف' as Case['status']) {
        updatedCase = {
          ...updatedCase,
          appealDeadline: undefined,
          appealDaysLeft: undefined
        };
      }
      
      updateCase(updatedCase);
    }
  };

  const handleAppealSubmit = () => {
    if (selectedCaseForAppeal && appealDays > 0) {
      const deadline = new Date();
      deadline.setDate(deadline.getDate() + appealDays);
      
      setCases(prevCases => 
        prevCases.map(c => 
          c.id === selectedCaseForAppeal.id 
            ? { 
                ...c, 
                status: 'محكوم بحكم استئناف',
                appealDeadline: deadline.toISOString().split('T')[0],
                appealDaysLeft: appealDays,
                priority: appealDays <= 7 ? 'عاجل' : appealDays <= 15 ? 'عالي' : 'متوسط'
              }
            : c
        )
      );
      
      setShowAppealModal(false);
      setSelectedCaseForAppeal(null);
      setAppealDays(30);
    }
  };

  const addAttachment = () => {
    if (selectedCaseForAttachments && newAttachment.name && newAttachment.size) {
      const attachment: Attachment = {
        id: `att${Date.now()}`,
        ...newAttachment,
        uploadedAt: new Date().toISOString().split('T')[0]
      };
      
      setCases(prevCases => 
        prevCases.map(c => 
          c.id === selectedCaseForAttachments.id 
            ? { ...c, attachments: [...c.attachments, attachment] }
            : c
        )
      );
      
      setNewAttachment({ name: '', type: 'document', size: '', uploadedBy: '' });
    }
  };

  const deleteAttachment = (caseId: string, attachmentId: string) => {
    setCases(prevCases => 
      prevCases.map(c => 
        c.id === caseId 
          ? { ...c, attachments: c.attachments.filter(a => a.id !== attachmentId) }
          : c
      )
    );
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'جديدة': return 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200';
      case 'قيد النظر': return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200';
      case 'حكم ابتدائي': return 'bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-200';
      case 'محكوم بحكم استئناف': return 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200';
      case 'منتهية': return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200';
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

  const getAttachmentTypeColor = (type: Attachment['type']) => {
    switch (type) {
      case 'document': return 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200';
      case 'evidence': return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200';
      case 'contract': return 'bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200';
      case 'other': return 'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200';
      default: return 'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200';
    }
  };

  const caseTypes = ['مدني', 'تجاري', 'جنائي', 'إداري', 'أحوال شخصية', 'أخرى'];
  const caseStatuses: Case['status'][] = ['جديدة', 'قيد النظر', 'حكم ابتدائي', 'محكوم بحكم استئناف', 'منتهية'];
  const casePriorities: Case['priority'][] = ['منخفض', 'متوسط', 'عالي', 'عاجل'];
  const attachmentTypes: Attachment['type'][] = ['document', 'evidence', 'contract', 'other'];
  const upcomingHearings = cases.filter(c => c.status !== 'منتهية').length;
  const totalFees = cases.reduce((sum, c) => sum + c.fees, 0);
  const totalPaidFees = cases.reduce((sum, c) => sum + c.paidFees, 0);
  const totalRemainingFees = cases.reduce((sum, c) => sum + c.remainingFees, 0);
  const activeCases = cases.filter(c => c.status !== 'منتهية').length;
  const completedCases = cases.filter(c => c.status === 'منتهية').length;

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
            <span className="block text-4xl md:text-5xl text-green-700 dark:text-green-300 mt-2">
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
              <FolderOpen className="h-6 w-6 text-green-700 dark:text-green-300" />
            </div>
          </div>
        </div>

        <div className="text-center p-6 bg-gradient-to-br from-green-50 to-green-100 dark:from-green-900/20 dark:to-green-800/20 rounded-xl">
          <div className="w-16 h-16 bg-gradient-to-br from-green-100 to-green-200 dark:from-green-800 dark:to-green-900 rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300">
            <TrendingUp className="h-8 w-8 text-green-700 dark:text-green-300" />
          </div>
          <h4 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">القضايا النشطة</h4>
          <p className="text-3xl font-bold text-green-700 dark:text-green-300">{activeCases}</p>
        </div>

        <div className="text-center p-6 bg-gradient-to-br from-green-50 to-green-100 dark:from-green-900/20 dark:to-green-800/20 rounded-xl">
          <div className="w-16 h-16 bg-gradient-to-br from-green-100 to-green-200 dark:from-green-800 dark:to-green-900 rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300">
            <Calendar className="h-8 w-8 text-green-700 dark:text-green-300" />
          </div>
          <h4 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">الجلسات القادمة</h4>
          <p className="text-3xl font-bold text-green-700 dark:text-green-300">{upcomingHearings}</p>
        </div>

        <div className="text-center p-6 bg-gradient-to-br from-green-50 to-green-100 dark:from-green-900/20 dark:to-green-800/20 rounded-xl">
          <div className="w-16 h-16 bg-gradient-to-br from-green-100 to-green-200 dark:from-green-800 dark:to-green-900 rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300">
            <CheckCircle className="h-8 w-8 text-green-700 dark:text-green-300" />
          </div>
          <h4 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">القضايا المكتملة</h4>
          <p className="text-3xl font-bold text-green-700 dark:text-green-300">{completedCases}</p>
        </div>
      </div>

      {/* Search and Filter */}
      <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-soft border border-gray-200 dark:border-gray-700">
        {/* Search Section */}
        <div className="mb-6">
          <div className="relative max-w-2xl mx-auto">
            <Search className="h-5 w-5 absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 dark:text-gray-500" />
            <input
              type="text"
              placeholder="البحث في القضايا، اسم العميل، نوع القضية، أو اسم المحامي..."
              className="w-full pl-10 pr-4 py-3 border border-gray-300 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 transition-all duration-200"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            {searchTerm && (
              <button
                onClick={() => setSearchTerm('')}
                className="absolute left-3 top-1/2 transform -translate-y-1/2 p-1 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 transition-colors duration-200"
              >
                <X className="h-4 w-4" />
              </button>
            )}
          </div>
        </div>

        {/* Filter Icon with Dropdown */}
        <div className="flex justify-center">
          <div className="relative">
            <button
              onClick={() => setShowFilterDropdown(!showFilterDropdown)}
              className="filter-button flex items-center space-x-2 space-x-reverse px-4 py-3 bg-green-600 hover:bg-green-700 text-white rounded-xl transition-colors duration-200"
            >
              <Filter className="h-5 w-5" />
              <span>الفلاتر</span>
              <ChevronDown className={`h-4 w-4 transition-transform duration-200 ${showFilterDropdown ? 'rotate-180' : ''}`} />
            </button>
            
            {showFilterDropdown && (
              <div className="filter-dropdown absolute top-full left-0 mt-2 w-80 bg-white dark:bg-gray-800 rounded-xl shadow-soft border border-gray-200 dark:border-gray-700 p-4 z-50">
                <div className="space-y-4">
                  {/* Status Filter */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">حالة القضية</label>
                    <select
                      className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                      value={filterStatus}
                      onChange={(e) => setFilterStatus(e.target.value)}
                    >
                      <option value="الكل">جميع الحالات</option>
                      {caseStatuses.map(status => (
                        <option key={status} value={status}>{status}</option>
                      ))}
                    </select>
                  </div>
                  
                  {/* Priority Filter */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">أولوية القضية</label>
                    <select
                      className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                      value={filterPriority}
                      onChange={(e) => setFilterPriority(e.target.value)}
                    >
                      <option value="">جميع الأولويات</option>
                      {casePriorities.map(priority => (
                        <option key={priority} value={priority}>{priority}</option>
                      ))}
                    </select>
                  </div>
                  
                  {/* Clear Filters Button */}
                  <div className="pt-2">
                    <button
                      onClick={() => {
                        setFilterStatus('الكل');
                        setFilterPriority('');
                        setShowFilterDropdown(false);
                      }}
                      className="w-full px-4 py-2 bg-gray-500 hover:bg-gray-600 text-white rounded-lg transition-colors duration-200"
                    >
                      مسح الفلاتر
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Cases Table */}
      <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-soft border border-gray-200 dark:border-gray-700 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 dark:bg-gray-700">
              <tr>
                <th className="px-6 py-4 text-right text-sm font-semibold text-gray-700 dark:text-gray-300">الأولوية</th>
                <th className="px-6 py-4 text-right text-sm font-semibold text-gray-700 dark:text-gray-300">رقم القضية</th>
                <th className="px-6 py-4 text-right text-sm font-semibold text-gray-700 dark:text-gray-300">العميل</th>
                <th className="px-6 py-4 text-right text-sm font-semibold text-gray-700 dark:text-gray-300">النوع</th>
                <th className="px-6 py-4 text-right text-sm font-semibold text-gray-700 dark:text-gray-300">الموضوع</th>
                <th className="px-6 py-4 text-right text-sm font-semibold text-gray-700 dark:text-gray-300">الحالة</th>
                <th className="px-6 py-4 text-right text-sm font-semibold text-gray-700 dark:text-gray-300">الجلسة القادمة</th>

                <th className="px-6 py-4 text-right text-sm font-semibold text-gray-700 dark:text-gray-300">الإجراءات</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
              {filteredCases.map((caseItem) => (
                <tr key={caseItem.id} className="hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors duration-200">
                  <td className="px-6 py-4">
                    <span className={`inline-flex px-3 py-1 text-xs font-medium rounded-full ${getPriorityColor(caseItem.priority)}`}>
                      {caseItem.priority}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-sm font-medium text-gray-900 dark:text-white">{caseItem.id}</td>
                  <td className="px-6 py-4 text-sm text-gray-900 dark:text-white">{caseItem.client}</td>
                  <td className="px-6 py-4 text-sm text-gray-900 dark:text-white">{caseItem.type}</td>
                  <td className="px-6 py-4 text-sm text-gray-900 dark:text-white">
                    <div className="font-medium">{caseItem.title}</div>
                    <div className="text-gray-500 dark:text-gray-400 text-xs">{caseItem.court}</div>
                  </td>
                  <td className="px-6 py-4">
                    <span className={`inline-flex px-3 py-1 text-xs font-medium rounded-full ${getStatusColor(caseItem.status)}`}>
                      {caseItem.status}
                    </span>
                    {caseItem.appealDaysLeft && caseItem.appealDaysLeft > 0 && (
                      <div className="mt-1 text-xs text-red-600 dark:text-red-400">
                        <Timer className="inline h-3 w-3 mr-1" />
                        {caseItem.appealDaysLeft} يوم
                    </div>
                    )}
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-900 dark:text-white">
                    <div>{caseItem.nextHearing}</div>
                    {caseItem.hearingLink && (
                      <div className="flex items-center text-xs text-blue-600 dark:text-blue-400">
                        <Link className="h-3 w-3 mr-1" />
                        <a href={caseItem.hearingLink} target="_blank" rel="noopener noreferrer" className="underline">
                          الجلسة
                        </a>
                    </div>
                    )}
                    {caseItem.assignedTo && (
                      <div className="text-xs text-gray-500 dark:text-gray-400">
                        {caseItem.assignedTo}
                    </div>
                    )}
                  </td>

                  <td className="px-6 py-4 text-sm font-medium">
                    <div className="flex items-center space-x-2 space-x-reverse">
                      <button 
                        className="text-green-600 hover:text-green-900 dark:text-green-400 dark:hover:text-green-300"
                        onClick={() => {
                          setSelectedCaseForAttachments(caseItem);
                          setShowAttachmentsModal(true);
                        }}
                        title="إدارة المرفقات"
                      >
                        <Paperclip className="h-4 w-4" />
                      </button>
                      <button 
                        className="text-blue-600 hover:text-blue-900 dark:text-blue-400 dark:hover:text-blue-300"
                        onClick={() => handleEditCase(caseItem)}
                      >
                        <Edit className="h-4 w-4" />
                      </button>
                      {caseItem.status === 'حكم ابتدائي' && (
                        <button 
                          className="text-orange-600 hover:text-orange-900 dark:text-orange-400 dark:hover:text-orange-300"
                          onClick={() => {
                            setSelectedCaseForAppeal(caseItem);
                            setShowAppealModal(true);
                          }}
                          title="إضافة استئناف"
                        >
                          <Gavel className="h-4 w-4" />
                        </button>
                      )}
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

      {/* Fees Summary Section */}
      <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-soft border border-gray-200 dark:border-gray-700 p-6">
        <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-6 text-center">
          ملخص الأتعاب
        </h3>
        
        <div className="grid md:grid-cols-3 gap-6">
          <div className="text-center p-6 bg-gradient-to-br from-green-50 to-green-100 dark:from-green-900/20 dark:to-green-800/20 rounded-xl">
            <div className="w-16 h-16 bg-gradient-to-br from-green-100 to-green-200 dark:from-green-800 dark:to-green-900 rounded-full flex items-center justify-center mx-auto mb-4">
              <DollarSign className="h-8 w-8 text-green-600 dark:text-green-400" />
                </div>
            <h4 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">إجمالي الأتعاب</h4>
            <p className="text-3xl font-bold text-green-600 dark:text-green-400">
              {totalFees.toLocaleString()} ريال
            </p>
              </div>
          
                          <div className="text-center p-6 bg-gradient-to-br from-green-50 to-green-100 dark:from-green-900/20 dark:to-green-800/20 rounded-xl">
                  <div className="w-16 h-16 bg-gradient-to-br from-green-100 to-green-200 dark:from-green-800 dark:to-green-900 rounded-full flex items-center justify-center mx-auto mb-4">
                    <CheckCircle className="h-8 w-8 text-green-600 dark:text-green-400" />
                  </div>
                  <h4 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">الأتعاب المدفوعة</h4>
                  <p className="text-3xl font-bold text-green-600 dark:text-green-400">
                    {totalPaidFees.toLocaleString()} ريال
                  </p>
                </div>

                      <div className="text-center p-6 bg-gradient-to-br from-green-50 to-green-100 dark:from-green-900/20 dark:to-green-800/20 rounded-xl">
              <div className="w-16 h-16 bg-gradient-to-br from-green-100 to-green-200 dark:from-green-800 dark:to-green-900 rounded-full flex items-center justify-center mx-auto mb-4">
                <AlertTriangle className="h-8 w-8 text-green-600 dark:text-green-400" />
              </div>
              <h4 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">الأتعاب المتبقية</h4>
              <p className="text-3xl font-bold text-green-600 dark:text-green-400">
                {totalRemainingFees.toLocaleString()} ريال
              </p>
            </div>
        </div>

        <div className="mt-8">
          <h4 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">تفاصيل الأتعاب حسب القضايا</h4>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 dark:bg-gray-700">
                <tr>
                  <th className="px-4 py-3 text-right text-sm font-semibold text-gray-700 dark:text-gray-300">رقم القضية</th>
                  <th className="px-4 py-3 text-right text-sm font-semibold text-gray-700 dark:text-gray-300">العنوان</th>
                  <th className="px-4 py-3 text-right text-sm font-semibold text-gray-700 dark:text-gray-300">إجمالي الأتعاب</th>
                  <th className="px-4 py-3 text-right text-sm font-semibold text-gray-700 dark:text-gray-300">المدفوع</th>
                  <th className="px-4 py-3 text-right text-sm font-semibold text-gray-700 dark:text-gray-300">المتبقي</th>
                  <th className="px-4 py-3 text-right text-sm font-semibold text-gray-700 dark:text-gray-300">الحالة</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                {cases.map((caseItem) => (
                  <tr key={caseItem.id} className="hover:bg-gray-50 dark:hover:bg-gray-700">
                    <td className="px-4 py-3 text-sm font-medium text-gray-900 dark:text-white">{caseItem.id}</td>
                    <td className="px-4 py-3 text-sm text-gray-900 dark:text-white">{caseItem.title}</td>
                    <td className="px-4 py-3 text-sm text-gray-900 dark:text-white">{caseItem.fees.toLocaleString()} ريال</td>
                                            <td className="px-4 py-3 text-sm text-green-700 dark:text-green-300">{caseItem.paidFees.toLocaleString()} ريال</td>
                        <td className="px-4 py-3 text-sm text-green-700 dark:text-green-300">{caseItem.remainingFees.toLocaleString()} ريال</td>
                    <td className="px-4 py-3">
                      <span className={`inline-flex px-2 py-1 text-xs font-medium rounded-full ${getStatusColor(caseItem.status)}`}>
                        {caseItem.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
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
                  <input
                    type="text"
                    className="input-field"
                    placeholder="مثال: مدني، تجاري، جنائي..."
                    value={newCase.type}
                    onChange={(e) => setNewCase({...newCase, type: e.target.value})}
                  />
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
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">أتعاب القضية (ريال)</label>
                  <input
                    type="number"
                    className="input-field"
                    value={newCase.fees}
                    onChange={(e) => setNewCase({...newCase, fees: parseInt(e.target.value) || 0})}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">رابط الجلسة (اختياري)</label>
                  <input
                    type="url"
                    className="input-field"
                    placeholder="https://meet.google.com/..."
                    value={newCase.hearingLink || ''}
                    onChange={(e) => setNewCase({...newCase, hearingLink: e.target.value})}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">رفع المرفقات (اختياري)</label>
                  <div className="border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-lg p-6 text-center hover:border-green-500 dark:hover:border-green-400 transition-colors duration-200">
                    <Upload className="h-8 w-8 text-gray-400 dark:text-gray-500 mx-auto mb-2" />
                    <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">
                      اسحب وأفلت الملفات هنا أو اضغط لاختيار الملفات
                    </p>
                    <input
                      type="file"
                      multiple
                      className="hidden"
                      id="file-upload"
                      onChange={(e) => {
                        const files = Array.from(e.target.files || []);
                        // هنا يمكن إضافة منطق معالجة الملفات
                        console.log('Files selected:', files);
                      }}
                    />
                    <label
                      htmlFor="file-upload"
                      className="inline-flex items-center px-4 py-2 bg-green-600 hover:bg-green-700 text-white text-sm font-medium rounded-lg cursor-pointer transition-colors duration-200"
                    >
                      <Upload className="h-4 w-4 ml-2" />
                      اختيار الملفات
                    </label>
                  </div>
                </div>
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

      {/* Edit Case Modal */}
      {showEditModal && editingCase && (
        <div className="modal-overlay">
          <div className="modal-content p-8 max-w-4xl">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white">تعديل القضية</h3>
              <button
                onClick={() => {
                  setShowEditModal(false);
                  setEditingCase(null);
                  setEditCaseData({});
                }}
                className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
              >
                <X className="h-6 w-6" />
              </button>
            </div>
            
            <div className="space-y-6">
              {/* Case Info Header */}
              <div className="bg-green-50 dark:bg-green-900/20 p-4 rounded-lg">
                <p className="text-green-800 dark:text-green-200">
                  <strong>رقم القضية:</strong> {editingCase.id}
                </p>
                <p className="text-green-800 dark:text-green-200">
                  <strong>العنوان:</strong> {editingCase.title}
                </p>
              </div>
              
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">عنوان القضية</label>
                  <input
                    type="text"
                    className="input-field"
                    value={editCaseData.title || ''}
                    onChange={(e) => setEditCaseData({...editCaseData, title: e.target.value})}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">اسم العميل</label>
                  <input
                    type="text"
                    className="input-field"
                    value={editCaseData.client || ''}
                    onChange={(e) => setEditCaseData({...editCaseData, client: e.target.value})}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">نوع القضية</label>
                  <input
                    type="text"
                    className="input-field"
                    placeholder="مثال: مدني، تجاري، جنائي..."
                    value={editCaseData.type || ''}
                    onChange={(e) => setEditCaseData({...editCaseData, type: e.target.value})}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">المحكمة</label>
                  <input
                    type="text"
                    className="input-field"
                    value={editCaseData.court || ''}
                    onChange={(e) => setEditCaseData({...editCaseData, court: e.target.value})}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">المحامي المسؤول</label>
                  <input
                    type="text"
                    className="input-field"
                    value={editCaseData.assignedTo || ''}
                    onChange={(e) => setEditCaseData({...editCaseData, assignedTo: e.target.value})}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">أتعاب القضية (ريال)</label>
                  <input
                    type="number"
                    className="input-field"
                    value={editCaseData.fees || 0}
                    onChange={(e) => setEditCaseData({...editCaseData, fees: parseInt(e.target.value) || 0})}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">تاريخ الجلسة القادمة</label>
                  <input
                    type="date"
                    className="input-field"
                    value={editCaseData.nextHearing || ''}
                    onChange={(e) => setEditCaseData({...editCaseData, nextHearing: e.target.value})}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">رابط الجلسة (اختياري)</label>
                  <input
                    type="url"
                    className="input-field"
                    placeholder="https://meet.google.com/..."
                    value={editCaseData.hearingLink || ''}
                    onChange={(e) => setEditCaseData({...editCaseData, hearingLink: e.target.value})}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">الأولوية</label>
                  <select
                    className="input-field"
                    value={editCaseData.priority || 'متوسط'}
                    onChange={(e) => setEditCaseData({...editCaseData, priority: e.target.value as Case['priority']})}
                  >
                    {casePriorities.map(priority => (
                      <option key={priority} value={priority}>{priority}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">حالة القضية</label>
                  <select
                    className="input-field"
                    value={editCaseData.status || 'جديدة'}
                    onChange={(e) => handleStatusChange(e.target.value as Case['status'])}
                  >
                    {caseStatuses.map(status => (
                      <option key={status} value={status}>{status}</option>
                    ))}
                  </select>
                  <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                    عند اختيار "محكوم بحكم استئناف" ستظهر نافذة إعداد الاستئناف
                  </p>
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">وصف القضية</label>
                <textarea
                  className="input-field resize-none"
                  rows={4}
                  value={editCaseData.description || ''}
                  onChange={(e) => setEditCaseData({...editCaseData, description: e.target.value})}
                />
              </div>
              
              <div className="flex justify-end space-x-3 space-x-reverse">
                <button
                  onClick={() => {
                    setShowEditModal(false);
                    setEditingCase(null);
                    setEditCaseData({});
                  }}
                  className="btn-secondary"
                >
                  إلغاء
                </button>
                <button
                  onClick={() => {
                    if (editingCase) {
                      const updatedCase: Case = {
                        ...editingCase,
                        ...editCaseData
                      };
                      updateCase(updatedCase);
                    }
                  }}
                  className="btn-primary"
                >
                  حفظ التعديلات
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Appeal Modal */}
      {showAppealModal && selectedCaseForAppeal && (
        <div className="modal-overlay">
          <div className="modal-content p-8">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white">إضافة استئناف</h3>
              <button
                onClick={() => setShowAppealModal(false)}
                className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
              >
                <X className="h-6 w-6" />
              </button>
            </div>
            
            <div className="space-y-6">
              <div className="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-lg">
                <p className="text-blue-800 dark:text-blue-200">
                  <strong>القضية:</strong> {selectedCaseForAppeal.title}
                </p>
                <p className="text-blue-800 dark:text-blue-200">
                  <strong>العميل:</strong> {selectedCaseForAppeal.client}
                </p>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  عدد أيام الاستئناف
                </label>
                <input
                  type="number"
                  min="1"
                  max="365"
                  className="input-field"
                  value={appealDays}
                  onChange={(e) => setAppealDays(parseInt(e.target.value) || 30)}
                />
                <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                  سيتم حساب الأولوية تلقائياً بناءً على عدد الأيام المتبقية
          </p>
        </div>

              <div className="flex justify-end space-x-3 space-x-reverse">
                <button
                  onClick={() => setShowAppealModal(false)}
                  className="btn-secondary"
                >
                  إلغاء
                </button>
                <button
                  onClick={handleAppealSubmit}
                  className="btn-primary"
                >
                  إضافة الاستئناف
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Attachments Modal */}
      {showAttachmentsModal && selectedCaseForAttachments && (
        <div className="modal-overlay">
          <div className="modal-content p-8 max-w-2xl">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white">المرفقات</h3>
              <button
                onClick={() => setShowAttachmentsModal(false)}
                className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
              >
                <X className="h-6 w-6" />
              </button>
            </div>
            
            <div className="space-y-6">
              <div className="bg-gray-50 dark:bg-gray-800 p-4 rounded-lg">
                <p className="text-gray-800 dark:text-gray-200">
                  <strong>القضية:</strong> {selectedCaseForAttachments.title}
                </p>
                <p className="text-gray-800 dark:text-gray-200">
                  <strong>العميل:</strong> {selectedCaseForAttachments.client}
                </p>
        </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {selectedCaseForAttachments.attachments.map(attachment => (
                  <div key={attachment.id} className="bg-white dark:bg-gray-700 p-4 rounded-lg shadow-soft border border-gray-200 dark:border-gray-600">
                    <div className="flex items-center justify-between mb-2">
                      <span className={`inline-flex px-2 py-1 text-xs font-medium rounded-full ${getAttachmentTypeColor(attachment.type)}`}>
                        {attachment.type}
                      </span>
                      <span className="text-xs text-gray-500 dark:text-gray-400">{attachment.size}</span>
                    </div>
                    <p className="text-gray-900 dark:text-white font-medium">{attachment.name}</p>
                    <p className="text-xs text-gray-500 dark:text-gray-400">تم الرفع بواسطة {attachment.uploadedBy} في {attachment.uploadedAt}</p>
                    <div className="flex items-center mt-2 text-gray-600 dark:text-gray-400 text-sm">
                      <Paperclip className="h-4 w-4 mr-1" />
                      <a href="#" className="underline">تحميل</a>
                    </div>
                  </div>
                ))}
              </div>

              <div className="flex justify-end space-x-3 space-x-reverse">
                <button
                  onClick={() => setShowAttachmentsModal(false)}
                  className="btn-secondary"
                >
                  إغلاق
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