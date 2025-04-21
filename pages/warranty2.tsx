import React from 'react';
import Blacktitle from '@components/ui/bodykore/Text/Titles/Blacktitle';
import { GetServerSideProps } from 'next';
import { HeaderData, getHeader } from '@utils/header';
import seo from '../public/SEO/en.json';
import SeoHeader from '@components/seoHeader';

export const getServerSideProps: GetServerSideProps = async (context) => {
  const header = await getHeader();

  return {
    props: { header },
  };
};

interface WarrantyParams {
  header: HeaderData;
}

const Warranty = ({ header }: WarrantyParams) => {
  return (
    <>
      <SeoHeader seo={seo.warranty} />

      <main className="w-full py-10">
        <div className="max-w-6xl m-auto">
          <Blacktitle
            title="WARRANTY POLICY"
            textSize="text-5xl"
            textColor="text-black-373933"
          />
        </div>

        <div className="max-w-6xl m-auto pt-5">
          <h3 className="font-bebas text-2xl italic font-bold tracking-wider">
            BodyKore Warranty
          </h3>
          <p className="text-lg font-roboto font-medium tracking-normal">
            Here at Bodykore we stand behind our quality and product line. We
            manufacture our equipment at the highest standard. All of our
            equipment is Rated Commercial Grade and is designed for home and
            commercial settings.
          </p>
        </div>
        <div className="max-w-6xl m-auto pt-5">
          <h3 className="font-bebas text-2xl italic font-bold tracking-wider">
            Home Warranty
          </h3>
          <p className="text-lg font-roboto font-medium tracking-normal">
            Applies to equipment used exclusively in a private indoor home
            setting by home occupants. Examples include basements, garages, and
            work out rooms located inside a home, condo or town home.
          </p>
          <ul className="list-disc pl-5 text-lg font-roboto font-medium tracking-normal leading-7">
            <li>Lifetime (Frame)</li>
            <li>10 years (Cables & Pulleys)</li>
            <li>1 year (Upholstery & Attachments)</li>
          </ul>
        </div>
        <div className="max-w-6xl m-auto pt-5">
          <h3 className="font-bebas text-2xl italic font-bold tracking-wider">
            Commercial Warranty
          </h3>
          <p className="text-lg font-roboto font-medium tracking-normal">
            Applies to select equipment used in semi-private or public
            nonresidential facilities. Monthly fees may or may not be charged.
            Examples include: commercial gyms, firehouses, hotels, personal
            training studios, and apartment complexes.
          </p>
          <ul className="list-disc pl-5 text-lg font-roboto font-medium tracking-normal leading-7">
            <li>Lifetime (Frame)</li>
            <li>10 years (Cables & Pulleys)</li>
            <li>1 year (Upholstery & Attachments)</li>
          </ul>
        </div>
      </main>
    </>
  );
};

export default Warranty;
