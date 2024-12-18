import React from 'react'
import { Badge } from '../ui/badge'
import PropTypes from 'prop-types';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { toast } from 'sonner';

function LatestJobCard({ id, job }) {
    const navigate = useNavigate()
    const user = useSelector(state => state.auth.user)

    const handleClick = () => {
        if (user) {
            navigate(`/jobs/description/${id}`);
        } else {
            toast.error('Please log in to view job details.');
            navigate(`/login`);
        }
    };

    return (
        <div className='p-5 rounded-md shadow-lg bg-white border-gray-100 cursor-pointer hover:shadow-xl'
            onClick={handleClick}
        >
            <div>
                <h1 className='font-medium text-lg'>{job?.company?.name}</h1>
                <p className='text-sm text-gray-500'>{job?.location}</p>
            </div>
            <div>
                <h1 className='font-bold text-lg my-2'>{job?.title}</h1>
                <p className='text-sm text-gray-600'>{job?.description} </p>
            </div>
            <div className='flex items-center gap-2 mt-4'>
                <Badge variant='ghost' className={'text-blue-700 font-bold'}>{job?.position} Postions</Badge>
                <Badge variant='ghost' className={'text-[#F83002] font-bold'}>{job?.jobType}</Badge>
                <Badge variant='ghost' className={'text-[#7209b7] font-bold'}>{job?.salary} LPA</Badge>
            </div>
        </div>
    )
}
LatestJobCard.propTypes = {
    id: PropTypes.string.isRequired,
    job: PropTypes.object.isRequired
};

export default LatestJobCard