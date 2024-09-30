import React from 'react'
import { Button } from '../ui/button'
import { Bookmark } from 'lucide-react'
import { Avatar, AvatarImage } from '../ui/avatar'
import { Badge } from '../ui/badge'
import { useNavigate } from 'react-router-dom'

function Job() {

    const navigate = useNavigate()

    return (
        <div className='p-5 rounded-md shadow-lg bg-white border-gray-100 hover:shadow-xl'>
            <div className='flex items-center justify-between'>
                <p className='text-sm text-gray-500'>2 days ago</p>
                <Button variant='outline' className="rounded-full" size='icon'><Bookmark /></Button>
            </div>
            <div className='flex items-center gap-2 my-2'>
                <Button className='p-6' variant='outline' size='icon'>
                    <Avatar>
                        <AvatarImage src='https://st3.depositphotos.com/43745012/44906/i/450/depositphotos_449066958-stock-photo-financial-accounting-logo-financial-logo.jpg' />
                    </Avatar>
                </Button>
                <div>
                    <h1 className='font-medium text-lg'>Company Name</h1>
                    <p className='text-sm text-gray-500'>USA</p>
                </div>
            </div>
            <div>
                <h1 className='font-bold text-lg my-2'>Title</h1>
                <p className='text-sm text-gray-600'>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Non facilis quas ipsam! Ipsa, eos laboriosam.</p>
            </div>

            <div className='flex items-center gap-2 mt-4'>
                <Badge variant='ghost' className={'text-blue-700 font-bold'}>12 Postions</Badge>
                <Badge variant='ghost' className={'text-[#F83002] font-bold'}>Part Time</Badge>
                <Badge variant='ghost' className={'text-[#7209b7] font-bold'}>10 LPA</Badge>
            </div>

            <div className='flex item-center gap-4 mt-4'>
                <Button
                    variant='outline'
                    onClick={() => navigate('/jobs/description/123')}
                >Details</Button>
                <Button>Save For Later</Button>

            </div>
        </div>
    )
}

export default Job