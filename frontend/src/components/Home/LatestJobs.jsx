import React from 'react';
import LatestJobCard from './LatestJobCard';
import PropTypes from 'prop-types';
// import { useSelector } from 'react-redux';

// const randomJobs = [1, 2, 3, 4, 5, 6, 7, 8];
function LatestJobs({ jobs }) {

  // const jobs = useSelector(state => state.job.allJobs)

  return (
    <div className='max-w-7xl mx-auto my-20 min-h-screen'>
      <h1 className='text-4xl font-bold pb-3'>
        <span className="text-[#F83002]">Latest & Top </span>
        Job Openings
      </h1>

      <div className='grid grid-cols-3 gap-4 my-5'>
        {
          jobs?.length > 0 ? jobs?.slice(0, 6).map((job) => (
            <LatestJobCard key={job?._id} id={job?._id} job={job} />
          )) :
            <span className="text-center text-gray-600">No Job Available</span>
        }
      </div>
    </div>
  );
}
LatestJobs.propTypes = {
  jobs: PropTypes.array
}

export default LatestJobs;
