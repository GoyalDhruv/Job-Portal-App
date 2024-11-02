import api from './api';
import { APPLICATION_API_END_POINT } from './constant';

export const getApplicants = async (applicationId) => {
    const res = await api.get(`${APPLICATION_API_END_POINT}/${applicationId}/applicants`);
    return res;
};

export const applyForJob = async (jobId) => {
    const res = await api.post(`${APPLICATION_API_END_POINT}/apply/${jobId}`);
    return res;
}

export const updateStatus = async (jobId, data) => {
    const res = await api.put(`${APPLICATION_API_END_POINT}/status/${jobId}/update`, data);
    return res;
}

export const getAppliedJobs = async () => {
    const res = await api.get(`${APPLICATION_API_END_POINT}/get`);
    return res;
}
