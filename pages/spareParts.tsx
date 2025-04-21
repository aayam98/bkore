import React, { useEffect, useState } from 'react';
import FadingBanner from '@components/ui/bodykore/Banners/FadingBanner';
import NavOptions from '@components/ui/bodykore/NavOptions/NavOptions';
import { GetServerSideProps } from 'next';
import { HeaderData, getHeader } from '@utils/header';
import seo from '../public/SEO/en.json';
import SeoHeader from '@components/seoHeader';
import {
  getStrapiManual,
  getStrapiManualCategories,
  ManualStrapi,
  ManualStrapiCategory,
} from 'services/strapi/manual';
import { imageNotFound, mediaUrl } from '@utils/baseUrls';
import SparePartsCard from '@components/ui/bodykore/Cards/SparePartsCard';

export const getServerSideProps: GetServerSideProps = async (context) => {
  const manuals = await getStrapiManual('sparepart');
  const categories = await getStrapiManualCategories('sparepart');
  const header = await getHeader();
  return {
    props: {
      manuals,
      categories,
      header,
    },
  };
};
interface SparePartsParams {
  manuals: ManualStrapi[];
  categories: ManualStrapiCategory[];
  header: HeaderData;
}

const SparePartPage = ({ manuals, categories }: SparePartsParams) => {
  const [filter, setFilter] = useState({
    page: 1,
    category: '',
  });
  const [manualsShow, setManualsShow] = useState(manuals);

  useEffect(() => {
    const { category } = filter;
    let displayedManuals: ManualStrapi[] = manuals;
    if (category !== '') {
      displayedManuals = manuals.filter(
        (item) =>
          item.attributes.manual_category.data.attributes?.title.toLowerCase() ===
          category.replace('-1', '').toLowerCase()
      );
    }
    setManualsShow(displayedManuals);
  }, [filter]);

  const mapCategories = () => {
    return categories.map((item) => ({
      text: item.attributes.title,
      id: item.attributes.slug,
    }));
  };

  const mapManuals = () => {
    return manualsShow.map((item) => ({
      image: item.attributes.image.data
        ? mediaUrl + item.attributes.image.data.attributes?.url
        : imageNotFound,
      category: item.attributes.manual_category.data.attributes.title,
      title: item.attributes.title,
      file: item.attributes.PDF_File.data.attributes.url,
    }));
  };
  return (
    <>
      <SeoHeader seo={seo.spareParts} />

      <main className="w-full pb-5">
        <FadingBanner
          title={'ALL Spare Parts'}
          bgImage={'bg-manuals-image'}
          description={
            'We offer spare parts for all of our machines. Most of our units are covered under warranty for the first 5 years of purchase but spare parts can still be purchased on all of the machines. Please locate the model number of your machine below and check the parts diagram to find the part number. Our experienced parts specialists are available to take your orders and answer your spare parts questions. All inquiries will be processed; the team will take the time to research the right part if you don’t have the exact part number.'
          }
          height={'h-96'}
        />

        <NavOptions
          title1={'ALL'}
          titles={mapCategories()}
          type={filter.category}
          setter={setFilter}
        />

        <div className="">
          <SparePartsCard card={mapManuals()} />
        </div>
      </main>
    </>
  );
};

export default SparePartPage;
