import Image from 'next/image';
import { FormEventHandler } from 'react';

interface SearchFormProps {
  search: (value: string) => void;
}

export default function SearchForm({ search }: SearchFormProps) {
  const handleSubmit: FormEventHandler<HTMLFormElement> = (event) => {
    event.preventDefault();
    const term = event.currentTarget.search.value;
    search(term);
  };
  return (
    <>
      <section className="max-w-7xl m-auto">
        <div className="">
          <div className="pr-5">
            <form onSubmit={handleSubmit}>
              <div className="input-group relative flex items-stretch w-full mb-4 rounded">
                <input
                  id="search"
                  type="text"
                  className="form-control flex-auto w-full px-3 py-3 text-base font-roboto text-black-373933 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                  placeholder="Introduce your ZIP code"
                  required={true}
                ></input>
                <button
                  type="submit"
                  className="input-group-text flex items-center px-3 py-1.5 text-base font-normal text-white bg-black-1c2023 hover:bg-red-hover text-center whitespace-nowrap rounded ml-2"
                  id="basic-addon2"
                >
                  <Image src="/svg/search.svg" width={30} height={30} alt="" />
                </button>
              </div>
            </form>
          </div>
        </div>
      </section>
    </>
  );
}
