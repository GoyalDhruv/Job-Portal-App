import api from './api';
import { USER_API_END_POINT } from './constant';

export const registerUser = async (formData) => {
    const res = await api.post(`${USER_API_END_POINT}/register`, formData, {
        headers: {
            'Content-Type': 'multipart/form-data',
        },
    });
    return res;
};

export const loginUser = async (formData) => {
    const res = await api.post(`${USER_API_END_POINT}/login`, formData,
        {
            headers: {
                "Content-Type": "application/json"
            },
            withCredentials: true,
        })
    return res;
}

export const logoutUser = async () => {
    const res = await api.post(`${USER_API_END_POINT}/logout`, {},
        {
            withCredentials: true,
        }
    );
    return res;
}

export const updateUser = async (formData) => {
    const res = await api.put(`${USER_API_END_POINT}/profile/update`, formData,
        {
            headers: {
                "Content-Type": 'multipart/form-data',
            },
            withCredentials: true,
        }
    )
    return res
}

export const changePassword = async (formData) => {
    const res = await api.post(`${USER_API_END_POINT}/changePassword`, formData,
        {
            headers: {
                "Content-Type": "application/json",
            },
            withCredentials: true,
        }
    )
    return res
}

export const saveJobs = async (id) => {
    const res = await api.post(`${USER_API_END_POINT}/bookmark`, id, {
        headers: {
            "Content-Type": 'application/json',
        },
        withCredentials: true,
    })
    return res
}

export const getBookmarkedJobs = async () => {
    const res = await api.get(`${USER_API_END_POINT}/getBookmark`)
    return res;
}