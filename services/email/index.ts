import { EMAIL_CONFIG, getTransporter } from './config';
import dayjs from 'dayjs';
import timezone from 'dayjs/plugin/timezone';
import utc from 'dayjs/plugin/utc';
import { WarrantyContactForm } from '@components/ui/bodykore/Sections/SubmissionForm';
import { ContactFormTraining } from 'pages/functionaltraining';
import axios from 'axios';

dayjs.extend(utc);
dayjs.extend(timezone);

export interface IemailData {
  name: string;
  phone: string;
  email: string;
  message: string;
  timestamp: string;
  company: string;
}
export interface IkalvyoData {
  email: string;
  phone: string;
}
export interface IsmartData {
  name: string;
  email: string;
  timestamp: string;
}

export const sendEmail = async (emailData: any) => {
  const transporter = getTransporter();
  console.log('body',{
    name: emailData.name,
    email: emailData.email,
    phone: emailData.phone,
    message: emailData.message,
    company: emailData.company,
    terms: emailData.terms,
    timestamp: emailData.timestamp,
  })
  try {
    await axios.post(
      'https://www.zohoapis.com/crm/v2/functions/test_1/actions/execute?auth_type=apikey&zapikey=1003.eba7f86fd2539491aa514a7eb4ec9944.5d4d7f7d610e01d997d47d39aac51822',
      {
        Contact_Form: {
          name: emailData.name,
          email: emailData.email,
          phone: emailData.phone,
          message: emailData.message,
          company: emailData.company,
          terms: emailData.terms,
          timestamp: emailData.timestamp,
        },
      }
    );
    await transporter.sendMail({
      from: `Bodykore <${EMAIL_CONFIG.USERNAME}>`, // sender address
      to: EMAIL_CONFIG.EMAIL_TO,
      subject: `Contact inqury from ${emailData.name}`,
      html: toHTML({ ...emailData }),
      headers: {
        'X-Custom-Header': 'Bodykore',
      },
    });

    transporter.close();
    return { status: true, messageId: 'Thank You !' };
  } catch (e) {
    console.error(e); // Uncomment for dev
    transporter.close();
    return { status: false, messageId: 'Failed to send email' };
  }
};

export const sendEmailToUser = async (emailData: ContactFormTraining) => {
  const transporter = getTransporter();
  try {
 
    await transporter.sendMail({
      from: `Bodykore <${EMAIL_CONFIG.USERNAME}>`, // sender address
      to: emailData.email,
      subject: `Contact inqury from ${emailData.firstName + ' ' + emailData.lastName}`,
      html: toHTMLFuncationTrainingForUser(emailData),
      headers: {
        'X-Custom-Header': 'Bodykore',
      },
    });

    transporter.close();
    return { status: true, messageId: 'Thank You !' };
  } catch (e) {
    console.error(e); // Uncomment for dev
    transporter.close();
    return { status: false, messageId: 'Failed to send email' };
  }
};
export const sendDemoSledProEmail = async (emailData: any) => {
  const transporter = getTransporter();
  try {
    await axios.post(
      'https://www.zohoapis.com/crm/v2/functions/test_1/actions/execute?auth_type=apikey&zapikey=1003.eba7f86fd2539491aa514a7eb4ec9944.5d4d7f7d610e01d997d47d39aac51822',
      {
        Contact_Form: {
          name: emailData.name,
          email: emailData.email,
          phone: emailData.phone,
          message: emailData.message,
          terms: emailData.terms,
          timestamp: emailData.timestamp,
        },
      }
    );
    await transporter.sendMail({
      from: `Bodykore <${EMAIL_CONFIG.USERNAME}>`, // sender address
      to: EMAIL_CONFIG.EMAIL_TO,
      subject: `Demo Request For Sled Pro ${emailData.name}`,
      html: toHTMLSledPro({ ...emailData }),
      headers: {
        'X-Custom-Header': 'Bodykore',
      },
    });

    transporter.close();
    return { status: true, messageId: 'Thank You !' };
  } catch (e) {
    console.error(e); // Uncomment for dev
    transporter.close();
    return { status: false, messageId: 'Failed to send email' };
  }
};

export const sendKalvyo = async (emailData: any) => {
  const transporter = getTransporter();
  try {
    const response = await axios.post(
      'https://www.zohoapis.com/crm/v2/functions/Get_Subscription_API/actions/execute?auth_type=apikey&zapikey=1003.eba7f86fd2539491aa514a7eb4ec9944.5d4d7f7d610e01d997d47d39aac51822',
      emailData
    );
    transporter.close();
    return { status: true, response: response.data };
  } catch (e) {
    console.error(e); // Uncomment for dev
    transporter.close();
    return { status: false, messageId: 'Failed to send email' };
  }
};

export const sendEmailTraining = async (emailData: any) => {
  const transporter = getTransporter();
  try {
    await axios.post(
      'https://www.zohoapis.com/crm/v2/functions/Get_Warranty_form_details/actions/execute?auth_type=apikey&zapikey=1003.eba7f86fd2539491aa514a7eb4ec9944.5d4d7f7d610e01d997d47d39aac51822',
      emailData
    );
    await transporter.sendMail({
      from: `Bodykore <${EMAIL_CONFIG.USERNAME}>`, // sender address
      to: EMAIL_CONFIG.EMAIL_TO,
      subject: `Funcational Training Contact from ${emailData.firstName}`,
      html: toHTMLFuncationTraining({ ...emailData }),
    });

    transporter.close();
    return { status: true, messageId: 'Thank You !' };
  } catch (e) {
    console.error(e); // Uncomment for dev
    transporter.close();
    return { status: false, messageId: 'Failed to send email' };
  }
};

export const sendDealForm = async (emailData: any) => {
  const transporter = getTransporter();
  try {
    await transporter.sendMail({
      from: `Bodykore <${EMAIL_CONFIG.USERNAME}>`, // sender address
      to: EMAIL_CONFIG.EMAIL_TO,
      subject: `Deals Form Inquiry from ${emailData.name}`,
      html: toHTMLDealForms({ ...emailData }),
    });

    transporter.close();
    return { status: true, messageId: 'Thank You !' };
  } catch (e) {
    console.error(e); // Uncomment for dev
    transporter.close();
    return { status: false, messageId: 'Failed to send email' };
  }
};

export const sendWarrantyEmail = async (emailData: any) => {
  const transporter = getTransporter();
  try {
    let repsonse = await axios.post(
      'https://www.zohoapis.com/crm/v2/functions/Get_Warranty_form_details/actions/execute?auth_type=apikey&zapikey=1003.eba7f86fd2539491aa514a7eb4ec9944.5d4d7f7d610e01d997d47d39aac51822',
      emailData
    );
    await transporter.sendMail({
      from: `Bodykore  <${EMAIL_CONFIG.USERNAME}>`,
      to: EMAIL_CONFIG.EMAIL_TO,
      subject: `Warranty inqury from ${emailData.Warranty.name}`,
      html: toHTMLWarranty(emailData.Warranty),
      replyTo: emailData.email,
    });

    transporter.close();
    return { status: true, messageId: repsonse.data.code };
  } catch (e) {
    console.error(e); // Uncomment for dev
    transporter.close();
    return { status: false, messageId: 'Failed to send email' };
  }
};

export const sendEmailSubscrition = async (emailData: any) => {
  const transporter = getTransporter();
  try {
    const response = await axios.post(
      'https://www.zohoapis.com/crm/v2/functions/Get_Subscription_API/actions/execute?auth_type=apikey&zapikey=1003.eba7f86fd2539491aa514a7eb4ec9944.5d4d7f7d610e01d997d47d39aac51822',
      {
        email: emailData.email,
        phone: 'xx-xxx-xxxx',
        subject: 'Blog + News',
      }
    );

    const info = await transporter.sendMail({
      from: `Bodykore <${EMAIL_CONFIG.USERNAME}>`, // sender address
      to: EMAIL_CONFIG.EMAIL_TO,
      subject: `Subscription Inquiry from ${emailData.email}`,
      html: toHTMLSled({ ...emailData })
    });

    console.log('Message sent: %s', info.messageId);

    transporter.close();
    return { status: true, response: response.data };
  } catch (e) {
    console.error(e); // Uncomment for dev
    transporter.close();
    return { status: false, messageId: 'Failed to send email' };
  }
};

export const sendEmailSubscritionSled = async (emailData: any) => {
  const transporter = getTransporter();
  try {
    const response = await axios.post(
      'https://www.zohoapis.com/crm/v2/functions/Get_Subscription_API/actions/execute?auth_type=apikey&zapikey=1003.eba7f86fd2539491aa514a7eb4ec9944.5d4d7f7d610e01d997d47d39aac51822',
      {
        email: emailData.email,
        phone: 'xx-xxx-xxxx',
        subject: 'Sled Pro Inquiry',
      }
    );

    const info = await transporter.sendMail({
      from: `Bodykore <${EMAIL_CONFIG.USERNAME}>`, // sender address
      to: EMAIL_CONFIG.EMAIL_TO,
      subject: `Subscription Inquiry from ${emailData.email}`,
      html: toHTMLSled({ ...emailData })
    });

    

    transporter.close();
    return { status: true, response: response.data };
  } catch (e) {
    console.error(e); // Uncomment for dev
    transporter.close();
    return { status: false, messageId: 'Failed to send email' };
  }
};
export const sendEmailSubscritionMaslow = async (emailData: any) => {
  const transporter = getTransporter();
  try {
    const response = await axios.post(
      'https://www.zohoapis.com/crm/v2/functions/Get_Subscription_API/actions/execute?auth_type=apikey&zapikey=1003.eba7f86fd2539491aa514a7eb4ec9944.5d4d7f7d610e01d997d47d39aac51822',
      {
        email: emailData.email,
        phone: 'xx-xxx-xxxx',
        subject: 'Maslow Inquiry',
      }
    );

    const info = await transporter.sendMail({
      from: `Bodykore <${EMAIL_CONFIG.USERNAME}>`, // sender address
      to: EMAIL_CONFIG.EMAIL_TO,
      subject: `Subscription Inquiry from ${emailData.email}`,
      html: toHTMLMaslow({ ...emailData })
    });

    console.log('Message sent: %s', info.messageId);

    transporter.close();
    return { status: true, response: response.data };
  } catch (e) {
    console.error(e); // Uncomment for dev
    transporter.close();
    return { status: false, messageId: 'Failed to send email' };
  }
};

export const toHTML = ({
  name,
  phone,
  email,
  message,
  timestamp,
  company
}: IemailData) => {
  return `<!DOCTYPE html>
        <html>
        <body>
        <h3>Contact Inquiry</h3>
        <p>First name: ${name || ''}</p>
        <p>Email: ${email || ''}</p>
        <p>Phone: ${phone || ''}</p>
       ${message ? ` <p>Message: ${message || ''}</p>`:""}
       ${company ? ` <p>Company: ${company || ''}</p>`:""}
       ${timestamp ?` <p>Date, Time: ${
          dayjs(timestamp)
            .tz('America/Los_Angeles')
            .format('MMM DD YYYY, HH:mm') || ''
        }</p>`:''}
        </body>
        </html>`;
};

export const toHTMLSledPro = ({
  name,
  phone,
  email,
  message,
  timestamp,
}: IemailData) => {
  return `<!DOCTYPE html>
        <html>
        <body>
        <h3>Request for demo</h3>
        <p>First name: ${name || ''}</p>
        <p>Email: ${email || ''}</p>
        <p>Phone: ${phone || ''}</p>
        <p>Time and Date: ${message || ''}</p>
        <p>Date, Time: ${
          dayjs(timestamp)
            .tz('America/Los_Angeles')
            .format('MMM DD YYYY, HH:mm') || ''
        }</p>
        </body>
        </html>`;
};

export const toHTMLWarranty = ({
  name,
  email,
  phone,
  dateOfPurchase,
  itemName,
  orderNumber,
  serialNumber,
  address1,
  address2,
  country,
  state,
  city,
  zip,
  marketplace,
  comments,
}: WarrantyContactForm) => {
  return `<!DOCTYPE html>
        <html>
        <body>
        <h3>Warranty Inquiry</h3>
        <p>Name: ${name || ''}</p>
        <p>Email: ${email || ''}</p>
        <p>Phone: ${phone || ''}</p>
        <p>Date Of Purchase: ${dateOfPurchase || ''}</p>
        <p>Item Name: ${itemName || ''}</p>
        <p>Order Number: ${orderNumber || ''}</p>
        <p>Serial Number: ${serialNumber || ''}</p>
        <p>Address 1: ${address1 || ''}</p>
        <p>Address 2: ${address2 || ''}</p>
        <p>Country: ${country || ''}</p>
        <p>State: ${state || ''}</p>
        <p>City: ${city || ''}</p>
        <p>ZIP Code: ${zip || ''}</p>
        <p>Marketplace Purchase From: ${marketplace || ''}</p>
        <p>Comment: ${comments || ''}</p>
        <p>Date, Time: ${
          dayjs(new Date())
            .tz('America/Los_Angeles')
            .format('MMM DD YYYY, HH:mm') || ''
        }</p>
        </body>
        </html>`;
};

export const toHTMLSled = ({ name, email, timestamp }: IemailData) => {
  return `<!DOCTYPE html>
        <html>
        <body>
        <h3>Contact Inquiry</h3>
        <p>From: ${name || ''}</p>
        <p>Email: ${email || ''}</p>
        <p>Date, Time: ${
          dayjs(timestamp)
            .tz('America/Los_Angeles')
            .format('MMM DD YYYY, HH:mm') || ''
        }</p>
        </body>
        </html>`;
};
export const toHTMLMaslow = ({ name, email, timestamp }: IemailData) => {
  return `<!DOCTYPE html>
        <html>
        <body>
        <h3>Maslow Moves Fitness Inquiry</h3>
        <p>From: ${name || ''}</p>
        <p>Email: ${email || ''}</p>
        <p>Date, Time: ${
          dayjs(timestamp)
            .tz('America/Los_Angeles')
            .format('MMM DD YYYY, HH:mm') || ''
        }</p>
        </body>
        </html>`;
};

export const toHTMLFuncationTraining = ({
  firstName,
  lastName,
  email,
  phone,
  facilityType,
  facilityName,
  country,
  zipcode,
  date,
  time
}: ContactFormTraining) => {
  return `<!DOCTYPE html>
        <html>
        <body>
        <h3>Functional Training Inquiry</h3>
        <p>From: ${firstName || ''} ${lastName}</p>
        <p>Phone : ${phone || ''}</p>
        <p>Email : ${email || ''}</p>
        <p>Facility Type: ${facilityType || ''}</p>
        <p>Facility Name: ${facilityName || ''}</p>
        <p>Zipcode: ${zipcode || ''}</p>
        <p>Country: ${country || ''}</p>

        <p>Date: ${date || ''}</p>
        <p>Time: ${time || ''}</p>

        </body>
        </html>`;
};
export const toHTMLFuncationTrainingForUser = ({
  firstName,
  lastName,
  email,
  phone,
  facilityType,
  facilityName,
  country,
  zipcode,
  date,
  time
}: ContactFormTraining) => {
  return `
    <div style="font-family: Arial, sans-serif; color: #333; padding: 5px;">
   <div style="background-color: #000000; padding: 8px; max-width: max-content;">
    <img src="https://www.bodykore.com/_next/image?url=%2Fheader%2Flogowhitered.png&w=640&q=75" alt="Bodykore Logo" style="width: 120px; height: auto;  object-fit: contain;"/>
   </div>
      <p style="text-align: left; color: #1f2937; font-size: 14px;">Thank you for your interest in our gym design services! <br/>
We will schedule the Zoom/Meet call based on your preferred date and time. If you have any floor plans or photos to share, it would greatly assist us in understanding your requirements.<br/>
Feel free to reach out to us at sales@bodykore.com with any additional details or questions.<br/>
Here are the details for your reference:<br/></p>

      <table style="width: 100%; border-collapse: collapse; margin-top: 20px;">
        <tbody>
          <tr>
            <td style="padding: 10px; border: 1px solid #ddd;">Name</td>
            <td style="padding: 10px; border: 1px solid #ddd;">${firstName || ''} ${lastName || ''}</td>
          </tr>
          <tr>
            <td style="padding: 10px; border: 1px solid #ddd;">Phone</td>
            <td style="padding: 10px; border: 1px solid #ddd;">${phone || ''}</td>
          </tr>
          <tr>
            <td style="padding: 10px; border: 1px solid #ddd;">Email</td>
            <td style="padding: 10px; border: 1px solid #ddd;">${email || ''}</td>
          </tr>
          <tr>
            <td style="padding: 10px; border: 1px solid #ddd;">Facility Type</td>
            <td style="padding: 10px; border: 1px solid #ddd;">${facilityType || ''}</td>
          </tr>
          <tr>
            <td style="padding: 10px; border: 1px solid #ddd;">Facility Name</td>
            <td style="padding: 10px; border: 1px solid #ddd;">${facilityName || ''}</td>
          </tr>
          <tr>
            <td style="padding: 10px; border: 1px solid #ddd;">Zipcode</td>
            <td style="padding: 10px; border: 1px solid #ddd;">${zipcode || ''}</td>
          </tr>
          <tr>
            <td style="padding: 10px; border: 1px solid #ddd;">Country</td>
            <td style="padding: 10px; border: 1px solid #ddd;">${country || ''}</td>
          </tr>
          <tr>
            <td style="padding: 10px; border: 1px solid #ddd;">Date</td>
            <td style="padding: 10px; border: 1px solid #ddd;">
              ${date || ''}
            </td>
          </tr>
            <tr>
            <td style="padding: 10px; border: 1px solid #ddd;">Time</td>
            <td style="padding: 10px; border: 1px solid #ddd;">
              ${time || ''}
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  `;
};


export const toHTMLDealForms = ({
  name,
  yearInBusiness,
  website,
  emc,
  contactName,
  title,
  phone,
  email,
  cityStateZip,
  contact,
  phoneBilling,
  emailBilling,
  applicantName,
  date,
  clearifyStatus,
  trades,
}: any) => {
  return `<!DOCTYPE html>
        <html>
        <body>
        <h3>Deal Forms</h3>
        <p>From: ${name}</p>
        <p>Year In Business: ${yearInBusiness}</p>
        <p>Website: ${website}</p>
        <p>EMC: ${emc}</p>
        <p>Contact Name: ${contactName}</p>
        <p>Title: ${title}</p>
        <p>Phone: ${phone}</p>
        <p>Email: ${email}</p>
        <p>City State Zip: ${cityStateZip}</p>
        <p>Contact: ${contact}</p>
        <p>Phone Billing: ${phoneBilling}</p>
        <p>Email Billing: ${emailBilling}</p>
        <p>Applicant Name: ${applicantName}</p>
        <p>Date: ${date}</p>
        <p>Clearify Status: ${clearifyStatus}</p>
        <hr/>
        ${
          trades &&
          trades.map((trade: any) => {
            return `<p>Company Name: ${trade.companyName}</p>
            <p>Address: ${trade.address}</p>
            <p>Contact Name: ${trade.contactName}</p>
            <p>Contact Number: ${trade.contactNumber}</p>
            <hr/>
            `;
          })
        }
        
        <p>Date, Time: ${
          dayjs(new Date())
            .tz('America/Los_Angeles')
            .format('MMM DD YYYY, HH:mm') || ''
        }</p>
        </body>
        </html>`;
};

export const sendHospitality = async (emailData: any) => {
  const transporter = getTransporter();
  try {
    await transporter.sendMail({
      from: `Bodykore <${EMAIL_CONFIG.USERNAME}>`, // sender address
      to: EMAIL_CONFIG.EMAIL_TO,
      subject: `Hospitality inqury from ${emailData.name}`,
      html: toHTML({ ...emailData }),
    });

    transporter.close();
    return { status: true, messageId: 'Thank You !' };
  } catch (e) {
    console.error(e); // Uncomment for dev
    transporter.close();
    return { status: false, messageId: 'Failed to send email' };
  }
};

export const sendThreeDDeisgn = async (emailData: any) => {
  const transporter = getTransporter();
  try {
    await transporter.sendMail({
      from: `Bodykore <${EMAIL_CONFIG.USERNAME}>`, // sender address
      to: EMAIL_CONFIG.EMAIL_TO,
      subject: `3D Design inqury from ${emailData.name}`,
      html: toHTML({ ...emailData }),
    });

    transporter.close();
    return { status: true, messageId: 'Thank You !' };
  } catch (e) {
    console.error(e); // Uncomment for dev
    transporter.close();
    return { status: false, messageId: 'Failed to send email' };
  }
};
