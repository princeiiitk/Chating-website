import { configureStore } from "@reduxjs/toolkit";
import activeUserSlice from "./Slice/Activeuser";
import chatsSlice from "./Slice/Chat";
import profileSlice from "./Slice/Profile";
import searchSlice from "./Slice/Search";
const store = configureStore({
    reducer: {
        activeUser: activeUserSlice,
        profile: profileSlice,
        search: searchSlice,
        chats: chatsSlice,
    },
});
export default store;