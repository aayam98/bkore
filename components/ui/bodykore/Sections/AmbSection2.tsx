import Link from 'next/link';

interface BecomeAnAmb2Props {
    title1: string
    title2: string
    text: string
    btnText1: string
    btnText2: string
    img: string
    link: string
}

export default function BecomeAnAmb2({ title1, title2, text, btnText1, btnText2, img, link }: BecomeAnAmb2Props) {
    return (
        <>
        <section className="w-full">
            <div className='grid grid-cols-12 gap-5 justify-start align-top items-start w-full h-fit max-w-7xl m-auto'>
            <div className='col-span-6'>
                <img src={img} alt="" />
                </div>
                <div className='col-span-6'>
                    <div className='flex justify-center lg:justify-start text-center lg:text-left font-bebas italic font-bold text-3xl lg:text-4xl pb-4'>
                    <span
                       className='text-red-bc2026'
                    >
                        <span
                         className='text-black-373933 pr-2 w-full' style={{ letterSpacing: '1px' }}
                        >
                        {title1}
                        </span>
                        {title2}
                    </span>
                    </div>

                    <div
            className="text-base font-roboto text-black-373933 text-center lg:text-left leading-relaxed"
            dangerouslySetInnerHTML={{ __html: text || '' }}
          ></div>

                {/* <p className='text-base font-roboto text-black-373933 text-center lg:text-left leading-relaxed'>
                    {text}
                    
                    </p> */}
                <div className='flex flex-wrap justify-center lg:justify-start font-bebas'>
                    {/* <button className='w-48 h-12 mt-5 mx-4 lg:ml-0 bg-transparent text-black-373933 font-bold border border-black-373933 hover:text-red-bc2026 hover:border-red-bc2026 rounded-lg' style={{ letterSpacing: '2px' }}>
                        {btnText1}
                    </button> */}
                    <Link href={`${link}`}>  
                        <button className='w-48 h-12 mt-5 bg-transparent text-black-373933 font-bold border border-black-373933 hover:text-red-bc2026 hover:border-red-bc2026 rounded-lg' style={{ letterSpacing: '2px' }}>
                            {btnText2}
                        </button>
                    </Link>
                </div> 
                </div>
            </div>
        </section>
        </>
    )
}