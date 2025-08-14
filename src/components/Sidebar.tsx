import React from 'react';
import { 
  Eye, 
  FolderOpen, 
  Database, 
  Bot, 
  Users, 
  DollarSign,
  X
} from 'lucide-react';

interface Section {
  id: string;
  title: string;
  color: string;
  icon: string;
  description: string;
}

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
  sections: Section[];
  activeSection: string;
  onSectionChange: (sectionId: string) => void;
}

const Sidebar: React.FC<SidebarProps> = ({ isOpen, onClose, sections, activeSection, onSectionChange }) => {
  const getIcon = (iconName: string) => {
    switch (iconName) {
      case 'eye': return <Eye className="h-5 w-5" />;
      case 'folder': return <FolderOpen className="h-5 w-5" />;
      case 'database': return <Database className="h-5 w-5" />;
      case 'bot': return <Bot className="h-5 w-5" />;
      case 'users': return <Users className="h-5 w-5" />;
      case 'dollar': return <DollarSign className="h-5 w-5" />;
      default: return <Eye className="h-5 w-5" />;
    }
  };

  const getColorClasses = (color: string, type: 'bg' | 'text' | 'border', shade: string = '500') => {
    switch (color) {
      case 'blue': return `${type}-blue-${shade}`;
      case 'purple': return `${type}-purple-${shade}`;
      case 'teal': return `${type}-teal-${shade}`;
      case 'pink': return `${type}-pink-${shade}`;
      case 'green': return `${type}-green-${shade}`;
      case 'orange': return `${type}-orange-${shade}`;
      default: return `${type}-green-${shade}`;
    }
  };

  return (
    <>
      {/* Overlay */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
          onClick={onClose}
        />
      )}

      {/* Sidebar */}
      <div className={`
        fixed inset-y-0 right-0 z-50 w-64 bg-white dark:bg-gray-900 border-l border-gray-200 dark:border-gray-800 transform transition-transform duration-300 ease-in-out
        ${isOpen ? 'translate-x-0' : 'translate-x-full'}
        lg:translate-x-0 lg:static lg:inset-0
      `}>
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200 dark:border-gray-800">
          <div className="flex items-center space-x-3 space-x-reverse">
            <div className="w-8 h-8 bg-gradient-to-br from-green-600 to-green-700 dark:from-green-500 dark:to-green-600 rounded-lg flex items-center justify-center">
              <Eye className="h-5 w-5 text-white" />
            </div>
            <h2 className="text-lg font-bold text-gray-900 dark:text-white">القائمة</h2>
          </div>
          <button
            onClick={onClose}
            className="lg:hidden p-2 rounded-lg text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors duration-200"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Navigation */}
        <div className="flex-1 overflow-y-auto py-6">
          <nav className="space-y-2 px-4">
            {sections.map((section) => (
              <button
                key={section.id}
                onClick={() => onSectionChange(section.id)}
                className={`
                  w-full flex items-center space-x-3 space-x-reverse p-4 rounded-xl text-right transition-all duration-200 group
                  ${activeSection === section.id
                    ? `${getColorClasses(section.color, 'bg', '100')} ${getColorClasses(section.color, 'text', '700')} dark:${getColorClasses(section.color, 'bg', '800')} dark:${getColorClasses(section.color, 'text', '300')} border-r-4 ${getColorClasses(section.color, 'border', '500')} shadow-md`
                    : 'text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-800 hover:text-gray-900 dark:hover:text-white'
                  }
                `}
              >
                {/* Section Icon */}
                <div className={`
                  flex items-center justify-center w-10 h-10 rounded-lg transition-all duration-200
                  ${activeSection === section.id
                    ? `${getColorClasses(section.color, 'bg', '200')} ${getColorClasses(section.color, 'text', '600')} dark:${getColorClasses(section.color, 'bg', '700')} dark:${getColorClasses(section.color, 'text', '400')}`
                    : 'bg-gray-100 dark:bg-gray-800 text-gray-500 dark:text-gray-400 group-hover:bg-gray-200 dark:group-hover:bg-gray-700'
                  }
                `}>
                  {getIcon(section.icon)}
                </div>

                {/* Section Info */}
                <div className="flex-1 text-right">
                  <div className="text-sm font-medium">{section.title}</div>
                  <div className="text-xs text-gray-500 dark:text-gray-400 mt-1">{section.description}</div>
                </div>
              </button>
            ))}
          </nav>
        </div>

        {/* Footer */}
        <div className="p-4 border-t border-gray-200 dark:border-gray-800">
          <div className="text-center">
            <div className="w-8 h-8 bg-gradient-to-br from-green-600 to-green-700 dark:from-green-500 dark:to-green-600 rounded-lg flex items-center justify-center mx-auto mb-2">
              <Eye className="h-5 w-5 text-white" />
            </div>
            <p className="text-xs text-gray-500 dark:text-gray-400">منصة عدالة v1.0</p>
          </div>
        </div>
      </div>
    </>
  );
};

export default Sidebar; 