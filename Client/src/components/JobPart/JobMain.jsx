import React from 'react';
import AppliedJobs from './AppliedJobs';
import JobList from './JobList';
import JobSearch from './JobSearch';
import ResumeTips from './ResumeTips';

const JobMain = () => {
    return (
        <div>
            <JobSearch/>
            <JobList/>
            <AppliedJobs/>
            <ResumeTips/>
        </div>
    );
};

export default JobMain;