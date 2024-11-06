import React, { useEffect, useState } from 'react'
import Navbar from '../shared/Navbar'
import Footer from '../shared/Footer'
import Job from '../Jobs/Job'
import { getAllJobs } from '@/utils/JobApiService'
import { RotateLoader } from 'react-spinners'
import { getBookmarkedJobs } from '@/utils/UserApiService'

function Browse() {
    const query = new URLSearchParams(location.search).get('search');

    const [jobs, setJobs] = useState([])
    const [loading, setLoading] = useState(true);
    const [bookmarkedIds, setBookmarkedIds] = useState([])

    const fetchBookmarkedJobs = async () => {
        try {
            const res = await getBookmarkedJobs();
            const bookmarkedJobs = res?.data?.savedJobs || [];
            const bookmarkedJobIds = new Set(bookmarkedJobs.map(job => job._id));
            setBookmarkedIds(bookmarkedJobIds);
        } catch (error) {
            console.error(error);
        }
    };

    useEffect(() => {
        fetchBookmarkedJobs();
    }, []);


    async function getJob() {
        setLoading(true);
        try {
            const res = await getAllJobs({ search: query });
            if (res.data.success) {
                setJobs(res.data.jobs)
            }
        } catch (error) {
            setJobs([])
            console.error(error)
        } finally {
            setLoading(false);
        }
    }
    useEffect(() => {
        getJob();
    }, [])



    return (
        <>
            <Navbar />
            {loading ?
                <div className='flex justify-center items-center h-screen'>
                    <RotateLoader color='#F83002' />
                </div>
                :
                <div className='max-w-7xl mx-auto mb-10 min-h-screen'>
                    <h1 className='font-bold text-xl my-10'>Search Results ({jobs?.length})</h1>
                    <div className='grid grid-cols-3 gap-4'>
                        {
                            jobs?.map((job, index) => (
                                <div key={index}>
                                    <Job job={job} isBookmarked={bookmarkedIds.has(job._id)} />

                                </div>
                            ))
                        }
                    </div>
                </div>
            }
            <Footer />
        </>
    )
}

export default Browse