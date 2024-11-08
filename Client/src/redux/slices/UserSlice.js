import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    profile:[],
    experience:[],
    user:{},
    isLoggedin:null
}

const userSlice = createSlice({
    name:'user_slice',
    initialState,
    reducers:{
        updateProfileDetails(state,action){
            state.profile=action.payload
        },
        updateExperience(state,action){
            state.experience=action.payload
        },
        updateUserDetails(state,action){
            state.user=action.payload
        },
        updateLoginStatus(state,action){
            state.isLoggedin=action.payload
            console.log("Reduxlogin: ",state.isLoggedin);
        }
    }
})

export const {
    updateProfileDetails,
    updateExperience,
    updateUserDetails,
    updateLoginStatus
} = userSlice.actions;
export default userSlice.reducer;