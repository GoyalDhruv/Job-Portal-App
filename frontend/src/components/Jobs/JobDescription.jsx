import React, { useEffect, useState } from 'react'
import Navbar from '../shared/Navbar'
import Footer from '../shared/Footer'
import { Badge } from '../ui/badge'
import { Button } from '../ui/button'
import { useParams } from 'react-router-dom'
import { getJobById } from '@/utils/JobApiService'
import { format } from 'date-fns'
import { RotateLoader } from 'react-spinners'

function JobDescription() {
    const { id } = useParams()
    const [jobDescription, setJobDescription] = useState(null);
    const [loading, setLoading] = useState(true);
    const isApplied = true

    useEffect(() => {
        async function getJobDescription() {
            try {
                setLoading(true)
                const res = await getJobById(id);
                if (res.data.success) {
                    setJobDescription(res.data.job);
                }
            } catch (error) {
                console.error(error)
            }
            finally {
                setLoading(false)
            }
        }

        getJobDescription()
    }, [])

    function formatDate(string) {
        const date = new Date(string);
        return format(date, 'MMMM do, yyyy')
    }

    return (
        <>
            <Navbar />
            {loading ? <div className='flex justify-center items-center h-screen'>
                <RotateLoader color='#F83002' />
            </div> :
                <div className='max-w-7xl mx-auto my-10 '>
                    <div className='flex items-center justify-between'>
                        <div>
                            <h1 className='font-bold text-xl'>{jobDescription?.title}</h1>
                            <div className='flex items-center gap-2 mt-4'>
                                <Badge variant='ghost' className={'text-blue-700 font-bold'}>{jobDescription?.position} Postions</Badge>
                                <Badge variant='ghost' className={'text-[#F83002] font-bold'}>{jobDescription?.jobType}</Badge>
                                <Badge variant='ghost' className={'text-[#7209b7] font-bold'}>{jobDescription?.salary} LPA</Badge>
                            </div>
                        </div>
                        <Button
                            disabled={isApplied}
                            className={`rounded-lg ${isApplied ? 'bg-gray-600 cursor-not-allowed' : 'bg-[#F83002] hover:bg-[#df2900]'}`}>
                            {!isApplied ? "Apply Now" : "Already Applied"}
                        </Button>
                    </div>
                    <h1 className='border-b-2 border-b-gray-300 font-medium py-4'>{jobDescription?.description}</h1>
                    <div className='my-4'>
                        <h1 className='font-bold my-1'>Role: <span className='pl-1 font-normal text-gray-800'>{jobDescription?.title}</span></h1>
                        <h1 className='font-bold my-1'>Location: <span className='pl-1 font-normal text-gray-800'>{jobDescription?.location}</span></h1>
                        <h1 className='font-bold my-1'>Description: <span className='pl-1 font-normal text-gray-800'>{jobDescription?.description}</span></h1>
                        <h1 className='font-bold my-1'>Experience: <span className='pl-1 font-normal text-gray-800'>2 yrs</span></h1>
                        <h1 className='font-bold my-1'>Salary: <span className='pl-1 font-normal text-gray-800'>{jobDescription?.salary} LPA</span></h1>
                        <h1 className='font-bold my-1'>Total Applicants: <span className='pl-1 font-normal text-gray-800'>{jobDescription?.position}</span></h1>
                        <h1 className='font-bold my-1'>Posted Date: <span className='pl-1 font-normal text-gray-800'>{formatDate(jobDescription?.createdAt)}</span></h1>
                    </div>
                </div>
            }
            <Footer />
        </>
    )
}

export default JobDescription