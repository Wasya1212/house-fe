import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    user: {}
};

export const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        successLogin(state, action) {
            console.log(state)
            console.log(action.payload)
            state.user = action.payload;
        }
    }
});

export const { successLogin } = userSlice.actions;
export default userSlice.reducer;