import React, { useEffect, useState } from 'react';
import FadingBanner from '@components/ui/bodykore/Banners/FadingBanner';
import dynamic from 'next/dynamic';
import SearchForm from '@components/ui/bodykore/Forms/SearchForm';
import MapCards, { CardsProps } from '@components/ui/bodykore/map/MapCards';
import { GetServerSideProps } from 'next';
import { Coordinates } from 'services/graphCMS';
import { getDistance } from '@utils/distance';
import { getCoordinatesAPI } from 'services/api';
import { HeaderData, getHeader } from '@utils/header';
import seo from '../public/SEO/en.json';
import SeoHeader from '@components/seoHeader';
import { getStrapiStore, StoreStrapi } from 'services/strapi/store';

export const getServerSideProps: GetServerSideProps = async (context) => {
  const stores = await getStrapiStore();
  const header = await getHeader();

  return {
    props: {
      stores,
      header,
    },
  };
};

interface StoreLocatorParams {
  stores: StoreStrapi[];
  header: HeaderData;
}
interface LocationCoordinate {
  latitude: number;
  longitude: number;
}

const MapWithNoSSR = dynamic(
  () => import('@components/ui/bodykore/map/StoresMap'),
  {
    ssr: false,
  }
);

const StoreLocator = ({ stores, header }: StoreLocatorParams) => {
  const [latlong, setLatlong] = useState<LocationCoordinate>({
    latitude: 0,
    longitude: 0,
  });
  useEffect(() => {
    navigator.geolocation.getCurrentPosition(function (position) {
      setLatlong({
        latitude: position.coords.latitude,
        longitude: position.coords.longitude,
      });
    });
  }, []);

  const mapStores = (stores: StoreStrapi[]): CardsProps[] => {
    return stores.map((item) => ({
      title: item.attributes.title,
      direction: item.attributes.address,
      phone: item.attributes.phone,
      website: item.attributes.website,
      email: item.attributes.email,
      distance: getDistance(
        item.attributes.latitude,
        item.attributes.longitude,
        latlong.latitude,
        latlong.longitude
      ),
      latitude: item.attributes.latitude,
      longitude: item.attributes.longitude,
    }));
  };

  const defaultLocation = {
    title: 'BodyKore Head Quarters',
    direction: '7466 Orangewood Ave., Garden Grove CA 92841',
    website: 'www.bodykore.com',
    phone: '949-325-3088',
    email: 'info@bodykore.com',
    distance: getDistance(
      33.795551,
      -118.001877,
      latlong.latitude,
      latlong.longitude
    ),
    latitude: 33.795551,
    longitude: -118.001877,
    zipCode: '92841',
  };

  const [ordered, setOrdered] = useState<CardsProps[]>(mapStores(stores));
  const [coord, setCoord] = useState<Coordinates | undefined>(undefined);

  const handleSearch = async (zipCode: string) => {
    const input = await getCoordinatesAPI(zipCode);

    if (input === undefined) {
      // The zipcode is incorect or location was not found
      return;
    }
    const reorder = stores.map((item) => ({
      title: item.attributes.title,
      direction: item.attributes.address,
      phone: item.attributes.phone,
      website: item.attributes.website,
      email: item.attributes.email,
      distance: getDistance(
        item.attributes.latitude,
        item.attributes.longitude,
        input.latitude,
        input.longitude
      ),
      latitude: item.attributes.latitude,
      longitude: item.attributes.longitude,
      zipCode: zipCode,
    }));
    reorder.sort((a, b) => a.distance - b.distance);
    setOrdered(reorder as unknown as CardsProps[]);
    setCoord(input);
  };

  const goToLocation = (latitude: number, longitude: number) => {
    setCoord({ longitude, latitude });
  };

  return (
    <>
      <SeoHeader seo={seo.storeLocator} />
      <main className="w-full">
        <FadingBanner
          height={'h-72'}
          title={'STORE LOCATOR'}
          bgImage={'bg-manuals-image'}
          description={''}
        />

        <div className="flex flex-row flex-wrap justify-center xl:justify-start max-w-7xl m-auto py-16 px-6 gap-8 lg:gap-0">
          <div
            className="lg:w-1/2 mapBox"
            style={{ maxHeight: '660px', overflowY: 'scroll' }}
          >
            <SearchForm search={handleSearch} />
            <MapCards
              cards={ordered}
              setter={goToLocation}
              defaultLocation={defaultLocation}
            />
          </div>
          <div
            id="map"
            className="lg:w-1/2 z-0 "
            style={{ height: '660px', width: '610px' }}
          >
            <MapWithNoSSR stores={stores} coord={coord} />
          </div>
        </div>
      </main>
    </>
  );
};

export default StoreLocator;
