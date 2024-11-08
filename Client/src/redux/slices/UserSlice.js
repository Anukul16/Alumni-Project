import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    profile:[],
    experience:[],
<<<<<<< HEAD
    user:{},
    isLoggedin:null
=======
    user:{}
>>>>>>> ed26c6ce063822502e3b3afb247fbb261a62a7f6
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
<<<<<<< HEAD
        },
        updateLoginStatus(state,action){
            state.isLoggedin=action.payload
            console.log("Reduxlogin: ",state.isLoggedin);
=======
            console.log("After redux: ",state.user);
            
>>>>>>> ed26c6ce063822502e3b3afb247fbb261a62a7f6
        }
    }
})

export const {
    updateProfileDetails,
    updateExperience,
<<<<<<< HEAD
    updateUserDetails,
    updateLoginStatus
=======
    updateUserDetails
>>>>>>> ed26c6ce063822502e3b3afb247fbb261a62a7f6
} = userSlice.actions;
export default userSlice.reducer;