import React, { useEffect, useState } from 'react'
import Navbar from '../shared/Navbar'
import { Input } from '../ui/input'
import { Button } from '../ui/button'
import CompaniesTable from './CompaniesTable'
import { useNavigate } from 'react-router-dom'
import { toast } from 'sonner'
import { getCompanies } from '@/utils/CompanyApiService'
import { RotateLoader } from 'react-spinners'

function Companies() {
    const [loading, setLoading] = useState(false);
    const [companies, setCompanies] = useState(null);
    const navigate = useNavigate()

    const fetchData = async () => {
        setLoading(true);
        try {
            const res = await getCompanies()
            setCompanies(res?.data?.companies)
        } catch (error) {
            toast.error('Failed to load companies data.');
            console.error(error);
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        fetchData()
    }, [])

    return (
        <>
            <Navbar />
            {loading ?
                <div className='flex justify-center items-center h-screen'>
                    <RotateLoader color='#F83002' />
                </div>
                :
                <div className='max-w-6xl mx-auto my-10'>
                    <div className='flex items-center justify-between my-5'>
                        <Input
                            className="w-fit"
                            placeholder="Filter by name"
                        />
                        <Button onClick={() => navigate('/admin/company/add')}>New Company</Button>
                    </div>
                    <div>
                        <CompaniesTable companies={companies} />
                    </div>
                </div>
            }
        </>
    )
}

export default Companies