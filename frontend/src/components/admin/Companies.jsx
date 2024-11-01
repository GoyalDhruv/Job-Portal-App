import React, { useEffect, useState, useCallback } from 'react';
import Navbar from '../shared/Navbar';
import { Input } from '../ui/input';
import { Button } from '../ui/button';
import CompaniesTable from './CompaniesTable';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';
import { getCompanies } from '@/utils/CompanyApiService';
import { RotateLoader } from 'react-spinners';
import debounce from 'lodash.debounce';

function Companies() {
    const [loading, setLoading] = useState(false);
    const [companies, setCompanies] = useState([]);
    const [filteredCompanies, setFilteredCompanies] = useState([]);
    const [search, setSearch] = useState('');
    const navigate = useNavigate();

    const fetchData = async () => {
        setLoading(true);
        try {
            const res = await getCompanies();
            const companyData = res?.data?.companies || [];
            setCompanies(companyData);
            setFilteredCompanies(companyData);
        } catch (error) {
            toast.error('Failed to load companies data.');
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
                setFilteredCompanies(companies);
            } else {
                setFilteredCompanies(
                    companies.filter((company) =>
                        company?.name.toLowerCase().includes(searchTerm.toLowerCase())
                    )
                );
            }
        }, 300);

        debouncedFilter(search);

        return () => {
            debouncedFilter.cancel();
        };
    }, [search, companies]);


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
                        <Button onClick={() => navigate('/admin/company/add')}>New Company</Button>
                    </div>
                    <div>
                        {filteredCompanies.length ? (
                            <CompaniesTable companies={filteredCompanies} />
                        ) : (
                            <p className="text-center text-gray-500">No companies found.</p>
                        )}
                    </div>
                </div>
            )}
        </>
    );
}

export default Companies;
