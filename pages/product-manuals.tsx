import React, { useEffect, useState } from 'react';
import FadingBanner from '@components/ui/bodykore/Banners/FadingBanner';
import NavOptions from '@components/ui/bodykore/NavOptions/NavOptions';
import ManualCards from '@components/ui/bodykore/Cards/ManualCards';
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

export const getServerSideProps: GetServerSideProps = async (context) => {
  const manuals = await getStrapiManual('manual');
  const categories = await getStrapiManualCategories('manual');
  const header = await getHeader();
  return {
    props: {
      manuals,
      categories,
      header,
    },
  };
};

interface ManualsParams {
  manuals: ManualStrapi[];
  categories: ManualStrapiCategory[];
  header: HeaderData;
}

const Manuals = ({ manuals, categories }: ManualsParams) => {
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
          category.toLowerCase()
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
      category: item.attributes.manual_category.data
        ? item.attributes.manual_category.data.attributes.title
        : '',
      title: item.attributes.title,
      file: item.attributes.PDF_File.data.attributes.url,
    }));
  };
  return (
    <>
      <SeoHeader seo={seo.manuals} />
      <main className="w-full ">
        <FadingBanner
          title={'ALL MANUALS'}
          bgImage={'bg-manuals-image'}
          description={''}
          height={'h-72'}
        />

        <NavOptions
          title1={'ALL'}
          titles={mapCategories()}
          type={filter.category}
          setter={setFilter}
        />

        <div className="">
          <ManualCards card={mapManuals()} />
        </div>
      </main>
    </>
  );
};

export default Manuals;
