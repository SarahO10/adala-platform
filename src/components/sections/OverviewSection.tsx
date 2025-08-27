import React from 'react';
import { 
  FolderOpen, 
  Database, 
  Bot, 
  Users, 
  Shield, 
  TrendingUp,
  Clock,
  Award,
  CheckCircle,
  Star
} from 'lucide-react';

interface OverviewSectionProps {
  onSectionChange?: (sectionId: string) => void;
}

const OverviewSection: React.FC<OverviewSectionProps> = ({ onSectionChange }) => {
  const features = [
    {
      icon: <FolderOpen className="h-8 w-8" />,
      title: "تنظيم القضايا",
      description: "إدارة شاملة لجميع القضايا والملفات القانونية مع نظام تصنيف ذكي",
      sectionId: "cases",
      stats: "500+ قضية"
    },
    {
      icon: <Database className="h-8 w-8" />,
      title: "قاعدة البيانات",
      description: "مكتبة شاملة للقوانين واللوائح مع محرك بحث متقدم",
      sectionId: "database",
      stats: "10K+ وثيقة"
    },
    {
      icon: <Bot className="h-8 w-8" />,
      title: "المساعد الذكي",
      description: "ذكاء اصطناعي متقدم للاستشارات القانونية والمساعدة",
      sectionId: "ai",
      stats: "24/7 متاح"
    },
    {
      icon: <Users className="h-8 w-8" />,
      title: "إدارة المستخدمين",
      description: "نظام صلاحيات متقدم مع إدارة الفرق والمجموعات",
      sectionId: "users",
      stats: "100+ مستخدم"
    },
    {
      icon: <Shield className="h-8 w-8" />,
      title: "الأمان والحماية",
      description: "حماية متقدمة للبيانات مع تشفير عالي المستوى",
      sectionId: "overview",
      stats: "99.9% أمان"
    },
    {
      icon: <TrendingUp className="h-8 w-8" />,
      title: "التقارير والإحصائيات",
      description: "تقارير تفصيلية وتحليلات متقدمة للأداء",
      sectionId: "overview",
      stats: "تحليل فوري"
    }
  ];

  const stats = [
    { number: "500+", label: "قضية منظمة", icon: <FolderOpen className="h-6 w-6" /> },
    { number: "10K+", label: "وثيقة قانونية", icon: <Database className="h-6 w-6" /> },
    { number: "100+", label: "مستخدم نشط", icon: <Users className="h-6 w-6" /> },
    { number: "99.9%", label: "معدل الأمان", icon: <Shield className="h-6 w-6" /> }
  ];

  const handleFeatureClick = (sectionId: string) => {
    if (onSectionChange) {
      onSectionChange(sectionId);
    }
  };

  return (
    <div className="space-y-16">
      {/* Hero Section */}
      <div className="relative text-center space-y-8">
        {/* Decorative Shapes */}
        <div className="absolute top-0 left-0 w-32 h-32 bg-gradient-to-br from-green-200 to-green-300 rounded-full opacity-20 blur-3xl"></div>
        <div className="absolute top-20 right-0 w-24 h-24 bg-gradient-to-br from-green-300 to-green-400 rounded-full opacity-20 blur-2xl"></div>
        <div className="absolute bottom-0 left-1/4 w-20 h-20 bg-gradient-to-br from-green-400 to-green-500 rounded-full opacity-20 blur-xl"></div>
        
        <div className="relative z-10">
          <h1 className="text-5xl md:text-6xl font-bold text-gray-900 dark:text-white mb-6">
            منصة عدالة
            <span className="block text-4xl md:text-5xl text-green-700 dark:text-green-300 mt-2">
              المنصة القانونية المتكاملة
            </span>
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto leading-relaxed">
            منصة متكاملة لإدارة الممارسة القانونية في المملكة العربية السعودية. 
            تجمع بين التكنولوجيا المتقدمة والخبرة القانونية لتقديم حلول شاملة للمحامين والمؤسسات القانونية.
          </p>
          
          <div className="flex flex-wrap justify-center gap-4 mt-8">
            <button 
              onClick={() => onSectionChange && onSectionChange('cases')}
              className="btn-primary text-lg px-8 py-4"
            >
              ابدأ الآن
            </button>
            <button 
              onClick={() => onSectionChange && onSectionChange('pricing')}
              className="btn-outline text-lg px-8 py-4"
            >
              تعرف على الأسعار
            </button>
          </div>
        </div>
      </div>

      {/* Statistics Section */}
      <div className="relative">
        <div className="absolute inset-0 bg-gradient-to-r from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20 rounded-3xl"></div>
        <div className="relative bg-white dark:bg-gray-800 rounded-3xl p-8 shadow-soft border border-green-100 dark:border-green-800">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
              إحصائيات المنصة
            </h2>
            <p className="text-gray-600 dark:text-gray-300">
              أرقام تتحدث عن نجاح منصة عدالة
            </p>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="text-center group">
                <div className="w-16 h-16 bg-gradient-to-br from-green-100 to-green-200 dark:from-green-800 dark:to-green-900 rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300">
                  <div className="text-green-700 dark:text-green-300">
                    {stat.icon}
                  </div>
                </div>
                <div className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
                  {stat.number}
                </div>
                <div className="text-sm text-gray-600 dark:text-gray-400">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Features Grid */}
      <div className="space-y-8">
        <div className="text-center">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
            المميزات الرئيسية
          </h2>
          <p className="text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            اكتشف القوة الكاملة لمنصة عدالة مع مجموعة شاملة من الميزات المتقدمة
          </p>
        </div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div
              key={index}
              className="group relative bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-soft border border-gray-200 dark:border-gray-700 hover:shadow-medium transition-all duration-300 transform hover:-translate-y-2 cursor-pointer"
              onClick={() => handleFeatureClick(feature.sectionId)}
            >
              {/* Decorative Corner */}
              <div className="absolute top-0 right-0 w-16 h-16 bg-gradient-to-br from-green-100 to-green-200 dark:from-green-800 dark:to-green-900 rounded-bl-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              
              <div className="relative z-10">
                <div className="w-16 h-16 bg-gradient-to-br from-green-100 to-green-200 dark:from-green-800 dark:to-green-900 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                  <div className="text-green-600 dark:text-green-400">
                    {feature.icon}
                  </div>
                </div>
                
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3">
                  {feature.title}
                </h3>
                
                <p className="text-gray-600 dark:text-gray-300 mb-4 leading-relaxed">
                  {feature.description}
                </p>
                
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium text-green-600 dark:text-green-400">
                    {feature.stats}
                  </span>
                  <div className="w-8 h-8 bg-green-100 dark:bg-green-800 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                    <CheckCircle className="h-4 w-4 text-green-600 dark:text-green-400" />
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Why Choose Us Section */}
      <div className="relative bg-gradient-to-r from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20 rounded-3xl p-12">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
            لماذا تختار منصة عدالة؟
          </h2>
          <p className="text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            نقدم حلولاً قانونية متكاملة تجمع بين التكنولوجيا المتقدمة والخبرة القانونية
          </p>
        </div>
        
        <div className="grid md:grid-cols-3 gap-8">
          <div className="text-center">
            <div className="w-20 h-20 bg-gradient-to-br from-green-500 to-green-600 rounded-2xl flex items-center justify-center mx-auto mb-6">
              <Award className="h-10 w-10 text-white" />
            </div>
            <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3">
              الجودة العالية
            </h3>
            <p className="text-gray-600 dark:text-gray-300">
              نلتزم بأعلى معايير الجودة في جميع خدماتنا
            </p>
          </div>
          
          <div className="text-center">
            <div className="w-20 h-20 bg-gradient-to-br from-green-500 to-green-600 rounded-2xl flex items-center justify-center mx-auto mb-6">
              <Clock className="h-10 w-10 text-white" />
            </div>
            <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3">
              الدعم المستمر
            </h3>
            <p className="text-gray-600 dark:text-gray-300">
              دعم فني متواصل على مدار الساعة
            </p>
          </div>
          
          <div className="text-center">
            <div className="w-20 h-20 bg-gradient-to-br from-green-500 to-green-600 rounded-2xl flex items-center justify-center mx-auto mb-6">
              <Star className="h-10 w-10 text-white" />
            </div>
            <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3">
              الخبرة المثبتة
            </h3>
            <p className="text-gray-600 dark:text-gray-300">
              سنوات من الخبرة في المجال القانوني
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OverviewSection; 