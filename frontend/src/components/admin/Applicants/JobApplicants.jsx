import Navbar from '@/components/shared/Navbar'
import React, { useEffect, useState } from 'react'
import { RotateLoader } from 'react-spinners'
import ApplicantsTable from './ApplicantsTable';
import { toast } from 'sonner';
import { getApplicants } from '@/utils/ApplicationApiService';
import { useParams } from 'react-router-dom';

function JobApplicants() {
    const { id } = useParams()
    const [loading, setLoading] = useState(false);
    const [applicants, setApplicants] = useState(null);


    const fetchData = async () => {
        setLoading(true);
        try {
            const res = await getApplicants(id);
            const jobData = res?.data?.job || [];
            setApplicants(jobData);
        } catch (error) {
            toast.error('Failed to load jobs data.');
            console.error(error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchData();
    }, [id]);

    return (
        <>
            <Navbar />
            {loading ? (
                <div className="flex justify-center items-center h-screen">
                    <RotateLoader color="#F83002" />
                </div>
            ) : (
                <div className="max-w-6xl mx-auto my-10">
                    <h1 className='font-bold text-xl my-5'>Applicants ({applicants?.length})</h1>
                    <ApplicantsTable applicants={applicants} />
                </div>
            )}
        </>
    )
}

export default JobApplicants