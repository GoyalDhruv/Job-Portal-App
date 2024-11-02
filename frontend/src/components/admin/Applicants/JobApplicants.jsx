import Navbar from '@/components/shared/Navbar'
import React, { useState } from 'react'
import { RotateLoader } from 'react-spinners'
import ApplicantsTable from './ApplicantsTable';

function JobApplicants() {

    const [loading, setLoading] = useState(false);


    return (
        <>
            <Navbar />
            {loading ? (
                <div className="flex justify-center items-center h-screen">
                    <RotateLoader color="#F83002" />
                </div>
            ) : (
                <div className="max-w-6xl mx-auto my-10">
                    <h1 className='font-bold text-xl my-5'>Applicants (3)</h1>
                    <ApplicantsTable />
                </div>
            )}
        </>
    )
}

export default JobApplicants