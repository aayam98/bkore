import Head from 'next/head';
import { GetServerSideProps } from 'next';
import { HeaderData, getHeader } from '@utils/header';
import ForgetComponent from '../../components/ui/bodykore/Auth/Forgetpassword';

export const getServerSideProps: GetServerSideProps = async (context) => {
  const header = await getHeader();
  return {
    props: { header },
    // revalidate: 30 * 60,
  };
};

interface ForgetParams {
  header: HeaderData;
}

//Pasamos como parametro (props) los posts
export default function ForgetPage({ header }: ForgetParams) {
  return (
    <>
      <div>
        <Head>
          <title>BodyKore Website - Login</title>
          <link rel="icon" href="/favicon.ico" />
        </Head>
        <main className="w-full">
          <ForgetComponent />
        </main>
      </div>
    </>
  );
}
