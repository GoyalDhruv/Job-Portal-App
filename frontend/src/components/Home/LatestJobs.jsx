import React from 'react';
import LatestJobCard from './LatestJobCard';

const randomJobs = [1, 2, 3, 4, 5, 6, 7, 8];
function LatestJobs() {
  return (
    <div className='max-w-7xl mx-auto my-20'>
      <h1 className='text-4xl font-bold'>
        <span className="text-[#F83002]">Latest & Top </span>
        Job Openings
      </h1>

      <div className='grid grid-cols-3 gap-4 my-5'>
        {
          randomJobs.slice(0, 6).map((item, index) => (
            <LatestJobCard key={index} jobId={item} />
          ))
        }
      </div>
    </div>
  );
}

export default LatestJobs;
