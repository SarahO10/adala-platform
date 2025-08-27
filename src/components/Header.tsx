import React from 'react';
import { Menu, Bell, User, Search as SearchIcon, Scale } from 'lucide-react';
import ThemeToggle from './ThemeToggle';

interface HeaderProps {
  isSidebarOpen: boolean;
  toggleSidebar: () => void;
  onSectionChange: (sectionId: string) => void;
  activeSection: string;
}

const Header: React.FC<HeaderProps> = ({ isSidebarOpen, toggleSidebar, onSectionChange, activeSection }) => {
  return (
    <header className="bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-800 sticky top-0 z-50 shadow-sm">
      <div className="w-full px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Left side - Logo and Menu */}
          <div className="flex items-center">
            <button
              onClick={toggleSidebar}
              className="p-2 rounded-lg text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 transition-all duration-200 lg:hidden mr-4"
              aria-label="Toggle sidebar"
            >
              <Menu className="h-6 w-6" />
            </button>
            
            <div className="flex items-center space-x-3 space-x-reverse">
              <button
                onClick={() => onSectionChange('overview')}
                className="w-12 h-12 bg-gradient-to-br from-green-800 to-green-900 dark:from-green-700 dark:to-green-800 rounded-xl flex items-center justify-center shadow-lg hover:shadow-xl transition-all duration-200"
              >
                <Scale className="h-7 w-7 text-white" />
              </button>
              <div className="hidden sm:block mr-3">
                <h1 className="text-xl font-bold text-gray-900 dark:text-white">منصة عدالة</h1>
                <p className="text-sm text-gray-500 dark:text-gray-400">المنصة القانونية المتكاملة</p>
              </div>
            </div>
          </div>

          {/* Center - Navigation */}
          <nav className="hidden md:flex space-x-4 space-x-reverse">
            <button
              onClick={() => onSectionChange('overview')}
              className={`px-4 py-2 text-sm font-medium rounded-lg transition-all duration-200 ${
                activeSection === 'overview' 
                  ? 'text-green-800 dark:text-green-200 bg-green-100 dark:bg-green-900/40 border border-green-400 dark:border-green-600' 
                  : 'text-gray-700 dark:text-gray-300 hover:text-green-800 dark:hover:text-green-200 hover:bg-green-50 dark:hover:bg-green-900/30'
              }`}
            >
              نظرة عامة
            </button>
            <button
              onClick={() => onSectionChange('cases')}
              className={`px-4 py-2 text-sm font-medium rounded-lg transition-all duration-200 ${
                activeSection === 'cases' 
                  ? 'text-green-800 dark:text-green-200 bg-green-100 dark:bg-green-900/40 border border-green-400 dark:border-green-600' 
                  : 'text-gray-700 dark:text-gray-300 hover:text-green-800 dark:hover:text-green-200 hover:bg-green-50 dark:hover:bg-green-900/30'
              }`}
            >
              تنظيم القضايا
            </button>
            <button
              onClick={() => onSectionChange('database')}
              className={`px-4 py-2 text-sm font-medium rounded-lg transition-all duration-200 ${
                activeSection === 'database' 
                  ? 'text-green-800 dark:text-green-200 bg-green-100 dark:bg-green-900/40 border border-green-400 dark:border-green-600' 
                  : 'text-gray-700 dark:text-gray-300 hover:text-green-800 dark:hover:text-green-200 hover:bg-green-50 dark:hover:bg-green-900/30'
              }`}
            >
              قاعدة البيانات
            </button>
            <button
              onClick={() => onSectionChange('ai')}
              className={`px-4 py-2 text-sm font-medium rounded-lg transition-all duration-200 ${
                activeSection === 'ai' 
                  ? 'text-green-800 dark:text-green-200 bg-green-100 dark:bg-green-900/40 border border-green-400 dark:border-green-600' 
                  : 'text-gray-700 dark:text-gray-300 hover:text-green-800 dark:hover:text-green-200 hover:bg-green-50 dark:hover:bg-green-900/30'
              }`}
            >
              المساعد الذكي
            </button>
            <button
              onClick={() => onSectionChange('users')}
              className={`px-4 py-2 text-sm font-medium rounded-lg transition-all duration-200 ${
                activeSection === 'users' 
                  ? 'text-green-800 dark:text-green-200 bg-green-100 dark:bg-green-900/40 border border-green-400 dark:border-green-600' 
                  : 'text-gray-700 dark:text-gray-300 hover:text-green-800 dark:hover:text-green-200 hover:bg-green-50 dark:hover:bg-green-900/30'
              }`}
            >
              إدارة المستخدمين
            </button>
            <button
              onClick={() => onSectionChange('pricing')}
              className={`px-4 py-2 text-sm font-medium rounded-lg transition-all duration-200 ${
                activeSection === 'pricing' 
                  ? 'text-green-800 dark:text-green-200 bg-green-100 dark:bg-green-900/40 border border-green-400 dark:border-green-600' 
                  : 'text-gray-700 dark:text-gray-300 hover:text-green-800 dark:hover:text-green-200 hover:bg-green-50 dark:hover:bg-green-900/30'
              }`}
            >
              الأسعار
            </button>
          </nav>

          {/* Right side - Actions */}
          <div className="flex items-center space-x-3 space-x-reverse">
            {/* Search */}
            <div className="relative hidden sm:block">
              <SearchIcon className="h-5 w-5 absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 dark:text-gray-500" />
              <input
                type="text"
                placeholder="بحث..."
                className="pl-10 pr-4 py-2 w-64 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-green-700 focus:border-transparent bg-white dark:bg-gray-800 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 transition-all duration-200"
              />
            </div>

            {/* Theme Toggle */}
            <ThemeToggle />

            {/* Notifications */}
            <button className="relative p-2 rounded-lg text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 transition-all duration-200">
              <Bell className="h-6 w-6" />
              <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full animate-pulse"></span>
            </button>

            {/* User Menu */}
            <button className="flex items-center space-x-2 space-x-reverse p-2 rounded-lg text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 transition-all duration-200">
              <div className="w-8 h-8 bg-gradient-to-br from-green-800 to-green-900 rounded-full flex items-center justify-center">
                <User className="h-5 w-5 text-white" />
              </div>
              <span className="hidden sm:block text-sm font-medium">المستخدم</span>
            </button>

            {/* Free Trial Button */}
            <button 
              className="hidden lg:block bg-gradient-to-r from-green-800 to-green-900 hover:from-green-900 hover:to-green-950 text-white font-medium py-2 px-6 rounded-lg transition-all duration-200 transform hover:scale-105 hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-green-700 focus:ring-offset-2 dark:focus:ring-offset-gray-900"
              onClick={() => onSectionChange('pricing')}
            >
              تجربة مجانية
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header; 