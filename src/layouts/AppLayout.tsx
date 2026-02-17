import { Link, Navigate, Outlet, useNavigation } from 'react-router-dom';
import Loading from '../components/Loading';
import Navbar from '../components/Navbar';
import { useQuery } from '@tanstack/react-query';
import { getUser } from '../api/DevTree';

const AppLayout = () => {
    // const navigation = useNavigation();
    // const isLoading = navigation.state === 'loading';
    const { data, isLoading, isError } = useQuery({
        queryFn: getUser,
        queryKey: ['user'],
        retry: 1,
        refetchOnWindowFocus: false
    })

    if(isLoading) return (<Loading />);
    
    if(isError) {
        return (<Navigate to={'/auth/login'} />)
    }

    return (
        <>
            <Navbar />
            {
                <section className='align-element py-20 '>
                    <div className="flex flex-col md:flex-row gap-5 mt-10">                        
                        <div className="flex-1">
                            <Outlet />
                        </div>

                        <div className="w-full md:w-96 px-5 py-10 space-y-6 border rounded-lg shadow-xl">
                            {/* Header */}
                            <div className="text-center space-y-2 ">
                                <Link className="text-2xl font-semibold text-base-content"
                                    to={''}
                                    target="_blank"
                                    rel="noreferrer noopener">
                                    Visit My Profile
                                </Link>
                                <p className="text-sm text-base-content/70">
                                    Welcome back! Ckeck my social media links
                                </p>
                            </div>

                        </div>
                    </div>
                </section>
            }
        </>
    )
}

export default AppLayout