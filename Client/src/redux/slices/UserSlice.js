import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    profile:[],
    experience:[],
    user:[]
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
        }
    }
})

export const {
    updateProfileDetails,
    updateExperience
} = userSlice.actions;
export default userSlice.reducer;