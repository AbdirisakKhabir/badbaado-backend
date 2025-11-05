const { PrismaClient } = require('@prisma/client');
const bcrypt = require('bcryptjs');

const prisma = new PrismaClient();

async function main() {
  console.log('🌱 Starting database seeding...');

  // ========================================
  // CREATE ADMIN USERS
  // ========================================
  console.log('👨‍⚕️ Creating admin users...');

  const adminPassword = await bcrypt.hash('Admin123!', 12);
  
  const admin1 = await prisma.admin.upsert({
    where: { email: 'admin@shicibblood.com' },
    update: {},
    create: {
      email: 'admin@shicibblood.com',
      password: adminPassword,
      fullName: 'Dr. Ahmed Hassan',
      phone: '+252 61 123 4567',
      adminCode: 'ADMIN2024',
      organization: 'Mogadishu General Hospital',
      position: 'Chief Medical Officer',
      department: 'Emergency Medicine',
      role: 'SUPER_ADMIN',
      isActive: true,
    },
  });

  const admin2 = await prisma.admin.upsert({
    where: { email: 'moderator@shicibblood.com' },
    update: {},
    create: {
      email: 'moderator@shicibblood.com',
      password: adminPassword,
      fullName: 'Dr. Fatima Ali',
      phone: '+252 63 234 5678',
      adminCode: 'MOD2024',
      organization: 'Hargeisa Medical Center',
      position: 'Blood Bank Director',
      department: 'Hematology',
      role: 'ADMIN',
      isActive: true,
    },
  });

  console.log('✅ Admin users created:', { admin1: admin1.email, admin2: admin2.email });

  // ========================================
  // CREATE REGULAR USERS
  // ========================================
  console.log('👥 Creating regular users...');

  const userPassword = await bcrypt.hash('User123!', 12);

  const users = await Promise.all([
    prisma.user.upsert({
      where: { email: 'ahmed@example.com' },
      update: {},
      create: {
        email: 'ahmed@example.com',
        password: userPassword,
        fullName: 'Ahmed Hassan',
        phone: '+252 61 111 1111',
        gender: 'MALE',
        age: 28,
        location: 'Mogadishu',
        bloodType: 'O_POSITIVE',
        isActive: true,
        isEligible: true,
        totalDonations: 5,
        lastDonation: new Date(Date.now() - 60 * 24 * 60 * 60 * 1000), // 60 days ago
      },
    }),
    prisma.user.upsert({
      where: { email: 'fatima@example.com' },
      update: {},
      create: {
        email: 'fatima@example.com',
        password: userPassword,
        fullName: 'Fatima Ali',
        phone: '+252 63 222 2222',
        gender: 'FEMALE',
        age: 32,
        location: 'Hargeisa',
        bloodType: 'A_POSITIVE',
        isActive: true,
        isEligible: true,
        totalDonations: 3,
        lastDonation: new Date(Date.now() - 90 * 24 * 60 * 60 * 1000), // 90 days ago
      },
    }),
    prisma.user.upsert({
      where: { email: 'omar@example.com' },
      update: {},
      create: {
        email: 'omar@example.com',
        password: userPassword,
        fullName: 'Omar Mohamed',
        phone: '+252 65 333 3333',
        gender: 'MALE',
        age: 25,
        location: 'Kismayo',
        bloodType: 'B_POSITIVE',
        isActive: true,
        isEligible: false,
        totalDonations: 7,
        lastDonation: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000), // 30 days ago
      },
    }),
    prisma.user.upsert({
      where: { email: 'amina@example.com' },
      update: {},
      create: {
        email: 'amina@example.com',
        password: userPassword,
        fullName: 'Amina Yusuf',
        phone: '+252 67 444 4444',
        gender: 'FEMALE',
        age: 29,
        location: 'Bosaso',
        bloodType: 'AB_POSITIVE',
        isActive: false,
        isEligible: true,
        totalDonations: 2,
        lastDonation: new Date(Date.now() - 180 * 24 * 60 * 60 * 1000), // 180 days ago
      },
    }),
  ]);

  console.log('✅ Regular users created:', users.length);

  // ========================================
  // CREATE BLOOD REQUESTS
  // ========================================
  console.log('🩸 Creating blood requests...');

  const bloodRequests = await Promise.all([
    prisma.bloodRequest.create({
      data: {
        userId: users[0].id,
        fullName: 'Ahmed Hassan',
        gender: 'MALE',
        age: 28,
        location: 'Mogadishu',
        bloodType: 'O_POSITIVE',
        urgency: 'HIGH',
        description: 'Emergency surgery needed for trauma patient',
        status: 'PENDING',
        maxDonors: 3,
        adminId: admin1.id,
      },
    }),
    prisma.bloodRequest.create({
      data: {
        userId: users[1].id,
        fullName: 'Fatima Ali',
        gender: 'FEMALE',
        age: 32,
        location: 'Hargeisa',
        bloodType: 'A_POSITIVE',
        urgency: 'MEDIUM',
        description: 'Regular transfusion for chronic condition',
        status: 'APPROVED',
        maxDonors: 2,
        adminId: admin2.id,
        approvedAt: new Date(),
      },
    }),
    prisma.bloodRequest.create({
      data: {
        userId: users[2].id,
        fullName: 'Omar Mohamed',
        gender: 'MALE',
        age: 25,
        location: 'Kismayo',
        bloodType: 'B_POSITIVE',
        urgency: 'LOW',
        description: 'Scheduled surgery preparation',
        status: 'COMPLETED',
        maxDonors: 1,
        adminId: admin1.id,
        approvedAt: new Date(Date.now() - 24 * 60 * 60 * 1000), // 1 day ago
      },
    }),
    prisma.bloodRequest.create({
      data: {
        userId: users[3].id,
        fullName: 'Amina Yusuf',
        gender: 'FEMALE',
        age: 29,
        location: 'Bosaso',
        bloodType: 'AB_POSITIVE',
        urgency: 'HIGH',
        description: 'Insufficient medical documentation provided',
        status: 'REJECTED',
        maxDonors: 2,
        adminId: admin2.id,
        rejectedAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000), // 2 days ago
        rejectReason: 'Missing medical documents and doctor referral',
      },
    }),
  ]);

  console.log('✅ Blood requests created:', bloodRequests.length);

  // ========================================
  // CREATE DONATIONS
  // ========================================
  console.log('💉 Creating donations...');

  const donations = await Promise.all([
    prisma.donation.create({
      data: {
        requestId: bloodRequests[1].id, // Approved request
        donorId: users[0].id,
        status: 'ACCEPTED',
        acceptedAt: new Date(Date.now() - 12 * 60 * 60 * 1000), // 12 hours ago
        notes: 'Available for donation tomorrow',
      },
    }),
    prisma.donation.create({
      data: {
        requestId: bloodRequests[2].id, // Completed request
        donorId: users[1].id,
        status: 'COMPLETED',
        acceptedAt: new Date(Date.now() - 25 * 60 * 60 * 1000), // 25 hours ago
        completedAt: new Date(Date.now() - 23 * 60 * 60 * 1000), // 23 hours ago
        notes: 'Donation completed successfully',
      },
    }),
  ]);

  console.log('✅ Donations created:', donations.length);

  // ========================================
  // CREATE ADMIN NOTIFICATIONS
  // ========================================
  console.log('📢 Creating admin notifications...');

  const adminNotifications = await Promise.all([
    prisma.adminNotification.create({
      data: {
        adminId: admin1.id,
        title: 'Emergency Blood Need',
        message: 'Urgent need for O+ blood in Mogadishu area',
        targetType: 'BY_LOCATION',
        targetValue: 'Mogadishu',
        priority: 'HIGH',
        status: 'SENT',
        sentAt: new Date(Date.now() - 2 * 60 * 60 * 1000), // 2 hours ago
        recipients: 45,
      },
    }),
    prisma.adminNotification.create({
      data: {
        adminId: admin2.id,
        title: 'System Maintenance',
        message: 'Scheduled maintenance on Sunday 2-4 AM',
        targetType: 'ALL_USERS',
        targetValue: 'All Users',
        priority: 'NORMAL',
        status: 'SENT',
        sentAt: new Date(Date.now() - 24 * 60 * 60 * 1000), // 1 day ago
        recipients: 1247,
      },
    }),
    prisma.adminNotification.create({
      data: {
        adminId: admin1.id,
        title: 'Blood Drive Campaign',
        message: 'Join our monthly blood donation campaign',
        targetType: 'BY_BLOOD_TYPE',
        targetValue: 'O_POSITIVE',
        priority: 'NORMAL',
        status: 'DRAFT',
      },
    }),
  ]);

  console.log('✅ Admin notifications created:', adminNotifications.length);

  // ========================================
  // CREATE USER NOTIFICATIONS
  // ========================================
  console.log('📱 Creating user notifications...');

  const userNotifications = await Promise.all([
    prisma.userNotification.create({
      data: {
        userId: users[0].id,
        notificationId: adminNotifications[0].id,
        title: 'Emergency Blood Need',
        message: 'Urgent need for O+ blood in Mogadishu area',
        type: 'ADMIN_MESSAGE',
        priority: 'HIGH',
        isRead: false,
      },
    }),
    prisma.userNotification.create({
      data: {
        userId: users[1].id,
        notificationId: adminNotifications[1].id,
        title: 'System Maintenance',
        message: 'Scheduled maintenance on Sunday 2-4 AM',
        type: 'SYSTEM',
        priority: 'NORMAL',
        isRead: true,
        readAt: new Date(),
      },
    }),
  ]);

  console.log('✅ User notifications created:', userNotifications.length);

  // ========================================
  // CREATE SYSTEM SETTINGS
  // ========================================
  console.log('⚙️ Creating system settings...');

  const systemSettings = await Promise.all([
    prisma.systemSetting.create({
      data: {
        key: 'maxDonorsPerRequest',
        value: '5',
        description: 'Maximum number of donors allowed per request',
        category: 'REQUEST_MANAGEMENT',
        updatedBy: admin1.id,
      },
    }),
    prisma.systemSetting.create({
      data: {
        key: 'donationCooldown',
        value: '120',
        description: 'Number of days between donations',
        category: 'DONATION_SETTINGS',
        updatedBy: admin1.id,
      },
    }),
    prisma.systemSetting.create({
      data: {
        key: 'requireAdminApproval',
        value: 'true',
        description: 'Require admin approval for blood requests',
        category: 'REQUEST_MANAGEMENT',
        updatedBy: admin1.id,
      },
    }),
    prisma.systemSetting.create({
      data: {
        key: 'notificationEnabled',
        value: 'true',
        description: 'Enable system notifications',
        category: 'NOTIFICATIONS',
        updatedBy: admin1.id,
      },
    }),
    prisma.systemSetting.create({
      data: {
        key: 'locationRadius',
        value: '50',
        description: 'Maximum distance for location matching (km)',
        category: 'DONATION_SETTINGS',
        updatedBy: admin1.id,
      },
    }),
  ]);

  console.log('✅ System settings created:', systemSettings.length);

  // ========================================
  // CREATE USER HISTORY
  // ========================================
  console.log('📚 Creating user history...');

  const userHistory = await Promise.all([
    prisma.userHistory.create({
      data: {
        userId: users[0].id,
        type: 'OUTGOING',
        action: 'Blood donation completed',
        bloodType: 'O_POSITIVE',
        location: 'Mogadishu',
        date: new Date(Date.now() - 60 * 24 * 60 * 60 * 1000), // 60 days ago
        status: 'Completed',
        contactName: 'Dr. Ahmed Hassan',
        contactPhone: '+252 61 123 4567',
      },
    }),
    prisma.userHistory.create({
      data: {
        userId: users[1].id,
        type: 'INCOMING',
        action: 'Blood request approved',
        bloodType: 'A_POSITIVE',
        location: 'Hargeisa',
        date: new Date(Date.now() - 12 * 60 * 60 * 1000), // 12 hours ago
        status: 'Approved',
        contactName: 'Dr. Fatima Ali',
        contactPhone: '+252 63 234 5678',
      },
    }),
    prisma.userHistory.create({
      data: {
        userId: users[2].id,
        type: 'OUTGOING',
        action: 'Blood donation completed',
        bloodType: 'B_POSITIVE',
        location: 'Kismayo',
        date: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000), // 30 days ago
        status: 'Completed',
        contactName: 'Dr. Ahmed Hassan',
        contactPhone: '+252 61 123 4567',
      },
    }),
  ]);

  console.log('✅ User history created:', userHistory.length);

  // ========================================
  // CREATE BLOOD REQUEST NOTIFICATIONS
  // ========================================
  console.log('🔔 Creating blood request notifications...');

  const bloodRequestNotifications = await Promise.all([
    prisma.bloodRequestNotification.create({
      data: {
        requestId: bloodRequests[0].id,
        message: 'New blood request created and pending approval',
        type: 'REQUEST_CREATED',
      },
    }),
    prisma.bloodRequestNotification.create({
      data: {
        requestId: bloodRequests[1].id,
        message: 'Blood request approved by admin',
        type: 'REQUEST_APPROVED',
      },
    }),
    prisma.bloodRequestNotification.create({
      data: {
        requestId: bloodRequests[2].id,
        message: 'Blood request completed successfully',
        type: 'REQUEST_COMPLETED',
      },
    }),
  ]);

  console.log('✅ Blood request notifications created:', bloodRequestNotifications.length);

  console.log('🎉 Database seeding completed successfully!');
  console.log('\n📊 Summary:');
  console.log(`   👨‍⚕️ Admins: ${2}`);
  console.log(`   👥 Users: ${users.length}`);
  console.log(`   🩸 Blood Requests: ${bloodRequests.length}`);
  console.log(`   💉 Donations: ${donations.length}`);
  console.log(`   📢 Admin Notifications: ${adminNotifications.length}`);
  console.log(`   📱 User Notifications: ${userNotifications.length}`);
  console.log(`   ⚙️ System Settings: ${systemSettings.length}`);
  console.log(`   📚 User History: ${userHistory.length}`);
  console.log(`   🔔 Request Notifications: ${bloodRequestNotifications.length}`);
}

main()
  .catch((e) => {
    console.error('❌ Error during seeding:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
