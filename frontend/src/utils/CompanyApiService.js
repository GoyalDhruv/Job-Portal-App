import api from './api';
import { COMPANY_API_END_POINT } from './constant';

export const addCompany = async (data) => {
    const res = await api.post(`${COMPANY_API_END_POINT}/register`, data,
        {
            headers: {
                'Content-Type': 'multipart/form-data',
            }
        }
    );
    return res
}

export const getCompanies = async () => {
    const res = await api.get(`${COMPANY_API_END_POINT}/get`);
    return res;
}

export const getCompanyById = async (id) => {
    const res = await api.get(`${COMPANY_API_END_POINT}/get/${id}`);
    return res;
}

export const updateCompany = async (id, data) => {
    const res = await api.put(`${COMPANY_API_END_POINT}/update/${id}`, data,
        {
            headers: {
                'Content-Type': 'multipart/form-data',
            }
        }
    );
    return res;
}