import { useState, useEffect } from 'react';
import { BsPlusLg } from "react-icons/bs";
import { Modal, Box } from "@mui/material";
import { searchUsers } from '../Api/Auth.js';
import { RxCross2 } from "react-icons/rx";
import { createGroup } from '../Api/Chat.js';
import { fetchChats } from '../Slice/Chat.js';
import { useDispatch } from 'react-redux';
import Search from './Search.jsx';

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    minWidth: 400,
    bgcolor: '#2e2e2e',  
    boxShadow: 24,
    p: 2,
    borderRadius: '8px',  
};

function Group() {
    const dispatch = useDispatch();
    const [open, setOpen] = useState(false);
    const [chatName, setChatName] = useState("");
    const [searchResults, setSearchResults] = useState([]);
    const [search, setSearch] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [selectedUsers, setSelectedUsers] = useState([]);

    const handleOpen = () => setOpen(true);
    const handleClose = () => {
        setOpen(false);
        setSearch("");
        setSelectedUsers([]);
        setChatName("");
    };

    const handleFormSearch = (e) => setSearch(e.target.value);

    const handleClick = (user) => {
        if (!selectedUsers.some((u) => u._id === user._id)) {
            setSelectedUsers((prevUsers) => [...prevUsers, user]);
        }
    };

    const deleteSelected = (user) => {
        setSelectedUsers(selectedUsers.filter((u) => u._id !== user._id));
    };

    const handleSubmit = async () => {
        if (selectedUsers.length >= 2 && chatName.trim()) {
            await createGroup({
                chatName,
                users: JSON.stringify(selectedUsers.map((user) => user._id))
            });
            dispatch(fetchChats());
            handleClose();
        }
    };

    useEffect(() => {
        const searchChange = async () => {
            if (!search) {
                setSearchResults([]);
                return;
            }
            setIsLoading(true);
            try {
                const { data } = await searchUsers(search);
                setSearchResults(data);
            } catch (error) {
                console.error("Error fetching users:", error);
            } finally {
                setIsLoading(false);
            }
        };

        const debounceTimeout = setTimeout(searchChange, 300);
        return () => clearTimeout(debounceTimeout);
    }, [search]);

    return (
        <>
            <button
                className='mt-2 flex items-center gap-1 text-sm font-medium bg-gray-800 text-white py-1 px-2 rounded-md hover:bg-gray-700 transition ease-in-out'
                onClick={handleOpen}
            >
                New Group <BsPlusLg />
            </button>
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="create-group-modal-title"
                aria-describedby="create-group-modal-description"
            >
                <Box sx={style}>
                    <h5 id="create-group-modal-title" className='text-lg text-white font-semibold text-center'>
                        Create A Group
                    </h5>
                    <form onSubmit={(e) => e.preventDefault()} className='flex flex-col gap-3 mt-3'>
                        <input
                            onChange={(e) => setChatName(e.target.value)}
                            value={chatName}
                            className="border border-gray-600 bg-gray-900 text-white text-sm py-2 px-3 rounded w-full"
                            type="text"
                            placeholder="Group Name"
                            required
                        />
                        <input
                            onChange={handleFormSearch}
                            value={search}
                            className="border border-gray-600 bg-gray-900 text-white text-sm py-2 px-3 rounded w-full"
                            type="text"
                            placeholder="Add users"
                        />
                        <div className='flex flex-wrap gap-2'>
                            {selectedUsers.map((user) => (
                                <button
                                    key={user._id}
                                    onClick={() => deleteSelected(user)}
                                    className='flex items-center gap-1 bg-green-800 text-white text-xs font-medium px-3 py-1 rounded-md border border-green-500'
                                >
                                    {user.name} <RxCross2 />
                                </button>
                            ))}
                        </div>
                        <Search
                            isLoading={isLoading}
                            handleClick={handleClick}
                            search={search}
                            searchResults={searchResults}
                        />
                        <div className='flex justify-end mt-3'>
                            <button
                                onClick={handleSubmit}
                                className='bg-blue-600 text-white text-base font-medium px-3 py-2 rounded-md hover:bg-blue-500 transition ease-in-out'
                                type='submit'
                            >
                                Create
                            </button>
                        </div>
                    </form>
                </Box>
            </Modal>
        </>
    );
}

export default Group;
