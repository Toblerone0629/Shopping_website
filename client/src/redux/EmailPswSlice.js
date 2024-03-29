import { createSlice } from '@reduxjs/toolkit';


export const EmailPswSlice = createSlice({
    name: 'auth',
    initialState: {
        email: '',
        password: ''
    },
    reducers: {
        setEmail: (state, action) => {
            state.email = action.payload;
        },
        setPassword: (state, action) => {
            state.password = action.payload;
        },
    },
});

export const { setEmail, setPassword } = EmailPswSlice.actions;

export default EmailPswSlice.reducer;