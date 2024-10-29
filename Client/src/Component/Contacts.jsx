import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { setActiveChat, fetchChats } from '../Slice/Chat.js';
import { getChatName, getChatPhoto, timeSince } from '../Utiles/Logic.js';
import NoContacts from './NoContact';

const aDay = 24 * 60 * 60 * 1000;

function Contacts() {
    const { chats, activeChat } = useSelector((state) => state.chats);
    const dispatch = useDispatch();
    const activeUser = useSelector((state) => state.activeUser);

    useEffect(() => {
        dispatch(fetchChats());
    }, [dispatch]);

    return (
        <div className='flex flex-col space-y-2 overflow-y-scroll scrollbar-hide h-[87vh] pb-10'>
            {Array.isArray(chats) && chats.length > 0 ? (
                chats.map((e) => (
                    <div
                        onClick={() => dispatch(setActiveChat(e))}
                        key={e._id}
                        className={`flex items-center justify-between mt-2 rounded-lg shadow-md transform transition duration-200 hover:scale-105 cursor-pointer py-4 px-3 ${activeChat._id === e._id ? "bg-[#f5f5f5]" : "bg-white"
                            }`}
                    >
                        <div className='flex items-center gap-x-3'>
                            <img
                                className='w-12 h-12 rounded-full shadow-md object-cover'
                                src={getChatPhoto(e, activeUser)}
                                alt=""
                            />
                            <div>
                                <h5 className='text-sm sm:text-base text-gray-800 font-semibold'>
                                    {getChatName(e, activeUser)}
                                </h5>
                                <p className='text-xs sm:text-sm font-medium text-gray-600 truncate'>
                                    {e.latestMessage?.message.length > 30
                                        ? `${e.latestMessage.message.slice(0, 30)}...`
                                        : e.latestMessage?.message}
                                </p>
                            </div>
                        </div>
                        <div className='flex flex-col items-end'>
                            <p className='text-xs text-gray-400'>
                                {timeSince(new Date(Date.parse(e.updatedAt) - aDay))}
                            </p>
                        </div>
                    </div>
                ))
            ) : (
                <NoContacts />
            )}
        </div>
    );
}

export default Contacts;
