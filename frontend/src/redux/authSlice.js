import { createSlice } from '@reduxjs/toolkit';


const authSlice = createSlice({
    name: 'auth',
    initialState: {
        loading: false,
        user: JSON.parse(localStorage.getItem('user')) || null,
    },
    reducers: {
        setLoading: (state, action) => {
            state.loading = action.payload;
        },
        setUser: (state, action) => {
            localStorage.setItem('user', JSON.stringify(action.payload));
            state.user = action.payload;
        },
        clearUser: (state) => {
            localStorage.removeItem('user');
            state.user = null;
        },
    },
});

export const { setLoading, setUser, clearUser } = authSlice.actions;


export default authSlice.reducer;
