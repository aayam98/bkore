import React from 'react';
import { GetServerSideProps } from 'next';
import { HeaderData, getHeader } from '@utils/header';
import seo from '../public/SEO/en.json';
import SeoHeader from '@components/seoHeader';

export const getServerSideProps: GetServerSideProps = async (context) => {
  const header = await getHeader();

  return {
    props: { header },
    // revalidate: 30 * 60,
  };
};

interface TermsOfUsePageParams {
  header: HeaderData;
}

const TermsOfUsePage = ({ header }: TermsOfUsePageParams) => {
  return (
    <>
      <SeoHeader seo={seo.terms_use} />

      <section>
        <div className="lg:flex text-center font-bebas text-4xl lg:text-5xl font-bold italic bg-manuals-image bg-no-repeat w-full bg-center bg-cover lg:h-96 h-52">
          <div className='bg-gradient-to-r from-black via-black to-transparent lg:h-96 h-52 py-5 w-full flex items-center justify-center'>
            <h3 className="text-white text-center m-auto">BodyKore Shipping Policy</h3>
          </div>
        </div>
        <div className="px-16 mt-2 max-w-7xl m-auto grid grid-cols-1 gap-5 py-5">
          <div className="">
            <h3 className="font-bebas text-2xl itali">Order Processing</h3>
            <p className="font-roboto text-base">
              Please allow up to 2 to 3 business days for online orders to be
              processed. Once your order is placed and payment is verified, our
              team will begin processing it. Processing times typically range
              from 2 to 3 business days, during which we’ll prepare your items
              for shipping.
            </p>
          </div>
          <div className="">
            <h3 className="font-bebas text-2xl itali">Order Tracking</h3>
            <p className="font-roboto text-base">
              Track your order by entering the PRO/tracking number on the
              carrier’s website. Before delivery:- Tracking information and a
              photo of your shipment will be emailed to you as soon as it is
              picked up from our warehouse. Any tracking updates, including an
              estimated delivery date, can be found on the freight carrier’s
              website using the tracking number. Once the shipment arrives at
              the local delivering terminal, they will contact you directly to
              schedule a delivery appointment. Watch our Order and Delivery
              videos for more details.
            </p>
          </div>
          <div className="">
            <h3 className="font-bebas text-2xl itali">During Delivery</h3>
            <p className="font-roboto text-base">
              Standard shipping includes curbside delivery to the end of your
              driveway. Please keep in mind that many of our products are very
              heavy and require two able-bodied individuals to move and unpack.
              If you notice damages at delivery:
            </p>
            <ul className="font-roboto text-base">
              <li>
                1. Accept your shipment. The proof of delivery / bill of lading
                will show how many pallets you should receive - please make sure
                all pallets are accounted for before signing.
              </li>
              <li>
                1. Accept your shipment. The proof of delivery / bill of lading
                will show how many pallets you should receive - please make sure
                all pallets are accounted for before signing.
              </li>
              <li>
                2. Note the damage on your proof of delivery/bill of lading.
                Write the number of boxes damaged and describe the damage (i.e:
                ripped carton, scratches, shrink wrap torn, etc.) Be as detailed
                as possible.
              </li>
              <li>
                3. Take photos of all damages and signed proof of delivery/ bill
                of lading with damages noted. Claims cannot be filed without
                photos of the BOL with damages noted at delivery.
              </li>
              <li>
                4. Email the photos and any additional details to{' '}
                <a
                  className="italic text-red-bc2026 font-bold"
                  href="mailto:sales@bodykore.com"
                >
                  {' '}
                  sales@bodykore.com
                </a>{' '}
                .
              </li>
            </ul>
          </div>
          <div className="">
            <h3 className="font-bebas text-2xl itali">After Delivery</h3>
            <p className="font-roboto text-base">
              Instructions are included in your shipment. Installation videos
              can also be found here:
              <a
                className="italic text-red-bc2026 font-bold"
                href="https://bodykore.com/installation-videos/"
                target="_blank" rel="noreferrer"
              >
                {' '}
                Installation Video
              </a>{' '}
              .
            </p>
          </div>
          <div className="">
            <h3 className="font-bebas text-2xl itali">
              Damages or Missing Parts
            </h3>
            <p className="font-roboto text-base">
              What to do if you notice damages after unboxing or are missing
              parts:
            </p>
            <ul className="font-roboto text-base">
              <li>
                1. Take photos of all damages, including the box/packaging.
              </li>
              <li>
                2. Any damages during shipping or delivery must be reported
                within 7 days of delivery for claims to be filed.
              </li>
              <li>
                3. Email photos and order details (order number, product
                name/serial number if available) to
                <a
                  className="italic text-red-bc2026 font-bold"
                  href="mailto:sales@bodykore.com"
                >
                  {' '}
                  sales@bodykore.com{' '}
                </a>{' '}
                .
              </li>
            </ul>
          </div>
          <div className="">
            <h3 className="font-bebas text-2xl itali">
              International Shipping
            </h3>
            <p className="font-roboto text-base">
              We can ship internationally but the prices will be determined on a
              case-by-case basis. International customers are responsible for
              any customs fees that may be associated with the order once it
              arrives at the border. Please contact sales@bodykore.com for
              pricing inquiries.
            </p>
          </div>
          <div className="">
            <h3 className="font-bebas text-2xl itali">
              Does BodyKore offer Free Shipping?
            </h3>
            <p className="font-roboto text-base">
              Most of the items will require shipping fees unless noted
              otherwise. Free shipping offers only apply to the continental
              United States excluding Alaska, Hawaii and International
              destinations. Our items are very large and heavy so shipping
              across the country does require some money but we work with the
              carriers and try to get the best prices available to pass on to
              the users.
            </p>
          </div>
          <div className="">
            <h3 className="font-bebas text-2xl itali">Local Pickup</h3>
            <p className="font-roboto text-base">
              Yes, local pickup is allowed by appointment. Please visit our
              contact us page to see our warehouse locations.
            </p>
          </div>
        </div>
      </section>
    </>
  );
};

export default TermsOfUsePage;
