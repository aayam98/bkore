import Image from 'next/image';

interface ListTitleProps {
  icon?: string;
  title?: string;
  id?: string;
}

export default function ListTitle({ icon, title, id }: ListTitleProps) {
  return (
    <>
      <section id={id} className="max-w-7xl m-auto">
        <div className="flex justify-start items-center">
          <Image src={icon as string} alt="" width={15} height={15} />
          <h5 className="text-black-373933 font-bold text-2xl pl-4">{title}</h5>
        </div>
      </section>
    </>
  );
}
