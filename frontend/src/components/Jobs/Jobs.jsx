import React from 'react'
import Navbar from '../shared/Navbar'
import FilterCard from './FilterCard'
import Job from './Job'
import Footer from '../shared/Footer'

const JobsArray = [1, 2, 3, 4, 5, 6, 7, 8]

function Jobs() {
    return (
        <>
            <Navbar />
            <div className='max-w-7xl mx-auto mt-5'>
                <div className='flex gap-5'>
                    <div className='w-[20%]'>
                        <FilterCard />
                    </div>
                    {
                        JobsArray.length > 0 ?
                            <div className='flex-1 h-[88vh] overflow-y-auto pb-5'>
                                <div className='grid grid-cols-3 gap-4'>
                                    {JobsArray.map((item, index) => (
                                        <div key={index}>
                                            <Job />
                                        </div>
                                    ))}
                                </div>
                            </div>
                            :
                            <span>Job not Found</span>
                    }
                </div>
            </div>
            <Footer />
        </>
    )
}

export default Jobs