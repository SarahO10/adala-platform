-- منصة عدالة - قاعدة البيانات القانونية
-- Adala Platform - Legal Database Schema

-- إنشاء قاعدة البيانات
CREATE DATABASE IF NOT EXISTS adala_platform CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
USE adala_platform;

-- جدول المستخدمين
CREATE TABLE users (
    id VARCHAR(20) PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
    phone VARCHAR(20),
    password_hash VARCHAR(255) NOT NULL,
    role_id VARCHAR(20),
    status ENUM('نشط', 'معلق', 'غير نشط') DEFAULT 'نشط',
    avatar VARCHAR(255),
    team VARCHAR(100),
    join_date DATE,
    last_login DATETIME,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    INDEX idx_email (email),
    INDEX idx_role (role_id),
    INDEX idx_status (status),
    INDEX idx_team (team)
);

-- جدول الأدوار والصلاحيات
CREATE TABLE roles (
    id VARCHAR(20) PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    description TEXT,
    color VARCHAR(20),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- جدول صلاحيات الأدوار
CREATE TABLE role_permissions (
    role_id VARCHAR(20),
    permission VARCHAR(100),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY (role_id, permission),
    FOREIGN KEY (role_id) REFERENCES roles(id) ON DELETE CASCADE
);

-- جدول القضايا
CREATE TABLE cases (
    id VARCHAR(20) PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    case_number VARCHAR(100) UNIQUE,
    client_name VARCHAR(100) NOT NULL,
    client_phone VARCHAR(20),
    client_email VARCHAR(100),
    case_type ENUM('مدني', 'تجاري', 'جنائي', 'إداري', 'أحوال شخصية', 'أخرى') NOT NULL,
    court VARCHAR(100),
    judge VARCHAR(100),
    description TEXT,
    priority ENUM('منخفض', 'متوسط', 'عالي', 'عاجل') DEFAULT 'متوسط',
    status ENUM('جديد', 'قيد النظر', 'معلق', 'مكتمل', 'ملغي') DEFAULT 'جديد',
    assigned_to VARCHAR(20),
    created_by VARCHAR(20),
    next_hearing_date DATE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    INDEX idx_case_number (case_number),
    INDEX idx_case_type (case_type),
    INDEX idx_status (status),
    INDEX idx_priority (priority),
    INDEX idx_assigned_to (assigned_to),
    INDEX idx_next_hearing (next_hearing_date),
    FOREIGN KEY (assigned_to) REFERENCES users(id) ON DELETE SET NULL,
    FOREIGN KEY (created_by) REFERENCES users(id) ON DELETE SET NULL
);

-- جدول جلسات القضايا
CREATE TABLE case_hearings (
    id VARCHAR(20) PRIMARY KEY,
    case_id VARCHAR(20) NOT NULL,
    hearing_date DATE NOT NULL,
    hearing_time TIME,
    court_room VARCHAR(50),
    judge VARCHAR(100),
    notes TEXT,
    outcome TEXT,
    status ENUM('مجدول', 'مكتمل', 'مؤجل', 'ملغي') DEFAULT 'مجدول',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    INDEX idx_case_id (case_id),
    INDEX idx_hearing_date (hearing_date),
    INDEX idx_status (status),
    FOREIGN KEY (case_id) REFERENCES cases(id) ON DELETE CASCADE
);

-- جدول الوثائق القانونية
CREATE TABLE documents (
    id VARCHAR(20) PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    case_id VARCHAR(20),
    document_type ENUM('عقد', 'مذكرة', 'حكم', 'استئناف', 'مرافعة', 'وثيقة أخرى') NOT NULL,
    category ENUM('قضايا مدنية', 'قضايا تجارية', 'قضايا جنائية', 'قضايا إدارية', 'أحوال شخصية', 'قوانين', 'أحكام', 'أخرى') NOT NULL,
    file_path VARCHAR(500),
    file_size BIGINT,
    file_type VARCHAR(50),
    content TEXT,
    tags JSON,
    uploaded_by VARCHAR(20),
    is_bookmarked BOOLEAN DEFAULT FALSE,
    download_count INT DEFAULT 0,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    INDEX idx_case_id (case_id),
    INDEX idx_document_type (document_type),
    INDEX idx_category (category),
    INDEX idx_uploaded_by (uploaded_by),
    INDEX idx_is_bookmarked (is_bookmarked),
    FULLTEXT idx_content (title, content),
    FOREIGN KEY (case_id) REFERENCES cases(id) ON DELETE SET NULL,
    FOREIGN KEY (uploaded_by) REFERENCES users(id) ON DELETE SET NULL
);

-- جدول المحادثات مع المساعد الذكي
CREATE TABLE ai_conversations (
    id VARCHAR(20) PRIMARY KEY,
    user_id VARCHAR(20) NOT NULL,
    title VARCHAR(255),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    INDEX idx_user_id (user_id),
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);

-- جدول رسائل المحادثات
CREATE TABLE ai_messages (
    id VARCHAR(20) PRIMARY KEY,
    conversation_id VARCHAR(20) NOT NULL,
    message_type ENUM('user', 'ai') NOT NULL,
    content TEXT NOT NULL,
    timestamp TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    is_liked BOOLEAN DEFAULT NULL,
    is_exported BOOLEAN DEFAULT FALSE,
    INDEX idx_conversation_id (conversation_id),
    INDEX idx_message_type (message_type),
    INDEX idx_timestamp (timestamp),
    FOREIGN KEY (conversation_id) REFERENCES ai_conversations(id) ON DELETE CASCADE
);

-- جدول الباقات والأسعار
CREATE TABLE pricing_plans (
    id VARCHAR(20) PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    description TEXT,
    monthly_price DECIMAL(10,2),
    annual_price DECIMAL(10,2),
    features JSON,
    max_users INT,
    max_cases INT,
    max_documents INT,
    is_active BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- جدول المشتركين
CREATE TABLE subscriptions (
    id VARCHAR(20) PRIMARY KEY,
    user_id VARCHAR(20) NOT NULL,
    plan_id VARCHAR(20) NOT NULL,
    billing_cycle ENUM('monthly', 'annual') NOT NULL,
    start_date DATE NOT NULL,
    end_date DATE NOT NULL,
    status ENUM('نشط', 'منتهي', 'ملغي', 'معلق') DEFAULT 'نشط',
    amount DECIMAL(10,2) NOT NULL,
    payment_method VARCHAR(50),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    INDEX idx_user_id (user_id),
    INDEX idx_plan_id (plan_id),
    INDEX idx_status (status),
    INDEX idx_end_date (end_date),
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
    FOREIGN KEY (plan_id) REFERENCES pricing_plans(id) ON DELETE CASCADE
);

-- جدول الإشعارات
CREATE TABLE notifications (
    id VARCHAR(20) PRIMARY KEY,
    user_id VARCHAR(20) NOT NULL,
    title VARCHAR(255) NOT NULL,
    message TEXT NOT NULL,
    type ENUM('معلومات', 'تحذير', 'نجاح', 'خطأ') DEFAULT 'معلومات',
    is_read BOOLEAN DEFAULT FALSE,
    related_entity_type VARCHAR(50),
    related_entity_id VARCHAR(20),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    INDEX idx_user_id (user_id),
    INDEX idx_is_read (is_read),
    INDEX idx_type (type),
    INDEX idx_created_at (created_at),
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);

-- جدول سجل النشاطات
CREATE TABLE activity_logs (
    id VARCHAR(20) PRIMARY KEY,
    user_id VARCHAR(20),
    action VARCHAR(100) NOT NULL,
    entity_type VARCHAR(50),
    entity_id VARCHAR(20),
    details JSON,
    ip_address VARCHAR(45),
    user_agent TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    INDEX idx_user_id (user_id),
    INDEX idx_action (action),
    INDEX idx_entity_type (entity_type),
    INDEX idx_created_at (created_at),
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE SET NULL
);

-- جدول الإعدادات العامة
CREATE TABLE system_settings (
    id VARCHAR(50) PRIMARY KEY,
    value TEXT,
    description TEXT,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- إدراج البيانات الأساسية
INSERT INTO roles (id, name, description, color) VALUES
('role-1', 'مدير النظام', 'صلاحيات كاملة على النظام', 'red'),
('role-2', 'محامي رئيسي', 'إدارة القضايا والفرق', 'blue'),
('role-3', 'محامي', 'إدارة القضايا والبحث', 'green'),
('role-4', 'مساعد قانوني', 'عرض القضايا والبحث', 'purple');

INSERT INTO role_permissions (role_id, permission) VALUES
('role-1', 'إدارة المستخدمين'),
('role-1', 'إدارة الصلاحيات'),
('role-1', 'إعدادات النظام'),
('role-1', 'التقارير'),
('role-2', 'إدارة القضايا'),
('role-2', 'إدارة الفريق'),
('role-2', 'التقارير'),
('role-2', 'الاستشارات'),
('role-3', 'إدارة القضايا'),
('role-3', 'البحث القانوني'),
('role-3', 'التقارير'),
('role-4', 'عرض القضايا'),
('role-4', 'البحث القانوني');

INSERT INTO pricing_plans (id, name, description, monthly_price, annual_price, max_users, max_cases, max_documents, features) VALUES
('plan-1', 'الخطة الأساسية', 'مناسبة للمحامين الأفراد', 99.00, 990.00, 1, 50, 1000, '["إدارة القضايا", "قاعدة البيانات", "المساعد الذكي", "الدعم الفني"]'),
('plan-2', 'الخطة المتقدمة', 'مناسبة للمكاتب الصغيرة', 199.00, 1990.00, 5, 200, 5000, '["إدارة القضايا", "قاعدة البيانات", "المساعد الذكي", "إدارة الفريق", "التقارير المتقدمة", "الدعم المميز"]'),
('plan-3', 'الخطة الاحترافية', 'مناسبة للمكاتب الكبيرة', 399.00, 3990.00, 20, 1000, 25000, '["إدارة القضايا", "قاعدة البيانات", "المساعد الذكي", "إدارة الفريق", "التقارير المتقدمة", "API مخصص", "دعم 24/7"]'),
('plan-4', 'الخطة المؤسسية', 'حلول مخصصة للمؤسسات', NULL, NULL, NULL, NULL, NULL, '["جميع الميزات", "تخصيص كامل", "تكامل مع الأنظمة", "مدير حساب مخصص", "دعم 24/7"]');

INSERT INTO system_settings (id, value, description) VALUES
('site_name', 'منصة عدالة', 'اسم الموقع'),
('site_description', 'المنصة القانونية المتكاملة', 'وصف الموقع'),
('default_language', 'ar', 'اللغة الافتراضية'),
('timezone', 'Asia/Riyadh', 'المنطقة الزمنية'),
('maintenance_mode', 'false', 'وضع الصيانة'),
('max_file_size', '10485760', 'الحد الأقصى لحجم الملف (10MB)'),
('allowed_file_types', 'pdf,doc,docx,txt,jpg,jpeg,png', 'أنواع الملفات المسموحة');

-- إنشاء المستخدم الافتراضي
INSERT INTO users (id, name, email, phone, password_hash, role_id, status, team, join_date) VALUES
('USR-001', 'أحمد محمد', 'ahmed@adala.com', '+966501234567', '$2y$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', 'role-1', 'نشط', 'فريق الإدارة', '2023-03-15'),
('USR-002', 'فاطمة علي', 'fatima@adala.com', '+966507654321', '$2y$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', 'role-2', 'نشط', 'فريق القضايا المدنية', '2023-06-20'),
('USR-003', 'محمد السعد', 'mohammed@adala.com', '+966509876543', '$2y$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', 'role-3', 'نشط', 'فريق الدعم القانوني', '2023-09-10'),
('USR-004', 'سارة أحمد', 'sara@adala.com', '+966501112223', '$2y$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', 'role-2', 'نشط', 'فريق القضايا التجارية', '2022-12-01');

-- إنشاء قضايا تجريبية
INSERT INTO cases (id, title, case_number, client_name, client_phone, case_type, court, description, priority, status, assigned_to, created_by) VALUES
('CASE-001', 'قضية تجارية - خلاف على عقد', 'CR-2024-001', 'شركة التقنية المتقدمة', '+966501234567', 'تجاري', 'المحكمة التجارية بالرياض', 'خلاف على عقد توريد أجهزة حاسوب', 'عالي', 'قيد النظر', 'USR-002', 'USR-001'),
('CASE-002', 'قضية مدنية - تعويضات', 'CV-2024-001', 'أحمد الخالد', '+966507654321', 'مدني', 'محكمة الأحوال الشخصية', 'طلب تعويضات عن أضرار', 'متوسط', 'جديد', 'USR-003', 'USR-001'),
('CASE-003', 'قضية إدارية - طعن', 'AD-2024-001', 'وزارة التجارة', '+966509876543', 'إداري', 'المحكمة الإدارية', 'طعن على قرار إداري', 'عاجل', 'قيد النظر', 'USR-004', 'USR-001');

-- إنشاء وثائق تجريبية
INSERT INTO documents (id, title, case_id, document_type, category, content, uploaded_by) VALUES
('DOC-001', 'عقد التوريد', 'CASE-001', 'عقد', 'قضايا تجارية', 'محتوى العقد التجاري...', 'USR-002'),
('DOC-002', 'مذكرة الدفاع', 'CASE-002', 'مذكرة', 'قضايا مدنية', 'مذكرة الدفاع في القضية المدنية...', 'USR-003'),
('DOC-003', 'قانون التجارة', NULL, 'وثيقة أخرى', 'قوانين', 'نص قانون التجارة السعودي...', 'USR-001');

-- إنشاء محادثة ذكية تجريبية
INSERT INTO ai_conversations (id, user_id, title) VALUES
('CONV-001', 'USR-001', 'استشارة حول قضية تجارية');

INSERT INTO ai_messages (id, conversation_id, message_type, content) VALUES
('MSG-001', 'CONV-001', 'user', 'ما هي الخطوات المطلوبة لرفع دعوى تجارية؟'),
('MSG-002', 'CONV-001', 'ai', 'الخطوات المطلوبة لرفع دعوى تجارية هي:\n1. تجهيز المستندات المطلوبة\n2. تحديد المحكمة المختصة\n3. كتابة صحيفة الدعوى\n4. دفع الرسوم القضائية\n5. تقديم الدعوى للمحكمة');

-- إنشاء إشعارات تجريبية
INSERT INTO notifications (id, user_id, title, message, type, related_entity_type, related_entity_id) VALUES
('NOT-001', 'USR-002', 'جلسة جديدة', 'تم تحديد جلسة جديدة لقضية CASE-001', 'معلومات', 'case', 'CASE-001'),
('NOT-002', 'USR-003', 'مستند جديد', 'تم رفع مستند جديد في قضيتك', 'معلومات', 'document', 'DOC-002');

-- إنشاء سجل نشاطات تجريبي
INSERT INTO activity_logs (id, user_id, action, entity_type, entity_id, details) VALUES
('LOG-001', 'USR-001', 'إنشاء قضية جديدة', 'case', 'CASE-001', '{"case_title": "قضية تجارية - خلاف على عقد"}'),
('LOG-002', 'USR-002', 'رفع مستند', 'document', 'DOC-001', '{"document_title": "عقد التوريد"}');

-- إنشاء فهارس إضافية للأداء
CREATE INDEX idx_cases_composite ON cases(status, priority, case_type);
CREATE INDEX idx_documents_composite ON documents(category, document_type, is_bookmarked);
CREATE INDEX idx_users_composite ON users(role_id, status, team);
CREATE INDEX idx_notifications_composite ON notifications(user_id, is_read, type);

-- إنشاء views مفيدة
CREATE VIEW active_cases_summary AS
SELECT 
    c.id,
    c.title,
    c.case_number,
    c.client_name,
    c.case_type,
    c.status,
    c.priority,
    c.next_hearing_date,
    u.name as assigned_lawyer,
    COUNT(ch.id) as hearing_count
FROM cases c
LEFT JOIN users u ON c.assigned_to = u.id
LEFT JOIN case_hearings ch ON c.id = ch.case_id
WHERE c.status IN ('جديد', 'قيد النظر', 'معلق')
GROUP BY c.id;

CREATE VIEW user_permissions_view AS
SELECT 
    u.id as user_id,
    u.name as user_name,
    u.email,
    r.name as role_name,
    GROUP_CONCAT(rp.permission) as permissions
FROM users u
JOIN roles r ON u.role_id = r.id
LEFT JOIN role_permissions rp ON r.id = rp.role_id
GROUP BY u.id;

CREATE VIEW document_statistics AS
SELECT 
    category,
    document_type,
    COUNT(*) as total_documents,
    COUNT(CASE WHEN is_bookmarked = 1 THEN 1 END) as bookmarked_count,
    AVG(file_size) as avg_file_size
FROM documents
GROUP BY category, document_type;

-- إنشاء triggers للتحديث التلقائي
DELIMITER //

CREATE TRIGGER update_case_updated_at
BEFORE UPDATE ON cases
FOR EACH ROW
SET NEW.updated_at = CURRENT_TIMESTAMP;

CREATE TRIGGER update_user_updated_at
BEFORE UPDATE ON users
FOR EACH ROW
SET NEW.updated_at = CURRENT_TIMESTAMP;

CREATE TRIGGER log_case_creation
AFTER INSERT ON cases
FOR EACH ROW
INSERT INTO activity_logs (id, user_id, action, entity_type, entity_id, details)
VALUES (CONCAT('LOG-', UUID_SHORT()), NEW.created_by, 'إنشاء قضية جديدة', 'case', NEW.id, JSON_OBJECT('case_title', NEW.title));

CREATE TRIGGER log_document_upload
AFTER INSERT ON documents
FOR EACH ROW
INSERT INTO activity_logs (id, user_id, action, entity_type, entity_id, details)
VALUES (CONCAT('LOG-', UUID_SHORT()), NEW.uploaded_by, 'رفع مستند جديد', 'document', NEW.id, JSON_OBJECT('document_title', NEW.title));

DELIMITER ;

-- إنشاء إجراءات مخزنة مفيدة
DELIMITER //

CREATE PROCEDURE GetUserCases(IN user_id_param VARCHAR(20))
BEGIN
    SELECT 
        c.*,
        COUNT(ch.id) as hearing_count,
        COUNT(d.id) as document_count
    FROM cases c
    LEFT JOIN case_hearings ch ON c.id = ch.case_id
    LEFT JOIN documents d ON c.id = d.case_id
    WHERE c.assigned_to = user_id_param
    GROUP BY c.id
    ORDER BY c.created_at DESC;
END //

CREATE PROCEDURE GetCaseTimeline(IN case_id_param VARCHAR(20))
BEGIN
    SELECT 
        'case_created' as event_type,
        c.created_at as event_date,
        CONCAT('تم إنشاء القضية بواسطة ', u.name) as description
    FROM cases c
    JOIN users u ON c.created_by = u.id
    WHERE c.id = case_id_param
    
    UNION ALL
    
    SELECT 
        'hearing_scheduled' as event_type,
        ch.hearing_date as event_date,
        CONCAT('جلسة محكمة في ', ch.court_room) as description
    FROM case_hearings ch
    WHERE ch.case_id = case_id_param
    
    UNION ALL
    
    SELECT 
        'document_uploaded' as event_type,
        d.created_at as event_date,
        CONCAT('تم رفع المستند: ', d.title) as description
    FROM documents d
    WHERE d.case_id = case_id_param
    
    ORDER BY event_date;
END //

CREATE PROCEDURE GetSystemStatistics()
BEGIN
    SELECT 
        (SELECT COUNT(*) FROM users WHERE status = 'نشط') as active_users,
        (SELECT COUNT(*) FROM cases WHERE status IN ('جديد', 'قيد النظر')) as active_cases,
        (SELECT COUNT(*) FROM documents) as total_documents,
        (SELECT COUNT(*) FROM ai_conversations) as total_conversations,
        (SELECT COUNT(*) FROM notifications WHERE is_read = 0) as unread_notifications;
END //

DELIMITER ;

-- تعليقات توضيحية
COMMENT ON TABLE users IS 'جدول المستخدمين في النظام';
COMMENT ON TABLE cases IS 'جدول القضايا القانونية';
COMMENT ON TABLE documents IS 'جدول الوثائق والمستندات القانونية';
COMMENT ON TABLE ai_conversations IS 'جدول المحادثات مع المساعد الذكي';
COMMENT ON TABLE pricing_plans IS 'جدول باقات الأسعار';
COMMENT ON TABLE notifications IS 'جدول الإشعارات';
COMMENT ON TABLE activity_logs IS 'جدول سجل النشاطات';

-- إعدادات الأمان
GRANT SELECT, INSERT, UPDATE, DELETE ON adala_platform.* TO 'adala_user'@'localhost' IDENTIFIED BY 'secure_password_123';
GRANT EXECUTE ON PROCEDURE adala_platform.* TO 'adala_user'@'localhost';
GRANT SELECT ON adala_platform.* TO 'adala_readonly'@'localhost' IDENTIFIED BY 'readonly_password_456';

-- إنشاء نسخة احتياطية
-- mysqldump -u root -p adala_platform > adala_platform_backup_$(date +%Y%m%d_%H%M%S).sql 