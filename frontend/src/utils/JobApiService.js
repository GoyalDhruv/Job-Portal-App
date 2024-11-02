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

export const getAdminJob = async () => {
    const res = await api.get(`${JOB_API_END_POINT}/getadminjobs`);
    return res;
}

export const createJob = async (jobData) => {
    const res = await api.post(`${JOB_API_END_POINT}/post`, jobData);
    return res;
};

export const updateJob = async (jobId, jobData) => {
    const res = await api.put(`${JOB_API_END_POINT}/update/${jobId}`, jobData);
    return res;
};