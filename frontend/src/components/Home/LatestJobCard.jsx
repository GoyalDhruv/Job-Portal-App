import React from 'react'
import { Badge } from '../ui/badge'

function LatestJobCard() {
    return (
        <div className='p-5 rounded-md shadow-lg bg-white border-gray-100 cursor-pointer hover:shadow-xl'>
            <div>
                <h1 className='font-medium text-lg'>Company Name</h1>
                <p className='text-sm text-gray-500'>USA</p>
            </div>
            <div>
                <h1 className='font-bold text-lg my-2'>Job Title</h1>
                <p className='text-sm text-gray-600'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Harum, minus eos. </p>
            </div>
            <div className='flex items-center gap-2 mt-4'>
                <Badge variant='ghost' className={'text-blue-700 font-bold'}>12 Postions</Badge>
                <Badge variant='ghost' className={'text-[#F83002] font-bold'}>Part Time</Badge>
                <Badge variant='ghost' className={'text-[#7209b7] font-bold'}>10 LPA</Badge>
            </div>
        </div>
    )
}

export default LatestJobCard