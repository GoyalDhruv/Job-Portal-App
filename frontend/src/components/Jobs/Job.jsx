import React from 'react'
import { Button } from '../ui/button'
import { Bookmark } from 'lucide-react'
import Proptypes from 'prop-types'
import { Avatar, AvatarImage } from '../ui/avatar'
import { Badge } from '../ui/badge'
import { useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { toast } from 'sonner'

function Job({ job }) {
    const navigate = useNavigate()
    const user = useSelector(state => state.auth.user)

    const handleClick = () => {
        if (user) {
            navigate(`/jobs/description/${job?._id}`);
        } else {
            toast.error('Please log in to view job details.');
            navigate(`/login`);
        }
    };

    function PostedDate(string) {
        const date = new Date(string);
        const currentDate = new Date();
        const postedDate = currentDate - date
        const daysDifference = Math.floor(postedDate / (1000 * 60 * 60 * 24));
        if (daysDifference < 1) {
            return 'Just now';
        }
        else if (daysDifference == 1) {
            return `${daysDifference} day ago`
        }
        return `${daysDifference} days ago`;
    }


    return (
        <div className='p-5 rounded-md shadow-lg bg-white border-gray-100 hover:shadow-xl'>
            <div className='flex items-center justify-between'>
                <p className='text-sm text-gray-500'>{job?.updatedAt ? PostedDate(job?.updatedAt) : ""}</p>
                <Button variant='outline' className="rounded-full" size='icon'><Bookmark /></Button>
            </div>
            <div className='flex items-center gap-2 my-2'>
                <Button className='p-6' variant='outline' size='icon'>
                    <Avatar>
                        <AvatarImage src='https://st3.depositphotos.com/43745012/44906/i/450/depositphotos_449066958-stock-photo-financial-accounting-logo-financial-logo.jpg' />
                    </Avatar>
                </Button>
                <div>
                    <h1 className='font-medium text-lg'>{job?.company?.name}</h1>
                    <p className='text-sm text-gray-500'>{job?.location}</p>
                </div>
            </div>
            <div>
                <h1 className='font-bold text-lg my-2'>{job?.title}</h1>
                <p className='text-sm text-gray-600'>{job?.description}</p>
            </div>

            <div className='flex items-center gap-2 mt-4'>
                <Badge variant='ghost' className={'text-blue-700 font-bold'}>{job?.position} Postions</Badge>
                <Badge variant='ghost' className={'text-[#F83002] font-bold'}>{job?.jobType}</Badge>
                <Badge variant='ghost' className={'text-[#7209b7] font-bold'}>{job?.salary} LPA</Badge>
            </div>

            <div className='flex item-center gap-4 mt-4'>
                <Button
                    variant='outline'
                    onClick={handleClick}
                >Details</Button>
                <Button>Save For Later</Button>

            </div>
        </div>
    )
}

Job.propTypes = {
    job: Proptypes.object.isRequired
};

export default Job