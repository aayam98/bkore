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

interface maslowPolicyPageParams {
  header: HeaderData;
}

const maslowPolicy = ({ header }: maslowPolicyPageParams) => {
  return (
    <>
      <SeoHeader seo={seo.return_policy} />
      <div className='max-w-5xl m-auto py-12 '>
        <div className='font-roboto policypages space-y-5'>
          <h3 className='font-bold text-3xl'>Maslow Moves Fitness Challenge Terms and Conditions</h3>
          <div className='space-y-3'>
            <h5><b>1. Eligibility:</b></h5>
            <p>
              The Maslow Moves Fitness Challenge (the “Challenge”) is open to legal residents of the 50 United States and Washington, D.C., who are 18 years of age or older at the time of entry. Void where prohibited by law. Employees, officers, and directors of BodyKore, Inc., MetPro, James Maslow, and their respective affiliates, subsidiaries, advertising and promotion agencies, and their immediate family members are not eligible to participate or win.
            </p>
          </div>
          <div className='space-y-3'>
            <h5><b>2. How to Enter:</b></h5>
            <p>
              Participants can enter the Challenge via one of the following methods:
            </p>
            <ul>
              <li><b>Online Entry:</b> Register online by visiting <a href='https://www.bodykore.com/maslow-moves-fitness-challenge'>https://www.bodykore.com/maslow-moves-fitness-challenge</a> and completing the registration form.</li>
              <li>
                <b>Mail-In Entry:</b> Send a handwritten entry with your full name, email address, phone number, and the words "Maslow Moves Fitness Challenge" to:
                <p>
                  <b>BodyKore Headquarters</b><br></br>
                  7466 Orangewood Ave<br></br>
                  Garden Grove, CA 92841<br></br>
                  All entries must be received by 11:59 PM PST on January 31, 2025.
                </p>
              </li>
            </ul>
            <p>
              Limit one entry per person regardless of entry method.
            </p>
          </div>
          <div className='space-y-3'>
            <h5><b>3. Timing:</b></h5>
            <p>
              The Challenge begins at 12:00 AM PST on January 1, 2025, and ends at 11:59 PM PST on January 31, 2025 (the “Challenge Period”). The winner will be selected on Monday, February 3, 2025.
            </p>
          </div>
          <div className='space-y-3'>
            <h5><b>4. Prizes:</b></h5>
            <p>
              One (1) Grand Prize Winner will receive the following:
            </p>
            <ul>
              <li><b>BodyKore Squat Box:</b> Approximate Retail Value (ARV): $349</li>
              <li><b>On the Road with Maslow Fitness Kit:</b> ARV: $59</li>
              <li><b>1-Month MetPro Nutritional Concierge Service:</b> ARV: $750
              </li>
              <li>Total ARV of all prizes: $1,158.</li>
            </ul>
            <p>
              Prizes are non-transferable, non-exchangeable, and cannot be redeemed for cash or substituted except at the sponsor’s sole discretion.
            </p>
          </div>
          <div className='space-y-3'>
            <h5><b>5. Winner Selection and Notification:</b></h5>
            <ul>
              <li>One (1) winner will be selected via a random drawing from all eligible entries received during the Challenge Period.</li>
              <li>The drawing will take place on February 3, 2025.</li>
              <li>The winner will be notified via the email address provided at registration. If the winner does not respond within seventy-two (72) hours, an alternate winner may be selected.</li>
            </ul>
            <p>
              Odds of winning depend on the number of eligible entries received.
            </p>
          </div>

          <div className='space-y-3'>
            <h5><b>6. Privacy Statement:</b></h5>
            <p>
              By registering for the Challenge, participants agree to provide their contact information for the purpose of receiving Challenge-related communications and future marketing communications from BodyKore. Participants may opt out of future email communications at any time by:
            </p>
            <ul>
              <li>Emailing us at <b>info@bodykore.com</b></li>
              <li>Writing to us at:
                <p><b>BodyKore Headquarters</b><br></br>
                  7466 Orangewood Ave<br></br>
                  Garden Grove, CA 92841
                </p>
              </li>
            </ul>
            <p>
              BodyKore will not sell, rent, or share participant information with third parties except as necessary to administer the Challenge or as required by law.
            </p>
          </div>
          <div className='space-y-3'>
            <h5><b>7. Limitation of Liability:</b></h5>
            <p>By participating in the Challenge, entrants agree to release and hold harmless BodyKore, MetPro, James Maslow, and their respective affiliates, officers, employees, and agents from any claims, liabilities, damages, or expenses arising from or related to participation in the Challenge or the acceptance, use, or misuse of any prize.</p>
            <p>Participants are responsible for consulting with a healthcare provider before starting any exercise or dietary program. The sponsors assume no liability for any injuries or damages arising from participation or use of the prizes.</p>

          </div>
          <div className='space-y-3'>
            <h5><b>8. Taxes:</b></h5>
            <p>All federal, state, and local taxes on prizes are the sole responsibility of the winner. Prizes valued at $600 or more will be reported to the IRS, and the winner will be required to complete an IRS Form W-9 to receive the prize.
            </p>
          </div>
          <div className='space-y-3'>
            <h5><b>9. Governing Law:</b></h5>
            <p>This Challenge is governed by the laws of the state of California without regard to conflict of law principles. Any disputes will be resolved in state or federal courts located in California.
            </p>
          </div>
          <div className='space-y-3'>
            <h5><b>10. Void Where Prohibited:</b></h5>
            <p>This Challenge is void where prohibited by law or where registration or bonding is required but not fulfilled.
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default maslowPolicy;
