import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { searchUsers, validUser } from '../Api/Auth.js';
import { setActiveUser } from '../Slice/Activeuser.js';
import { RiNotificationBadgeFill } from "react-icons/ri";
import { BsSearch } from "react-icons/bs";
import { BiNotification } from "react-icons/bi";
import { IoIosArrowDown } from "react-icons/io";
import { setShowNotifications, setShowProfile } from '../Slice/Profile.js';
import Chat from './Chatpage.jsx';
import Profile from "../Component/Profile.jsx";
import { accessCreate } from "../Api/Chat.js";
import { fetchChats, setNotifications } from '../Slice/Chat.js';
import { getSender } from '../Utiles/Logic.js';
import { setActiveChat } from '../Slice/Chat.js';
import Group from '../Component/Group.jsx';
import Contacts from '../Component/Contacts';
import NotificationBadge from 'react-notification-badge';
import Search from '../Component/Search.jsx';
import { Effect } from "react-notification-badge";

function Home() {
    const dispatch = useDispatch();
    const { showProfile, showNotifications } = useSelector(state => state.profile);
    const { notifications } = useSelector(state => state.chats);
    const activeUser = useSelector(state => state.activeUser);

    const [searchResults, setSearchResults] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [search, setSearch] = useState("");

    const handleSearchInput = (e) => {
        setSearch(e.target.value);
    };

    const handleUserClick = async (user) => {
        await accessCreate({ userId: user._id });
        dispatch(fetchChats());
        setSearch("");
    };

    useEffect(() => {
        const fetchSearchResults = async () => {
            if (search.trim()) {
                setIsLoading(true);
                try {
                    const { data } = await searchUsers(search);
                    setSearchResults(data);
                } catch (error) {
                    console.error("Error fetching search results:", error);
                } finally {
                    setIsLoading(false);
                }
            } else {
                setSearchResults([]);
            }
        };

        const debounceTimer = setTimeout(fetchSearchResults, 300);
        return () => clearTimeout(debounceTimer);
    }, [search]);

    useEffect(() => {
        const validateUser = async () => {
            try {
                const data = await validUser();
                const user = {
                    id: data?.user?._id,
                    email: data?.user?.email,
                    profilePic: data?.user?.profilePic,
                    bio: data?.user?.bio,
                    name: data?.user?.name,
                };
                dispatch(setActiveUser({ user }));
            } catch (error) {
                console.error("Error validating user:", error);

            }
        };
        validateUser();
    }, [dispatch]);

    return (
        <div className="bg-[#181A1B] scrollbar-hide z-10 h-[100vh] lg:w-[90%] lg:mx-auto overflow-y-hidden shadow-2xl">
            <div className="flex">
                {!showProfile ? (
                    <div className="md:flex md:flex-col min-w-[360px] h-[100vh] md:h-[98.6vh] bg-[#1F2023] relative">
                        <div className='h-[61px] px-4'>
                            <div className='flex'>
                                <a className='flex items-center relative -top-4 h-[90px]' href='/'>
                                    <h3 className='text-[20px] text-[#E1E1E1] font-body font-extrabold tracking-wider'>Messages</h3>
                                </a>
                            </div>
                            <div className='absolute top-4 right-5 flex items-center gap-x-3'>
                                <button onClick={() => dispatch(setShowNotifications(!showNotifications))}>
                                    <NotificationBadge
                                        count={notifications.length}
                                        effect={Effect.SCALE}
                                        style={{ width: "15px", height: "15px", fontSize: "9px", padding: "4px 2px 2px 2px" }}
                                    />
                                    {showNotifications ? (
                                        <RiNotificationBadgeFill style={{ width: "25px", height: "25px", color: "#3DDC84" }} />
                                    ) : (
                                        <BiNotification style={{ color: "#3DDC84", width: "25px", height: "25px" }} />
                                    )}
                                </button>
                                <div className={`${showNotifications ? "overflow-y-scroll scrollbar-hide tracking-wide absolute top-10 -left-32 z-10 w-[240px] bg-[#2C2F32] px-4 py-2 shadow-2xl" : "hidden"}`}>
                                    <div className='text-[13px] text-[#E1E1E1]'>
                                        {!notifications.length && "No new messages"}
                                    </div>
                                    {notifications.map((notification, index) => (
                                        <div
                                            key={index}
                                            onClick={() => {
                                                dispatch(setActiveChat(notification.chatId));
                                                dispatch(setNotifications(notifications.filter(data => data !== notification)));
                                            }}
                                            className='text-[12.5px] text-[#E1E1E1] px-2 cursor-pointer'>
                                            {notification.chatId.isGroup ? `New Message in ${notification.chatId.chatName}` : `New Message from ${getSender(activeUser, notification.chatId.users)}`}
                                        </div>
                                    ))}
                                </div>
                                <button onClick={() => dispatch(setShowProfile(true))} className='flex items-center gap-x-1 relative'>
                                    <img className='w-[28px] h-[28px] rounded-[25px]' src={activeUser?.profilePic} alt="Profile" />
                                    <IoIosArrowDown style={{ color: "#AAB8B8", height: "14px", width: "14px" }} />
                                </button>
                            </div>
                        </div>

                        <div>
                            <div className='-mt-6 relative pt-6 px-4'>
                                <form onSubmit={(e) => e.preventDefault()}>
                                    <input
                                        onChange={handleSearchInput}
                                        className='w-[99.5%] bg-[#3E4245] text-[#E1E1E1] tracking-wider pl-9 py-[8px] rounded-[9px] outline-0'
                                        type="text"
                                        name="search"
                                        placeholder="Search" />
                                </form>
                                <div className='absolute top-[36px] left-[27px]'>
                                    <BsSearch style={{ color: "#C4C4C5" }} />
                                </div>
                                <Group />

                                <div style={{ display: search ? "" : "none" }} className='h-[100vh] absolute z-10 w-[100%] left-[0px] top-[70px] bg-[#2C2F32] flex flex-col gap-y-3 pt-3 px-4'>
                                    <Search searchResults={searchResults} isLoading={isLoading} handleClick={handleUserClick} search={search} />
                                </div>
                            </div>
                            <Contacts />
                        </div>
                    </div>
                ) : (
                    <Profile className="min-w-[100%] sm:min-w-[360px] h-[100vh] bg-[#fafafa] shadow-xl relative" />
                )}
                <Chat className="chat-page relative lg:w-[100%] h-[100vh] bg-[#fafafa]" />
            </div>
        </div>
    );
}

export default Home;
