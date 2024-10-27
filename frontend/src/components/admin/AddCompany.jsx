import React, { useEffect, useState } from 'react';
import Navbar from '../shared/Navbar';
import { Label } from '../ui/label';
import { Input } from '../ui/input';
import { Button } from '../ui/button';
import { useNavigate, useParams } from 'react-router-dom';
import { addCompany, getCompanyById, updateCompany } from '@/utils/CompanyApiService';
import { toast } from 'sonner';
import { RotateLoader } from 'react-spinners';

function AddCompany() {
    const { id } = useParams();
    const [loading, setLoading] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [companyName, setCompanyName] = useState('');
    const navigate = useNavigate();

    const fetchData = async () => {
        setLoading(true);
        try {
            if (id) {
                const res = await getCompanyById(id);
                setCompanyName(res?.data?.company?.name || '');
            }
        } catch (error) {
            toast.error(error.response?.data?.message || 'Failed to load data.');
            console.error('Fetch Data Error:', error);
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        fetchData();
    }, []);

    async function handleSubmit() {
        setIsSubmitting(true);
        try {
            const data = { name: companyName };
            const res = id ? await updateCompany(id, data) : await addCompany(data);
            if (res.data.success) {
                toast.success(res.data.message);
                navigate('/admin/companies');
            }
        } catch (error) {
            console.error('Submit Error:', error);
            toast.error(error.response?.data?.message || 'Submission failed.');
        } finally {
            setIsSubmitting(false);
        }
    }

    return (
        <>
            <Navbar />
            {loading ? (
                <div className='flex justify-center items-center h-screen'>
                    <RotateLoader color='#F83002' />
                </div>
            ) : (
                <div className="max-w-4xl mx-auto p-4">
                    <div className='my-10'>
                        <h1 className='font-bold text-2xl'>Your Company Details</h1>
                        <p>Add your company details here.</p>
                    </div>
                    <Label>Company Name</Label>
                    <Input
                        type="text"
                        className="my-2"
                        value={companyName}
                        onChange={(e) => setCompanyName(e.target.value)}
                        placeholder="Your Company Name"
                    />
                    <div className='flex item-center gap-2 my-10'>
                        <Button variant='outline' onClick={() => navigate('/admin/companies')}>
                            Cancel
                        </Button>
                        <Button onClick={handleSubmit} disabled={isSubmitting || !companyName.trim()}>
                            {isSubmitting ? 'Submitting...' : 'Submit'}
                        </Button>
                    </div>
                </div>
            )}
        </>
    );
}

export default AddCompany;
