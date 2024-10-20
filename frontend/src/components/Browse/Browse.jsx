import React from 'react'
import Navbar from '../shared/Navbar'
import Footer from '../shared/Footer'
import Job from '../Jobs/Job'
import { useSelector } from 'react-redux'

const randomJobs = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13]

function Browse() {

    const jobs = useSelector(state => state.job.allJobs)

    return (
        <>
            <Navbar />
            <div className='max-w-7xl mx-auto mb-10 '>
                <h1 className='font-bold text-xl my-10'>Search Results ({randomJobs.length})</h1>
                <div className='grid grid-cols-3 gap-4'>
                    {
                        jobs.map(job => (
                            <div key={job}>
                                <Job job={job} />
                            </div>
                        ))
                    }
                </div>
            </div>
            <Footer />
        </>
    )
}

export default Browse