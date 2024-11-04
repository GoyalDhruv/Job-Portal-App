import React, { useEffect, useState } from 'react';
import Navbar from '../../shared/Navbar';
import { Label } from '../../ui/label';
import { Input } from '../../ui/input';
import { Button } from '../../ui/button';
import { useNavigate, useParams } from 'react-router-dom';
import { getCompanies } from '@/utils/CompanyApiService';
import { toast } from 'sonner';
import { RotateLoader } from 'react-spinners';
import { ArrowLeft } from 'lucide-react';
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { createJob, getJobById, updateJob } from '@/utils/JobApiService';

function AddJob() {
    const { id } = useParams();
    const [companies, setCompanies] = useState([]);
    const [loading, setLoading] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [requirements, setRequirements] = useState('');
    const [salary, setSalary] = useState('');
    const [location, setLocation] = useState('');
    const [jobType, setJobType] = useState('');
    const [experience, setExperience] = useState('');
    const [position, setPosition] = useState(0);
    const [companyId, setCompanyId] = useState('');
    const navigate = useNavigate();

    const fetchCompanyData = async () => {
        setLoading(true);
        try {
            const res = await getCompanies();
            const companyData = res?.data?.companies || [];
            setCompanies(companyData);
        } catch (error) {
            toast.error(error.response?.data?.message || 'Failed to load data.');
            console.error('Fetch Data Error:', error);
        } finally {
            setLoading(false);
        }
    }

    const fetchData = async () => {
        setLoading(true);
        try {
            if (id) {
                const res = await getJobById(id);
                setTitle(res?.data?.job?.title);
                setDescription(res?.data?.job?.description);
                setRequirements(res?.data?.job?.requirements)
                setSalary(res?.data?.job?.salary);
                setLocation(res?.data?.job?.location);
                setJobType(res?.data?.job?.jobType);
                setExperience(res?.data?.job?.experienceLevel);
                setPosition(res?.data?.job?.position);
                setCompanyId(res?.data?.job?.company);
            }
        } catch (error) {
            toast.error(error.response?.data?.message || 'Failed to load data.');
            console.error('Fetch Data Error:', error);
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        fetchCompanyData();
        fetchData();
    }, []);

    async function handleSubmit() {
        setIsSubmitting(true);
        try {
            const data = {
                title,
                description,
                requirements,
                salary,
                jobType,
                location,
                experience,
                position,
                companyId,
            };

            const res = id ? await updateJob(id, data) : await createJob(data);
            if (res.data.success) {
                toast.success(res.data.message);
                navigate('/admin/jobs');
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
                    <form action="" className='border-gray-200 shadow-lg rounded-md p-8 border'>
                        <Button variant='outline' className='flex items-center gap-1 p-2 text-gray-500 font-semibold'
                            onClick={() => navigate('/admin/jobs')}
                        >
                            <ArrowLeft size={20} />
                            <span>Back</span>
                        </Button>
                        <div className='my-4'>
                            <h1 className='font-bold text-2xl'>Job Details</h1>
                            <p>Add job details here.</p>
                        </div>
                        <div className="columns-2">
                            <Label>Title</Label>
                            <Input
                                type="text"
                                className="my-2"
                                value={title}
                                onChange={(e) => setTitle(e.target.value)}
                                placeholder="Job Title"
                            />
                            <Label>Job Description</Label>
                            <Input
                                type="text"
                                className="my-2"
                                value={description}
                                onChange={(e) => setDescription(e.target.value)}
                                placeholder="Job Description"
                            />
                        </div>
                        <div className="columns-2">
                            <Label>Requirements</Label>
                            <Input
                                type="text"
                                className="my-2"
                                value={requirements}
                                onChange={(e) => setRequirements(e.target.value)}
                                placeholder="Job Requirements"
                            />
                            <Label>Salary</Label>
                            <Input
                                type="text"
                                className="my-2"
                                value={salary}
                                onChange={(e) => setSalary(e.target.value)}
                                placeholder="Salary"
                            />
                        </div>
                        <div className="columns-2">
                            <Label>Location</Label>
                            <Input
                                type="text"
                                className="my-2"
                                value={location}
                                onChange={(e) => setLocation(e.target.value)}
                                placeholder="Location"
                            />
                            <Label>Job Type</Label>
                            <Select onValueChange={(value) => setJobType(value)} value={jobType}>
                                <SelectTrigger className="my-2">
                                    <SelectValue placeholder="Select Job Type" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectGroup>
                                        <SelectItem value='Full-Time'>Full-Time</SelectItem>
                                        <SelectItem value='Part-Time'>Part-Time</SelectItem>
                                        <SelectItem value='Contract'>Contract</SelectItem>
                                        <SelectItem value='Internship'>Internship</SelectItem>
                                    </SelectGroup>
                                </SelectContent>
                            </Select>
                        </div>
                        <div className="columns-2">
                            <Label>Experience</Label>
                            <Input
                                type="text"
                                className="my-2"
                                value={experience}
                                onChange={(e) => setExperience(e.target.value)}
                                placeholder="Experience required"
                            />
                            <Label>No of Position</Label>
                            <Input
                                type="number"
                                className="my-2"
                                value={position}
                                onChange={(e) => setPosition(e.target.value)}
                                placeholder="No of positions"
                            />
                        </div>
                        <Label>Company</Label>
                        <Select onValueChange={(value) => setCompanyId(value)} value={companyId} disabled={!!id}>
                            <SelectTrigger className="my-2">
                                <SelectValue placeholder="Select a Company" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectGroup>
                                    {
                                        companies.map((company, index) => (
                                            <SelectItem key={index} value={company._id}>{company.name}</SelectItem>
                                        ))
                                    }
                                </SelectGroup>
                            </SelectContent>
                        </Select>
                        <div className='flex item-center gap-2 mt-10 mb-3 justify-end'>
                            <Button variant='outline' onClick={() => navigate('/admin/companies')}>
                                Cancel
                            </Button>
                            <Button onClick={handleSubmit} disabled={isSubmitting || companyId === ''}>
                                {isSubmitting ? 'Submitting...' : 'Submit'}
                            </Button>
                        </div>
                        {
                            companies.length === 0 &&
                            <p className=' text-xs text-red-600 font-bold text-center my-3'>Please register a company first, before posting a job.</p>
                        }
                    </form>
                </div>
            )
            }
        </>
    );
}

export default AddJob;
