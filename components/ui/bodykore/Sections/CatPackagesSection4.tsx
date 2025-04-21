interface ParagraphsProps {
    text: string
}

interface CatPackagesSection4Props {
    title1?: String
    title2?: string
    paragraphs: ParagraphsProps[]
    description?: String
    bgImage?: String
    heightbg?: string 
    heightGradient?: string
}

export default function CatPackagesSection4({ title1, title2, paragraphs, bgImage, heightbg, heightGradient }: CatPackagesSection4Props) {
    return (
        <>
            {/*Main Image*/}
            <div className="h-4 bg-red-bc2026"></div>
            <div className={`bg-no-repeat w-full bg-center bg-cover py-16`} style={{backgroundImage: `url('${bgImage}'`}}>
                <div className={`bg-gradient-to-r from-black via-black to-transparent w-full flex items-center`} >
                   <div className="flex flex-row max-w-7xl m-auto">
                        <div className="text-white lg:w-1/2 w-full">
                            <div className="flex px-6 gap-2 lg:pb-0 pb-2">
                                <h3 className="font-bebas lg:text-5xl text-3xl font-bold italic text-center md:text-left" style={{ letterSpacing: '2px' }}>{title1}</h3>
                                <h3 className="font-bebas lg:text-5xl text-3xl font-bold italic text-center md:text-left text-red-bc2026" style={{ letterSpacing: '2px' }}>{title2}</h3>
                            </div>
                            {paragraphs.map((p, i) => {
                                return (
                                    <p key={i} className="font-roboto text-base tracking-wide leading-8 px-5 text-left">{p.text}</p>
                                )
                            })}
                            
                        </div>
                        <div className="w-1/2 lg:visible hidden"></div>
                    </div>      
                </div>
            </div>
        </>
    )
}