import React, { useEffect, useState } from 'react'
import Navbar from '../shared/Navbar'
import Footer from '../shared/Footer'
import Job from '../Jobs/Job'
import { getAllJobs } from '@/utils/JobApiService'
import { RotateLoader } from 'react-spinners'

function Browse() {
    const query = new URLSearchParams(location.search).get('search');


    const [jobs, setJobs] = useState()
    const [loading, setLoading] = useState(true);
    useEffect(() => {
        async function getJob() {
            setLoading(true);
            try {
                const res = await getAllJobs(query);
                if (res.data.success) {
                    setJobs(res.data.jobs)
                }
            } catch (error) {
                console.error(error)
            } finally {
                setLoading(false);
            }
        }

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
                            jobs.map((job, index) => (
                                <div key={index}>
                                    <Job job={job} />
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