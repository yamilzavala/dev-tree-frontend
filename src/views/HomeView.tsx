import BackgroundAnimation from '../components/BackgroundAnimation'
import Navbar from '../components/Navbar'

import hero3 from '/bg-media-11.jpg'
import SearchForm from '../components/SearchForm'


const HomeView = () => {

    console.log(location)
    return (
        <>
            {/* Video Background */}
            <BackgroundAnimation opacity={45} />

            <div className="relative z-10">
                <Navbar />

                <section className='align-element py-5 h-full'>
                    <div className="flex flex-col md:flex-row gap-7 mt-10 ">
                        {/* left side */}
                        <div>
                            <h1 className='max-w-2xl text-4xl font-bold tracking-tight  sm:text-6xl text-base-content'>
                                All your social networks in one place.
                            </h1>

                            <p className='mt-8 max-w-xl text-lg leading-8'>
                                Share everything that matters — your social profiles, projects, content, and contact info — through a single, clean page. No more juggling multiple URLs. Just one link that represents you.

                                Create your profile in minutes, customize it to match your style, and start sharing instantly. Perfect for creators, developers, entrepreneurs, and anyone who wants to stay connected.
                            </p>

                            <SearchForm />
                        </div>

                        {/* right side */}
                        <div className='hidden h-[28rem] md:block md:w-1/2  rounded-box'>
                            <img src={hero3} className='rounded-md h-full w-full  object-cover' />
                        </div>
                    </div>
                </section>
            </div>
        </>
    )
}

export default HomeView