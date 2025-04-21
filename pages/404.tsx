import {  HeaderData } from '@utils/header';
import { DefaultSeo } from 'next-seo';
interface NotFoundParams {
  header: HeaderData;
}

export default function NotFound({ header }: NotFoundParams) {
  return (
    <>
      <DefaultSeo
        title="404 - Page not found | Bodykore"
        description="Default description goes here."
        noindex={false}
      />
      <div className="max-w-2xl mx-8 sm:mx-auto py-20 flex flex-col items-center justify-center fit">
        <h5 className="text-5xl font-semibold font-bebas">
          Oops! That page can’t be found.
        </h5>
        <p className="">It looks like nothing was found at this location.</p>
        <a href="/">
          <button className="mt-8 bg-red-bc2026 hover:bg-red-hover text-white py-3 px-16 rounded-lg text-lg font-bold font-bebas">
            Go to Homepage
          </button>
        </a>
      </div>
    </>
  );
}
