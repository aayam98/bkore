import HomeSection3 from '@components/ui/bodykore/Sections/HomeSection3';
import { HeaderData, getHeader } from '@utils/header';
import { GetStaticProps } from 'next';
import Head from 'next/head';
import { FAQTypeStrapi, getStrapiFaqType } from 'services/strapi/faq';

export const getStaticProps: GetStaticProps = async (context) => {
  const header = await getHeader();
  const faqStrapiType = await getStrapiFaqType(true);
  return {
    props: {
      header,

      faqStrapiType,
    },
  };
};

interface FaqPageProps {
  header: HeaderData;
  faqStrapiType: FAQTypeStrapi[];
}

const Faq = ({ faqStrapiType }: FaqPageProps) => {
  return (
    <>
      <Head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'FAQPage',
              mainEntity: faqStrapiType?.[0]?.attributes?.faqs?.data?.map(
                (data) => ({
                  '@type': 'Question',
                  name: data.attributes.question,
                  acceptedAnswer: {
                    '@type': 'Answer',
                    text: data.attributes.answer,
                  },
                })
              ),
            }),
          }}
        />
      </Head>

      <div>
        <div className="lg:flex text-center font-bebas text-4xl lg:text-5xl font-bold italic bg-manuals-image bg-no-repeat w-full bg-center bg-cover lg:h-96 h-52">
          <div className="bg-gradient-to-r from-black via-black to-transparent lg:h-96 h-52 py-5 w-full flex items-center justify-center">
            <h3 className="text-white">Frequently Asked Questions</h3>
          </div>
        </div>

        <div className="py-14">
          <HomeSection3 title1="" title2="" accordion={faqStrapiType} />
        </div>
      </div>
    </>
  );
};

export default Faq;
