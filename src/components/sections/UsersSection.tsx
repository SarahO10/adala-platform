import React, { useState } from 'react';
import { 
  Users, 
  Plus, 
  Search, 
  Filter, 
  Edit, 
  Trash2, 
  Eye,
  UserPlus,
  Shield, 
  Key, 
  Settings,
  Bell,
  Mail,
  Phone,
  Calendar,
  TrendingUp,
  BarChart3,
  FileText,
  Zap,
  Star,
  Clock,
  Tag,
  X,
  CheckCircle,
  AlertTriangle,
  Lock,
  Unlock,
  User
} from 'lucide-react';

interface User {
  id: string;
  name: string;
  email: string;
  phone: string;
  role: string;
  department: string;
  status: 'نشط' | 'غير نشط' | 'معلق';
  lastLogin: string;
  permissions: string[];
  avatar: string;
}

interface Role {
  id: string;
  name: string;
  description: string;
  permissions: string[];
  userCount: number;
  isDefault: boolean;
}

const UsersSection: React.FC = () => {
  const [users, setUsers] = useState<User[]>([
    {
      id: "USER-001",
      name: "أحمد محمد",
      email: "ahmed.mohamed@adala.com",
      phone: "+966501234567",
      role: "مدير النظام",
      department: "تقنية المعلومات",
      status: "نشط",
      lastLogin: "2024-01-25 14:30",
      permissions: ["إدارة المستخدمين", "إدارة النظام", "إدارة الصلاحيات"],
      avatar: "AM"
    },
    {
      id: "USER-002",
      name: "فاطمة علي",
      email: "fatima.ali@adala.com",
      phone: "+966502345678",
      role: "محامي",
      department: "القسم القانوني",
      status: "نشط",
      lastLogin: "2024-01-25 15:45",
      permissions: ["إدارة القضايا", "إدارة الوثائق", "التقارير"],
      avatar: "FA"
    },
    {
      id: "USER-003",
      name: "محمد السعد",
      email: "mohamed.alsad@adala.com",
      phone: "+966503456789",
      role: "محامي مساعد",
      department: "القسم القانوني",
      status: "نشط",
      lastLogin: "2024-01-25 12:15",
      permissions: ["إدارة القضايا", "إدارة الوثائق"],
      avatar: "MS"
    },
    {
      id: "USER-004",
      name: "سارة أحمد",
      email: "sara.ahmed@adala.com",
      phone: "+966504567890",
      role: "سكرتير قانوني",
      department: "القسم القانوني",
      status: "معلق",
      lastLogin: "2024-01-20 09:30",
      permissions: ["إدارة القضايا", "التقارير"],
      avatar: "SA"
    }
  ]);

  const [roles, setRoles] = useState<Role[]>([
    {
      id: "ROLE-001",
      name: "مدير النظام",
      description: "صلاحيات كاملة على النظام",
      permissions: ["إدارة المستخدمين", "إدارة النظام", "إدارة الصلاحيات", "إدارة القضايا", "إدارة الوثائق", "التقارير", "الإعدادات"],
      userCount: 1,
      isDefault: false
    },
    {
      id: "ROLE-002",
      name: "محامي",
      description: "صلاحيات المحامي الكاملة",
      permissions: ["إدارة القضايا", "إدارة الوثائق", "التقارير", "إدارة العملاء"],
      userCount: 2,
      isDefault: false
    },
    {
      id: "ROLE-003",
      name: "محامي مساعد",
      description: "صلاحيات محدودة للمحامي المساعد",
      permissions: ["إدارة القضايا", "إدارة الوثائق"],
      userCount: 1,
      isDefault: false
    },
    {
      id: "ROLE-004",
      name: "سكرتير قانوني",
      description: "صلاحيات السكرتير القانوني",
      permissions: ["إدارة القضايا", "التقارير"],
      userCount: 1,
      isDefault: true
    }
  ]);

  const [showUserModal, setShowUserModal] = useState(false);
  const [showRoleModal, setShowRoleModal] = useState(false);
  const [editingUser, setEditingUser] = useState<User | null>(null);
  const [editingRole, setEditingRole] = useState<Role | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterRole, setFilterRole] = useState('الكل');
  const [filterStatus, setFilterStatus] = useState('الكل');

  const [newUser, setNewUser] = useState({
    name: '',
    email: '',
    phone: '',
    role: '',
    department: '',
    permissions: [] as string[]
  });

  const [newRole, setNewRole] = useState({
    name: '',
    description: '',
    permissions: [] as string[]
  });

  const availablePermissions = [
    "إدارة المستخدمين",
    "إدارة النظام", 
    "إدارة الصلاحيات",
    "إدارة القضايا",
    "إدارة الوثائق",
    "التقارير",
    "إدارة العملاء",
    "الإعدادات"
  ];

  const departments = ["تقنية المعلومات", "القسم القانوني", "الإدارة العامة", "الموارد البشرية", "المالية"];

  const filteredUsers = users.filter(user => {
    const matchesSearch = user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         user.phone.includes(searchTerm);
    const matchesRole = filterRole === 'الكل' || user.role === filterRole;
    const matchesStatus = filterStatus === 'الكل' || user.status === filterStatus;
    return matchesSearch && matchesRole && matchesStatus;
  });

  const addUser = () => {
    const userData: User = {
      id: `USER-${String(users.length + 1).padStart(3, '0')}`,
      ...newUser,
      status: 'نشط',
      lastLogin: new Date().toLocaleString('ar-SA'),
      avatar: newUser.name.split(' ').map(n => n[0]).join('').toUpperCase()
    };
    setUsers([...users, userData]);
    setShowUserModal(false);
    setNewUser({
      name: '',
      email: '',
      phone: '',
      role: '',
      department: '',
      permissions: []
    });
  };

  const updateUser = (updatedUser: User) => {
    setUsers(users.map(u => u.id === updatedUser.id ? updatedUser : u));
    setEditingUser(null);
  };

  const deleteUser = (id: string) => {
    if (confirm('هل أنت متأكد من حذف هذا المستخدم؟')) {
      setUsers(users.filter(u => u.id !== id));
    }
  };

  const addRole = () => {
    const roleData: Role = {
      id: `ROLE-${String(roles.length + 1).padStart(3, '0')}`,
      ...newRole,
      userCount: 0,
      isDefault: false
    };
    setRoles([...roles, roleData]);
    setShowRoleModal(false);
    setNewRole({
      name: '',
      description: '',
      permissions: []
    });
  };

  const updateRole = (updatedRole: Role) => {
    setRoles(roles.map(r => r.id === updatedRole.id ? updatedRole : r));
    setEditingRole(null);
  };

  const deleteRole = (id: string) => {
    if (confirm('هل أنت متأكد من حذف هذا الدور؟')) {
      setRoles(roles.filter(r => r.id !== id));
    }
  };

  const togglePermission = (userId: string, permission: string) => {
    setUsers(users.map(user => {
      if (user.id === userId) {
        const permissions = user.permissions.includes(permission)
          ? user.permissions.filter(p => p !== permission)
          : [...user.permissions, permission];
        return { ...user, permissions };
      }
      return user;
    }));
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'نشط': return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200';
      case 'غير نشط': return 'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200';
      case 'معلق': return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200';
      default: return 'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200';
    }
  };

  const totalUsers = users.length;
  const activeUsers = users.filter(u => u.status === 'نشط').length;
  const totalRoles = roles.length;
  const systemAdmins = users.filter(u => u.role === 'مدير النظام').length;

  const handleEditUser = (user: User) => {
    setEditingUser(user);
    setNewUser({
      name: user.name,
      email: user.email,
      phone: user.phone,
      role: user.role,
      department: user.department,
      permissions: user.permissions
    });
    setShowUserModal(true);
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
            إدارة المستخدمين
            <span className="block text-4xl md:text-5xl text-green-700 dark:text-green-300 mt-2">
              إدارة الفرق والصلاحيات والأدوار
            </span>
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto leading-relaxed">
            منصة متكاملة لإدارة المستخدمين والأدوار والصلاحيات مع نظام أمان متقدم
          </p>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="flex flex-wrap gap-4 justify-center">
        <button 
          onClick={() => setShowUserModal(true)}
          className="btn-primary flex items-center space-x-2 space-x-reverse text-lg px-8 py-4"
        >
          <UserPlus className="h-6 w-6" />
          <span>إضافة مستخدم جديد</span>
        </button>
        <button 
          onClick={() => setShowRoleModal(true)}
          className="btn-secondary flex items-center space-x-2 space-x-reverse text-lg px-8 py-4"
        >
          <Shield className="h-6 w-6" />
          <span>إضافة دور جديد</span>
        </button>
        <button className="btn-outline flex items-center space-x-2 space-x-reverse text-lg px-8 py-4">
          <BarChart3 className="h-6 w-6" />
          <span>التقارير والإحصائيات</span>
        </button>
      </div>

      {/* Statistics Cards */}
      <div className="grid md:grid-cols-4 gap-6">
        <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-soft border border-gray-200 dark:border-gray-700">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600 dark:text-gray-400">إجمالي المستخدمين</p>
              <p className="text-3xl font-bold text-gray-900 dark:text-white">{totalUsers}</p>
            </div>
            <div className="w-12 h-12 bg-gradient-to-br from-green-100 to-green-200 dark:from-green-800 dark:to-green-900 rounded-xl flex items-center justify-center">
              <Users className="h-6 w-6 text-green-600 dark:text-green-400" />
            </div>
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-soft border border-gray-200 dark:border-gray-700">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600 dark:text-gray-400">المستخدمين النشطين</p>
              <p className="text-3xl font-bold text-green-700 dark:text-green-300">{activeUsers}</p>
            </div>
            <div className="w-12 h-12 bg-gradient-to-br from-green-100 to-green-200 dark:from-green-800 dark:to-green-900 rounded-xl flex items-center justify-center">
              <CheckCircle className="h-6 w-6 text-green-700 dark:text-green-300" />
            </div>
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-soft border border-gray-200 dark:border-gray-700">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600 dark:text-gray-400">إجمالي الأدوار</p>
              <p className="text-3xl font-bold text-green-700 dark:text-green-300">{totalRoles}</p>
            </div>
            <div className="w-12 h-12 bg-gradient-to-br from-green-100 to-green-200 dark:from-green-800 dark:to-green-900 rounded-xl flex items-center justify-center">
              <Shield className="h-6 w-6 text-green-700 dark:text-green-300" />
            </div>
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-soft border border-gray-200 dark:border-gray-700">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600 dark:text-gray-400">مديري النظام</p>
              <p className="text-3xl font-bold text-green-700 dark:text-green-300">{systemAdmins}</p>
            </div>
            <div className="w-12 h-12 bg-gradient-to-br from-green-100 to-green-200 dark:from-green-800 dark:to-green-900 rounded-xl flex items-center justify-center">
              <Key className="h-6 w-6 text-green-700 dark:text-green-300" />
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
              placeholder="البحث في المستخدمين..."
              className="w-full pl-10 pr-4 py-3 border border-gray-300 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 transition-all duration-200"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
        </div>

          <select
            className="px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
            value={filterRole}
            onChange={(e) => setFilterRole(e.target.value)}
          >
            <option value="الكل">كل الأدوار</option>
            {roles.map(role => (
              <option key={role.id} value={role.name}>{role.name}</option>
            ))}
          </select>
          
          <select
            className="px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
          >
            <option value="الكل">كل الحالات</option>
            <option value="نشط">نشط</option>
            <option value="غير نشط">غير نشط</option>
            <option value="معلق">معلق</option>
          </select>
        </div>
      </div>

      {/* Users Table */}
      <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-soft border border-gray-200 dark:border-gray-700 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full min-w-[700px]">
            <thead className="bg-gray-50 dark:bg-gray-700">
              <tr>
                <th className="px-3 sm:px-6 py-3 sm:py-4 text-right text-xs sm:text-sm font-semibold text-gray-700 dark:text-gray-300 whitespace-nowrap">المستخدم</th>
                <th className="px-3 sm:px-6 py-3 sm:py-4 text-right text-xs sm:text-sm font-semibold text-gray-700 dark:text-gray-300 whitespace-nowrap">البريد الإلكتروني</th>
                <th className="px-3 sm:px-6 py-3 sm:py-4 text-right text-xs sm:text-sm font-semibold text-gray-700 dark:text-gray-300 whitespace-nowrap">الدور</th>
                <th className="px-3 sm:px-6 py-3 sm:py-4 text-right text-xs sm:text-sm font-semibold text-gray-700 dark:text-gray-300 whitespace-nowrap">الحالة</th>
                <th className="px-3 sm:px-6 py-3 sm:py-4 text-right text-xs sm:text-sm font-semibold text-gray-700 dark:text-gray-300 whitespace-nowrap">آخر تسجيل دخول</th>
                <th className="px-3 sm:px-6 py-3 sm:py-4 text-right text-xs sm:text-sm font-semibold text-gray-700 dark:text-gray-300 whitespace-nowrap">الإجراءات</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
              {filteredUsers.map((user) => (
                <tr key={user.id} className="hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors duration-200">
                  <td className="px-3 sm:px-6 py-3 sm:py-4">
                    <div className="flex items-center space-x-3 space-x-reverse">
                      <div className="w-8 h-8 bg-gradient-to-br from-green-100 to-green-200 dark:from-green-800 dark:to-green-900 rounded-full flex items-center justify-center">
                        <User className="h-4 w-4 text-green-700 dark:text-green-300" />
                      </div>
                      <div>
                        <div className="text-xs sm:text-sm font-medium text-gray-900 dark:text-white">{user.name}</div>
                        <div className="text-xs text-gray-500 dark:text-gray-400">{user.email}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-3 sm:px-6 py-3 sm:py-4 text-xs sm:text-sm text-gray-900 dark:text-white">{user.email}</td>
                  <td className="px-3 sm:px-6 py-3 sm:py-4 text-xs sm:text-sm text-gray-900 dark:text-white">{user.role}</td>
                  <td className="px-3 sm:px-6 py-3 sm:py-4">
                    <span className={`inline-flex px-2 sm:px-3 py-1 text-xs font-medium rounded-full ${
                      user.status === 'نشط' 
                        ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200' 
                        : 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200'
                    }`}>
                      {user.status}
                    </span>
                  </td>
                  <td className="px-3 sm:px-6 py-3 sm:py-4 text-xs sm:text-sm text-gray-900 dark:text-white">{user.lastLogin}</td>
                  <td className="px-3 sm:px-6 py-3 sm:py-4 text-xs sm:text-sm font-medium">
                    <div className="flex items-center space-x-1 sm:space-x-2 space-x-reverse">
                      <button 
                        className="text-blue-600 hover:text-blue-900 dark:text-blue-400 dark:hover:text-blue-300 p-1"
                        onClick={() => handleEditUser(user)}
                      >
                        <Edit className="h-4 w-4" />
                      </button>
                      <button 
                        className="text-red-600 hover:text-red-900 dark:text-red-400 dark:hover:text-red-300 p-1"
                        onClick={() => deleteUser(user.id)}
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

      {/* Roles Section */}
      <div className="space-y-8">
        <div className="text-center">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
            إدارة الأدوار والصلاحيات
          </h2>
          <p className="text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            إدارة الأدوار والصلاحيات للمستخدمين مع نظام أمان متقدم
          </p>
        </div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {roles.map((role) => (
            <div
              key={role.id}
              className="group relative bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-soft border border-gray-200 dark:border-gray-700 hover:shadow-medium transition-all duration-300 transform hover:-translate-y-2"
            >
              {/* Decorative Corner */}
              <div className="absolute top-0 right-0 w-16 h-16 bg-gradient-to-br from-green-100 to-green-200 dark:from-green-800 dark:to-green-900 rounded-bl-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              
              <div className="relative z-10">
                <div className="flex items-center justify-between mb-4">
                  <div className="w-12 h-12 bg-gradient-to-br from-green-100 to-green-200 dark:from-green-800 dark:to-green-900 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                    <Shield className="h-6 w-6 text-green-600 dark:text-green-400" />
                  </div>
                  <div className="flex items-center space-x-2 space-x-reverse">
                    <button className="text-blue-600 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300">
                      <Edit className="h-4 w-4" />
                    </button>
                    <button 
                      className="text-red-600 hover:text-red-700 dark:text-red-400 dark:hover:text-red-300"
                      onClick={() => deleteRole(role.id)}
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </div>
                </div>
                
                <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-3">
                  {role.name}
                  {role.isDefault && (
                    <span className="ml-2 inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200">
                      افتراضي
                    </span>
                  )}
                </h3>
                
                <p className="text-gray-600 dark:text-gray-300 mb-4 text-sm leading-relaxed">
                  {role.description}
                </p>
                
                <div className="space-y-3">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-500 dark:text-gray-400">عدد المستخدمين:</span>
                    <span className="font-medium text-gray-700 dark:text-gray-300">{role.userCount}</span>
                  </div>
                  
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-500 dark:text-gray-400">الصلاحيات:</span>
                    <span className="font-medium text-gray-700 dark:text-gray-300">{role.permissions.length}</span>
        </div>
      </div>

                <div className="mt-4 pt-4 border-t border-gray-200 dark:border-gray-700">
                  <div className="flex flex-wrap gap-2">
                    {role.permissions.slice(0, 3).map((permission, index) => (
                      <span
                        key={index}
                        className="px-2 py-1 text-xs bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 rounded-lg"
                      >
                        {permission}
                      </span>
                    ))}
                    {role.permissions.length > 3 && (
                      <span className="px-2 py-1 text-xs bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 rounded-lg">
                        +{role.permissions.length - 3} أكثر
                      </span>
                    )}
                  </div>
                </div>
              </div>
            </div>
          ))}
          </div>
      </div>

      {/* User Modal */}
      {showUserModal && (
        <div className="modal-overlay">
          <div className="modal-content p-8 max-w-2xl">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white">إضافة مستخدم جديد</h3>
              <button
                onClick={() => setShowUserModal(false)}
                className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
              >
                <X className="h-6 w-6" />
              </button>
        </div>

          <div className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">الاسم الكامل</label>
                  <input
                    type="text"
                    className="input-field"
                    value={newUser.name}
                    onChange={(e) => setNewUser({...newUser, name: e.target.value})}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">البريد الإلكتروني</label>
                  <input
                    type="email"
                    className="input-field"
                    value={newUser.email}
                    onChange={(e) => setNewUser({...newUser, email: e.target.value})}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">رقم الهاتف</label>
                  <input
                    type="tel"
                    className="input-field"
                    value={newUser.phone}
                    onChange={(e) => setNewUser({...newUser, phone: e.target.value})}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">القسم</label>
                  <select
                    className="input-field"
                    value={newUser.department}
                    onChange={(e) => setNewUser({...newUser, department: e.target.value})}
                  >
                    <option value="">اختر القسم</option>
                    {departments.map(dept => (
                      <option key={dept} value={dept}>{dept}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">الدور</label>
                  <select
                    className="input-field"
                    value={newUser.role}
                    onChange={(e) => setNewUser({...newUser, role: e.target.value})}
                  >
                    <option value="">اختر الدور</option>
                    {roles.map(role => (
                      <option key={role.id} value={role.name}>{role.name}</option>
                    ))}
                  </select>
              </div>
            </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">الصلاحيات</label>
                <div className="grid md:grid-cols-2 gap-3">
                  {availablePermissions.map((permission) => (
                    <label key={permission} className="flex items-center space-x-2 space-x-reverse">
                      <input
                        type="checkbox"
                        className="rounded border-gray-300 text-green-700 focus:ring-green-600"
                        checked={newUser.permissions.includes(permission)}
                        onChange={(e) => {
                          if (e.target.checked) {
                            setNewUser({...newUser, permissions: [...newUser.permissions, permission]});
                          } else {
                            setNewUser({...newUser, permissions: newUser.permissions.filter(p => p !== permission)});
                          }
                        }}
                      />
                      <span className="text-sm text-gray-700 dark:text-gray-300">{permission}</span>
                    </label>
                  ))}
                </div>
              </div>
              
              <div className="flex justify-end space-x-3 space-x-reverse">
                <button
                  onClick={() => setShowUserModal(false)}
                  className="btn-secondary"
                >
                  إلغاء
                </button>
                <button
                  onClick={addUser}
                  className="btn-primary"
                >
                  إضافة المستخدم
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Role Modal */}
      {showRoleModal && (
        <div className="modal-overlay">
          <div className="modal-content p-8 max-w-2xl">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white">إضافة دور جديد</h3>
              <button
                onClick={() => setShowRoleModal(false)}
                className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
              >
                <X className="h-6 w-6" />
              </button>
          </div>

            <div className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">اسم الدور</label>
                  <input
                    type="text"
                    className="input-field"
                    value={newRole.name}
                    onChange={(e) => setNewRole({...newRole, name: e.target.value})}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">الوصف</label>
                  <input
                    type="text"
                    className="input-field"
                    value={newRole.description}
                    onChange={(e) => setNewRole({...newRole, description: e.target.value})}
                  />
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">الصلاحيات</label>
                <div className="grid md:grid-cols-2 gap-3">
                  {availablePermissions.map((permission) => (
                    <label key={permission} className="flex items-center space-x-2 space-x-reverse">
                      <input
                        type="checkbox"
                        className="rounded border-gray-300 text-green-700 focus:ring-green-600"
                        checked={newRole.permissions.includes(permission)}
                        onChange={(e) => {
                          if (e.target.checked) {
                            setNewRole({...newRole, permissions: [...newRole.permissions, permission]});
                          } else {
                            setNewRole({...newRole, permissions: newRole.permissions.filter(p => p !== permission)});
                          }
                        }}
                      />
                      <span className="text-sm text-gray-700 dark:text-gray-300">{permission}</span>
                    </label>
                  ))}
        </div>
      </div>

              <div className="flex justify-end space-x-3 space-x-reverse">
                <button
                  onClick={() => setShowRoleModal(false)}
                  className="btn-secondary"
                >
                  إلغاء
                </button>
                <button
                  onClick={addRole}
                  className="btn-primary"
                >
                  إضافة الدور
                </button>
        </div>
          </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default UsersSection; 