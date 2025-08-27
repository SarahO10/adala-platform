import React, { useState } from 'react';
import { 
  DollarSign, 
  Check, 
  Star, 
  Zap, 
  Shield, 
  Users,
  Database,
  Bot,
  FileText,
  TrendingUp,
  Clock,
  Award,
  X,
  Phone,
  Mail,
  MessageSquare,
  Calendar,
  BarChart3,
  Settings,
  Globe,
  Lock,
  Unlock
} from 'lucide-react';

interface PricingPlan {
  id: string;
  name: string;
  price: number;
  originalPrice?: number;
  currency: string;
  period: string;
  description: string;
  features: string[];
  isPopular?: boolean;
  isRecommended?: boolean;
  color: string;
  icon: React.ReactNode;
}

const PricingSection: React.FC = () => {
  const [billingCycle, setBillingCycle] = useState<'monthly' | 'yearly'>('monthly');
  const [selectedPlan, setSelectedPlan] = useState<string | null>(null);
  const [showContactModal, setShowContactModal] = useState(false);

  const plans: PricingPlan[] = [
    {
      id: 'basic',
      name: 'الخطة الأساسية',
      price: billingCycle === 'monthly' ? 199 : 1990,
      originalPrice: billingCycle === 'monthly' ? 299 : 2990,
      currency: 'ر.س',
      period: billingCycle === 'monthly' ? 'شهرياً' : 'سنوياً',
      description: 'مثالية للمحامين المستقلين والمكاتب الصغيرة',
      features: [
        'إدارة القضايا (حتى 50 قضية)',
        'قاعدة البيانات القانونية',
        'المساعد الذكي (100 استشارة شهرياً)',
        'إدارة المستخدمين (حتى 3 مستخدمين)',
        'التقارير الأساسية',
        'الدعم عبر البريد الإلكتروني',
        'نسخ احتياطية أسبوعية',
        'تحديثات النظام'
      ],
                      color: 'from-green-700 to-green-800',
      icon: <FileText className="h-8 w-8" />
    },
    {
      id: 'professional',
      name: 'الخطة المهنية',
      price: billingCycle === 'monthly' ? 399 : 3990,
      originalPrice: billingCycle === 'monthly' ? 599 : 5990,
      currency: 'ر.س',
      period: billingCycle === 'monthly' ? 'شهرياً' : 'سنوياً',
      description: 'مثالية للمكاتب القانونية المتوسطة',
      isPopular: true,
      isRecommended: true,
      features: [
        'إدارة القضايا (حتى 200 قضية)',
        'قاعدة البيانات القانونية المتقدمة',
        'المساعد الذكي (500 استشارة شهرياً)',
        'إدارة المستخدمين (حتى 10 مستخدمين)',
        'التقارير المتقدمة والتحليلات',
        'الدعم عبر الهاتف والبريد الإلكتروني',
        'نسخ احتياطية يومية',
        'تكامل مع Microsoft Teams',
        'إدارة الصلاحيات المتقدمة',
        'تدريب المستخدمين'
      ],
      color: 'from-green-700 to-green-800',
      icon: <TrendingUp className="h-8 w-8" />
    },
    {
      id: 'enterprise',
      name: 'الخطة المؤسسية',
      price: billingCycle === 'monthly' ? 799 : 7990,
      originalPrice: billingCycle === 'monthly' ? 1199 : 11990,
      currency: 'ر.س',
      period: billingCycle === 'monthly' ? 'شهرياً' : 'سنوياً',
      description: 'مثالية للمكاتب القانونية الكبيرة والمؤسسات',
      features: [
        'إدارة القضايا (غير محدود)',
        'قاعدة البيانات القانونية الشاملة',
        'المساعد الذكي (غير محدود)',
        'إدارة المستخدمين (غير محدود)',
        'التقارير المتقدمة والذكاء الاصطناعي',
        'الدعم المخصص 24/7',
        'نسخ احتياطية فورية',
        'تكامل مع جميع الأنظمة',
        'إدارة الصلاحيات المتقدمة',
        'تدريب شامل للمستخدمين',
        'استشارات تقنية مخصصة',
        'API متقدم للتطوير'
      ],
      color: 'from-green-800 to-green-900',
      icon: <Globe className="h-8 w-8" />
    }
  ];

  const savings = billingCycle === 'yearly' ? 20 : 0;
  const features = [
    {
      icon: <Shield className="h-6 w-6" />,
      title: "أمان متقدم",
      description: "تشفير عالي المستوى وحماية شاملة للبيانات القانونية"
    },
    {
      icon: <Zap className="h-6 w-6" />,
      title: "أداء عالي",
      description: "سرعة استجابة عالية مع دعم لجميع الأجهزة"
    },
    {
      icon: <Users className="h-6 w-6" />,
      title: "دعم فني",
      description: "فريق دعم متخصص على مدار الساعة"
    },
    {
      icon: <Database className="h-6 w-6" />,
      title: "نسخ احتياطية",
      description: "نسخ احتياطية تلقائية وآمنة للبيانات"
    }
  ];

  const testimonials = [
    {
      name: "أحمد محمد",
      role: "محامي",
      company: "مكتب العدالة",
      content: "منصة ممتازة ساعدتني في تنظيم عملي القانوني بشكل كبير",
      rating: 5
    },
    {
      name: "فاطمة علي",
      role: "مدير مكتب",
      company: "مكتب الحقوق",
      content: "التكامل مع Microsoft Teams سهل علينا العمل كثيراً",
      rating: 5
    },
    {
      name: "محمد السعد",
      role: "محامي",
      company: "مكتب القانون",
      content: "المساعد الذكي يوفر علينا الكثير من الوقت والجهد",
      rating: 5
    }
  ];

  const handlePlanSelect = (planId: string) => {
    setSelectedPlan(planId);
    setShowContactModal(true);
  };

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star
        key={i}
        className={`h-4 w-4 ${
          i < rating ? 'text-yellow-400 fill-current' : 'text-gray-300'
        }`}
      />
    ));
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
            خطط الاشتراك
            <span className="block text-4xl md:text-5xl text-green-700 dark:text-green-300 mt-2">
              اختر الخطة المناسبة لمكتبك القانوني
            </span>
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto leading-relaxed">
            خطط مرنة ومتنوعة تناسب جميع أحجام المكاتب القانونية مع مميزات متقدمة
          </p>
        </div>
      </div>

      {/* Billing Toggle */}
      <div className="flex justify-center">
        <div className="bg-white dark:bg-gray-800 rounded-2xl p-2 shadow-soft border border-gray-200 dark:border-gray-700">
          <div className="flex items-center space-x-2 space-x-reverse">
            <button
              onClick={() => setBillingCycle('monthly')}
              className={`px-6 py-3 rounded-xl text-sm font-medium transition-all duration-200 ${
                billingCycle === 'monthly'
                  ? 'bg-green-500 text-white shadow-lg'
                  : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white'
              }`}
            >
              الدفع الشهري
            </button>
            <button
              onClick={() => setBillingCycle('yearly')}
              className={`px-6 py-3 rounded-xl text-sm font-medium transition-all duration-200 ${
                billingCycle === 'yearly'
                  ? 'bg-green-500 text-white shadow-lg'
                  : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white'
              }`}
            >
              الدفع السنوي
              {billingCycle === 'yearly' && (
                <span className="ml-2 inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200">
                  توفير {savings}%
                </span>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Pricing Plans */}
      <div className="grid md:grid-cols-3 gap-8">
        {plans.map((plan) => (
          <div
            key={plan.id}
            className={`group relative bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-soft border border-gray-200 dark:border-gray-700 hover:shadow-medium transition-all duration-300 transform hover:-translate-y-2 ${
              plan.isPopular ? 'ring-2 ring-green-500 ring-offset-4 dark:ring-offset-gray-900' : ''
            }`}
          >
            {/* Popular Badge */}
            {plan.isPopular && (
              <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                <div className="bg-gradient-to-r from-green-500 to-green-600 text-white px-6 py-2 rounded-full text-sm font-medium shadow-lg">
                  الأكثر شعبية
                </div>
              </div>
            )}

            {/* Recommended Badge */}
            {plan.isRecommended && (
              <div className="absolute -top-4 right-4">
                <div className="bg-gradient-to-r from-green-700 to-green-800 text-white px-4 py-2 rounded-full text-sm font-medium shadow-lg">
                  موصى به
                </div>
              </div>
            )}

            {/* Decorative Corner */}
            <div className={`absolute top-0 right-0 w-16 h-16 bg-gradient-to-br ${plan.color} rounded-bl-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300`}></div>
            
            <div className="relative z-10">
              {/* Plan Header */}
              <div className="text-center mb-8">
                <div className={`w-20 h-20 bg-gradient-to-br ${plan.color} rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300`}>
                  <div className="text-white">
                    {plan.icon}
                  </div>
                </div>
                
                <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
                  {plan.name}
                </h3>
                
                <p className="text-gray-600 dark:text-gray-300 mb-6">
                  {plan.description}
                </p>
                
                <div className="mb-6">
                  <div className="flex items-baseline justify-center space-x-2 space-x-reverse">
                    <span className="text-4xl font-bold text-gray-900 dark:text-white">
                      {plan.price}
                    </span>
                    <span className="text-xl text-gray-600 dark:text-gray-400">
                      {plan.currency}
                    </span>
                  </div>
                  <div className="text-gray-600 dark:text-gray-400">
                    {plan.period}
                  </div>
                  {plan.originalPrice && (
                    <div className="mt-2">
                      <span className="text-lg text-gray-500 dark:text-gray-400 line-through">
                        {plan.originalPrice} {plan.currency}
                      </span>
                    </div>
                  )}
                </div>
              </div>

              {/* Plan Features */}
              <div className="space-y-4 mb-8">
                {plan.features.map((feature, index) => (
                  <div key={index} className="flex items-center space-x-3 space-x-reverse">
                    <div className="w-5 h-5 bg-green-100 dark:bg-green-900/20 rounded-full flex items-center justify-center flex-shrink-0">
                      <Check className="h-3 w-3 text-green-600 dark:text-green-400" />
                    </div>
                    <span className="text-sm text-gray-700 dark:text-gray-300">
                      {feature}
                    </span>
                  </div>
                ))}
              </div>

              {/* Plan Action */}
              <button
                onClick={() => handlePlanSelect(plan.id)}
                className={`w-full py-3 px-6 rounded-xl font-medium transition-all duration-200 transform hover:scale-105 ${
                  plan.isPopular
                    ? 'bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white shadow-lg hover:shadow-xl'
                    : 'bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-white hover:bg-gray-200 dark:hover:bg-gray-600'
                }`}
              >
                {plan.isPopular ? 'ابدأ الآن' : 'اختيار الخطة'}
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Features Section */}
      <div className="bg-white dark:bg-gray-800 rounded-2xl p-12 shadow-soft border border-gray-200 dark:border-gray-700">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
            مميزات مشتركة في جميع الخطط
          </h2>
          <p className="text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            جميع الخطط تتضمن هذه المميزات الأساسية مع إمكانية الترقية في أي وقت
          </p>
        </div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <div key={index} className="text-center group">
              <div className="w-16 h-16 bg-gradient-to-br from-green-100 to-green-200 dark:from-green-800 dark:to-green-900 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300">
                <div className="text-green-600 dark:text-green-400">
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
          ))}
        </div>
      </div>

      {/* Testimonials */}
      <div className="space-y-8">
        <div className="text-center">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
            آراء العملاء
          </h2>
          <p className="text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            انضم إلى آلاف المحامين والمكاتب القانونية الذين يثقون بمنصة عدالة
          </p>
        </div>
        
        <div className="grid md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <div
              key={index}
              className="group relative bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-soft border border-gray-200 dark:border-gray-700 hover:shadow-medium transition-all duration-300 transform hover:-translate-y-2"
            >
              {/* Decorative Corner */}
              <div className="absolute top-0 right-0 w-16 h-16 bg-gradient-to-br from-green-100 to-green-200 dark:from-green-800 dark:to-green-900 rounded-bl-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              
              <div className="relative z-10">
                <div className="flex items-center space-x-2 space-x-reverse mb-4">
                  {renderStars(testimonial.rating)}
                </div>
                
                <p className="text-gray-700 dark:text-gray-300 mb-6 leading-relaxed">
                  "{testimonial.content}"
                </p>
                
                <div className="flex items-center space-x-3 space-x-reverse">
                  <div className="w-12 h-12 bg-gradient-to-br from-green-500 to-green-600 rounded-full flex items-center justify-center">
                    <span className="text-white font-semibold text-lg">
                      {testimonial.name.split(' ').map(n => n[0]).join('')}
                    </span>
                  </div>
                  <div>
                    <div className="font-semibold text-gray-900 dark:text-white">
                      {testimonial.name}
                    </div>
                    <div className="text-sm text-gray-600 dark:text-gray-400">
                      {testimonial.role} - {testimonial.company}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* CTA Section */}
      <div className="bg-gradient-to-r from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20 rounded-3xl p-12 text-center">
        <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
          ابدأ رحلتك مع منصة عدالة اليوم
        </h2>
        <p className="text-gray-600 dark:text-gray-300 max-w-2xl mx-auto mb-8">
          انضم إلى آلاف المحامين والمكاتب القانونية الذين يثقون بمنصة عدالة لإدارة ممارستهم القانونية
        </p>
        
        <div className="flex flex-wrap gap-4 justify-center">
          <button 
            onClick={() => setShowContactModal(true)}
            className="btn-primary text-lg px-8 py-4"
          >
            ابدأ التجربة المجانية
          </button>
          <button className="btn-outline text-lg px-8 py-4">
            تحدث مع فريق المبيعات
          </button>
        </div>
        
        <p className="text-sm text-gray-500 dark:text-gray-400 mt-6">
          لا تحتاج بطاقة ائتمان • تجربة مجانية لمدة 14 يوم
        </p>
      </div>

      {/* Contact Modal */}
      {showContactModal && (
        <div className="modal-overlay">
          <div className="modal-content p-8 max-w-2xl">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white">
                {selectedPlan ? `الاشتراك في ${plans.find(p => p.id === selectedPlan)?.name}` : 'تواصل معنا'}
              </h3>
              <button
                onClick={() => setShowContactModal(false)}
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
                    placeholder="أدخل اسمك الكامل"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">البريد الإلكتروني</label>
                  <input
                    type="email"
                    className="input-field"
                    placeholder="أدخل بريدك الإلكتروني"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">رقم الهاتف</label>
                  <input
                    type="tel"
                    className="input-field"
                    placeholder="أدخل رقم هاتفك"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">اسم المكتب</label>
                  <input
                    type="text"
                    className="input-field"
                    placeholder="أدخل اسم مكتبك"
                  />
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">رسالتك</label>
                <textarea
                  className="input-field resize-none"
                  rows={4}
                  placeholder="اكتب رسالتك هنا..."
                />
              </div>
              
              <div className="flex justify-end space-x-3 space-x-reverse">
                <button
                  onClick={() => setShowContactModal(false)}
                  className="btn-secondary"
                >
                  إلغاء
                </button>
                <button className="btn-primary">
                  إرسال الرسالة
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default PricingSection; 