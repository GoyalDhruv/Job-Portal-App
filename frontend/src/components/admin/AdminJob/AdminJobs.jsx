import React, { useEffect, useState } from 'react';
import Navbar from '../../shared/Navbar';
import { Input } from '../../ui/input';
import { Button } from '../../ui/button';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';
import { RotateLoader } from 'react-spinners';
import debounce from 'lodash.debounce';
import AdminJobsTable from './AdminJobsTable';
import { getAdminJob } from '@/utils/JobApiService';

function AdminJobs() {
  const [loading, setLoading] = useState(false);
  const [jobs, setJobs] = useState([]);
  const [filteredjobs, setFilteredJobs] = useState([]);
  const [search, setSearch] = useState('');
  const navigate = useNavigate();

  const fetchData = async () => {
    setLoading(true);
    try {
      const res = await getAdminJob();
      const jobData = res?.data?.jobs || [];
      setJobs(jobData);
      setFilteredJobs(jobData);
    } catch (error) {
      toast.error('Failed to load jobs data.');
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    const debouncedFilter = debounce((searchTerm) => {
      if (!searchTerm) {
        setFilteredJobs(jobs);
      } else {
        setFilteredJobs(jobs.filter((job) => job?.company?.name?.toLowerCase().includes(searchTerm.toLowerCase())));
      }
    }, 300);

    debouncedFilter(search);

    return () => {
      debouncedFilter.cancel();
    };
  }, [search, jobs]);

  return (
    <>
      <Navbar />
      {loading ? (
        <div className="flex justify-center items-center h-screen">
          <RotateLoader color="#F83002" />
        </div>
      ) : (
        <div className="max-w-6xl mx-auto my-10">
          <div className="flex items-center justify-between my-5">
            <Input
              className="w-fit"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Filter by name"
            />
            <Button onClick={() => navigate('/admin/job/add')}>New Jobs</Button>
          </div>
          <div>
            {filteredjobs.length ? (
              <AdminJobsTable jobs={filteredjobs} />
            ) : (
              <p className="text-center text-gray-500">No jobs found.</p>
            )}
          </div>
        </div>
      )}
    </>
  );
}

export default AdminJobs;
