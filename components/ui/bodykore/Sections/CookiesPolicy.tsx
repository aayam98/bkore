interface ParagraphsProps {
    text: string
}

interface CookiesPolicyProps {
    title?: string
    paragraphs: ParagraphsProps[]
}

export default function CookiesPolicy({ title, paragraphs }: CookiesPolicyProps) {
    return (
        <>
        <section>
            <div className="lg:flex text-center font-bebas text-5xl font-bold italic px-16 max-w-7xl m-auto">
                <h3 className="text-black-373933">{title}</h3>
            </div>
            <div className='px-16 max-w-7xl m-auto'>
                <div className='font-roboto text-center lg:text-left'>
                    {paragraphs.map((p, i) => {
                        return (
                            <p key={i} className="pb-6" >{p.text}</p>
                        )
                    })}
                </div>                     
            </div>
        </section>
        </>
    )
}