import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Model from '../Component/Model';
import { BsEmojiSmile, BsFillEmojiSmileFill } from "react-icons/bs";
import { fetchMessages, sendMessage } from '../Api/Msg.js';
import MessageHistory from '../Component/MsgHistory.jsx';
import io from "socket.io-client";
import { fetchChats, setNotifications } from '../Slice/Chat.js';
import Loading from '../Component/Loading.jsx';
import data from '@emoji-mart/data';
import Picker from '@emoji-mart/react';
import { getChatName } from '../Utiles/Logic.js';
import Typing from '../Component/Typing.jsx';

const ENDPOINT = process.env.VITE_SERVER_URL;
let socket, selectedChatCompare;

export default function Chatpage(props) {
    const { activeChat, notifications } = useSelector((state) => state.chats);
    const dispatch = useDispatch();
    const [message, setMessage] = useState("");
    const [messages, setMessages] = useState([]);
    const [socketConnected, setSocketConnected] = useState(false);
    const [typing, setTyping] = useState(false);
    const [isTyping, setIsTyping] = useState(false);
    const [loading, setLoading] = useState(false);
    const [showPicker, setShowPicker] = useState(false);
    const activeUser = useSelector((state) => state.activeUser);
    console.log("Active User:", activeUser);

    const keyDownFunction = async (e) => {
        if ((e.key === "Enter" || e.type === "click") && message) {
            setMessage("");
            socket.emit("stop typing", activeChat._id);
            try {
                const data = await sendMessage({ chatId: activeChat._id, message });
                socket.emit("new message", data);
                setMessages((prevMessages) => [...prevMessages, data]);
                dispatch(fetchChats());
            } catch (error) {
                console.error("Error sending message:", error);
            }
        }
    };

    useEffect(() => {
        socket = io(ENDPOINT);
        socket.on("typing", () => setIsTyping(true));
        socket.on("stop typing", () => setIsTyping(false));

        return () => {
            socket.disconnect();
        };
    }, []);

    useEffect(() => {
        socket.emit("setup", activeUser);
        socket.on("connected", () => {
            setSocketConnected(true);
        });
    }, [activeUser]);

    useEffect(() => {
        const fetchMessagesFunc = async () => {
            if (activeChat) {
                setLoading(true);
                try {
                    const data = await fetchMessages(activeChat._id);
                    setMessages(data);
                    socket.emit("join room", activeChat._id);
                } catch (error) {
                    console.error("Error fetching messages:", error);
                } finally {
                    setLoading(false);
                }
            }
            selectedChatCompare = activeChat;
        };
        fetchMessagesFunc();
    }, [activeChat]);

    useEffect(() => {
        socket.on("message received", (newMessageReceived) => {
            if ((!selectedChatCompare || selectedChatCompare._id) !== newMessageReceived.chatId._id) {
                if (!notifications.includes(newMessageReceived)) {
                    dispatch(setNotifications([newMessageReceived, ...notifications]));
                }
            } else {
                setMessages((prevMessages) => [...prevMessages, newMessageReceived]);
            }
            dispatch(fetchChats());
        });
    }, [notifications, dispatch]);

    if (loading) {
        return (
            <div className={`${props.className} flex justify-center items-center h-full`}>
                <Loading />
            </div>
        );
    }

    return (
        <>
            {activeChat ? (
                <div className={`${props.className} flex flex-col h-full`}>
                    <div className='flex justify-between items-center bg-white p-4 shadow'>
                        <div className='flex items-center gap-2'>
                            <h5 className='text-lg font-bold text-gray-800'>{getChatName(activeChat, activeUser)}</h5>
                        </div>
                        <Model />
                    </div>
                    <div className='flex-grow overflow-y-auto p-4 scrollbar-hide'>
                        <MessageHistory typing={isTyping} messages={messages} />
                        {isTyping && <Typing width="100" height="100" />}
                    </div>
                    <div className='p-4'>
                        {showPicker && <Picker data={data} onEmojiSelect={(e) => setMessage((prev) => prev + e.native)} />}
                        <div className='border border-gray-300 rounded-t-lg'>
                            <form onKeyDown={keyDownFunction} onSubmit={(e) => e.preventDefault()} className='flex'>
                                <input
                                    onChange={(e) => {
                                        setMessage(e.target.value);
                                        if (!socketConnected) return;
                                        if (!typing) {
                                            setTyping(true);
                                            socket.emit('typing', activeChat._id);
                                        }
                                        const lastTime = new Date().getTime();
                                        const time = 3000;
                                        setTimeout(() => {
                                            const timeNow = new Date().getTime();
                                            const timeDiff = timeNow - lastTime;
                                            if (timeDiff >= time && typing) {
                                                socket.emit("stop typing", activeChat._id);
                                                setTyping(false);
                                            }
                                        }, time);
                                    }}
                                    className='flex-grow focus:outline-none border-b border-gray-300 p-2'
                                    type="text"
                                    name="message"
                                    placeholder="Enter message"
                                    value={message}
                                />
                                <button onClick={keyDownFunction} className='bg-gray-200 border border-gray-300 text-sm px-3 py-2 rounded-lg ml-2'>Send</button>
                            </form>
                        </div>
                        <div className='flex justify-end'>
                            <button onClick={() => setShowPicker(!showPicker)} className='mt-2'>
                                {showPicker ? <BsFillEmojiSmileFill className='text-yellow-500' /> : <BsEmojiSmile />}
                            </button>
                        </div>
                    </div>
                </div>
            ) : (
                <div className={props.className}>
                    <div className='flex flex-col items-center justify-center h-full'>
                        <img className='w-12 h-12 rounded-full' alt="User profile" src={activeUser.profilePic} />
                        <h3 className='text-lg font-medium mt-2'>Welcome <span className='font-bold text-green-600'>{activeUser.name}</span></h3>
                    </div>
                </div>
            )}
        </>
    );
}
