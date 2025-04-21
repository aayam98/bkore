import React from 'react';
import PlainRedBanner from '@components/ui/bodykore/Banners/PlainRedBanner';
import Blacktitle from '@components/ui/bodykore/Text/Titles/Blacktitle';
import PlainText from '@components/ui/bodykore/Text/PlainText';
import PlainList from '@components/ui/bodykore/Text/PlainList';
import SubmissionForm from '@components/ui/bodykore/Sections/SubmissionForm';
import { GetServerSideProps } from 'next';
import { HeaderData, getHeader } from '@utils/header';
import seo from '../public/SEO/en.json';
import SeoHeader from '@components/seoHeader';
import { getStrapiAllProduct, ProductAllStrapi } from 'services/strapi';

export const getServerSideProps: GetServerSideProps = async (context) => {
  const header = await getHeader();
  const products = await getStrapiAllProduct();
  return {
    props: { header,products },
  };
};

interface WarrantyParams {
  header: HeaderData;
  products:ProductAllStrapi[]
}

const Warranty = ({ header,products }: WarrantyParams) => {

  return (
    <>
      <SeoHeader seo={seo.warranty} />

      <main className="w-full">
        <div className="pt-12">
          {/* <PlainRedBanner /> */}
          <div className="max-w-7xl m-auto">
          <Blacktitle
            title="WARRANTY SUBMISSION"
            textSize="text-5xl"
            textColor="text-black-373933"
          />
        </div>

        <div className="px-10">
          <SubmissionForm products={products}/>
        </div>
        </div>
        <div className="max-w-7xl m-auto pt-5">
          <h3 className="font-bebas lg:text-3xl text-2xl italic font-bold tracking-wider pb-2">
            BodyKore Warranty
          </h3>
          <p className="font-roboto text-black-373933">
            Here at Bodykore we stand behind our quality and product line. We
            manufacture our equipment at the highest standard. All of our
            equipment is Rated Commercial Grade and is designed for home and
            commercial settings.
          </p>
        </div>
        <div className="max-w-7xl m-auto">
          <h3 className="font-bebas lg:text-3xl text-2xl italic font-bold tracking-wider pb-2">
            Home Warranty
          </h3>
          <p className="font-roboto text-black-373933">
            Applies to equipment used exclusively in a private indoor home
            setting by home occupants. Examples include basements, garages, and
            work out rooms located inside a home, condo or town home.
          </p>
          <ul className="list-disc pl-5 font-roboto tracking-normal leading-7 py-1">
            <li>Lifetime (Frame)</li>
            <li>10 years (Cables & Pulleys)</li>
            <li>1 year (Upholstery & Attachments)</li>
          </ul>
        </div>
        <div className="max-w-7xl m-auto">
          <h3 className="font-bebas lg:text-3xl text-2xl italic font-bold tracking-wider pb-2">
            Commercial Warranty
          </h3>
          <p className="font-roboto text-black-373933">
            Applies to select equipment used in semi-private or public
            nonresidential facilities. Monthly fees may or may not be charged.
            Examples include: commercial gyms, firehouses, hotels, personal
            training studios, and apartment complexes.
          </p>
          <ul className="list-disc pl-5 tfont-roboto tracking-normal leading-7 py-5">
            <li>Lifetime (Frame)</li>
            <li>10 years (Cables & Pulleys)</li>
            <li>1 year (Upholstery & Attachments)</li>
          </ul>
        </div>

        <div className="max-w-7xl m-auto">
          <Blacktitle
            title="CONDITIONS AND RESTRICTIONS"
            textSize="text-5xl"
            textColor="text-black-373933"
          />
        </div>

        <div className="pb-2 px-10">
          <PlainText
            textColor="text-black-373933"
            textPosition="lg:text-left"
            paragraphs={[
              {
                description:
                  'This warranty is valid only in accordance with the conditions set forth below:',
              },
            ]}
          />
        </div>

        <div className="mb-10 px-10">
          <PlainList
            textColor="text-black-373933"
            List={[
              {
                text: 'The warranty applies to product sold by BodyKore only if:',
                subText:
                  '- It has been serviced by an authorized BodyKore service provider',
                subText1:
                  '- It remains in the possession of the original purchaser and proof of purchase is demonstrated',
                subText2:
                  '- It has not been subjected to accident, misuse, abuse, improper service, or non-manufacturer modification',
              },
              {
                text: 'Claims are made within the warranty period.',
              },
              {
                text: 'It is essential that this equipment is used only indoors, away from humidity and dampness. Do not use equipment in any location that is not dry, such as but not limited to porches, pool rooms, bathrooms, car ports, or outdoors. Failure to comply will void the warranty. The warranty does not apply to damage or failure due to accident, abuse, corrosion, discoloration of paint or plastic, or neglect. BodyKore Fitness shall not be responsible for incidental or consequential damages. All returns must be pre-authorized by BodyKore Fitness. BodyKore Fitness’s obligation',
              },
            ]}
          />
        </div>

        <div className="max-w-7xl m-auto">
          <Blacktitle
            title="WHAT IS COVERED?"
            textSize="text-5xl"
            textColor="text-black-373933"
          />
        </div>

        <div className="mb-5 px-10">
          <PlainText
            textColor="text-black-373933"
            textPosition="lg:text-left"
            paragraphs={[
              {
                description:
                  'Equipment is warranted to be free from defects in materials and manufacturing.',
              },
            ]}
          />
        </div>

        <div className="max-w-7xl m-auto">
          <Blacktitle
            title="WHO PAYS SHIPPING FOR SERVICE:"
            textSize="text-5xl"
            textColor="text-black-373933"
          />
        </div>

        <div className="mb-5 px-10">
          <PlainText
            textColor="text-black-373933"
            textPosition="lg:text-left"
            paragraphs={[
              {
                description:
                  'If the equipment or any warranted part must be returned to a service facility for repairs, BodyKore will pay all shipping charges during the covered warranty period. The purchaser is responsible for shipping after the warranty has expired.',
              },
            ]}
          />
        </div>

        <div className="max-w-7xl m-auto">
          <Blacktitle
            title="WHAT WE WILL DO TO CORRECT COVERED DEFECTS:"
            textSize="text-5xl"
            textColor="text-black-373933"
          />
        </div>

        <div className="mb-5 px-10">
          <PlainText
            textColor="text-black-373933"
            textPosition="lg:text-left"
            paragraphs={[
              {
                description:
                  'We will repair, or if unable to be repaired, at our discretion, replace the covered equipment when it fails to perform as intended during normal usage. Parts will be replaced with like kind and quality, and may be new or remanufactured. If the covered equipment cannot be repaired or if parts are no longer available due to the age of the equipment or are discontinued by the Manufacturer, the unit will be replaced with a product of equal or similar features and functionality. Replacement parts and equipment are warranted for the remaining portion of the original warranty period.',
              },
            ]}
          />
        </div>

        <div className="max-w-7xl m-auto">
          <Blacktitle
            title="NOT COVERED"
            textSize="text-5xl"
            textColor="text-black-373933"
          />
        </div>

        <div className="mb-5 px-10">
          <PlainList
            textColor="text-black-373933"
            List={[
              {
                text: 'Damages or failure due to accident, abuse, neglect and misuse of equipment for anything other than its intended purpose.',
              },
              {
                text: 'Improper assembly or installation of parts or accessories not originally intended for the equipment.',
              },
              {
                text: 'General wear and tear, including upholstery and rust corrosion.',
              },
              {
                text: 'Lack of general maintenance and or failure to service or maintain the equipment correctly. This includes a lack of/over lubrication between the deck and the running belt or incorrect alignment/ adjustment of treadmill belts that result in damage.',
              },
              {
                text: 'Damages or failure due to the use of an improper power supply',
              },
              {
                text: 'Please note BodyKore requires an individual power circuit be used for each treadmill, along with surge protectors on all equipment that plugs in or warranty will be void.',
              },
              {
                text: 'Replacement of flat or corroded batteries due to non-use.',
              },
              {
                text: 'Damage caused by the surrounding environment or weather and failure to keep the equipment in a clean, dry environment (natural disasters, equipment used outdoors or near water, entry of foreign matter, dust or particles etc.)',
              },
              {
                text: 'Belts requiring tensioning due to stretching after use are not covered under warranty. A maintenance kit is provided on delivery with all orders to keep the equipment serviced as required.',
              },
              {
                text: 'A service callout fee will be applicable where no damage or failure can be found or if determined to be caused by a matter not covered under the warranty conditions.',
              },
            ]}
          />
        </div>

        
      </main>
    </>
  );
};

export default Warranty;
