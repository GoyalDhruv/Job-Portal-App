import api from './api';
import { JOB_API_END_POINT } from './constant';

export const getAllJobs = async () => {
    const res = await api.get(`${JOB_API_END_POINT}/get`);
    return res;
};

export const getJobById = async (jobId) => {
    const res = await api.get(`${JOB_API_END_POINT}/get/${jobId}`);
    return res;
};