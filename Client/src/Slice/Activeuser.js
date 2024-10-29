import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    id: '',
    email: '',
    profilePic: '',
    bio: '',
    name: '',
};

const activeUserSlice = createSlice({
    name: 'activeUser',
    initialState,
    reducers: {
        setActiveUser: (state, { payload }) => {
           
            state.id = payload.user.id;
            state.email = payload.user.email ;
            state.profilePic = payload.user.profilePic ;
            state.bio = payload.user.bio ;
            state.name = payload.user.name;
        },
        setUserNameAndBio: (state, { payload }) => {
            console.log("bio",payload)
            state.name = payload.name || state.name; 
            state.bio = payload.bio || state.bio;  
        },
    },
});

export const { setActiveUser, setUserNameAndBio } = activeUserSlice.actions;
export default activeUserSlice.reducer;
