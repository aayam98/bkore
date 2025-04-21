import { GetServerSideProps } from 'next';
import React, { useState } from 'react';
import { getHeader, HeaderData } from '@utils/header';
import {
  getStrapiTechnologies,
  Technologies,
} from 'services/strapi/technology';
import { imageNotFound, mediaUrl } from '@utils/baseUrls';
import Image from 'next/image';
import TechnologyModal from '@components/ui/bodykore/Sections/TechnologyModal';
import FadingBanner from '@components/ui/bodykore/Banners/FadingBanner';

export const getServerSideProps: GetServerSideProps = async (context) => {
  const technologies = await getStrapiTechnologies();
  const header = await getHeader();
  return {
    props: { technologies, header },
  };
};

interface AboutParams {
  header: HeaderData;
  technologies: Technologies[];
}

const Technology = ({ technologies, header }: AboutParams) => {
  const mapProducts = () => {
    return technologies.map((technology) => {
      return {
        title: technology.attributes.title,
        description: technology.attributes.description,
        image: technology.attributes.image.data
          ? technology.attributes.image.data.map((image) => {
              return mediaUrl + image.attributes.url;
            })
          : [imageNotFound],
        iconImage:
          mediaUrl + technology.attributes.iconImage.data.attributes.url,
      };
    });
  };

  const [showModal, setShowModal] = useState({
    status: false,
    id: undefined as unknown as number,
  });

  const modalAction = (id: number, status: boolean) => {
    setShowModal({ status: status, id: id });
  };
  return (
    <>
      <div>
        <main className="w-full">
          <FadingBanner
            title={'PERFORMANCE TECHNOLOGY'}
            bgImage={'bg-manuals-image'}
            description={''}
            height={'h-72'}
          />

          <section className="max-w-7xl m-auto lg:px-10 pb-10">
            <div
              id="belowBanner"
              className="w-full h-fit max-w-7xl m-auto pt-14"
            >
              <div className="text-center">
                <div
                  className="flex justify-center font-bebas text-5xl font-bold italic"
                  style={{ letterSpacing: '1px' }}
                >
                  <h5 className="text-black-373933 pr-2">Our</h5>
                  <h5 className=" text-red-bc2026 pr-1">TECHNOLOGIES</h5>
                </div>
                <p className="px-5 sm:px-20 pt-8 font-roboto text-black-1c2023">
                  BodyKore’s mission is to remain at the forefront of the global
                  fitness industry by continually providing state of the art
                  commercial fitness equipment, innovative design, and excellent
                  service. We focus our time and efforts on producing high
                  quality products to help each individual achieve their fitness
                  goals, while providing a great experience for our customers.
                </p>
              </div>
            </div>
          </section>

          <div className="max-w-7xl flex justify-center md:justify-start m-auto">
            <div className="max-w-7xl m-auto">
              <div className="grid gap-x-2 gap-y-2 md:grid-cols-4 sm:grid-cols-1 m-auto">
                {mapProducts().map((ele, i) => (
                  <div className="pb-5" key={i}>
                    <div className="w-64 text-center" key={i}>
                      <Image
                        src={ele.iconImage}
                        height={200}
                        width={200}
                        placeholder="blur"
                        blurDataURL="/loading.png"
                        alt="image"
                        objectFit="contain"
                        onClick={() => modalAction(i, true)}
                        style={{ cursor: 'pointer' }}
                      />
                      <h3 className="text-lg">{ele.title}</h3>
                      {i == showModal.id && (
                        <TechnologyModal
                          closeModal={() => modalAction(i, false)}
                          showModal={showModal.status}
                          technology={ele}
                        />
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </main>
      </div>
    </>
  );
};

export default Technology;
