# 🚀 ShicibBlood Backend Setup Guide

## 📋 Prerequisites

Before starting, ensure you have the following installed:
- **Node.js** (v16 or higher)
- **PostgreSQL** (v12 or higher)
- **npm** or **yarn**

## 🗄️ Database Setup

### 1. **Install Dependencies**
```bash
cd badbaado-backend
npm install
```

### 2. **Environment Configuration**
Create a `.env` file in the `badbaado-backend` directory:

```env
# Database Configuration
DATABASE_URL="postgresql://username:password@localhost:5432/shicibblood"

# Server Configuration
PORT=3000
NODE_ENV=development

# JWT Configuration (for future authentication)
JWT_SECRET="your-super-secret-jwt-key-here"
JWT_EXPIRES_IN="7d"

# Admin Configuration
DEFAULT_ADMIN_CODE="ADMIN2024"
```

**Important**: Replace the database credentials with your actual PostgreSQL credentials.

### 3. **Create PostgreSQL Database**
```sql
-- Connect to PostgreSQL
psql -U postgres

-- Create database
CREATE DATABASE shicibblood;

-- Create user (optional)
CREATE USER shicibblood_user WITH PASSWORD 'your_password';
GRANT ALL PRIVILEGES ON DATABASE shicibblood TO shicibblood_user;

-- Exit PostgreSQL
\q
```

### 4. **Database Migration**
```bash
# Generate Prisma client
npm run db:generate

# Run database migrations
npm run db:migrate
```

### 5. **Seed Database (Optional)**
```bash
# Populate with sample data
npm run db:seed
```

This will create:
- 2 admin users (admin@shicibblood.com, moderator@shicibblood.com)
- 4 regular users with sample data
- Sample blood requests, donations, and notifications
- System settings

**Default Passwords**:
- **Admins**: `Admin123!`
- **Users**: `User123!`

## 🔧 Development Commands

### **Database Management**
```bash
# Generate Prisma client
npm run db:generate

# Run migrations
npm run db:migrate

# Seed database
npm run db:seed

# Reset database (migrate + seed)
npm run db:reset

# Open Prisma Studio (database GUI)
npm run db:studio
```

### **Server Management**
```bash
# Development mode with auto-reload
npm run dev

# Production mode
npm start
```

## 📊 Database Schema Overview

### **Core Models**

#### **Users & Admins**
- `users` - Regular blood donors/recipients
- `admins` - Healthcare administrators

#### **Blood Management**
- `blood_requests` - Blood donation requests
- `donations` - Individual donor responses

#### **Communication**
- `admin_notifications` - Notifications sent by admins
- `user_notifications` - Notifications received by users
- `blood_request_notifications` - Request-specific notifications

#### **System & History**
- `system_settings` - Configurable system parameters
- `user_history` - User activity tracking

### **Key Relationships**
```
User ←→ BloodRequest (1:Many)
BloodRequest ←→ Donation (1:Many)
Admin ←→ BloodRequest (1:Many) [approval]
Admin ←→ AdminNotification (1:Many)
AdminNotification ←→ UserNotification (1:Many)
```

## 🔐 Security Features

### **Password Hashing**
- All passwords are hashed using bcryptjs
- Salt rounds: 12 (secure default)

### **Admin Verification**
- Unique admin codes required for registration
- Role-based access control (ADMIN, SUPER_ADMIN, MODERATOR)

### **Data Validation**
- Comprehensive input validation
- Enum-based data constraints
- Referential integrity with cascade deletes

## 📱 API Endpoints (Future Implementation)

### **Authentication**
```
POST /api/auth/register/user
POST /api/auth/register/admin
POST /api/auth/login
POST /api/auth/logout
```

### **Users**
```
GET    /api/users/profile
PUT    /api/users/profile
GET    /api/users/history
GET    /api/users/eligibility
```

### **Blood Requests**
```
POST   /api/requests
GET    /api/requests
GET    /api/requests/:id
PUT    /api/requests/:id/status
DELETE /api/requests/:id
```

### **Donations**
```
POST   /api/donations
GET    /api/donations
PUT    /api/donations/:id/status
```

### **Admin Management**
```
GET    /api/admin/dashboard
GET    /api/admin/users
PUT    /api/admin/users/:id/status
GET    /api/admin/requests
PUT    /api/admin/requests/:id/approve
PUT    /api/admin/requests/:id/reject
POST   /api/admin/notifications
GET    /api/admin/settings
PUT    /api/admin/settings
```

### **Notifications**
```
GET    /api/notifications
PUT    /api/notifications/:id/read
```

## 🧪 Testing the Setup

### **1. Verify Database Connection**
```bash
npm run db:studio
```
This will open Prisma Studio in your browser where you can view and edit data.

### **2. Check Sample Data**
After seeding, you should see:
- **2 Admin users** in the `admins` table
- **4 Regular users** in the `users` table
- **4 Blood requests** in the `blood_requests` table
- **2 Donations** in the `donations` table
- **5 System settings** in the `system_settings` table

### **3. Test Admin Login**
Use these credentials in your frontend:
- **Email**: `admin@shicibblood.com`
- **Password**: `Admin123!`

## 🚨 Troubleshooting

### **Common Issues**

#### **Database Connection Error**
```
Error: P1001: Can't reach database server
```
**Solution**: Check if PostgreSQL is running and credentials are correct.

#### **Migration Error**
```
Error: P3006: Migration failed
```
**Solution**: Reset the database and run migrations again:
```bash
npm run db:reset
```

#### **Seed Error**
```
Error: Cannot find module 'bcryptjs'
```
**Solution**: Install dependencies:
```bash
npm install
```

#### **Port Already in Use**
```
Error: listen EADDRINUSE: address already in use :::3000
```
**Solution**: Change the PORT in `.env` file or kill the process using port 3000.

### **Reset Everything**
If you need to start fresh:
```bash
# Stop the server
Ctrl + C

# Reset database completely
npm run db:reset

# Restart server
npm run dev
```

## 🔄 Next Steps

### **Immediate Tasks**
1. ✅ Database schema created
2. ✅ Sample data seeded
3. 🔄 Implement Express.js server
4. 🔄 Create API endpoints
5. 🔄 Add authentication middleware
6. 🔄 Connect frontend to backend

### **Future Enhancements**
- **Real-time notifications** using WebSockets
- **File uploads** for medical documents
- **Email/SMS integration** for notifications
- **Analytics dashboard** with charts
- **Mobile push notifications**
- **Multi-language support**

## 📞 Support

### **Resources**
- **Prisma Documentation**: https://pris.ly/docs
- **PostgreSQL Documentation**: https://www.postgresql.org/docs/
- **Node.js Documentation**: https://nodejs.org/docs/

### **Getting Help**
1. Check the troubleshooting section above
2. Review the database schema documentation
3. Check Prisma Studio for data verification
4. Review error logs in the terminal

---

## 📝 Quick Reference

### **Essential Commands**
```bash
# Start development
npm run dev

# Database operations
npm run db:migrate    # Apply migrations
npm run db:seed      # Populate sample data
npm run db:studio    # Open database GUI
npm run db:reset     # Reset everything

# Production
npm start
```

### **Default Credentials**
- **Admin**: admin@shicibblood.com / Admin123!
- **Moderator**: moderator@shicibblood.com / Admin123!
- **Users**: ahmed@example.com / User123!

### **Database URL Format**
```
postgresql://username:password@host:port/database_name
```

---

**Setup Version**: 1.0.0  
**Last Updated**: December 2024  
**Maintainer**: ShicibBlood Development Team
