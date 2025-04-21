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

interface returnPolicyPageParams {
  header: HeaderData;
}

const returnPolicyPage = ({ header }: returnPolicyPageParams) => {
  return (
    <>
      <SeoHeader seo={seo.return_policy} />
      <div className='max-w-5xl m-auto py-12 px-5'>
        <div className='font-roboto policypages space-y-5'>
          <h3 className='font-bold text-3xl'>RETURN POLICY</h3>
          <p>Last updated December 11, 2024</p>
          <p>
            Thank you for your purchase. We hope you are happy with your purchase. However, if you are not completely satisfied with your purchase for any reason, you may return it to us for a full refund, store credit, or an exchange. Please see below for more information on our return policy.

          </p>
          <h5><b>RETURNS</b></h5>
          <p>
            All returns must be postmarked within thirty (30) days of the purchase date. All returned items must be in new and unused condition, with all original tags and labels attached.
          </p>

          <h5><b>RETURN PROCESS</b></h5>
          <p>
            To return an item, please email customer service at sales@bodykore.com to obtain a Return Merchandise Authorization (RMA) number. After receiving a RMA number, place the item securely in its original packaging and the return form provided, then mail your return to the following address:
          </p>
          <p>
            bodykore.com<br></br>
            Attn: Returns<br></br>
            RMA #<br></br>
            7466 Orangewood Ave<br></br>
            BODYKORE<br></br>
            Garden Grove, CA 92841<br></br>
            United States
          </p>
          <p>
            Please note, you will be responsible for all return shipping charges. We strongly recommend that you use a trackable method to mail your return.
          </p>
          <h5><b>REFUNDS</b></h5>
          <p>
            After receiving your return and inspecting the condition of your item, we will process your return or exchange. Please allow at least fourteen (14) days from the receipt of your item to process your return or exchange. Refunds may take 1-2 billing cycles to appear on your credit card statement, depending on your credit card company. We will notify you by email when your return has been processed.

          </p>
          <h5><b>EXCEPTIONS</b></h5>
          <p>For defective or damaged products, please contact us at the contact details below to arrange a refund or exchange.
          </p>
          <h5><b>QUESTIONS</b></h5>
          <p>If you have any questions concerning our return policy, please contact us at: <a href='mailto:sales@bodykore.com'>sales@bodykore.com</a></p>
        </div>
      </div>
    </>
  );
};

export default returnPolicyPage;
