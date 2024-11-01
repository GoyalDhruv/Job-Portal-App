import React, { useEffect, useState } from 'react'
import Navbar from '../shared/Navbar'
import Footer from '../shared/Footer'
import { Badge } from '../ui/badge'
import { Button } from '../ui/button'
import { useParams } from 'react-router-dom'
import { getJobById } from '@/utils/JobApiService'
import { format } from 'date-fns'
import { RotateLoader } from 'react-spinners'
import { applyForJob, getApplicants } from '@/utils/ApplicationApiService'
import { toast } from 'sonner'

function JobDescription() {
    const { id } = useParams()
    const user = JSON.parse(localStorage.getItem('user'))
    const userId = user?.id;

    const [jobDescription, setJobDescription] = useState(null);
    const [loading, setLoading] = useState(true);
    const [applicants, setApplicants] = useState(null)
    const isApplied = applicants?.includes(userId);

    const fetchData = async () => {
        setLoading(true);
        try {
            const jobRes = await getJobById(id);
            if (jobRes.data.success) {
                setJobDescription(jobRes.data.job);
            }

            const applicantsRes = await getApplicants(id);
            if (applicantsRes.data.success) {
                const allApplicants = applicantsRes.data.job.map(item => item.applicant._id);
                setApplicants(allApplicants);
            }
        } catch (error) {
            toast.error('Failed to load job data.');
            console.error(error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchData();
    }, [id]);

    function formatDate(string) {
        const date = new Date(string);
        return format(date, 'MMMM do, yyyy')
    }

    const apply = async () => {
        try {
            const res = await applyForJob(id);
            if (res.data.success) {
                toast.success(res.data.message);
                setApplicants(prev => [...prev, userId]);
                setJobDescription(prev => ({ ...prev, position: prev.position + 1 }));
            }
        } catch (error) {
            toast.error(error.response?.data?.message || 'Error applying for job');
            console.error(error);
        }
    };

    return (
        <>
            <Navbar />
            {loading ?
                <div className='flex justify-center items-center h-screen'>
                    <RotateLoader color='#F83002' />
                </div>
                :
                <div className='max-w-7xl mx-auto my-10 min-h-screen'>
                    <div className='flex items-center justify-between'>
                        <div>
                            <h1 className='font-bold text-xl'>{jobDescription?.title}</h1>
                            <div className='flex items-center gap-2 mt-4'>
                                <Badge variant='ghost' className={'text-blue-700 font-bold'}>{jobDescription?.position} Postions</Badge>
                                <Badge variant='ghost' className={'text-[#F83002] font-bold'}>{jobDescription?.jobType}</Badge>
                                <Badge variant='ghost' className={'text-[#7209b7] font-bold'}>{jobDescription?.salary} LPA</Badge>
                            </div>
                        </div>
                        {user?.role !== 'Recruiter' &&
                            <Button
                                disabled={isApplied}
                                onClick={apply}
                                className={`rounded-lg ${isApplied ? 'bg-gray-600 cursor-not-allowed' : 'bg-[#F83002] hover:bg-[#df2900]'}`}>
                                {!isApplied ? "Apply Now" : "Already Applied"}
                            </Button>
                        }
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
                </div >
            }
            <Footer />
        </>
    )
}

export default JobDescription