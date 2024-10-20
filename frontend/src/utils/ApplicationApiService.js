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
