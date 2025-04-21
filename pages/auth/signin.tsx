import Head from 'next/head';
import SignIn from '../../components/ui/bodykore/Auth/SignIn';
import { GetServerSideProps } from 'next';
import { HeaderData, getHeader } from '@utils/header';

export const getServerSideProps: GetServerSideProps = async (context) => {
  const header = await getHeader();
  return {
    props: { header },
    // revalidate: 30 * 60,
  };
};

interface SignInPageParams {
  header: HeaderData;
}

//Pasamos como parametro (props) los posts
export default function SignInPage({ header }: SignInPageParams) {
  return (
    <>
      <div>
        <Head>
          <title>BodyKore Website - Login</title>
          <link rel="icon" href="/favicon.ico" />
        </Head>
        <main className="w-full">
          <SignIn />
        </main>
      </div>
    </>
  );
}
