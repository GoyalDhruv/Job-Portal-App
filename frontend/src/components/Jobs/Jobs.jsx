import React from 'react'
import Navbar from '../shared/Navbar'
import FilterCard from './FilterCard'
import Job from './Job'
import Footer from '../shared/Footer'
import { useSelector } from 'react-redux'


function Jobs() {
    const jobs = useSelector(state => state.job.allJobs)

    return (
        <>
            <Navbar />
            <div className='max-w-7xl mx-auto mt-5 '>
                <div className='flex gap-5'>
                    <div className='w-[20%]'>
                        <FilterCard />
                    </div>
                    {
                        jobs.length > 0 ?
                            <div className='flex-1 h-[88vh] overflow-y-auto pb-5'>
                                <div className='grid grid-cols-3 gap-4'>
                                    {jobs.map((item, index) => (
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
            <Footer />
        </>
    )
}

export default Jobs