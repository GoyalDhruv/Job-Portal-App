import React, { useEffect, useState } from 'react'
import Navbar from '../shared/Navbar'
import FilterCard from './FilterCard'
import Job from './Job'
import Footer from '../shared/Footer'
import { getAllJobs } from '@/utils/JobApiService'
import { RotateLoader } from 'react-spinners'
import { toast } from 'sonner'


function Jobs() {
    const [filterData, setFilterData] = useState({})

    const [jobs, setJobs] = useState([])
    const [loading, setLoading] = useState(true);
    async function getJob() {
        setLoading(true);
        try {
            const res = await getAllJobs(filterData);
            if (res.data.success) {
                setJobs(res.data.jobs)
            }
        } catch (error) {
            console.error(error)
            setJobs([])
            toast.error(error?.response?.data?.message)
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        getJob();
        const params = new URLSearchParams();
        Object.entries(filterData).forEach(([key, value]) => {
            if (value) params.append(key, value);
        });
        let newUrl = ''
        if (params.size == 0) {
            newUrl = `${window.location.pathname}`
        }
        else {
            newUrl = `${window.location.pathname}?${params.toString()}`;
        }
        window.history.pushState({}, '', newUrl);
    }, [filterData])


    return (
        <>
            <Navbar />
            {loading ?
                <div className='flex justify-center items-center h-screen'>
                    <RotateLoader color='#F83002' />
                </div>
                :
                <div className='max-w-7xl mx-auto mt-5 min-h-screen'>
                    <div className='flex gap-5'>
                        <div className='w-[20%]'>
                            <FilterCard setFilterData={setFilterData} />
                        </div>
                        {
                            jobs?.length > 0 ?
                                <div className='flex-1 h-[88vh] overflow-y-auto pb-5'>
                                    <div className='grid lg:grid-cols-3 gap-4 md:grid-cols-2'>
                                        {jobs?.map((item, index) => (
                                            <div key={index}>
                                                <Job job={item} />
                                            </div>
                                        ))}
                                    </div>
                                </div>
                                :
                                <div className='w-[80%] flex justify-center items-center text-5xl font-semibold'>Job not Found</div>
                        }
                    </div>
                </div>
            }
            <Footer />
        </>
    )
}

export default Jobs