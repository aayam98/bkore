import React, { useEffect, useState } from 'react';
import FadingBanner from '@components/ui/bodykore/Banners/FadingBanner';
import NavOptions from '@components/ui/bodykore/NavOptions/NavOptions';
import ManualCards from '@components/ui/bodykore/Cards/datasheets';
import { GetServerSideProps } from 'next';
import { HeaderData, getHeader } from '@utils/header';
import seo from '../public/SEO/en.json';
import SeoHeader from '@components/seoHeader';
import {
  DatasheetStrapi,
  DatasheetStrapiCategory,
  getStrapiDatasheet,
  getStrapiDatasheetCategory,
} from 'services/strapi/datasheet';
import { imageNotFound, mediaUrl } from '@utils/baseUrls';

export const getServerSideProps: GetServerSideProps = async (context) => {
  const manuals = await getStrapiDatasheet();
  const categories = await getStrapiDatasheetCategory();
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
  manuals: DatasheetStrapi[];
  categories: DatasheetStrapiCategory[];
  header: HeaderData;
}

const Manuals = ({ manuals, categories, header }: ManualsParams) => {
  const [filter, setFilter] = useState({
    page: 1,
    category: '',
  });
  const [manualsShow, setManualsShow] = useState(manuals);

  useEffect(() => {
    const { category } = filter;
    let displayedManuals: DatasheetStrapi[] = manuals;
    if (category !== '') {
      displayedManuals = manuals.filter(
        (item) =>
          item.attributes.datasheet_category.data &&
          item.attributes.datasheet_category.data.attributes.slug == category
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
      image: item.attributes.image?.data
        ? mediaUrl + item.attributes.image?.data.attributes.url
        : imageNotFound,
      category: item.attributes.datasheet_category.data
        ? item.attributes.datasheet_category.data.attributes?.title
        : '',
      title: item.attributes.title,
      ref: item.attributes.datasheet_category.data
        ? item.attributes.datasheet_category.data.attributes.slug
        : '',
      file: mediaUrl + item.attributes.pdf.data.attributes.url,
    }));
  };
  return (
    <>
      <SeoHeader seo={seo.datasheets} />
      <main className="w-full">
        <FadingBanner
          title={'Technical Datasheets '}
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

        <div className="pt-3 pb-6">
          <ManualCards card={mapManuals()} />
        </div>
      </main>
    </>
  );
};

export default Manuals;
