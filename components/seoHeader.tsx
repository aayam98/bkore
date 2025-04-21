import { NextSeo } from 'next-seo';
import { useRouter } from 'next/router';

interface ISeo {
  seo: {
    title: string;
    metaTitle?: string;
    description: string;
    noIndex?: boolean;
    nofollow?: boolean;
    image: {
      url: string;
    };
    canonical?: string; // Optional canonical URL property
  };
  shopifyDomain?: string; // Add Shopify domain for canonical URLs
}

const SeoHeader = ({ seo, shopifyDomain = "https://www.bodykore.com" }: ISeo) => {
  const router = useRouter();
  
  // Generate canonical URL if not provided directly
  const canonicalUrl = seo.canonical || (shopifyDomain ? 
    `${shopifyDomain}${router.asPath.split('?')[0]}` : 
    null);

  return (
    <NextSeo
      title={seo.title}
      description={seo.description}
      canonical={canonicalUrl?.toString()} // Use generated or provided canonical URL
      noindex={seo.noIndex || false}
      nofollow={seo.nofollow || false}
      additionalMetaTags={[
        {
          name: 'title',
          content: seo.metaTitle || seo.title
        }
      ]}
      openGraph={{
        title: seo.title,
        description: seo.description,
        images: [
          {
            url: seo?.image?.url,
            width: 800,
            height: 600,
            alt: seo?.title,
          },
        ],
        site_name: seo.title,
      }}
      twitter={{
        handle: '@handle',
        site: '@site',
        cardType: 'summary_large_image',
      }}
    />
  );
};

export default SeoHeader;