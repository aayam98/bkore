import Head from 'next/head';
import SignUp from '../../components/ui/bodykore/Auth/SignUp';
import { GetServerSideProps } from 'next';
import { HeaderData, getHeader } from '@utils/header';

export const getServerSideProps: GetServerSideProps = async (context) => {
  const header = await getHeader();
  return {
    props: { header },
    // revalidate: 30 * 60,
  };
};

interface SignUpPageParams {
  header: HeaderData;
}

//Pasamos como parametro (props) los posts
export default function SignUpPage({ header }: SignUpPageParams) {
  return (
    <>
      <div>
        <Head>
          <title>BodyKore Website - Sing Up</title>
          <link rel="icon" href="/favicon.ico" />
        </Head>
        <main className="w-full">
          <SignUp />
        </main>
      </div>
    </>
  );
}
