import React, { useEffect, useState } from 'react'
import Navbar from '../shared/Navbar'
import HeroSection from './HeroSection'
import CategoryCarousel from './CategoryCarousel'
import LatestJobs from './LatestJobs'
import Footer from '../shared/Footer'
import { getAllJobs } from '@/utils/JobApiService'
// import { useDispatch } from 'react-redux'
// import { setAllJobs } from '@/redux/jobSlice'

function Home() {

    // const dispatch = useDispatch()
    const [allJobs, setAllJobs] = useState()

    useEffect(() => {
        async function getJob() {
            try {
                const res = await getAllJobs();
                if (res.data.success) {
                    setAllJobs(res.data.jobs)
                    // dispatch(setAllJobs(res.data.jobs))
                }
            } catch (error) {
                console.error(error)
            }
        }

        getJob();

    }, [])

    return (
        <div>
            <Navbar />
            <HeroSection />
            <CategoryCarousel />
            <LatestJobs jobs={allJobs} />
            <Footer />
        </div>
    )
}

export default Home