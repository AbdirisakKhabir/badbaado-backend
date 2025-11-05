# 🩸 Blood Donation System - Database Schema Documentation

## 📋 Overview

This document describes the complete database schema for the ShicibBlood donation management system. The schema is built using Prisma ORM with PostgreSQL and covers all functionality for both users and administrators.

## 🗄️ Database Models

### 1. **User Management Models**

#### **User Model** (`users` table)
```prisma
model User {
  id            String   @id @default(cuid())
  email         String   @unique
  password      String
  fullName      String
  phone         String
  gender        Gender
  age           Int
  location      String
  bloodType     BloodType
  isActive      Boolean  @default(true)
  isEligible   Boolean  @default(true)
  totalDonations Int     @default(0)
  lastDonation  DateTime?
  createdAt     DateTime @default(now())
  updatedAt     DateTime @updatedAt
}
```

**Purpose**: Stores regular user information for blood donors and recipients.

**Key Fields**:
- `isEligible`: Tracks if user can donate (120-day rule)
- `totalDonations`: Count of successful donations
- `lastDonation`: Date of last donation for eligibility calculation

#### **Admin Model** (`admins` table)
```prisma
model Admin {
  id           String   @id @default(cuid())
  email        String   @unique
  password     String
  fullName     String
  phone        String
  adminCode    String   @unique
  organization String
  position     String
  department   String?
  role         AdminRole @default(ADMIN)
  isActive     Boolean  @default(true)
  createdAt    DateTime @default(now())
  updatedAt    DateTime @updatedAt
}
```

**Purpose**: Stores administrator accounts with professional credentials.

**Key Fields**:
- `adminCode`: Unique verification code for admin registration
- `organization`: Hospital or healthcare institution
- `role`: Admin hierarchy (ADMIN, SUPER_ADMIN, MODERATOR)

### 2. **Blood Request Models**

#### **BloodRequest Model** (`blood_requests` table)
```prisma
model BloodRequest {
  id          String   @id @default(cuid())
  userId      String
  fullName    String
  gender      Gender
  age         Int
  location    String
  bloodType   BloodType
  urgency     UrgencyLevel
  description String?
  status      RequestStatus @default(PENDING)
  maxDonors   Int          @default(5)
  createdAt   DateTime     @default(now())
  updatedAt   DateTime     @updatedAt
  approvedAt  DateTime?
  rejectedAt  DateTime?
  adminId     String?
  rejectReason String?
}
```

**Purpose**: Manages blood donation requests from users.

**Key Fields**:
- `status`: Request lifecycle (PENDING → APPROVED/REJECTED → COMPLETED)
- `urgency`: Priority level for emergency situations
- `maxDonors`: Maximum donors allowed per request (configurable)
- `adminId`: Admin who processed the request

#### **Donation Model** (`donations` table)
```prisma
model Donation {
  id              String   @id @default(cuid())
  requestId       String
  donorId         String
  status          DonationStatus @default(PENDING)
  acceptedAt      DateTime?
  completedAt     DateTime?
  notes           String?
  createdAt       DateTime @default(now())
  updatedAt       DateTime @updatedAt
}
```

**Purpose**: Tracks individual donor responses to blood requests.

**Key Fields**:
- `status`: Donation progress (PENDING → ACCEPTED → COMPLETED)
- `acceptedAt`: When donor accepted the request
- `completedAt`: When donation was completed

### 3. **Notification Models**

#### **AdminNotification Model** (`admin_notifications` table)
```prisma
model AdminNotification {
  id          String   @id @default(cuid())
  adminId     String
  title       String
  message     String
  targetType  NotificationTargetType
  targetValue String?
  priority    NotificationPriority @default(NORMAL)
  status      NotificationStatus @default(DRAFT)
  sentAt      DateTime?
  recipients  Int?
  createdAt   DateTime @default(now())
  updatedAt   DateTime @updatedAt
}
```

**Purpose**: Manages notifications sent by administrators to users.

**Target Types**:
- `ALL_USERS`: Broadcast to all users
- `BY_LOCATION`: Target users in specific location
- `BY_BLOOD_TYPE`: Target users with specific blood type
- `INDIVIDUAL_USER`: Send to specific user

#### **UserNotification Model** (`user_notifications` table)
```prisma
model UserNotification {
  id          String   @id @default(cuid())
  userId      String
  notificationId String?
  title       String
  message     String
  type        UserNotificationType
  priority    NotificationPriority @default(NORMAL)
  isRead      Boolean  @default(false)
  readAt      DateTime?
  createdAt   DateTime @default(now())
}
```

**Purpose**: Stores notifications received by individual users.

**Types**:
- `SYSTEM`: System-generated messages
- `BLOOD_REQUEST`: Blood request updates
- `DONATION_UPDATE`: Donation status changes
- `ADMIN_MESSAGE`: Messages from administrators

### 4. **System Settings Model**

#### **SystemSetting Model** (`system_settings` table)
```prisma
model SystemSetting {
  id          String   @id @default(cuid())
  key         String   @unique
  value       String
  description String?
  category    SettingCategory
  updatedBy   String
  updatedAt   DateTime @default(now())
}
```

**Purpose**: Configurable system parameters managed by administrators.

**Categories**:
- `REQUEST_MANAGEMENT`: Blood request settings
- `DONATION_SETTINGS`: Donation rules and limits
- `SYSTEM_CONFIGURATION`: General system settings
- `SECURITY_PRIVACY`: Security and privacy settings
- `NOTIFICATIONS`: Notification preferences

### 5. **User History Model**

#### **UserHistory Model** (`user_history` table)
```prisma
model UserHistory {
  id          String   @id @default(cuid())
  userId      String
  type        HistoryType
  action      String
  bloodType   BloodType?
  location    String?
  date        DateTime
  status      String?
  contactName String?
  contactPhone String?
  createdAt   DateTime @default(now())
}
```

**Purpose**: Tracks all user activities and donation history.

**Types**:
- `INCOMING`: Blood received by user
- `OUTGOING`: Blood donated by user
- `SYSTEM`: System-generated activities

## 🔗 Model Relationships

### **User Relationships**
```
User (1) ←→ (Many) BloodRequest
User (1) ←→ (Many) Donation (as donor)
User (1) ←→ (Many) UserHistory
User (1) ←→ (Many) UserNotification
```

### **Admin Relationships**
```
Admin (1) ←→ (Many) BloodRequest (approved/rejected)
Admin (1) ←→ (Many) AdminNotification
Admin (1) ←→ (Many) SystemSetting
```

### **Blood Request Relationships**
```
BloodRequest (1) ←→ (Many) Donation
BloodRequest (1) ←→ (Many) BloodRequestNotification
BloodRequest (Many) ←→ (1) User (requester)
BloodRequest (Many) ←→ (1) Admin (processor)
```

### **Notification Relationships**
```
AdminNotification (1) ←→ (Many) UserNotification
AdminNotification (Many) ←→ (1) Admin (sender)
UserNotification (Many) ←→ (1) User (recipient)
```

## 📊 Database Enums

### **Gender**
- `MALE`, `FEMALE`, `OTHER`

### **BloodType**
- `A_POSITIVE`, `A_NEGATIVE`
- `B_POSITIVE`, `B_NEGATIVE`
- `AB_POSITIVE`, `AB_NEGATIVE`
- `O_POSITIVE`, `O_NEGATIVE`

### **UrgencyLevel**
- `LOW`, `MEDIUM`, `HIGH`, `URGENT`

### **RequestStatus**
- `PENDING`, `APPROVED`, `REJECTED`, `COMPLETED`, `CANCELLED`

### **DonationStatus**
- `PENDING`, `ACCEPTED`, `COMPLETED`, `CANCELLED`

### **AdminRole**
- `ADMIN`, `SUPER_ADMIN`, `MODERATOR`

### **NotificationPriority**
- `LOW`, `NORMAL`, `HIGH`, `URGENT`

## 🚀 Performance Optimizations

### **Database Indexes**
The schema includes strategic indexes for optimal query performance:

- **User queries**: `email`, `bloodType`, `location`, `isActive`, `isEligible`
- **Blood requests**: `status`, `bloodType`, `location`, `urgency`, `createdAt`
- **Donations**: `requestId`, `donorId`, `status`
- **Notifications**: `userId`, `isRead`, `createdAt`
- **Admins**: `email`, `adminCode`, `isActive`
- **System settings**: `key`, `category`

### **Cascade Deletes**
- User deletion cascades to their requests, donations, history, and notifications
- Blood request deletion cascades to related donations and notifications
- Admin deletion cascades to their actions and settings

## 🔐 Security Features

### **Data Protection**
- Passwords are hashed (implemented in application layer)
- Admin codes are unique and verified
- User eligibility is tracked and enforced
- Audit trail for all admin actions

### **Access Control**
- Role-based admin permissions
- User status management (active/inactive)
- Request approval workflow
- Donation status tracking

## 📱 Frontend Integration

### **Component Mapping**
- `AdminDashboard` → Admin statistics and overview
- `AdminUsers` → User management and monitoring
- `AdminRequests` → Blood request approval workflow
- `AdminNotifications` → Notification system management
- `AdminSettings` → System configuration
- `UserProfileScreen` → User data management
- `RequestBloodScreen` → Blood request creation
- `DonationStatusScreen` → Donation eligibility tracking

### **Data Flow**
1. **User Registration** → Creates `User` record
2. **Admin Registration** → Creates `Admin` record with verification
3. **Blood Request** → Creates `BloodRequest` with `PENDING` status
4. **Admin Approval** → Updates status to `APPROVED`/`REJECTED`
5. **Donor Response** → Creates `Donation` record
6. **Completion** → Updates donation status and user eligibility

## 🛠️ Setup Instructions

### **1. Install Dependencies**
```bash
cd badbaado-backend
npm install
```

### **2. Environment Configuration**
Create `.env` file:
```env
DATABASE_URL="postgresql://username:password@localhost:5432/shicibblood"
```

### **3. Database Migration**
```bash
npx prisma migrate dev --name init
npx prisma generate
```

### **4. Seed Data (Optional)**
```bash
npx prisma db seed
```

## 🔄 Future Enhancements

### **Planned Features**
- **Blood Inventory Management**: Track available blood units
- **Advanced Analytics**: Donation trends and reports
- **Emergency Response**: Real-time emergency notifications
- **Mobile App Integration**: Push notifications and offline support
- **Multi-language Support**: Localization for different regions
- **API Rate Limiting**: Prevent abuse and ensure stability

### **Scalability Considerations**
- **Database Partitioning**: For large datasets
- **Caching Layer**: Redis for frequently accessed data
- **CDN Integration**: For static assets and media
- **Load Balancing**: For high-traffic scenarios

---

## 📞 Support

For questions about the database schema or implementation:
- Review the Prisma documentation: https://pris.ly/docs
- Check the component files for usage examples
- Refer to the main README.md for project overview

**Schema Version**: 1.0.0  
**Last Updated**: December 2024  
**Maintainer**: ShicibBlood Development Team
