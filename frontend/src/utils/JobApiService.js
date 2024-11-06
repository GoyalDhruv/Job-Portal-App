import api from './api';
import { JOB_API_END_POINT } from './constant';

export const getAllJobs = async (query) => {
    const { location, industry, search } = query;

    const params = new URLSearchParams();
    if (location) params.append("location", location);
    if (industry) params.append("industry", industry);
    if (search) params.append("search", search);

    const url = `${JOB_API_END_POINT}/get?${params.toString()}`;

    const res = await api.get(url);
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