import React, { useEffect, useState } from 'react';
import Navbar from '../../shared/Navbar';
import { Label } from '../../ui/label';
import { Input } from '../../ui/input';
import { Button } from '../../ui/button';
import { useNavigate, useParams } from 'react-router-dom';
import { addCompany, getCompanyById, updateCompany } from '@/utils/CompanyApiService';
import { toast } from 'sonner';
import { RotateLoader } from 'react-spinners';
import { ArrowLeft } from 'lucide-react';

function AddCompany() {
    const { id } = useParams();
    const [loading, setLoading] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [companyName, setCompanyName] = useState('');
    const [description, setDescription] = useState('');
    const [website, setWebsite] = useState('');
    const [location, setLocation] = useState('');
    const [file, setFile] = useState('');
    const navigate = useNavigate();

    const fetchData = async () => {
        setLoading(true);
        try {
            if (id) {
                const res = await getCompanyById(id);
                setCompanyName(res?.data?.company?.name || '');
                setDescription(res?.data?.company?.description || '');
                setWebsite(res?.data?.company?.website || '');
                setLocation(res?.data?.company?.location || '');
                setFile(res?.data?.company?.file || '')
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
            // const data = {
            //     name: companyName,
            //     description,
            //     location,
            //     website,
            //     file: file ? file : null,
            // };
            const data = new FormData();
            data.append('name', companyName);
            data.append('description', description);
            data.append('location', location);
            data.append('website', website);
            data.append('file', file);

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

    console.log(file)
    return (
        <>
            <Navbar />
            {loading ? (
                <div className='flex justify-center items-center h-screen'>
                    <RotateLoader color='#F83002' />
                </div>
            ) : (
                <div className="max-w-4xl mx-auto p-4">

                    <form action="" className='border-gray-200 shadow-lg rounded-md p-8 border'>
                        <Button variant='outline' className='flex items-center gap-1 p-2 text-gray-500 font-semibold'
                            onClick={() => navigate('/admin/companies')}
                        >
                            <ArrowLeft size={20} />
                            <span>Back</span>
                        </Button>
                        <div className='my-4'>
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
                        <div className="columns-2">
                            <Label>Company Description</Label>
                            <Input
                                type="text"
                                className="my-2"
                                value={description}
                                onChange={(e) => setDescription(e.target.value)}
                                placeholder="Your Company Description"
                            />
                            <Label>Company Website</Label>
                            <Input
                                type="text"
                                className="my-2"
                                value={website}
                                onChange={(e) => setWebsite(e.target.value)}
                                placeholder="Your Company Website"
                            />
                        </div>
                        <div className="columns-2">
                            <Label>Company Location</Label>
                            <Input
                                type="text"
                                className="my-2"
                                value={location}
                                onChange={(e) => setLocation(e.target.value)}
                                placeholder="Your Company Location"
                            />
                            <Label>Company Logo</Label>
                            <Input
                                type="file"
                                accept="image/*"
                                className="my-2"
                                onChange={(e) => setFile(e.target.files[0])}
                            />
                        </div>
                        <div className='flex item-center gap-2 mt-10 mb-3 justify-end'>
                            <Button variant='outline' onClick={() => navigate('/admin/companies')}>
                                Cancel
                            </Button>
                            <Button onClick={handleSubmit} disabled={isSubmitting || !companyName.trim()}>
                                {isSubmitting ? 'Submitting...' : 'Submit'}
                            </Button>
                        </div>
                    </form>
                </div>
            )}
        </>
    );
}

export default AddCompany;
