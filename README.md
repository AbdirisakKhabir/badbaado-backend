# 🩸 ShicibBlood Backend

Complete backend infrastructure for the ShicibBlood blood donation management system.

## 🚀 Quick Start

```bash
# Install dependencies
npm install

# Set up environment variables
cp .env.example .env
# Edit .env with your database credentials

# Set up database
npm run db:generate
npm run db:migrate
npm run db:seed

# Start development server
npm run dev
```

## 📁 Project Structure

```
badbaado-backend/
├── app.js                    # Express.js server with all API endpoints
├── prisma/
│   ├── schema.prisma        # Database schema definition
│   └── seed.js             # Database seeding script
├── package.json             # Dependencies and scripts
├── SETUP_GUIDE.md          # Detailed setup instructions
├── DATABASE_SCHEMA.md      # Complete schema documentation
├── API_DOCUMENTATION.md    # Complete API reference
└── README.md               # This file
```

## 🗄️ Database Models

### **Core Entities**
- **Users** - Blood donors and recipients
- **Admins** - Healthcare administrators
- **Blood Requests** - Donation requests
- **Donations** - Individual donor responses
- **Notifications** - System communications
- **System Settings** - Configurable parameters
- **User History** - Activity tracking

### **Key Features**
- ✅ **Role-based access control** (Admin, Super Admin, Moderator)
- ✅ **Blood type compatibility** (8 blood types)
- ✅ **Location-based matching** for donors
- ✅ **120-day donation rule** enforcement
- ✅ **Admin approval workflow** for requests
- ✅ **Comprehensive notification system**
- ✅ **Audit trail** for all actions

## 🔧 Available Scripts

```bash
# Development
npm run dev              # Start with auto-reload
npm start               # Start production server

# Database Management
npm run db:generate     # Generate Prisma client
npm run db:migrate      # Run database migrations
npm run db:seed         # Populate with sample data
npm run db:studio       # Open database GUI
npm run db:reset        # Reset and reseed database
```

## 📊 Sample Data

After seeding, you'll have:

- **2 Admin Users**
  - `admin@shicibblood.com` (Super Admin)
  - `moderator@shicibblood.com` (Admin)

- **4 Regular Users**
  - Sample donors with different blood types
  - Various donation histories
  - Different eligibility statuses

- **4 Blood Requests**
  - Pending, approved, completed, and rejected examples
  - Different urgency levels and locations

- **System Settings**
  - Configurable parameters for admin management
  - Default values matching your frontend requirements

## 🔐 Security Features

- **Password Hashing** with bcryptjs
- **Admin Code Verification** for registration
- **Role-based Permissions**
- **Data Validation** and constraints
- **Referential Integrity** with cascade deletes
- **JWT Authentication** for all protected endpoints

## 🌐 API Endpoints (Complete)

### **Authentication**
- User/Admin registration and login
- JWT token management
- Password hashing and verification

### **User Management**
- Profile management (GET, PUT)
- Donation history
- Eligibility checking
- User status management

### **Blood Requests**
- Create and manage requests (POST, GET, PUT, DELETE)
- Admin approval workflow
- Donor matching system
- Status updates and filtering

### **Donations**
- Create donation responses (POST)
- Update donation status (PUT)
- View donation history (GET)
- Eligibility enforcement

### **Admin Functions**
- Dashboard statistics
- User management and monitoring
- Request approval/rejection
- System configuration
- Notification management

### **Notifications**
- Send targeted notifications
- User notification management
- Read/unread status tracking

## 🛠️ Technology Stack

- **Runtime**: Node.js
- **Framework**: Express.js
- **Database**: PostgreSQL
- **ORM**: Prisma
- **Authentication**: JWT
- **Password Hashing**: bcryptjs
- **Development**: nodemon

## 📚 Documentation

- **[SETUP_GUIDE.md](./SETUP_GUIDE.md)** - Complete setup instructions
- **[DATABASE_SCHEMA.md](./DATABASE_SCHEMA.md)** - Detailed schema documentation
- **[API_DOCUMENTATION.md](./API_DOCUMENTATION.md)** - Complete API reference
- **[Prisma Docs](https://pris.ly/docs)** - Official Prisma documentation

## 🚨 Troubleshooting

### **Common Issues**

1. **Database Connection Error**
   - Check PostgreSQL is running
   - Verify credentials in `.env`
   - Ensure database exists

2. **Migration Errors**
   - Reset database: `npm run db:reset`
   - Check schema for syntax errors

3. **Seed Errors**
   - Install dependencies: `npm install`
   - Check database connection

4. **Server Errors**
   - Check if port 3000 is available
   - Verify JWT_SECRET in `.env`
   - Check Prisma client generation

### **Reset Everything**
```bash
npm run db:reset
```

## 🔄 Development Workflow

1. **Schema Changes**
   - Edit `prisma/schema.prisma`
   - Run `npm run db:migrate`
   - Update seed data if needed

2. **API Changes**
   - Edit `app.js`
   - Test endpoints with Postman/curl
   - Update API documentation

3. **Data Changes**
   - Modify `prisma/seed.js`
   - Run `npm run db:seed`

4. **Testing**
   - Use `npm run db:studio` to view data
   - Test with sample credentials
   - Use API documentation for endpoint testing

## 📱 Frontend Integration

This backend is designed to work seamlessly with your React Native frontend:

- **Admin Dashboard** → Database statistics via `/api/admin/dashboard`
- **User Management** → User CRUD operations via `/api/admin/users`
- **Blood Requests** → Request lifecycle management via `/api/requests`
- **Notifications** → Real-time communication via `/api/admin/notifications`
- **Settings** → System configuration via `/api/admin/settings`
- **User Profile** → Profile management via `/api/users/profile`
- **Donation Status** → Eligibility tracking via `/api/users/eligibility`

## 🎯 Implementation Status

1. ✅ **Database Schema** - Complete
2. ✅ **Sample Data** - Seeded
3. ✅ **Express Server** - Complete with all endpoints
4. ✅ **API Endpoints** - All CRUD operations implemented
5. ✅ **Authentication** - JWT implementation complete
6. 🔄 **Frontend Integration** - Ready for connection

## 📝 Environment Variables

Create a `.env` file with:

```env
# Database
DATABASE_URL="postgresql://username:password@localhost:5432/shicibblood"

# Server
PORT=3000
NODE_ENV=development

# JWT
JWT_SECRET="your-super-secret-jwt-key-here"
JWT_EXPIRES_IN="7d"

# Admin
DEFAULT_ADMIN_CODE="ADMIN2024"
```

## 🧪 Testing the API

### **1. Start the Server**
```bash
npm run dev
```

### **2. Test Endpoints**
Use the provided API documentation or test with curl:

```bash
# Test server health
curl http://localhost:3000/api/requests

# Test user registration
curl -X POST http://localhost:3000/api/auth/register/user \
  -H "Content-Type: application/json" \
  -d '{"email":"test@example.com","password":"Test123!","fullName":"Test User","phone":"+252123456789","gender":"MALE","age":25,"location":"Mogadishu","bloodType":"O_POSITIVE"}'
```

### **3. Verify Database**
```bash
npm run db:studio
```

## 📞 Support

- **Documentation**: Check the guides above
- **API Reference**: Use `API_DOCUMENTATION.md`
- **Prisma Studio**: Use `npm run db:studio` for data inspection
- **Error Logs**: Check terminal output for detailed errors
- **Schema Issues**: Review `DATABASE_SCHEMA.md`

---

**Backend Version**: 1.0.0  
**Database**: PostgreSQL + Prisma  
**API**: Express.js + JWT  
**Last Updated**: December 2024  
**Status**: Complete and Ready for Frontend Integration
