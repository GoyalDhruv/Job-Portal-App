import React, { useState } from 'react';
import { RadioGroup, RadioGroupItem } from '../ui/radio-group';
import { Label } from '../ui/label';
import PropTypes from 'prop-types';
import { Button } from '../ui/button';
import { ListFilter } from 'lucide-react';

const data = [
    {
        filterType: 'Location',
        array: ['Delhi', 'Hyderabad', 'Pune', 'Bangalore', 'Mumbai']
    },
    {
        filterType: 'Industry',
        array: ['Frontend Developer', 'Backend Developer', 'Full Stack Developer']
    },
    {
        filterType: 'Salary',
        array: ['0 to 40k', '40k to 1lakh', '1lakh to 5lakh']
    }
];

function FilterCard({ setFilterData }) {
    const [selectedFilters, setSelectedFilters] = useState({});

    const handleFilterChange = (type, value) => {
        setSelectedFilters(prev => ({ ...prev, [type]: value }));
    };

    const applyFilters = () => {
        setFilterData(selectedFilters);
    };

    return (
        <div className='w-full bg-white p-3 rounded-md'>
            <div className='flex mt-3 items-center justify-between'>
                <h1 className='font-bold text-lg'>Filter Jobs</h1>
                <Button onClick={applyFilters} className='flex gap-2 items-center' disabled={Object.keys(selectedFilters).length === 0}>
                    <ListFilter />
                    Filter
                </Button>
            </div>
            <hr className='mt-3' />
            <>
                {data.map((item, index) => (
                    <div key={index}>
                        <h1 className='font-bold text-lg my-2'>{item.filterType}</h1>
                        <RadioGroup
                            onValueChange={(value) => handleFilterChange(item.filterType.toLowerCase(), value)}
                        >
                            {item.array.map((i, idx) => (
                                <div key={idx} className='flex items-center space-x-2'>
                                    <RadioGroupItem value={i} />
                                    <Label>{i}</Label>
                                </div>
                            ))}
                        </RadioGroup>
                    </div>
                ))}
            </>
        </div>
    );
}

FilterCard.propTypes = {
    setFilterData: PropTypes.func.isRequired,
};

export default FilterCard;
