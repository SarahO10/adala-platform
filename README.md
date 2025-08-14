# منصة عدالة - المنصة القانونية المتكاملة
# Adala Platform - Integrated Legal Platform

## 🏛️ نظرة عامة | Overview

منصة عدالة هي منصة قانونية متكاملة مصممة خصيصاً للمحامين والمكاتب القانونية في المملكة العربية السعودية. توفر المنصة حلاً شاملاً لإدارة القضايا، قاعدة البيانات القانونية، المساعد الذكي، وإدارة المستخدمين.

Adala Platform is an integrated legal platform specifically designed for lawyers and law firms in Saudi Arabia. The platform provides a comprehensive solution for case management, legal database, AI assistant, and user management.

## ✨ الميزات الرئيسية | Key Features

### 🎯 إدارة القضايا | Case Management
- إنشاء وإدارة القضايا القانونية
- تتبع حالة القضايا والأولويات
- جدولة الجلسات والتذكيرات
- إدارة العملاء والملفات

### 📚 قاعدة البيانات القانونية | Legal Database
- مكتبة شاملة للوثائق القانونية
- بحث متقدم في المحتوى
- تصنيف ذكي للمستندات
- إمكانية التحميل والمشاركة

### 🤖 المساعد الذكي | AI Assistant
- استشارات قانونية ذكية
- إجابات على الأسئلة القانونية
- مساعدة في صياغة المستندات
- محادثات تفاعلية

### 👥 إدارة المستخدمين | User Management
- نظام أدوار وصلاحيات متقدم
- إدارة الفرق والمجموعات
- تتبع النشاطات والإحصائيات
- أمان عالي المستوى

### 💰 نظام الأسعار | Pricing System
- خطط مرنة ومتنوعة
- فواتير شهرية وسنوية
- إدارة الاشتراكات
- دعم متعدد المستويات

## 🚀 التقنيات المستخدمة | Technologies Used

### Frontend
- **React 18** - مكتبة واجهة المستخدم
- **TypeScript** - لغة البرمجة الآمنة
- **Tailwind CSS** - إطار العمل للتصميم
- **Vite** - أداة البناء السريعة
- **Lucide React** - أيقونات جميلة

### Backend & Database
- **MySQL 8.0** - قاعدة البيانات الرئيسية
- **Node.js** - بيئة التشغيل
- **Express.js** - إطار العمل للخادم

### Features
- **Dark/Light Mode** - الوضع المظلم والفاتح
- **RTL Support** - دعم اللغة العربية
- **Responsive Design** - تصميم متجاوب
- **Professional UI/UX** - واجهة احترافية

## 📦 التثبيت والتشغيل | Installation & Setup

### المتطلبات | Prerequisites
- Node.js 18+ 
- MySQL 8.0+
- npm أو yarn

### خطوات التثبيت | Installation Steps

1. **استنساخ المشروع | Clone the Repository**
```bash
git clone https://github.com/your-username/adala-platform.git
cd adala-platform
```

2. **تثبيت التبعيات | Install Dependencies**
```bash
npm install
```

3. **إعداد قاعدة البيانات | Database Setup**
```bash
# إنشاء قاعدة البيانات
mysql -u root -p < database/schema.sql

# أو تشغيل الملف يدوياً في MySQL
```

4. **تشغيل الخادم | Start Development Server**
```bash
npm run dev
```

5. **فتح المتصفح | Open Browser**
```
http://localhost:5173
```

## 🗄️ قاعدة البيانات | Database

### الجداول الرئيسية | Main Tables

- **users** - المستخدمين والأدوار
- **cases** - القضايا القانونية
- **documents** - الوثائق والمستندات
- **ai_conversations** - المحادثات الذكية
- **pricing_plans** - خطط الأسعار
- **notifications** - الإشعارات
- **activity_logs** - سجل النشاطات

### الإجراءات المخزنة | Stored Procedures

- `GetUserCases()` - الحصول على قضايا المستخدم
- `GetCaseTimeline()` - الجدول الزمني للقضية
- `GetSystemStatistics()` - إحصائيات النظام

### الفهارس | Indexes

تم إنشاء فهارس متقدمة لضمان الأداء العالي:
- فهارس مركبة للحقول الأكثر استخداماً
- فهارس للنص الكامل للبحث
- فهارس للعلاقات بين الجداول

## 🎨 التصميم والواجهة | Design & UI

### نظام الألوان | Color System
- **Primary**: أزرق احترافي (#3B82F6)
- **Secondary**: رمادي متدرج
- **Success**: أخضر (#10B981)
- **Warning**: أصفر (#F59E0B)
- **Error**: أحمر (#EF4444)

### الوضع المظلم | Dark Mode
- تبديل سلس بين الوضعين
- حفظ التفضيل في المتصفح
- دعم تفضيلات النظام

### التصميم المتجاوب | Responsive Design
- متوافق مع جميع الأجهزة
- تصميم محسن للموبايل
- شبكة مرنة ومتجاوبة

## 🔧 التخصيص والتطوير | Customization & Development

### إضافة ميزات جديدة | Adding New Features

1. **إنشاء مكون جديد | Create New Component**
```tsx
// src/components/NewFeature.tsx
import React from 'react';

const NewFeature: React.FC = () => {
  return (
    <div className="section-card">
      <h2>ميزة جديدة</h2>
      {/* المحتوى */}
    </div>
  );
};

export default NewFeature;
```

2. **إضافة إلى App.tsx | Add to App.tsx**
```tsx
const sections: Section[] = [
  // ... الأقسام الموجودة
  {
    id: 'new-feature',
    number: '8',
    title: 'الميزة الجديدة',
    color: 'indigo',
    icon: 'star',
    description: 'وصف الميزة الجديدة',
    content: <NewFeature />
  }
];
```

### تخصيص الألوان | Customizing Colors

```css
/* src/index.css */
:root {
  --primary-500: #your-color;
  --primary-600: #your-darker-color;
}
```

## 📱 الميزات التفاعلية | Interactive Features

### التنقل | Navigation
- شريط جانبي قابل للطي
- شريط علوي ثابت
- تنقل سلس بين الأقسام
- دعم الروابط المباشرة

### البحث والتصفية | Search & Filter
- بحث فوري في جميع البيانات
- تصفية متقدمة حسب النوع والحالة
- ترتيب حسب التاريخ والأولوية
- حفظ تفضيلات البحث

### الإشعارات | Notifications
- إشعارات فورية للأحداث المهمة
- أنواع مختلفة من الإشعارات
- إدارة الإشعارات
- تخصيص الإشعارات

## 🚀 النشر والإنتاج | Deployment & Production

### بناء المشروع | Building for Production
```bash
npm run build
```

### متغيرات البيئة | Environment Variables
```bash
# .env
VITE_API_URL=https://api.adala.com
VITE_DATABASE_URL=mysql://user:pass@localhost/adala_platform
```

### النشر على الخوادم | Server Deployment
- دعم Docker
- إعدادات Nginx
- SSL/HTTPS
- النسخ الاحتياطية

## 🧪 الاختبار | Testing

### اختبار الواجهة | UI Testing
```bash
npm run test:ui
```

### اختبار الوحدة | Unit Testing
```bash
npm run test:unit
```

### اختبار التكامل | Integration Testing
```bash
npm run test:integration
```

## 📊 الأداء والتحسين | Performance & Optimization

### تحسينات التحميل | Loading Optimizations
- تقسيم الكود (Code Splitting)
- تحميل كسول (Lazy Loading)
- ضغط الصور والملفات
- تخزين مؤقت ذكي

### تحسينات قاعدة البيانات | Database Optimizations
- فهارس متقدمة
- استعلامات محسنة
- تخزين مؤقت للاستعلامات
- تقسيم الجداول الكبيرة

## 🔒 الأمان | Security

### حماية البيانات | Data Protection
- تشفير كلمات المرور
- حماية من هجمات SQL Injection
- التحقق من الصلاحيات
- تسجيل جميع العمليات

### إدارة الجلسات | Session Management
- رموز JWT آمنة
- انتهاء صلاحية الجلسات
- حماية من CSRF
- تسجيل الدخول المتعدد

## 📈 المراقبة والتتبع | Monitoring & Analytics

### سجل النشاطات | Activity Logs
- تتبع جميع العمليات
- تحليل سلوك المستخدمين
- تقارير الأداء
- تنبيهات الأمان

### الإحصائيات | Statistics
- عدد المستخدمين النشطين
- إحصائيات القضايا
- استخدام الميزات
- تقارير الأداء

## 🤝 المساهمة | Contributing

### كيفية المساهمة | How to Contribute

1. Fork المشروع
2. إنشاء فرع للميزة الجديدة
3. تطوير الميزة
4. إرسال Pull Request
5. مراجعة الكود

### معايير الكود | Code Standards
- استخدام TypeScript
- اتباع معايير ESLint
- كتابة تعليقات واضحة
- اختبار الميزات الجديدة

## 📄 الترخيص | License

هذا المشروع مرخص تحت رخصة MIT. راجع ملف [LICENSE](LICENSE) للتفاصيل.

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.

## 📞 الدعم والاتصال | Support & Contact

### الدعم الفني | Technical Support
- البريد الإلكتروني: support@adala.com
- الوثائق: docs.adala.com
- المجتمع: community.adala.com

### المطورون | Developers
- أحمد محمد - ahmed@adala.com
- فاطمة علي - fatima@adala.com

## 🔄 التحديثات | Updates

### الإصدار الحالي | Current Version
- **v1.0.0** - الإصدار الأولي
- تاريخ الإصدار: يناير 2024
- الميزات: جميع الميزات الأساسية

### خطة التطوير | Development Roadmap
- **Q1 2024**: تحسينات الواجهة
- **Q2 2024**: ميزات متقدمة
- **Q3 2024**: تطبيق الموبايل
- **Q4 2024**: الذكاء الاصطناعي المتقدم

## 🙏 الشكر والتقدير | Acknowledgments

- فريق التطوير
- المستخدمين الأوائل
- المجتمع القانوني
- جميع المساهمين

---

**منصة عدالة** - المنصة القانونية المتكاملة  
**Adala Platform** - The Integrated Legal Platform

© 2024 منصة عدالة. جميع الحقوق محفوظة.  
© 2024 Adala Platform. All rights reserved. 