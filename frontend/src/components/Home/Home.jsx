import React, { useEffect } from 'react'
import Navbar from '../shared/Navbar'
import HeroSection from './HeroSection'
import CategoryCarousel from './CategoryCarousel'
import LatestJobs from './LatestJobs'
import Footer from '../shared/Footer'
import { getAllJobs } from '@/utils/JobApiService'
import { useDispatch } from 'react-redux'
import { setAllJobs } from '@/redux/jobSlice'

function Home() {

    const dispatch = useDispatch()

    useEffect(() => {
        async function getJob() {
            try {
                const res = await getAllJobs();
                if (res.data.success) {
                    dispatch(setAllJobs(res.data.jobs))
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
            <LatestJobs />
            <Footer />
        </div>
    )
}

export default Home