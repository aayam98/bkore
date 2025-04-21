import React from 'react';
import FadingBanner from '@components/ui/bodykore/Banners/FadingBanner';
import SliderProgress from '@components/ui/bodykore/Sliders/SliderProgress';
import { GetServerSideProps } from 'next';
import {
  getProjectsOfCategory,
  getProjectsOfCategoryHome,
  ProjectCategory,
  ProjectInfo,
} from 'services/graphCMS';
import { NUM_PROJECTS } from '@config/siteConfig';
import { getHeader } from '@utils/header';
import routes from '@config/routes';
import seo from '../../public/SEO/en.json';
import SeoHeader from '@components/seoHeader';
import {
  getStrapiProjectCategories,
  ProjectCategoryStrapi,
} from 'services/strapi/project';
import { imageNotFound, mediaUrl } from '@utils/baseUrls';
import Image from 'next/image';

export const getServerSideProps: GetServerSideProps = async (context) => {
  const filter = context.query.category ? context.query.category : '';
  const projectsStrapi = await getStrapiProjectCategories(true, filter[0]);
  const header = await getHeader();
  return {
    props: {
      filter,
      header,
      projectsStrapi,
    },
  };
};

interface PortfolioParams {
  projectsStrapi: ProjectCategoryStrapi;
  filter: string
}

const Inspiration = ({ projectsStrapi, filter }: PortfolioParams) => {
  const mapProjects = () => {
    return projectsStrapi.data.map((item, index) => {
      const space = item.attributes.title.indexOf(' ');
      return (
        <div className="px-8 py-5" key={index}>
          {filter === '' && <SliderProgress
            title1={item.attributes.title.substring(0, space)}
            title2={item.attributes.title.substring(space + 1)}
            color1={'text-red-bc2026'}
            color2={'text-black-373933'}
            id={item.attributes.slug}
            bgImage={item.attributes.projects.data.map((subItem, i) => ({
              title: subItem.attributes.title,
              url: subItem.attributes.image.data[0]
                ? mediaUrl + subItem.attributes.image.data[0].attributes.url
                : imageNotFound,
              link: `${routes.inspiration.path}/${subItem.attributes.slug}`,
            }))}
            width="w-1/2"
            link={`${routes.inspiration.path}/${item.attributes.slug}`}
          />}
          <div className='max-w-7xl m-auto'>
            {<div className='grid grid-cols-3'>
              {filter !== '' && item.attributes.projects.data.map((subItem, i) => (<div key={i} className="px-1">
                <a href={`${routes.inspiration.path}/${subItem.attributes.slug}`}>
                  <div className='relative'>
                    <div className='absolute top-0 bottom-2 right-0 left-0 bg-black opacity-20' style={{ zIndex: 9 }}>
                    </div>
                    <Image
                      src={subItem.attributes.image.data[0]
                        ? mediaUrl + subItem.attributes.image.data[0].attributes.url
                        : imageNotFound as string}
                      height={260}
                      width={419}
                      placeholder="blur"
                      blurDataURL="/loading.png"
                    />
                    <h4
                      className="cursor-pointer text-2xl font-bebas italic font-normal text-white absolute bottom-3 px-3"
                      style={{ letterSpacing: '1px', zIndex: 99 }}
                    >
                      {subItem.attributes.title}
                    </h4>
                  </div>
                </a>
              </div>))}
            </div>}
          </div>

        </div>
      );
    });
  };

  return (
    <>
      <SeoHeader seo={seo.portfolio} />
      <main className="w-full">
        <FadingBanner
          title={filter === '' ? 'PORTFOLIO' : filter}
          bgImage={'bg-portfolio-image'}
          description={''}
          height={'h-60'}
        />
        {mapProjects()}
      </main>
    </>
  );
};

export default Inspiration;
