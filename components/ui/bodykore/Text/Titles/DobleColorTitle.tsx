interface DobleColorTitleProps {
    title?: string;
    title2?: string
    id?: string
}

export default function DobleColorTitle({ title, title2, id }: DobleColorTitleProps) {
    return (
        <>
        <section id={id} className="">
            <div className="lg:flex flex-row justify-center text-center font-bebas text-4xl lg:text-5xl font-bold italic pb-10 w-full m-auto">
                <h3 className="text-black-373933 pr-2 text-center lg:text-6xl text-4xl">{title} 
                <span className=" text-red-bc2026 pl-2">{title2}</span>
                </h3>
            </div>     
        </section>
        </>
    )
}