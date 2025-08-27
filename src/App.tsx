import React, { useState } from 'react';
import Header from './components/Header';

import OverviewSection from './components/sections/OverviewSection';
import CasesSection from './components/sections/CasesSection';
import DatabaseSection from './components/sections/DatabaseSection';
import AISection from './components/sections/AISection';
import UsersSection from './components/sections/UsersSection';
import PricingSection from './components/sections/PricingSection';

interface Section {
  id: string;
  title: string;
  color: string;
  icon: string;
  description: string;
  content: React.ReactNode;
}

const App: React.FC = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('overview');

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const handleSectionChange = (sectionId: string) => {
    setActiveSection(sectionId);
    setIsSidebarOpen(false);
  };

  const sections: Section[] = [
    {
      id: 'overview',
      title: 'نظرة عامة',
      color: 'blue',
      icon: 'eye',
      description: 'نظرة شاملة على منصة عدالة',
      content: <OverviewSection onSectionChange={handleSectionChange} />
    },
    {
      id: 'cases',
      title: 'تنظيم القضايا',
      color: 'purple',
      icon: 'folder',
      description: 'إدارة القضايا والملفات',
      content: <CasesSection />
    },
    {
      id: 'database',
      title: 'قاعدة البيانات',
      color: 'teal',
      icon: 'database',
      description: 'مكتبة الوثائق القانونية',
      content: <DatabaseSection />
    },
    {
      id: 'ai',
      title: 'المساعد الذكي',
      color: 'pink',
      icon: 'bot',
      description: 'استشارات قانونية ذكية',
      content: <AISection />
    },
    {
      id: 'users',
      title: 'إدارة المستخدمين',
      color: 'green',
      icon: 'users',
      description: 'إدارة الفرق والصلاحيات',
      content: <UsersSection />
    },
    {
      id: 'pricing',
      title: 'الأسعار',
      color: 'orange',
      icon: 'dollar',
      description: 'خطط الاشتراك',
      content: <PricingSection />
    }
  ];

  const getActiveSectionContent = () => {
    const section = sections.find(s => s.id === activeSection);
    return section ? section.content : <OverviewSection onSectionChange={handleSectionChange} />;
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <Header 
        isSidebarOpen={isSidebarOpen} 
        toggleSidebar={toggleSidebar} 
        onSectionChange={handleSectionChange} 
        activeSection={activeSection} 
      />
      
      <main className="p-6 lg:p-8">
        {getActiveSectionContent()}
      </main>
    </div>
  );
};

export default App; 