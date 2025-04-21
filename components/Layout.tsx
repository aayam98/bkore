import { getHeader, HeaderData } from '@utils/header';
import { GetServerSideProps } from 'next';
import React, { useState } from 'react';
import { Header } from '.';
import {Footer} from '.';
import { getStrapiProductPopulate } from 'services/strapi';

export const getServerSideProps: GetServerSideProps = async (context) => {
  const header = await getHeader();


  return {
    props: { header },
    //// revalidate: 30 * 60,
  };
};

export interface LayoutProps {
  children: React.ReactNode;
  header?: HeaderData;
}

const Layout = ({ children, header }: LayoutProps) => {
  const [populating, setPopulating] = useState(false);

  const populateApp = async () => {
    setPopulating(true);
    await getStrapiProductPopulate();
    setPopulating(false);
  };
  return (
    <>
      {header && (
        <Header
          productCat={header.categories}
          cartsAddon={header.cartsAddon}
        />
      )}
      {children}
      {header && <Footer productCat={header.categories} />}
    </>
  );
};

export default Layout;
