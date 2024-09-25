import React from 'react'
import { RadioGroup, RadioGroupItem } from '../ui/radio-group'
import { Label } from '../ui/label'

const filterData = [
    {
        filterType: 'Location',
        array: ['Delhi', 'Hydrabad', 'Pune', 'Bangalore', 'Mumbai']
    }, {
        filterType: 'Industry',
        array: ['Frontend Developer', 'Backend Developer', 'Fullstack Developer']
    }, {
        filterType: 'Salary',
        array: ['0 to 40k', '40k to 1lakh', '1lakh to 5lakh']
    }
]

function FilterCard() {
    return (
        <div className='w-full bg-white p-3 rounded-md'>
            <h1 className='font-bold text-lg'>Filter Jobs</h1>
            <hr className='mt-3' />
            <RadioGroup>
                {filterData.map((item, index) => (
                    <div key={index}>
                        <h1 className='font-bold text-lg'>{item.filterType}</h1>
                        {
                            item.array.map((i, index) => (
                                <div key={index} className='flex item-center space-x-2 my-2'>
                                    <RadioGroupItem value={i} />
                                    <Label>{i}</Label>
                                </div>
                            ))
                        }
                    </div>
                ))}
            </RadioGroup>
        </div>
    )
}

export default FilterCard