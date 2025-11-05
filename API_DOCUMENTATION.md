# 🚀 ShicibBlood API Documentation

Complete API reference for the ShicibBlood blood donation management system.

## 📋 Base URL

```
http://localhost:3000/api
```

## 🔐 Authentication

All protected endpoints require a JWT token in the Authorization header:

```
Authorization: Bearer <your-jwt-token>
```

## 📱 Authentication Endpoints

### **User Registration**
```http
POST /api/auth/register/user
```

**Request Body:**
```json
{
  "email": "user@example.com",
  "password": "User123!",
  "fullName": "Ahmed Hassan",
  "phone": "+252 61 123 4567",
  "gender": "MALE",
  "age": 28,
  "location": "Mogadishu",
  "bloodType": "O_POSITIVE"
}
```

**Response:**
```json
{
  "message": "User registered successfully",
  "user": {
    "id": "user_id",
    "email": "user@example.com",
    "fullName": "Ahmed Hassan",
    "phone": "+252 61 123 4567",
    "gender": "MALE",
    "age": 28,
    "location": "Mogadishu",
    "bloodType": "O_POSITIVE",
    "isActive": true,
    "isEligible": true,
    "totalDonations": 0,
    "createdAt": "2024-12-01T10:00:00.000Z"
  },
  "token": "jwt_token_here"
}
```

### **Admin Registration**
```http
POST /api/auth/register/admin
```

**Request Body:**
```json
{
  "email": "admin@shicibblood.com",
  "password": "Admin123!",
  "fullName": "Dr. Ahmed Hassan",
  "phone": "+252 61 123 4567",
  "adminCode": "ADMIN2024",
  "organization": "Mogadishu General Hospital",
  "position": "Chief Medical Officer",
  "department": "Emergency Medicine"
}
```

**Response:**
```json
{
  "message": "Admin registered successfully",
  "admin": {
    "id": "admin_id",
    "email": "admin@shicibblood.com",
    "fullName": "Dr. Ahmed Hassan",
    "phone": "+252 61 123 4567",
    "organization": "Mogadishu General Hospital",
    "position": "Chief Medical Officer",
    "department": "Emergency Medicine",
    "role": "ADMIN",
    "isActive": true,
    "createdAt": "2024-12-01T10:00:00.000Z"
  },
  "token": "jwt_token_here"
}
```

### **User Login**
```http
POST /api/auth/login/user
```

**Request Body:**
```json
{
  "email": "user@example.com",
  "password": "User123!"
}
```

**Response:**
```json
{
  "message": "Login successful",
  "user": {
    "id": "user_id",
    "email": "user@example.com",
    "fullName": "Ahmed Hassan",
    "phone": "+252 61 123 4567",
    "gender": "MALE",
    "age": 28,
    "location": "Mogadishu",
    "bloodType": "O_POSITIVE",
    "isActive": true,
    "isEligible": true,
    "totalDonations": 0,
    "lastDonation": null,
    "createdAt": "2024-12-01T10:00:00.000Z",
    "updatedAt": "2024-12-01T10:00:00.000Z"
  },
  "token": "jwt_token_here"
}
```

### **Admin Login**
```http
POST /api/auth/login/admin
```

**Request Body:**
```json
{
  "email": "admin@shicibblood.com",
  "password": "Admin123!"
}
```

**Response:**
```json
{
  "message": "Login successful",
  "admin": {
    "id": "admin_id",
    "email": "admin@shicibblood.com",
    "fullName": "Dr. Ahmed Hassan",
    "phone": "+252 61 123 4567",
    "organization": "Mogadishu General Hospital",
    "position": "Chief Medical Officer",
    "department": "Emergency Medicine",
    "role": "ADMIN",
    "isActive": true,
    "createdAt": "2024-12-01T10:00:00.000Z",
    "updatedAt": "2024-12-01T10:00:00.000Z"
  },
  "token": "jwt_token_here"
}
```

## 👥 User Endpoints

### **Get User Profile**
```http
GET /api/users/profile
Authorization: Bearer <user-token>
```

**Response:**
```json
{
  "user": {
    "id": "user_id",
    "email": "user@example.com",
    "fullName": "Ahmed Hassan",
    "phone": "+252 61 123 4567",
    "gender": "MALE",
    "age": 28,
    "location": "Mogadishu",
    "bloodType": "O_POSITIVE",
    "isActive": true,
    "isEligible": true,
    "totalDonations": 0,
    "lastDonation": null,
    "createdAt": "2024-12-01T10:00:00.000Z",
    "updatedAt": "2024-12-01T10:00:00.000Z"
  }
}
```

### **Update User Profile**
```http
PUT /api/users/profile
Authorization: Bearer <user-token>
```

**Request Body:**
```json
{
  "fullName": "Ahmed Hassan Updated",
  "phone": "+252 61 999 9999",
  "age": 29,
  "location": "Hargeisa",
  "bloodType": "O_POSITIVE"
}
```

**Response:**
```json
{
  "message": "Profile updated successfully",
  "user": {
    "id": "user_id",
    "email": "user@example.com",
    "fullName": "Ahmed Hassan Updated",
    "phone": "+252 61 999 9999",
    "gender": "MALE",
    "age": 29,
    "location": "Hargeisa",
    "bloodType": "O_POSITIVE",
    "isActive": true,
    "isEligible": true,
    "totalDonations": 0,
    "lastDonation": null,
    "updatedAt": "2024-12-01T11:00:00.000Z"
  }
}
```

### **Get User History**
```http
GET /api/users/history
Authorization: Bearer <user-token>
```

**Response:**
```json
{
  "history": [
    {
      "id": "history_id",
      "userId": "user_id",
      "type": "OUTGOING",
      "action": "Blood donation completed",
      "bloodType": "O_POSITIVE",
      "location": "Mogadishu",
      "date": "2024-10-01T10:00:00.000Z",
      "status": "Completed",
      "contactName": "Dr. Ahmed Hassan",
      "contactPhone": "+252 61 123 4567",
      "createdAt": "2024-10-01T10:00:00.000Z"
    }
  ]
}
```

### **Get User Eligibility**
```http
GET /api/users/eligibility
Authorization: Bearer <user-token>
```

**Response:**
```json
{
  "isEligible": false,
  "lastDonation": "2024-10-01T10:00:00.000Z",
  "daysToEligibility": 45
}
```

## 🩸 Blood Request Endpoints

### **Create Blood Request**
```http
POST /api/requests
Authorization: Bearer <user-token>
```

**Request Body:**
```json
{
  "fullName": "Ahmed Hassan",
  "gender": "MALE",
  "age": 28,
  "location": "Mogadishu",
  "bloodType": "O_POSITIVE",
  "urgency": "HIGH",
  "description": "Emergency surgery needed",
  "maxDonors": 3
}
```

**Response:**
```json
{
  "message": "Blood request created successfully",
  "request": {
    "id": "request_id",
    "userId": "user_id",
    "fullName": "Ahmed Hassan",
    "gender": "MALE",
    "age": 28,
    "location": "Mogadishu",
    "bloodType": "O_POSITIVE",
    "urgency": "HIGH",
    "description": "Emergency surgery needed",
    "status": "PENDING",
    "maxDonors": 3,
    "createdAt": "2024-12-01T10:00:00.000Z",
    "updatedAt": "2024-12-01T10:00:00.000Z"
  }
}
```

### **Get All Blood Requests**
```http
GET /api/requests?status=PENDING&bloodType=O_POSITIVE&location=Mogadishu&urgency=HIGH
```

**Query Parameters:**
- `status`: PENDING, APPROVED, REJECTED, COMPLETED, CANCELLED
- `bloodType`: A_POSITIVE, A_NEGATIVE, B_POSITIVE, B_NEGATIVE, AB_POSITIVE, AB_NEGATIVE, O_POSITIVE, O_NEGATIVE
- `location`: City name
- `urgency`: LOW, MEDIUM, HIGH, URGENT

**Response:**
```json
{
  "requests": [
    {
      "id": "request_id",
      "userId": "user_id",
      "fullName": "Ahmed Hassan",
      "gender": "MALE",
      "age": 28,
      "location": "Mogadishu",
      "bloodType": "O_POSITIVE",
      "urgency": "HIGH",
      "description": "Emergency surgery needed",
      "status": "PENDING",
      "maxDonors": 3,
      "createdAt": "2024-12-01T10:00:00.000Z",
      "updatedAt": "2024-12-01T10:00:00.000Z",
      "user": {
        "fullName": "Ahmed Hassan",
        "phone": "+252 61 123 4567"
      }
    }
  ]
}
```

### **Get Blood Request by ID**
```http
GET /api/requests/:id
```

**Response:**
```json
{
  "request": {
    "id": "request_id",
    "userId": "user_id",
    "fullName": "Ahmed Hassan",
    "gender": "MALE",
    "age": 28,
    "location": "Mogadishu",
    "bloodType": "O_POSITIVE",
    "urgency": "HIGH",
    "description": "Emergency surgery needed",
    "status": "APPROVED",
    "maxDonors": 3,
    "createdAt": "2024-12-01T10:00:00.000Z",
    "updatedAt": "2024-12-01T10:00:00.000Z",
    "approvedAt": "2024-12-01T10:30:00.000Z",
    "adminId": "admin_id",
    "user": {
      "fullName": "Ahmed Hassan",
      "phone": "+252 61 123 4567",
      "email": "user@example.com"
    },
    "donations": [
      {
        "id": "donation_id",
        "requestId": "request_id",
        "donorId": "donor_id",
        "status": "ACCEPTED",
        "acceptedAt": "2024-12-01T11:00:00.000Z",
        "completedAt": null,
        "notes": "Available for donation tomorrow",
        "createdAt": "2024-12-01T11:00:00.000Z",
        "updatedAt": "2024-12-01T11:00:00.000Z",
        "donor": {
          "fullName": "Fatima Ali",
          "phone": "+252 63 234 5678",
          "bloodType": "O_POSITIVE"
        }
      }
    ]
  }
}
```

### **Update Blood Request Status (Admin)**
```http
PUT /api/requests/:id/status
Authorization: Bearer <admin-token>
```

**Request Body:**
```json
{
  "status": "APPROVED"
}
```

**Or for rejection:**
```json
{
  "status": "REJECTED",
  "rejectReason": "Missing medical documents"
}
```

**Response:**
```json
{
  "message": "Request approved successfully",
  "request": {
    "id": "request_id",
    "status": "APPROVED",
    "approvedAt": "2024-12-01T10:30:00.000Z",
    "adminId": "admin_id"
  }
}
```

### **Delete Blood Request**
```http
DELETE /api/requests/:id
Authorization: Bearer <user-token>
```

**Response:**
```json
{
  "message": "Request deleted successfully"
}
```

## 💉 Donation Endpoints

### **Create Donation Response**
```http
POST /api/donations
Authorization: Bearer <user-token>
```

**Request Body:**
```json
{
  "requestId": "request_id",
  "notes": "Available for donation tomorrow"
}
```

**Response:**
```json
{
  "message": "Donation response created successfully",
  "donation": {
    "id": "donation_id",
    "requestId": "request_id",
    "donorId": "user_id",
    "status": "PENDING",
    "acceptedAt": null,
    "completedAt": null,
    "notes": "Available for donation tomorrow",
    "createdAt": "2024-12-01T11:00:00.000Z",
    "updatedAt": "2024-12-01T11:00:00.000Z"
  }
}
```

### **Get User Donations**
```http
GET /api/donations?status=ACCEPTED
Authorization: Bearer <user-token>
```

**Query Parameters:**
- `status`: PENDING, ACCEPTED, COMPLETED, CANCELLED

**Response:**
```json
{
  "donations": [
    {
      "id": "donation_id",
      "requestId": "request_id",
      "donorId": "user_id",
      "status": "ACCEPTED",
      "acceptedAt": "2024-12-01T11:00:00.000Z",
      "completedAt": null,
      "notes": "Available for donation tomorrow",
      "createdAt": "2024-12-01T11:00:00.000Z",
      "updatedAt": "2024-12-01T11:00:00.000Z",
      "bloodRequest": {
        "fullName": "Ahmed Hassan",
        "bloodType": "O_POSITIVE",
        "location": "Mogadishu",
        "urgency": "HIGH"
      }
    }
  ]
}
```

### **Update Donation Status**
```http
PUT /api/donations/:id/status
Authorization: Bearer <user-token>
```

**Request Body:**
```json
{
  "status": "COMPLETED"
}
```

**Response:**
```json
{
  "message": "Donation status updated successfully",
  "donation": {
    "id": "donation_id",
    "status": "COMPLETED",
    "completedAt": "2024-12-01T12:00:00.000Z"
  }
}
```

## 👨‍⚕️ Admin Endpoints

### **Get Admin Dashboard Stats**
```http
GET /api/admin/dashboard
Authorization: Bearer <admin-token>
```

**Response:**
```json
{
  "stats": {
    "totalUsers": 1247,
    "totalRequests": 856,
    "pendingRequests": 23,
    "completedDonations": 391
  }
}
```

### **Get All Users (Admin)**
```http
GET /api/admin/users?search=ahmed&status=active&bloodType=O_POSITIVE&location=Mogadishu
Authorization: Bearer <admin-token>
```

**Query Parameters:**
- `search`: Search by name, email, or location
- `status`: active, inactive
- `bloodType`: Blood type filter
- `location`: Location filter

**Response:**
```json
{
  "users": [
    {
      "id": "user_id",
      "fullName": "Ahmed Hassan",
      "email": "user@example.com",
      "phone": "+252 61 123 4567",
      "bloodType": "O_POSITIVE",
      "location": "Mogadishu",
      "isActive": true,
      "isEligible": true,
      "totalDonations": 5,
      "lastDonation": "2024-10-01T10:00:00.000Z",
      "createdAt": "2024-01-01T10:00:00.000Z"
    }
  ]
}
```

### **Update User Status (Admin)**
```http
PUT /api/admin/users/:id/status
Authorization: Bearer <admin-token>
```

**Request Body:**
```json
{
  "isActive": false
}
```

**Response:**
```json
{
  "message": "User deactivated successfully",
  "user": {
    "id": "user_id",
    "fullName": "Ahmed Hassan",
    "email": "user@example.com",
    "isActive": false,
    "updatedAt": "2024-12-01T12:00:00.000Z"
  }
}
```

### **Get All Blood Requests (Admin)**
```http
GET /api/admin/requests?status=PENDING&bloodType=O_POSITIVE&location=Mogadishu&urgency=HIGH
Authorization: Bearer <admin-token>
```

**Response:**
```json
{
  "requests": [
    {
      "id": "request_id",
      "userId": "user_id",
      "fullName": "Ahmed Hassan",
      "gender": "MALE",
      "age": 28,
      "location": "Mogadishu",
      "bloodType": "O_POSITIVE",
      "urgency": "HIGH",
      "description": "Emergency surgery needed",
      "status": "PENDING",
      "maxDonors": 3,
      "createdAt": "2024-12-01T10:00:00.000Z",
      "updatedAt": "2024-12-01T10:00:00.000Z",
      "user": {
        "fullName": "Ahmed Hassan",
        "email": "user@example.com",
        "phone": "+252 61 123 4567"
      },
      "donations": []
    }
  ]
}
```

### **Approve Blood Request (Admin)**
```http
PUT /api/admin/requests/:id/approve
Authorization: Bearer <admin-token>
```

**Response:**
```json
{
  "message": "Request approved successfully",
  "request": {
    "id": "request_id",
    "status": "APPROVED",
    "approvedAt": "2024-12-01T10:30:00.000Z",
    "adminId": "admin_id"
  }
}
```

### **Reject Blood Request (Admin)**
```http
PUT /api/admin/requests/:id/reject
Authorization: Bearer <admin-token>
```

**Request Body:**
```json
{
  "rejectReason": "Missing medical documents"
}
```

**Response:**
```json
{
  "message": "Request rejected successfully",
  "request": {
    "id": "request_id",
    "status": "REJECTED",
    "rejectedAt": "2024-12-01T10:30:00.000Z",
    "adminId": "admin_id",
    "rejectReason": "Missing medical documents"
  }
}
```

## 📢 Notification Endpoints

### **Send Admin Notification**
```http
POST /api/admin/notifications
Authorization: Bearer <admin-token>
```

**Request Body:**
```json
{
  "title": "Emergency Blood Need",
  "message": "Urgent need for O+ blood in Mogadishu area",
  "targetType": "BY_LOCATION",
  "targetValue": "Mogadishu",
  "priority": "HIGH"
}
```

**Target Types:**
- `ALL_USERS`: Send to all users
- `BY_LOCATION`: Send to users in specific location
- `BY_BLOOD_TYPE`: Send to users with specific blood type
- `INDIVIDUAL_USER`: Send to specific user

**Priorities:**
- `LOW`, `NORMAL`, `HIGH`, `URGENT`

**Response:**
```json
{
  "message": "Notification sent successfully",
  "notification": {
    "id": "notification_id",
    "adminId": "admin_id",
    "title": "Emergency Blood Need",
    "message": "Urgent need for O+ blood in Mogadishu area",
    "targetType": "BY_LOCATION",
    "targetValue": "Mogadishu",
    "priority": "HIGH",
    "status": "SENT",
    "sentAt": "2024-12-01T10:00:00.000Z",
    "recipients": null,
    "createdAt": "2024-12-01T10:00:00.000Z",
    "updatedAt": "2024-12-01T10:00:00.000Z"
  }
}
```

### **Get User Notifications**
```http
GET /api/notifications?isRead=false
Authorization: Bearer <user-token>
```

**Query Parameters:**
- `isRead`: true, false (optional)

**Response:**
```json
{
  "notifications": [
    {
      "id": "notification_id",
      "userId": "user_id",
      "notificationId": "admin_notification_id",
      "title": "Emergency Blood Need",
      "message": "Urgent need for O+ blood in Mogadishu area",
      "type": "ADMIN_MESSAGE",
      "priority": "HIGH",
      "isRead": false,
      "readAt": null,
      "createdAt": "2024-12-01T10:00:00.000Z"
    }
  ]
}
```

### **Mark Notification as Read**
```http
PUT /api/notifications/:id/read
Authorization: Bearer <user-token>
```

**Response:**
```json
{
  "message": "Notification marked as read",
  "notification": {
    "id": "notification_id",
    "isRead": true,
    "readAt": "2024-12-01T12:00:00.000Z"
  }
}
```

## ⚙️ System Settings Endpoints

### **Get System Settings**
```http
GET /api/admin/settings?category=REQUEST_MANAGEMENT
Authorization: Bearer <admin-token>
```

**Query Parameters:**
- `category`: REQUEST_MANAGEMENT, DONATION_SETTINGS, SYSTEM_CONFIGURATION, SECURITY_PRIVACY, NOTIFICATIONS

**Response:**
```json
{
  "settings": [
    {
      "id": "setting_id",
      "key": "maxDonorsPerRequest",
      "value": "5",
      "description": "Maximum number of donors allowed per request",
      "category": "REQUEST_MANAGEMENT",
      "updatedBy": "admin_id",
      "updatedAt": "2024-12-01T10:00:00.000Z"
    }
  ]
}
```

### **Update System Setting**
```http
PUT /api/admin/settings/:key
Authorization: Bearer <admin-token>
```

**Request Body:**
```json
{
  "value": "10",
  "description": "Updated maximum donors per request"
}
```

**Response:**
```json
{
  "message": "Setting updated successfully",
  "setting": {
    "id": "setting_id",
    "key": "maxDonorsPerRequest",
    "value": "10",
    "description": "Updated maximum donors per request",
    "category": "SYSTEM_CONFIGURATION",
    "updatedBy": "admin_id",
    "updatedAt": "2024-12-01T12:00:00.000Z"
  }
}
```

## 🚨 Error Responses

### **400 Bad Request**
```json
{
  "error": "Required fields missing"
}
```

### **401 Unauthorized**
```json
{
  "error": "Access token required"
}
```

### **403 Forbidden**
```json
{
  "error": "Not authorized to update this donation"
}
```

### **404 Not Found**
```json
{
  "error": "Request not found"
}
```

### **500 Internal Server Error**
```json
{
  "error": "Internal server error"
}
```

## 📊 Data Types

### **Blood Types**
- `A_POSITIVE`, `A_NEGATIVE`
- `B_POSITIVE`, `B_NEGATIVE`
- `AB_POSITIVE`, `AB_NEGATIVE`
- `O_POSITIVE`, `O_NEGATIVE`

### **Gender**
- `MALE`, `FEMALE`, `OTHER`

### **Urgency Levels**
- `LOW`, `MEDIUM`, `HIGH`, `URGENT`

### **Request Status**
- `PENDING`, `APPROVED`, `REJECTED`, `COMPLETED`, `CANCELLED`

### **Donation Status**
- `PENDING`, `ACCEPTED`, `COMPLETED`, `CANCELLED`

### **Admin Roles**
- `ADMIN`, `SUPER_ADMIN`, `MODERATOR`

### **Notification Types**
- `SYSTEM`, `BLOOD_REQUEST`, `DONATION_UPDATE`, `ADMIN_MESSAGE`

## 🔄 Rate Limiting

Currently no rate limiting implemented. Consider implementing for production.

## 📝 Testing

Use tools like Postman, Insomnia, or curl to test the API endpoints.

### **Example curl commands:**

```bash
# User registration
curl -X POST http://localhost:3000/api/auth/register/user \
  -H "Content-Type: application/json" \
  -d '{"email":"test@example.com","password":"Test123!","fullName":"Test User","phone":"+252123456789","gender":"MALE","age":25,"location":"Mogadishu","bloodType":"O_POSITIVE"}'

# User login
curl -X POST http://localhost:3000/api/auth/login/user \
  -H "Content-Type: application/json" \
  -d '{"email":"test@example.com","password":"Test123!"}'

# Get user profile (with token)
curl -X GET http://localhost:3000/api/users/profile \
  -H "Authorization: Bearer YOUR_TOKEN_HERE"
```

---

**API Version**: 1.0.0  
**Last Updated**: December 2024  
**Maintainer**: ShicibBlood Development Team
