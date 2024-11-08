import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    profile:[],
    experience:[],
    user:{}
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
            console.log("After redux: ",state.user);
            
        }
    }
})

export const {
    updateProfileDetails,
    updateExperience,
    updateUserDetails
} = userSlice.actions;
export default userSlice.reducer;