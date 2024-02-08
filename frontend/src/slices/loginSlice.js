import {createSlice} from '@reduxjs/toolkit'

const  initialState ={
    userInfo: localStorage.getItem('userInfo') ? JSON.parse(localStorage.getItem('userInfo')) : null,
}

const loginSlice = createSlice({
    name: 'login',
    initialState,
    reducers:{
        setCredentials:(state, action) => {
            state.userInfo = action.payload;
            localStorage.setItem("userInfo",JSON.stringify(action.payload))
        }
    }
});

export const { setCredentials } = loginSlice.actions;

// The value we returned from `createSlice` is a "slice" of the Redux store.

export default loginSlice.reducer
