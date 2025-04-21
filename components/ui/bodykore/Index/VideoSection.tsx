import ReactPlayer from 'react-player'

const VideoSection = () => {
    return (
        <div className='w-full lg:p-20 p-10' style={{ background: `radial-gradient(65.19% 100% at 50% 50%, rgb(0 0 0 / 70%) 0%, rgb(0 0 0) 85.31%), url(/patternWhite.svg)` }}>
            <h1 className='text-center text-white text-5xl font-bebas font-medium'>Universal Guide</h1>
            <p className='text-center text-white text-base font-roboto font-normal lg:w-4/12 m-auto'>
                Explore our comprehensive guide to attachments, setup, and exercises for optimal performance and safety.
            </p>
            <div className='lg:w-1/2 w-full m-auto flex justify-center pt-10'>
                <ReactPlayer
                    className="lg:h-full h-72 w-full videoBox"
                    url={'https://www.youtube.com/embed/EV6l8TOtSGA?si=mh25kHaqwe3TUXOr'}
                    playing={false}
                    loop={false}
                    controls={true}
                    volume={1}
                    width="100%"
                    height="450px"
                    playsInline={true}
                    config={{
                        file: {
                            attributes: {
                                controlsList: 'nodownload',
                            },
                        },
                    }}
                    onPlay={() => { }}
                />
            </div>
        </div>
    )
}

export default VideoSection
