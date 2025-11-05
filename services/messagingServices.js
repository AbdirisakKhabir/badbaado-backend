const BAWA_TOKEN =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1aWQiOiIzMzl3aG4xVWVvWTVabGtHS0JhVG9JbnQyc1dCZ29xVSIsInJvbGUiOiJ1c2VyIiwiaWF0IjoxNzQwNDY2NDY4fQ._Ul8BYxqcqYQ1k1fNlRZEhQeQ5Y_uzG9zWhtsXuCFdI";
const INSTANCE_ID =
  "eyJ1aWQiOiIzMzl3aG4xVWVvWTVabGtHS0JhVG9JbnQyc1dCZ29xVSIsImNsaWVudF9pZCI6IlRhYW0gU29sdXRpb25zIn0=";

class MessagingService {
  constructor() {
    this.baseUrl = "https://bawa.app/api/v1";
  }

  // Core WhatsApp message sending function
  async sendWhatsAppMessage(phone, message) {
    try {
      const formattedPhone = this.formatPhoneNumber(phone);
      const jid = `${formattedPhone}@s.whatsapp.net`;

      console.log(`📤 Sending WhatsApp to: ${formattedPhone}`);

      const apiUrl = `${
        this.baseUrl
      }/send-text?token=${BAWA_TOKEN}&instance_id=${INSTANCE_ID}&jid=${jid}&msg=${encodeURIComponent(
        message
      )}`;

      const response = await fetch(apiUrl, {
        method: "GET",
        headers: {
          Accept: "application/json",
          "User-Agent": "BloodDonationApp/1.0",
        },
      });

      if (!response.ok) {
        throw new Error(`WhatsApp API error: ${response.status}`);
      }

      const result = await response.json();
      console.log(`✅ Message sent successfully to ${formattedPhone}`);
      return result;
    } catch (error) {
      console.error(`💥 Failed to send message to ${phone}:`, error.message);
      throw error;
    }
  }

  // Notify multiple eligible donors about blood request
  async notifyEligibleDonors(donors, bloodRequest) {
    try {
      console.log(`🔔 Starting to notify ${donors.length} eligible donors...`);
      const results = [];

      for (const [index, donor] of donors.entries()) {
        try {
          console.log(
            `📨 [${index + 1}/${donors.length}] Notifying donor: ${
              donor.fullName
            } (${donor.phone})`
          );

          const message = this.createDonorNotificationMessage(
            donor,
            bloodRequest
          );
          const result = await this.sendWhatsAppMessage(donor.phone, message);

          results.push({
            donorId: donor.id,
            phone: donor.phone,
            name: donor.fullName,
            bloodType: donor.bloodType,
            location: donor.location,
            success: true,
            data: result,
          });

          console.log(`✅ Successfully notified ${donor.fullName}`);

          // Add delay between messages to avoid rate limiting (2 seconds)
          if (index < donors.length - 1) {
            console.log(`⏳ Waiting 2 seconds before next message...`);
            await new Promise((resolve) => setTimeout(resolve, 2000));
          }
        } catch (error) {
          console.error(
            `❌ Failed to notify donor ${donor.phone}:`,
            error.message
          );
          results.push({
            donorId: donor.id,
            phone: donor.phone,
            name: donor.fullName,
            success: false,
            error: error.message,
          });

          // Continue with next donor even if one fails
          console.log(`🔄 Continuing with next donor...`);
        }
      }

      const successful = results.filter((r) => r.success).length;
      console.log(
        `📊 Notification summary: ${successful}/${donors.length} successful`
      );

      return results;
    } catch (error) {
      console.error("💥 Error in notifyEligibleDonors:", error);
      throw error;
    }
  }

  // Send approval confirmation to patient
  async sendApprovalConfirmation(bloodRequest) {
    try {
      console.log("📝 Sending approval confirmation to patient...");
      const message = this.createApprovalConfirmationMessage(bloodRequest);
      const result = await this.sendWhatsAppMessage(
        bloodRequest.phone,
        message
      );
      console.log("Approval confirmation sent to patient");
      return result;
    } catch (error) {
      console.error("Error sending approval confirmation:", error.message);
      throw error;
    }
  }

  async notifyAdminsNewRequest(admins, bloodRequest) {
    try {
      console.log(`🔔 Notifying ${admins.length} admins about new request...`);
      const results = [];

      for (const [index, admin] of admins.entries()) {
        try {
          console.log(
            `📨 [${index + 1}/${admins.length}] Notifying admin: ${
              admin.fullName
            } (${admin.phone})`
          );

          const message = this.createNewRequestAdminMessage(bloodRequest);
          const result = await this.sendWhatsAppMessage(admin.phone, message);

          results.push({
            adminId: admin.id,
            phone: admin.phone,
            name: admin.fullName,
            success: true,
            data: result,
          });

          console.log(`✅ Successfully notified admin ${admin.fullName}`);

          // Add delay between messages to avoid rate limiting
          if (index < admins.length - 1) {
            await new Promise((resolve) => setTimeout(resolve, 1000));
          }
        } catch (error) {
          console.error(
            `❌ Failed to notify admin ${admin.phone}:`,
            error.message
          );
          results.push({
            adminId: admin.id,
            phone: admin.phone,
            name: admin.fullName,
            success: false,
            error: error.message,
          });
        }
      }

      const successful = results.filter((r) => r.success).length;
      console.log(
        `📊 Admin notification summary: ${successful}/${admins.length} successful`
      );

      return results;
    } catch (error) {
      console.error("💥 Error in notifyAdminsNewRequest:", error);
      throw error;
    }
  }

  // Create donor notification message for multiple donors
  createDonorNotificationMessage(donor, bloodRequest) {
    const bloodType = this.getBloodTypeLabel(bloodRequest.bloodType);
    const urgency = this.getUrgencyLabel(bloodRequest.urgency);
    const title =
      bloodRequest.gender && bloodRequest.gender.toLowerCase() === "male"
        ? "Mudane"
        : "Marwo";

    return `*Codsiga Dhiig Degdegga Ah* 

*Waxaa jira codsi degdeg ah oo dhiig loo baahan yahay goobta aad ku sugtahay:*

*MACLUUMAADKA CODSIGA:*
*Magaca Buka:* ${title} ${bloodRequest.fullName}
*Lambarka Xiriirka:* ${bloodRequest.phone}
*Isbitaalka:* ${bloodRequest.hospital}
*Goobta:* ${bloodRequest.location}
*Nooca Dhiigga:* ${bloodType}
*Darajada Degdegga:* ${urgency}
*Da'da Buka:* ${bloodRequest.age} sano

*FADLAN KA QEYB QAADO!*
Haddii aad dhiig siin kartid, fadlan si degdeg ah ula xidhiidh qofka u baahan dhiigga lambarka kor ku xusan.

*Waad ku mahadsan tahay samafalkaaga!*
- Badbaado Blood Donation App`;
  }
  createNewRequestAdminMessage(bloodRequest) {
    const bloodType = this.getBloodTypeLabel(bloodRequest.bloodType);
    const urgency = this.getUrgencyLabel(bloodRequest.urgency);

    return `*CODSI DHIIG CUSUB AYAA LA SOO DIBAY* 

*MACLUUMAADKA CODSIGA:*
*Magaca Buka:* ${bloodRequest.fullName}
*Lambarka Xiriirka:* ${bloodRequest.phone}
*Isbitaalka:* ${bloodRequest.hospital}
*Goobta:* ${bloodRequest.location}
*Nooca Dhiigga:* ${bloodType}
*Darajada Degdegga:* ${urgency}
*Da'da Qofka:* ${bloodRequest.age} sano
*Taariikhda:* ${new Date(bloodRequest.createdAt).toLocaleDateString("so-SO")}

*FADLAN ANSIXI CODSIGAN SI DHIIG DEEDAYAASHA LOOGU DIRO WARGELIN!*

*Waad ku mahadsan tahay!*
- Badbaado Blood Donation App`;
  }
  // Create approval confirmation message for patient
  createApprovalConfirmationMessage(bloodRequest) {
    const title =
      bloodRequest.gender && bloodRequest.gender.toLowerCase() === "male"
        ? "Mudane"
        : "Marwo";
    const bloodType = this.getBloodTypeLabel(bloodRequest.bloodType);

    return `*Codsiga Dhiigga Waa la Ansixiyay* 

${title} ${bloodRequest.fullName},

Codsigaaga dhiigga si guul leh ayaa loo ansixiyay! Waxaan hadda u diraynaa wargelin dadka ku nool goobtaada ee leh nooca dhiigga aad soo codsatay.

*Macluumaadka Codsiga:*
 *Isbitaalka:* ${bloodRequest.hospital}
 *Goobta:* ${bloodRequest.location}
 *Nooca Dhiigga:* ${bloodType}
 *Darajada:* ${this.getUrgencyLabel(bloodRequest.urgency)}
*Da'da:* ${bloodRequest.age} sano

Waxaan rajeyneynaa in sida ugu dhakhsaha badan ay usoo aqbalaan dad dhiig deeqayaal ah.

*Mahadsanid!*
- Badbaado Blood Donation System`;
  }

  // Helper functions
  formatPhoneNumber(phone) {
    console.log("📞 Original phone:", phone);

    if (!phone) {
      throw new Error("Phone number is required");
    }

    // Remove all non-digit characters
    let cleanPhone = phone.replace(/\D/g, "");
    console.log("🧹 Cleaned phone:", cleanPhone);

    // Handle Somali phone numbers (9 digits starting with 6)
    if (cleanPhone.length === 9 && cleanPhone.startsWith("6")) {
      cleanPhone = "252" + cleanPhone;
      console.log("🇸🇨 Added Somalia country code:", cleanPhone);
    }
    // Remove leading 0 if present and add 252
    else if (cleanPhone.startsWith("0")) {
      cleanPhone = "252" + cleanPhone.substring(1);
      console.log("0️⃣ Removed leading zero:", cleanPhone);
    }
    // Ensure it starts with 252 for other cases
    else if (!cleanPhone.startsWith("252")) {
      cleanPhone = "252" + cleanPhone;
      console.log("➕ Added 252 prefix:", cleanPhone);
    }

    console.log("✅ Final formatted phone:", cleanPhone);
    return cleanPhone;
  }

  getBloodTypeLabel(bloodType) {
    const bloodTypes = {
      A_POSITIVE: "A+",
      A_NEGATIVE: "A-",
      B_POSITIVE: "B+",
      B_NEGATIVE: "B-",
      AB_POSITIVE: "AB+",
      AB_NEGATIVE: "AB-",
      O_POSITIVE: "O+",
      O_NEGATIVE: "O-",
    };
    return bloodTypes[bloodType] || bloodType;
  }

  getUrgencyLabel(urgency) {
    const urgencyLevels = {
      LOW: "Hooseya",
      MEDIUM: "Dhexdhexaad",
      HIGH: "Degdeg Ah",
    };
    return urgencyLevels[urgency] || urgency;
  }
}

module.exports = new MessagingService();
