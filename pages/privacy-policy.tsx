import React from 'react';
import PrivacyPolicy from '@components/ui/bodykore/Sections/PrivacyPolicy';
import { GetServerSideProps } from 'next';
import { HeaderData, getHeader } from '@utils/header';
import seo from '../public/SEO/en.json';
import SeoHeader from '@components/seoHeader';
import Link from 'next/link';

export const getServerSideProps: GetServerSideProps = async (context) => {
  const header = await getHeader();

  return {
    props: { header },
    // revalidate: 30 * 60,
  };
};

interface PrivacyPolicyPageParams {
  header: HeaderData;
}

const PrivacyPolicyPage = ({ header }: PrivacyPolicyPageParams) => {
  return (
    <>
      <SeoHeader seo={seo.privacy_policy} />

      {/*<Header productCat={header.categories} dynamicPages={header.pages} />*/}

      <div className='max-w-5xl m-auto py-12 px-5'>
        <div className='font-roboto policypages space-y-5'>
          <h3 className='font-bold text-3xl'>PRIVACY NOTICE</h3>
          <p>Last updated December 10, 2024</p>
          <p>
            This Privacy Notice for BodyKore INC ("we," "us," or "our"), describes how and why we might access, collect, store, use, and/or share ("process") your personal information when you use our services ("Services"), including when you:
          </p>
          <ul>
            <li>Visit our website at <Link href={'https://www.bodykore.com'} > https://www.bodykore.com,</Link> or any website of ours that links to this Privacy Notice.</li>
            <li>Download and use our mobile application, our Facebook application, or any other application of ours that links to this Privacy Notice.</li>
            <li>Engage with us in other related ways, including any sales, marketing, or events.</li>
          </ul>
          <p>
            <b>Questions or concerns?</b> Reading this Privacy Notice will help you understand your privacy rights and choices. We are responsible for making decisions about how your personal information is processed. If you do not agree with our policies and practices, please do not use our Services.
          </p>
          <h5><b>SUMMARY OF KEY POINTS</b></h5>
          <p>
            <i>
              <b>This summary provides key points from our Privacy Notice, but you can find out more details about any of these topics by clicking the link following each key point or by using our <Link href={'#tableofcont'}>table of contents</Link> below to find the section you are looking for.</b>
            </i>
          </p>
          <p>
            <b>What personal information do we process?</b> When you visit, use, or navigate our Services, we may process personal information depending on how you interact with us and the Services, the choices you make, and the products and features you use. Learn more about <Link href={'#1'}>personal information you disclose to us.</Link>.
          </p>
          <p>
            <b>Do we process any sensitive personal information?</b> Some of the information may be considered "special" or "sensitive" in certain jurisdictions, for example your racial or ethnic origins, sexual orientation, and religious beliefs. We do not process sensitive personal information.
          </p>
          <p>
            <b>Do we collect any information from third parties?</b> We may collect information from public databases, marketing partners, social media platforms, and other outside sources. Learn more about information collected from other sources.
          </p>
          <p>
            <b>How do we process your information?</b> We process your information to provide, improve, and administer our Services, communicate with you, for security and fraud prevention, and to comply with law. We may also process your information for other purposes with your consent. We process your information only when we have a valid legal reason to do so. Learn more about <Link href={'#2'}>how we process your information</Link>.
          </p>
          <p>
            <b>In what situations and with which parties do we share personal information?</b> We may share information in specific situations and with specific third parties. Learn more about <Link href={'#3'}>when and with whom we share your personal information</Link>.
          </p>
          <p>
            <b> What are your rights?</b> Depending on where you are located geographically, the applicable privacy law may mean you have certain rights regarding your personal information. Learn more about <Link href={'#9'}>your privacy rights</Link>.
          </p>
          <p>
            <b>How do you exercise your rights?</b> The easiest way to exercise your rights is by submitting a <a href={'https://app.termly.io/notify/85a0b1cf-1f61-4f8e-8b6b-805caad17620'} target='_blank' rel="noreferrer" >data subject access request</a>, or by contacting us. We will consider and act upon any request in accordance with applicable data protection laws.

          </p>
          <p>
            Want to learn more about what we do with any information we collect? <Link href={'#1'}>Review the Privacy Notice in full.</Link>
          </p>
          <div className='space-y-3'>
            <span className="spacing" id="tableofcont"></span>
            <h5><b>TABLE OF CONTENTS</b></h5>
            <ul>
              <li><Link href={'#1'}>WHAT INFORMATION DO WE COLLECT?</Link></li>
              <li><Link href={'#2'}>HOW DO WE PROCESS YOUR INFORMATION?</Link></li>
              <li><Link href={'#3'}>WHEN AND WITH WHOM DO WE SHARE YOUR PERSONAL INFORMATION?</Link></li>
              <li><Link href={'#4'}>DO WE USE COOKIES AND OTHER TRACKING TECHNOLOGIES?</Link></li>
              <li><Link href={'#5'}>HOW DO WE HANDLE YOUR SOCIAL LOGINS?</Link></li>
              <li><Link href={'#6'}>IS YOUR INFORMATION TRANSFERRED INTERNATIONALLY?</Link></li>
              <li><Link href={'#7'}>HOW LONG DO WE KEEP YOUR INFORMATION?</Link></li>
              <li><Link href={'#8'}>DO WE COLLECT INFORMATION FROM MINORS?</Link></li>
              <li><Link href={'#9'}>WHAT ARE YOUR PRIVACY RIGHTS?</Link></li>
              <li><Link href={'#10'}>CONTROLS FOR DO-NOT-TRACK FEATURES</Link></li>
              <li><Link href={'#11'}>DO WE MAKE UPDATES TO THIS NOTICE?</Link></li>
              <li><Link href={'#12'}>HOW CAN YOU CONTACT US ABOUT THIS NOTICE?</Link></li>
              <li><Link href={'#13'}>HOW CAN YOU REVIEW, UPDATE, OR DELETE THE DATA WE COLLECT FROM YOU?</Link></li>
            </ul>
          </div>
          <div className='space-y-3'>
            <span className="spacing" id="1"></span>
            <h5><b>1. WHAT INFORMATION DO WE COLLECT?</b></h5>
            <p><b>Personal information you disclose to us</b></p>
            <p>
              <i><b>In Short:</b> We collect personal information that you provide to us.</i>
            </p>

            <p>We collect personal information that you voluntarily provide to us when you register on the Services, express an interest in obtaining information about us or our products and Services, when you participate in activities on the Services, or otherwise when you contact us.</p>

            <p><b>Sensitive Information.</b> We do not process sensitive information.</p>

            <p>All personal information that you provide to us must be true, complete, and accurate, and you must notify us of any changes to such personal information.</p>

            <p><b>Information automatically collected</b></p>

            <p><i><b>In Short:</b> Some information — such as your Internet Protocol (IP) address and/or browser and device characteristics — is collected automatically when you visit our Services.</i></p>

            <p>We automatically collect certain information when you visit, use, or navigate the Services. This information does not reveal your specific identity (like your name or contact information) but may include device and usage information, such as your IP address, browser and device characteristics, operating system, language preferences, referring URLs, device name, country, location, information about how and when you use our Services, and other technical information. This information is primarily needed to maintain the security and operation of our Services, and for our internal analytics and reporting purposes.</p>

            <p>Like many businesses, we also collect information through cookies and similar technologies.</p>

            <p>Information collected when you use our Facebook application(s). We by default access your Facebook basic account information, including your name, email, gender, birthday, current city, and profile picture URL, as well as other information that you choose to make public. We may also request access to other permissions related to your account, such as friends, check-ins, and likes, and you may choose to grant or deny us access to each individual permission. For more information regarding Facebook permissions, refer to the <Link href={'https://developers.facebook.com/docs/permissions'}>Facebook Permissions Reference</Link> page.</p>
          </div>
          <div className='space-y-3'>
            <span className="spacing" id="2"></span>
            <h5><b>2. HOW DO WE PROCESS YOUR INFORMATION?
            </b></h5>
            <p> <i><b>In Short:</b> We process your information to provide, improve, and administer our Services, communicate with you, for security and fraud prevention, and to comply with law. We may also process your information for other purposes with your consent.</i></p>

            <p><b>We process your personal information for a variety of reasons, depending on how you interact with our Services, including:</b></p>
          </div>
          <div className='space-y-3'>
            <span className="spacing" id="3"></span>
            <h5><b>3. WHEN AND WITH WHOM DO WE SHARE YOUR PERSONAL INFORMATION?
            </b></h5>
            <p><i><b>In Short:</b>We may share information in specific situations described in this section and/or with the following third parties.</i></p>
            <p>We may need to share your personal information in the following situations:</p>
            <ul className='space-y-3'>
              <li>
                <b>Business Transfers.</b> We may share or transfer your information in connection with, or during negotiations of, any merger, sale of company assets, financing, or acquisition of all or a portion of our business to another company.

              </li>
              <li>
                <b>Affiliates.</b> We may share your information with our affiliates, in which case we will require those affiliates to honor this Privacy Notice. Affiliates include our parent company and any subsidiaries, joint venture partners, or other companies that we control or that are under common control with us.

              </li>
              <li>
                <b>Business Partners.</b> We may share your information with our business partners to offer you certain products, services, or promotions.

              </li>
              <li>
                <b>Offer Wall.</b> Our application(s) may display a third-party hosted "offer wall." Such an offer wall allows third-party advertisers to offer virtual currency, gifts, or other items to users in return for the acceptance and completion of an advertisement offer. Such an offer wall may appear in our application(s) and be displayed to you based on certain data, such as your geographic area or demographic information. When you click on an offer wall, you will be brought to an external website belonging to other persons and will leave our application(s). A unique identifier, such as your user ID, will be shared with the offer wall provider in order to prevent fraud and properly credit your account with the relevant reward.

              </li>
            </ul>
          </div>
          <div className='space-y-3'>
            <span className="spacing" id="4"></span>
            <h5><b>4. DO WE USE COOKIES AND OTHER TRACKING TECHNOLOGIES?
            </b></h5>
            <p> <i><b>In Short:</b> We may use cookies and other tracking technologies to collect and store your information.</i></p>
            <p>
              We may use cookies and similar tracking technologies (like web beacons and pixels) to gather information when you interact with our Services. Some online tracking technologies help us maintain the security of our Services, prevent crashes, fix bugs, save your preferences, and assist with basic site functions.
            </p>
            <p>
              We also permit third parties and service providers to use online tracking technologies on our Services for analytics and advertising, including to help manage and display advertisements, to tailor advertisements to your interests, or to send abandoned shopping cart reminders (depending on your communication preferences). The third parties and service providers use their technology to provide advertising about products and services tailored to your interests which may appear either on our Services or on other websites.
            </p>
            <p>
              Specific information about how we use such technologies and how you can refuse certain cookies is set out in our Cookie Notice.
            </p>
          </div>
          <div className='space-y-3'>
            <span className="spacing" id="5"></span>
            <h5><b>5. HOW DO WE HANDLE YOUR SOCIAL LOGINS?
            </b></h5>
            <p> <i><b>In Short:</b> If you choose to register or log in to our Services using a social media account, we may have access to certain information about you.
            </i> </p>
            <p>
              Our Services offer you the ability to register and log in using your third-party social media account details (like your Facebook or X logins). Where you choose to do this, we will receive certain profile information about you from your social media provider. The profile information we receive may vary depending on the social media provider concerned, but will often include your name, email address, friends list, and profile picture, as well as other information you choose to make public on such a social media platform. If you log in using Facebook, we may also request access to other permissions related to your account, such as your friends, check-ins, and likes, and you may choose to grant or deny us access to each individual permission.
            </p>
            <p>
              We will use the information we receive only for the purposes that are described in this Privacy Notice or that are otherwise made clear to you on the relevant Services. Please note that we do not control, and are not responsible for, other uses of your personal information by your third-party social media provider. We recommend that you review their privacy notice to understand how they collect, use, and share your personal information, and how you can set your privacy preferences on their sites and apps.
            </p>
          </div>
          <div className='space-y-3'>
            <span className="spacing" id="6"></span>
            <h5><b>6. IS YOUR INFORMATION TRANSFERRED INTERNATIONALLY?
            </b></h5>
            <p><i><b>In Short:</b>We may transfer, store, and process your information in countries other than your own.</i></p>

            <p>
              Our servers are located in. If you are accessing our Services from outside, 
              please be aware that your information may be transferred to, stored by, and processed by 
              us in our facilities and in the facilities of the third parties with whom we may share your 
              personal information (see "<Link href={'#3'}> 
              WHEN AND WITH WHOM DO WE SHARE YOUR PERSONAL INFORMATION?</Link>" above), in and other countries.
            </p>
            <p>
              If you are a resident in the European Economic Area (EEA), United Kingdom (UK), or Switzerland, then these countries may not necessarily have data protection laws or other similar laws as comprehensive as those in your country. However, we will take all necessary measures to protect your personal information in accordance with this Privacy Notice and applicable law.
            </p>  </div>
          <div className='space-y-3'>
            <span className="spacing" id="7"></span>
            <h5><b>7. HOW LONG DO WE KEEP YOUR INFORMATION?
            </b></h5>
            <p> <i><b>In Short:</b>We keep your information for as long as necessary to fulfill the purposes outlined in this Privacy Notice unless otherwise required by law.</i></p>


            <p>
              We will only keep your personal information for as long as it is necessary for the purposes set out in this Privacy Notice, unless a longer retention period is required or permitted by law (such as tax, accounting, or other legal requirements).
            </p>
            <p>
              When we have no ongoing legitimate business need to process your personal information, we will either delete or anonymize such information, or, if this is not possible (for example, because your personal information has been stored in backup archives), then we will securely store your personal information and isolate it from any further processing until deletion is possible.
            </p>
          </div>
          <div className='space-y-3'>
            <span className="spacing" id="8"></span>
            <h5><b>8. DO WE COLLECT INFORMATION FROM MINORS?
            </b></h5>
            <p><i><b> In Short:</b> We do not knowingly collect data from or market to children under 18 years of age.</i></p>
            <p>
              We do not knowingly collect, solicit data from, or market to children under 18 years of age, nor do we knowingly sell such personal information. By using the Services, you represent that you are at least 18 or that you are the parent or guardian of such a minor and consent to such minor dependent’s use of the Services. If we learn that personal information from users less than 18 years of age has been collected, we will deactivate the account and take reasonable measures to promptly delete such data from our records. If you become aware of any data we may have collected from children under age 18, please contact us at +1 (949) 325-3088.
            </p>
          </div>
          <div className='space-y-3'>
            <span className="spacing" id="9"></span>
            <h5><b>9. WHAT ARE YOUR PRIVACY RIGHTS?
            </b></h5>
            <p><i><b>In Short:</b>You may review, change, or terminate your account at any time, depending on your country, province, or state of residence.</i></p>

            <p>
              <b><u>Withdrawing your consent:</u></b> If we are relying on your consent to process your personal information, which may be express and/or implied consent depending on the applicable law, you have the right to withdraw your consent at any time. You can withdraw your consent at any time by contacting us by using the contact details provided in the section "<Link href={''}> HOW CAN YOU CONTACT US ABOUT THIS NOTICE?</Link>" below.
            </p>
            <p>
              However, please note that this will not affect the lawfulness of the processing before its withdrawal nor, when applicable law allows, will it affect the processing of your personal information conducted in reliance on lawful processing grounds other than consent.
            </p>
            <h5><b>Account Information</b></h5>
            <p>
              If you would at any time like to review or change the information in your account or terminate your account, you can:
              Upon your request to terminate your account, we will deactivate or delete your account and information from our active databases. However, we may retain some information in our files to prevent fraud, troubleshoot problems, assist with any investigations, enforce our legal terms and/or comply with applicable legal requirements.
            </p>
          </div>
          <div className='space-y-3'>
            <span className="spacing" id="10"></span>
            <h5><b>10. CONTROLS FOR DO-NOT-TRACK FEATURES
            </b></h5>
            <p>
              Most web browsers and some mobile operating systems and mobile applications include a Do-Not-Track ("DNT") feature or setting you can activate to signal your privacy preference not to have data about your online browsing activities monitored and collected. At this stage, no uniform technology standard for recognizing and implementing DNT signals has been finalized. As such, we do not currently respond to DNT browser signals or any other mechanism that automatically communicates your choice not to be tracked online. If a standard for online tracking is adopted that we must follow in the future, we will inform you about that practice in a revised version of this Privacy Notice.
            </p>
          </div>
          <div className='space-y-3'>
            <span className="spacing" id="11"></span>
            <h5><b>11. DO WE MAKE UPDATES TO THIS NOTICE?
            </b></h5>
            <p><i><b>In Short:</b>Yes, we will update this notice as necessary to stay compliant with relevant laws.</i></p>

            <p>
              We may update this Privacy Notice from time to time. The updated version will be indicated by an updated "Revised" date at the top of this Privacy Notice. If we make material changes to this Privacy Notice, we may notify you either by prominently posting a notice of such changes or by directly sending you a notification. We encourage you to review this Privacy Notice frequently to be informed of how we are protecting your information.
            </p>
          </div>
          <div className='space-y-3'>
            <span className="spacing" id="12"></span>
            <h5><b>12. HOW CAN YOU CONTACT US ABOUT THIS NOTICE?
            </b></h5>
            <p>
              If you have questions or comments about this notice, you may contact us by post at:
            </p>
            <p>
              BodyKore INC<br></br>
              7466 Orangewood Ave<br></br>
              Garden Grove, CA 92841<br></br>
              United States
            </p>
          </div>
          <div className='space-y-3'>
            <span className="spacing" id="13"></span>
            <h5><b>13. HOW CAN YOU REVIEW, UPDATE, OR DELETE THE DATA WE COLLECT FROM YOU?
            </b></h5>
            <p>
              Based on the applicable laws of your country, you may have the right to request access to the personal information we collect from you, details about how we have processed it, correct inaccuracies, or delete your personal information. You may also have the right to withdraw your consent to our processing of your personal information. These rights may be limited in some circumstances by applicable law. To request to review, update, or delete your personal information, please fill out and submit a <a href='https://app.termly.io/notify/85a0b1cf-1f61-4f8e-8b6b-805caad17620'> data subject access request.</a>
            </p>
          </div>
        </div>
      </div>

    </>
  );
};

export default PrivacyPolicyPage;
