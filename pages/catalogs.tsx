import React, { useEffect, useState } from 'react';
import FadingBanner from '@components/ui/bodykore/Banners/FadingBanner';
import ManualCards from '@components/ui/bodykore/Cards/ManualCards';
import { GetServerSideProps } from 'next';
import { HeaderData, getHeader } from '@utils/header';
import seo from '../public/SEO/en.json';
import SeoHeader from '@components/seoHeader';

import { imageNotFound, mediaUrl } from '@utils/baseUrls';
import { CatalogsStrapi, getStrapiCatalogs } from 'services/strapi/catalogs';

export const getServerSideProps: GetServerSideProps = async (context) => {
  const catalogs = await getStrapiCatalogs();
  const header = await getHeader();
  return {
    props: {
      catalogs,
    
      header,
    },
  };
};

interface CatalogsParams {
  catalogs: CatalogsStrapi[];
  header: HeaderData;
}

const Catalogs = ({ catalogs }: CatalogsParams) => {
  const [filter, setFilter] = useState({
    page: 1,
    category: '',
  });
  const [manualsShow, setManualsShow] = useState(catalogs);

  useEffect(() => {
    const { category } = filter;
    let displayedManuals: CatalogsStrapi[] = catalogs;
   
    setManualsShow(displayedManuals);
  }, [filter]);

  

  const mapCatalogs = () => {
    return manualsShow.map((item) => ({
      image: item.attributes.image.data
        ? mediaUrl + item.attributes.image.data.attributes?.url
        : imageNotFound,
      
      title: item.attributes.title,
      file: item.attributes.PDF_File.data.attributes.url,
    }));
  };
  return (
    <>
      <SeoHeader seo={seo.manuals} />
      <main className="w-full ">
        <FadingBanner
          title={'Catalogs'}
          bgImage={'bg-manuals-image'}
          description={''}
          height={'h-72'}
        />

    
        <div className="py-10">
         
          <ManualCards card={mapCatalogs()} placeHolder={false} />
        </div>
      </main>
    </>
  );
};

export default Catalogs;