import '@assets/main.css';
import React, { useEffect } from 'react';
import type { AppProps } from 'next/app';
import { Provider } from "jotai"; // Changed from RecoilRoot to Provider
import Layout from '@components/Layout';
import { ProductCompare } from '@components/ui/bodykore/Sections/Product';
import { ProductCompareBuilderProvider } from '@lib/productCompareContext';
import { SnackbarProvider } from 'nextjs-toast';
import Router from 'next/router';
import ToasterContainer from '@components/ui/ToasterContainer';

function MyApp({ Component, pageProps }: AppProps) {
  useEffect(() => {
    if (typeof window !== 'undefined') {
      if (window.location.host === 'bodykore.com') {
        const newHost = 'www.' + window.location.host.replace(/^www./, '');
        const fullPath = window.location.pathname + window.location.search; // Preserve path and query parameters

        if (!window.location.host.match(/^www/)) {
          window.location.replace('https://' + newHost + fullPath);
        }

        if (window.location.protocol === 'http:') {
          window.location.replace('https://' + newHost + fullPath);
        }
      }
    }
  }, []);
  useEffect(() => {
    try {
      if (typeof window !== 'undefined') {
        import('react-facebook-pixel')
          .then((x) => x.default)
          .then((ReactPixel) => {
            ReactPixel.init('3048042495310496');
          });
      }
    } catch (error) {
      console.log('error');
    }
  }, [Router.events]);
  return (
    <SnackbarProvider SnackbarProps={{ autoHideDuration: 4000 }}>
      <Provider> {/* Changed from RecoilRoot to Provider */}
        <ProductCompareBuilderProvider
          productCompare={[] as ProductCompare[]}
          compareIds={''}
        >
          <Layout {...pageProps}>
            <Component {...pageProps} />
          </Layout>
        </ProductCompareBuilderProvider>
        <ToasterContainer />
      </Provider>
    </SnackbarProvider>
  );
}

export default MyApp;