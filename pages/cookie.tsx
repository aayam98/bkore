import React from 'react';
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

interface CookiePageParams {
  header: HeaderData;
}

const CookiePage = ({ header }: CookiePageParams) => {
  return (
    <>
      <SeoHeader seo={seo.return_policy} />
      <div className='max-w-5xl m-auto py-12 px-5'>
        <div className='font-roboto policypages space-y-5'>
        <h3 className='font-bold text-3xl'>COOKIE POLICY</h3>
          <p>Last updated December 11, 2024</p>
          <p>

            This Cookie Policy explains how BodyKore INC ("Company," "we," "us," and "our") uses cookies and similar technologies to recognize you when you visit our website at <Link href={'https://www.bodykore.com'}> https://www.bodykore.com</Link> ("Website"). It explains what these technologies are and why we use them, as well as your rights to control our use of them.

          </p>
          <p>
            In some cases we may use cookies to collect personal information, or that becomes personal information if we combine it with other information.
          </p>

          <div className='space-y-3'>
            <span className="spacing" id="25"></span>
            <h5><b>What are cookies?</b></h5>
            <p>
              Cookies are small data files that are placed on your computer or mobile device when you visit a website. Cookies are widely used by website owners in order to make their websites work, or to work more efficiently, as well as to provide reporting information.
            </p>
            <p>
              Cookies set by the website owner (in this case, BodyKore INC) are called "first-party cookies." Cookies set by parties other than the website owner are called "third-party cookies." Third-party cookies enable third-party features or functionality to be provided on or through the website (e.g., advertising, interactive content, and analytics). The parties that set these third-party cookies can recognize your computer both when it visits the website in question and also when it visits certain other websites.
            </p>
          </div>

          <div className='space-y-3'>
            <span className="spacing" id="25"></span>
            <h5><b>Why do we use cookies?</b></h5>
            <p>
              We use first- and third-party cookies for several reasons. Some cookies are required for technical reasons in order for our Website to operate, and we refer to these as "essential" or "strictly necessary" cookies. Other cookies also enable us to track and target the interests of our users to enhance the experience on our Online Properties. Third parties serve cookies through our Website for advertising, analytics, and other purposes. This is described in more detail below.
            </p>

          </div>
          <div className='space-y-3'>
            <span className="spacing" id="25"></span>
            <h5><b>How can I control cookies?
            </b></h5>
            <p>You have the right to decide whether to accept or reject cookies. You can exercise your cookie rights by setting your preferences in the Cookie Consent Manager. The Cookie Consent Manager allows you to select which categories of cookies you accept or reject. Essential cookies cannot be rejected as they are strictly necessary to provide you with services.
            </p>
            <p>The Cookie Consent Manager can be found in the notification banner and on our Website. If you choose to reject cookies, you may still use our Website though your access to some functionality and areas of our Website may be restricted. You may also set or amend your web browser controls to accept or refuse cookies.
            </p>
            <p>The specific types of first- and third-party cookies served through our Website and the purposes they perform are described in the table below (please note that the specific cookies served may vary depending on the specific Online Properties you visit):
            </p>
          </div>
          <div className='space-y-3'>
            <span className="spacing" id="25"></span>
            <h5><b>Essential website cookies:
            </b></h5>
            <p>
              These cookies are strictly necessary to provide you with services available through our Website and to use some of its features, such as access to secure areas.
            </p>
            <div className='border p-2'>
              <table className='termstable'>
                <tr>
                  <td>Name:</td>
                  <td>rc::a</td>
                </tr>
                <tr>
                  <td>Purpose:</td>
                  <td>Used to track and analyze user behavior to distinguish humans from bots or automated software.</td>
                </tr>
                <tr>
                  <td>Provider:</td>
                  <td>www.google.com</td>
                </tr>
                <tr>
                  <td>Service:</td>
                  <td>reCAPTCHA <a href='https://business.safety.google/privacy/' target='_blank' rel="noreferrer" ><u>View Service Privacy Policy</u></a></td>
                </tr>
                <tr>
                  <td>Type:</td>
                  <td>html_local_storage</td>
                </tr>
                <tr>
                  <td>Expires in:</td>
                  <td>persistent</td>
                </tr>

              </table>
            </div>

          </div>
          <div className='space-y-3'>
            <span className="spacing" id="25"></span>
            <h5><b>Analytics and customization cookies:
            </b></h5>
            <p>
              These cookies collect information that is used either in aggregate form to help us understand how our Website is being used or how effective our marketing campaigns are, or to help us customize our Website for you.</p>
            <div className='border p-2'>
              <table className='termstable'>
                <tr>
                  <td>Name:</td>
                  <td>s7</td>
                </tr>
                <tr>
                  <td>Purpose:</td>
                  <td>Gather data regarding site usage and user behavior on the website.                  </td>
                </tr>
                <tr>
                  <td>Provider:</td>
                  <td>api-cf.affirm.com</td>
                </tr>
                <tr>
                  <td>Service:</td>
                  <td>Adobe Analytics</td>
                </tr>
                <tr>
                  <td>Type:</td>
                  <td>server_cookie</td>
                </tr>
                <tr>
                  <td>Expires in:</td>
                  <td>999 years 11 months 30 days</td>
                </tr>

              </table>
            </div>
            <div className='border p-2'>
              <table className='termstable'>
                <tr>
                  <td>Name:</td>
                  <td>s7</td>
                </tr>
                <tr>
                  <td>Purpose:</td>
                  <td>Gather data regarding site usage and user behavior on the website.</td>
                </tr>
                <tr>
                  <td>Provider:</td>
                  <td>www.bodykore.com</td>
                </tr>
                <tr>
                  <td>Service:</td>
                  <td>Adobe Analytics</td>
                </tr>
                <tr>
                  <td>Type:</td>
                  <td>html_session_storage</td>
                </tr>
                <tr>
                  <td>Expires in:</td>
                  <td>session</td>
                </tr>

              </table>
            </div>
            <div className='border p-2'>
              <table className='termstable'>
                <tr>
                  <td>Name:</td>
                  <td>_ga</td>
                </tr>
                <tr>
                  <td>Purpose:</td>
                  <td>Records a particular ID used to come up with data about website usage by the user</td>
                </tr>
                <tr>
                  <td>Provider:</td>
                  <td>.bodykore.com</td>
                </tr>
                <tr>
                  <td>Service:</td>
                  <td>Google Analytics <a href='https://business.safety.google/privacy/' target='_blank' rel="noreferrer" > View Service Privacy Policy</a></td>
                </tr>
                <tr>
                  <td>Type:</td>
                  <td>http_cookie</td>
                </tr>
                <tr>
                  <td>Expires in:</td>
                  <td>1 year 1 month 4 days</td>
                </tr>

              </table>
            </div>
            <div className='border p-2'>
              <table className='termstable'>
                <tr>
                  <td>Name:</td>
                  <td>s7</td>
                </tr>
                <tr>
                  <td>Purpose:</td>
                  <td>Gather data regarding site usage and user behavior on the website. </td>
                </tr>
                <tr>
                  <td>Provider:</td>
                  <td>salesiq.zohopublic.com</td>
                </tr>
                <tr>
                  <td>Service:</td>
                  <td>Adobe Analytics</td>
                </tr>
                <tr>
                  <td>Type:</td>
                  <td>http_cookie</td>
                </tr>
                <tr>
                  <td>Expires in:</td>
                  <td>29 days</td>
                </tr>

              </table>
            </div>

            <div className='border p-2'>
              <table className='termstable'>
                <tr>
                  <td>Name:</td>
                  <td>_ga_#</td>
                </tr>
                <tr>
                  <td>Purpose:</td>
                  <td>Used to distinguish individual users by means of designation of a randomly generated number as client identifier, which allows calculation of visits and sessions </td>
                </tr>
                <tr>
                  <td>Provider:</td>
                  <td>.bodykore.com</td>
                </tr>
                <tr>
                  <td>Service:</td>
                  <td>Google Analytics <a href='https://business.safety.google/privacy/' target='_blank' rel="noreferrer" ><u>View Service Privacy Policy</u></a></td>
                </tr>
                <tr>
                  <td>Type:</td>
                  <td>http_cookie</td>
                </tr>
                <tr>
                  <td>Expires in:</td>
                  <td>1 year 1 month 4 days</td>
                </tr>

              </table>
            </div>


            <div className='border p-2'>
              <table className='termstable'>
                <tr>
                  <td>Name:</td>
                  <td>NID</td>
                </tr>
                <tr>
                  <td>Purpose:</td>
                  <td>Set by Google to set a unique user ID to remember user preferences. Persistent cookie that stays for 182 days</td>
                </tr>
                <tr>
                  <td>Provider:</td>
                  <td>.bodykore.com</td>
                </tr>
                <tr>
                  <td>Service:</td>
                  <td>Google <a href='https://business.safety.google/privacy/' target='_blank' rel="noreferrer" ><u>View Service Privacy Policy</u></a></td>
                </tr>
                <tr>
                  <td>Type:</td>
                  <td>server_cookie</td>
                </tr>
                <tr>
                  <td>Expires in:</td>
                  <td>6 months</td>
                </tr>

              </table>
            </div>


            <div className='border p-2'>
              <table className='termstable'>
                <tr>
                  <td>Name:</td>
                  <td>s7</td>
                </tr>
                <tr>
                  <td>Purpose:</td>
                  <td>Gather data regarding site usage and user behavior on the website.</td>
                </tr>
                <tr>
                  <td>Provider:</td>
                  <td>us4-files.zohopublic.com</td>
                </tr>
                <tr>
                  <td>Service:</td>
                  <td>Adobe Analytics</td>
                </tr>
                <tr>
                  <td>Type:</td>
                  <td>server_cookie</td>
                </tr>
                <tr>
                  <td>Expires in:</td>
                  <td>session</td>
                </tr>

              </table>
            </div>


          </div>

          <div className='space-y-3'>
            <span className="spacing" id="25"></span>
            <h5><b>Advertising cookies:
            </b></h5>
            <p>These cookies are used to make advertising messages more relevant to you. They perform functions like preventing the same ad from continuously reappearing, ensuring that ads are properly displayed for advertisers, and in some cases selecting advertisements that are based on your interests.</p>
            <div className='border p-2'>
              <table className='termstable'>
                <tr>
                  <td>Name:</td>
                  <td>lastExternalReferrer</td>
                </tr>
                <tr>
                  <td>Purpose:</td>
                  <td>Detects how the user reached the website by registering their last URL-address.</td>
                </tr>
                <tr>
                  <td>Provider:</td>
                  <td>www.bodykore.com</td>
                </tr>
                <tr>
                  <td>Service:</td>
                  <td>Meta Platforms, Inc <a href='https://www.facebook.com/privacy/policy/'>View Service Privacy Policy</a></td>
                </tr>
                <tr>
                  <td>Type:</td>
                  <td>html_local_storage</td>
                </tr>
                <tr>
                  <td>Expires in:</td>
                  <td>persistent</td>
                </tr>

              </table>
            </div>
            <div className='border p-2'>
              <table className='termstable'>
                <tr>
                  <td>Name:</td>
                  <td>IDE</td>
                </tr>
                <tr>
                  <td>Purpose:</td>
                  <td>Used to measure the conversion rate of ads presented to the user. Expires in 1.5 years.
                  </td>
                </tr>
                <tr>
                  <td>Provider:</td>
                  <td>.doubleclick.net</td>
                </tr>
                <tr>
                  <td>Service:</td>
                  <td>DoubleClick
                    <a href='https://business.safety.google/privacy/'>View Service Privacy Policy</a></td>
                </tr>
                <tr>
                  <td>Type:</td>
                  <td>server_cookie</td>
                </tr>
                <tr>
                  <td>Expires in:</td>
                  <td>1 year 11 months 29 days</td>
                </tr>

              </table>
            </div>
            <div className='border p-2'>
              <table className='termstable'>
                <tr>
                  <td>Name:</td>
                  <td>_gcl_au</td>
                </tr>
                <tr>
                  <td>Purpose:</td>
                  <td>Used by Google AdSense for experimenting with advertisement efficiency across websites using their services. </td>
                </tr>
                <tr>
                  <td>Provider:</td>
                  <td>.bodykore.com</td>
                </tr>
                <tr>
                  <td>Service:</td>
                  <td>Google AdSense
                    <a href='https://business.safety.google/privacy/'>View Service Privacy Policy</a></td>
                </tr>
                <tr>
                  <td>Type:</td>
                  <td>http_cookie</td>
                </tr>
                <tr>
                  <td>Expires in:</td>
                  <td>2 months 29 days</td>
                </tr>

              </table>
            </div>
            <div className='border p-2'>
              <table className='termstable'>
                <tr>
                  <td>Name:</td>
                  <td>VISITOR_INFO1_LIVE</td>
                </tr>
                <tr>
                  <td>Purpose:</td>
                  <td>YouTube is a Google-owned platform for hosting and sharing videos. YouTube collects user data through videos embedded in websites, which is aggregated with profile data from other Google services in order to display targeted advertising to web visitors across a broad range of their own and other websites. Used by Google in combination with SID to verify Google user account and most recent login time.
                  </td>
                </tr>
                <tr>
                  <td>Provider:</td>
                  <td>.bodykore.com</td>
                </tr>
                <tr>
                  <td>Service:</td>
                  <td>YouTube
                    <a href='https://business.safety.google/privacy/'>View Service Privacy Policy</a></td>
                </tr>
                <tr>
                  <td>Type:</td>
                  <td>server_cookie
                  </td>
                </tr>
                <tr>
                  <td>Expires in:</td>
                  <td>5 months 27 days</td>
                </tr>

              </table>
            </div>

            <div className='border p-2'>
              <table className='termstable'>
                <tr>
                  <td>Name:</td>
                  <td>lastExternalReferrerTime</td>
                </tr>
                <tr>
                  <td>Purpose:</td>
                  <td>Detects how the user reached the website by registering their last URL-address.
                  </td>
                </tr>
                <tr>
                  <td>Provider:</td>
                  <td>www.bodykore.com
                  </td>
                </tr>
                <tr>
                  <td>Service:</td>
                  <td>Meta Platforms, Inc
                    <a href='https://www.facebook.com/privacy/policy/'>View Service Privacy Policy</a></td>
                </tr>
                <tr>
                  <td>Type:</td>
                  <td>html_local_storage
                  </td>
                </tr>
                <tr>
                  <td>Expires in:</td>
                  <td>persistent</td>
                </tr>

              </table>
            </div>

            <div className='border p-2'>
              <table className='termstable'>
                <tr>
                  <td>Name:</td>
                  <td>YSC</td>
                </tr>
                <tr>
                  <td>Purpose:</td>
                  <td>YouTube is a Google-owned platform for hosting and sharing videos. YouTube collects user data through videos embedded in websites, which is aggregated with profile data from other Google services in order to display targeted advertising to web visitors across a broad range of their own and other websites. Used by Google in combination with SID to verify Google user account and most recent login time.

                  </td>
                </tr>
                <tr>
                  <td>Provider:</td>
                  <td>.youtube.com
                  </td>
                </tr>
                <tr>
                  <td>Service:</td>
                  <td>YouTube
                    <a href='https://business.safety.google/privacy/'>View Service Privacy Policy</a></td>
                </tr>
                <tr>
                  <td>Type:</td>
                  <td>server_cookie
                  </td>
                </tr>
                <tr>
                  <td>Expires in:</td>
                  <td>session</td>
                </tr>

              </table>
            </div>

            <div className='border p-2'>
              <table className='termstable'>
                <tr>
                  <td>Name:</td>
                  <td>test_cookie</td>
                </tr>
                <tr>
                  <td>Purpose:</td>
                  <td>A session cookie used to check if the user’s browser supports cookies.
                  </td>
                </tr>
                <tr>
                  <td>Provider:</td>
                  <td>.doubleclick.net</td>
                </tr>
                <tr>
                  <td>Service:</td>
                  <td>DoubleClick<a href='https://business.safety.google/privacy/'>View Service Privacy Policy</a></td>
                </tr>
                <tr>
                  <td>Type:</td>
                  <td>server_cookie</td>
                </tr>
                <tr>
                  <td>Expires in:</td>
                  <td>15 minutes</td>
                </tr>
              </table>
            </div>

          </div>

          <div className='space-y-3'>
            <span className="spacing" id="25"></span>
            <h5><b>Unclassified cookies:
            </b></h5>
            <p>These are cookies that have not yet been categorized. We are in the process of classifying these cookies with the help of their providers.</p>
            <div className='border p-2'>
              <table className='termstable'>
                <tr>
                  <td>Name:</td>
                  <td>__Secure-ROLLOUT_TOKEN</td>
                </tr>
                <tr>
                  <td>Provider:</td>
                  <td>.youtube.com</td>
                </tr>
                <tr>
                  <td>Type:</td>
                  <td>server_cookie</td>
                </tr>
                <tr>
                  <td>Expires in:</td>
                  <td>5 months 27 days</td>
                </tr>

              </table>
            </div>
            <div className='border p-2'>
              <table className='termstable'>
                <tr>
                  <td>Name:</td>
                  <td>VISITOR_PRIVACY_METADATA</td>
                </tr>
                <tr>
                  <td>Provider:</td>
                  <td>.youtube.com</td>
                </tr>
                <tr>
                  <td>Type:</td>
                  <td>server_cookie</td>
                </tr>
                <tr>
                  <td>Expires in:</td>
                  <td>5 months 27 days</td>
                </tr>

              </table>
            </div>
            <div className='border p-2'>
              <table className='termstable'>
                <tr>
                  <td>Name:</td>
                  <td>chameleon-profile-id</td>
                </tr>
                <tr>
                  <td>Provider:</td>
                  <td>api-cf.affirm.com</td>
                </tr>
                <tr>
                  <td>Type:</td>
                  <td>server_cookie</td>
                </tr>
                <tr>
                  <td>Expires in:</td>
                  <td>session</td>
                </tr>

              </table>
            </div>
            <div className='border p-2'>
              <table className='termstable'>
                <tr>
                  <td>Name:</td>
                  <td>tracker_device</td>
                </tr>
                <tr>
                  <td>Provider:</td>
                  <td>.affirm.com</td>
                </tr>
                <tr>
                  <td>Type:</td>
                  <td>server_cookie</td>
                </tr>
                <tr>
                  <td>Expires in:</td>
                  <td>1 year 11 months 29 days </td>
                </tr>

              </table>
            </div>
            <div className='border p-2'>
              <table className='termstable'>
                <tr>
                  <td>Name:</td>
                  <td>tracker_device</td>
                </tr>
                <tr>
                  <td>Provider:</td>
                  <td>www.bodykore.com</td>
                </tr>
                <tr>
                  <td>Type:</td>
                  <td>http_cookie</td>
                </tr>
                <tr>
                  <td>Expires in:</td>
                  <td>1 year 1 month 4 days</td>
                </tr>

              </table>
            </div>
            <div className='border p-2'>
              <table className='termstable'>
                <tr>
                  <td>Name:</td>
                  <td>priority</td>
                </tr>
                <tr>
                  <td>Provider:</td>
                  <td>salesiq.zohopublic.com</td>
                </tr>
                <tr>
                  <td>Type:</td>
                  <td>server_cookie</td>
                </tr>
                <tr>
                  <td>Expires in:</td>
                  <td>session</td>
                </tr>

              </table>
            </div>
            <div className='border p-2'>
              <table className='termstable'>
                <tr>
                  <td>Name:</td>
                  <td>axp-override</td>
                </tr>
                <tr>
                  <td>Provider:</td>
                  <td>api-cf.affirm.com</td>
                </tr>
                <tr>
                  <td>Type:</td>
                  <td>server_cookie</td>
                </tr>
                <tr>
                  <td>Expires in:</td>
                  <td>session</td>
                </tr>

              </table>
            </div>
            <div className='border p-2'>
              <table className='termstable'>
                <tr>
                  <td>Name:</td>
                  <td>3060738.3440491</td>
                </tr>
                <tr>
                  <td>Provider:</td>
                  <td>.affirm.com</td>
                </tr>
                <tr>
                  <td>Type:</td>
                  <td>server_cookie</td>
                </tr>
                <tr>
                  <td>Expires in:</td>
                  <td>1 year 11 months 29 days</td>
                </tr>

              </table>
            </div>
            <div className='border p-2'>
              <table className='termstable'>
                <tr>
                  <td>Name:</td>
                  <td>_cfuvid</td>
                </tr>
                <tr>
                  <td>Provider:</td>
                  <td>.affirm.com</td>
                </tr>
                <tr>
                  <td>Type:</td>
                  <td>server_cookie</td>
                </tr>
                <tr>
                  <td>Expires in:</td>
                  <td>session</td>
                </tr>

              </table>
            </div>
            <div className='border p-2'>
              <table className='termstable'>
                <tr>
                  <td>Name:</td>
                  <td>receive-cookie-deprecation</td>
                </tr>
                <tr>
                  <td>Provider:</td>
                  <td>shop.bodykore.com</td>
                </tr>
                <tr>
                  <td>Type:</td>
                  <td>server_cookie</td>
                </tr>
                <tr>
                  <td>Expires in:</td>
                  <td>session</td>
                </tr>

              </table>
            </div>
            <div className='border p-2'>
              <table className='termstable'>
                <tr>
                  <td>Name:</td>
                  <td>zalb_663a60c55d</td>
                </tr>
                <tr>
                  <td>Provider:</td>
                  <td>salesiq.zohopublic.com</td>
                </tr>
                <tr>
                  <td>Type:</td>
                  <td>server_cookie</td>
                </tr>
                <tr>
                  <td>Expires in:</td>
                  <td>session</td>
                </tr>

              </table>
            </div>
            <div className='border p-2'>
              <table className='termstable'>
                <tr>
                  <td>Name:</td>
                  <td>LS_CSRF_TOKEN</td>
                </tr>
                <tr>
                  <td>Provider:</td>
                  <td>salesiq.zohopublic.com</td>
                </tr>
                <tr>
                  <td>Type:</td>
                  <td>http_cookie</td>
                </tr>
                <tr>
                  <td>Expires in:</td>
                  <td>session</td>
                </tr>

              </table>
            </div>
          </div>

          <div className='space-y-3'>
            <span className="spacing" id="25"></span>
            <h5><b>How can I control cookies on my browser?
            </b></h5>
            <p>As the means by which you can refuse cookies through your web browser controls vary from browser to browser, you should visit your browser's help menu for more information. The following is information about how to manage cookies on the most popular browsers:</p>
            <ul>
              <li><a href='https://support.google.com/chrome/answer/95647#zippy=%2Callow-or-block-cookies'>Chrome</a></li>
              <li><a href='https://support.microsoft.com/en-us/windows/delete-and-manage-cookies-168dab11-0753-043d-7c16-ede5947fc64d'>Internet Explorer</a></li>
              <li><a href='https://support.mozilla.org/en-US/kb/enhanced-tracking-protection-firefox-desktop?redirectslug=enable-and-disable-cookies-website-preferences&redirectlocale=en-US'>Firefox</a></li>
              <li><a href='https://support.apple.com/en-ie/guide/safari/sfri11471/mac'>Safari</a></li>
              <li><a href='https://support.microsoft.com/en-us/windows/microsoft-edge-browsing-data-and-privacy-bb8174ba-9d73-dcf2-9b4a-c582b4e640dd'>Edge</a></li>
              <li><a href='https://help.opera.com/en/latest/web-preferences/'>Opera</a></li>
            </ul>
            <p>
              In addition, most advertising networks offer you a way to opt out of targeted advertising. If you would like to find out more information, please visit:
            </p>
            <ul>
              <li><a href="http://www.aboutads.info/choices/">Digital Advertising Alliance</a></li>
              <li><a href="https://youradchoices.ca/">Digital Advertising Alliance of Canada</a></li>
              <li><a href="http://www.youronlinechoices.com/">European Interactive Digital Advertising Alliance</a></li>
            </ul>
          </div>

          <div className='space-y-3'>
            <span className="spacing" id="25"></span>
            <h5><b>What about other tracking technologies, like web beacons?
            </b></h5>
            <p>
              Cookies are not the only way to recognize or track visitors to a website. We may use other, similar technologies from time to time, like web beacons (sometimes called "tracking pixels" or "clear gifs"). These are tiny graphics files that contain a unique identifier that enables us to recognize when someone has visited our Website or opened an email including them. This allows us, for example, to monitor the traffic patterns of users from one page within a website to another, to deliver or communicate with cookies, to understand whether you have come to the website from an online advertisement displayed on a third-party website, to improve site performance, and to measure the success of email marketing campaigns. In many instances, these technologies are reliant on cookies to function properly, and so declining cookies will impair their functioning.
            </p>
          </div>

          <div className='space-y-3'>
            <span className="spacing" id="25"></span>
            <h5><b>Do you use Flash cookies or Local Shared Objects?
            </b></h5>

            <p>Websites may also use so-called "Flash Cookies" (also known as Local Shared Objects or "LSOs") to, among other things, collect and store information about your use of our services, fraud prevention, and for other site operations.
            </p>
            <p>If you do not want Flash Cookies stored on your computer, you can adjust the settings of your Flash player to block Flash Cookies storage using the tools contained in the <a href='http://www.macromedia.com/support/documentation/en/flashplayer/help/settings_manager07.html' target='_blank' rel="noreferrer" >Website Storage Settings Panel</a>. You can also control Flash Cookies by going to the <a href='http://www.macromedia.com/support/documentation/en/flashplayer/help/settings_manager03.html' target='_blank' rel="noreferrer" >Global Storage Settings Panel</a> and following the instructions (which may include instructions that explain, for example, how to delete existing Flash Cookies (referred to "information" on the Macromedia site), how to prevent Flash LSOs from being placed on your computer without your being asked, and (for Flash Player 8 and later) how to block Flash Cookies that are not being delivered by the operator of the page you are on at the time).
            </p>
            <p>Please note that setting the Flash Player to restrict or limit acceptance of Flash Cookies may reduce or impede the functionality of some Flash applications, including, potentially, Flash applications used in connection with our services or online content.
            </p>         </div>

          <div className='space-y-3'>
            <span className="spacing" id="25"></span>
            <h5><b>Do you serve targeted advertising?

            </b></h5>

            <p>Third parties may serve cookies on your computer or mobile device to serve advertising through our Website. These companies may use information about your visits to this and other websites in order to provide relevant advertisements about goods and services that you may be interested in. They may also employ technology that is used to measure the effectiveness of advertisements. They can accomplish this by using cookies or web beacons to collect information about your visits to this and other sites in order to provide relevant advertisements about goods and services of potential interest to you. The information collected through this process does not enable us or them to identify your name, contact details, or other details that directly identify you unless you choose to provide these.</p>
          </div>

          <div className='space-y-3'>
            <span className="spacing" id="25"></span>
            <h5><b>How often will you update this Cookie Policy?
            </b></h5>
            <p>We may update this Cookie Policy from time to time in order to reflect, for example, changes to the cookies we use or for other operational, legal, or regulatory reasons. Please therefore revisit this Cookie Policy regularly to stay informed about our use of cookies and related technologies.</p>
            <p>
              The date at the top of this Cookie Policy indicates when it was last updated.
            </p>
          </div>


          <div className='space-y-3'>
            <span className="spacing" id="26"></span>
            <h5><b>Where can I get further information?</b></h5>
            <p>
              In order to resolve a complaint regarding the Services or to receive further information regarding use of the Services, please contact us at:
            </p>
            <p>
              <b>
                BodyKore INC<br></br>
                7466 Orangewood Ave<br></br>
                Garden Grove, CA 92841<br></br>
                United States<br></br>
                Phone: (+1)7145958748<br></br>
                rob@bodykore.com
              </b>
            </p>
          </div>

        </div>
      </div>
    </>
  );
};

export default CookiePage;
