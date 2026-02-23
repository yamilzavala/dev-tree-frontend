const BackgroundAnimation = ({opacity}: {opacity?: number}) => {
    return (
        <> 
            <div className={`fixed inset-0 w-full h-full overflow-hidden z-0 opacity-${opacity ? opacity : ''}`}>
                <video
                    autoPlay
                    loop
                    muted
                    playsInline
                    className={`absolute min-w-full min-h-full w-auto h-auto object-cover`}
                >
                    <source src="/video_animated_1.mp4" type="video/mp4" />
                    Sorry, your browser does not support embedded videos
                </video>
                <div className="absolute inset-0 bg-base-300/20"></div>
                <div className="absolute inset-0 bg-white opacity-20" />
            </div>
        </>
    )
}

export default BackgroundAnimation