import React, { useState } from 'react';
import { IoArrowBack } from "react-icons/io5";
import { useDispatch, useSelector } from 'react-redux';
import { setShowProfile } from '../Slice/Profile.js';
import { IoMdLogOut } from "react-icons/io";
import InputEdit from '../Component/Profile/Profile';
import { updateUser } from '../Api/Auth.js';
import { toast } from 'react-toastify';
import { setUserNameAndBio } from '../Slice/Activeuser.js';

function Profile(props) {
    const dispatch = useDispatch();
    const { showProfile } = useSelector((state) => state.profile);
    const activeUser = useSelector((state) => state.activeUser);
    const { name, bio, profilePic, id } = activeUser;

    const [formData, setFormData] = useState({ name, bio });

    const logoutUser = () => {
        toast.success("Logout Successful!");
        localStorage.removeItem("userToken");
        window.location.href = "/login";
    };

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const submit = async () => {
        try {
            dispatch(setUserNameAndBio(formData));
            await updateUser(id, formData);
            toast.success("Updated!");
        } catch (error) {
            toast.error("Update failed. Please try again.");
        }
    };

    return (
        <div style={{ transition: showProfile ? "0.3s ease-in-out" : "" }} className={props.className}>
            <div className='absolute w-full'>
                <div className='bg-[#166e48] pt-12 pb-3'>
                    <button onClick={() => dispatch(setShowProfile(false))} className='flex items-center'>
                        <IoArrowBack style={{ color: "#fff", width: "30px", height: "20px" }} />
                        <h6 className='text-[16px] text-[#fff] font-semibold'>Profile</h6>
                    </button>
                </div>
                <div className='pt-5'>
                    <div className='flex items-center flex-col'>
                        <img
                            className='w-[150px] h-[150px] rounded-full -ml-5'
                            src={profilePic}
                            alt="User Profile"
                        />
                    </div>
                    <InputEdit type="name" handleChange={handleChange} input={formData.name} handleSubmit={submit} />

                    <div className='py-5 px-4'>
                        <p className='text-[10px] tracking-wide text-[#3b4a54]'>
                            This is not your username or pin. This name will be visible to your contacts.
                        </p>
                    </div>
                    <InputEdit type="bio" handleChange={handleChange} input={formData.bio} handleSubmit={submit} />
                </div>

                <div onClick={logoutUser} className='flex items-center justify-center mt-5 cursor-pointer shadow-2xl'>
                    <IoMdLogOut className='text-[#e44d4d] w-[27px] h-[23px]' />
                    <h6 className='text-[17px] text-[#e44d4d] font-semibold'>Logout</h6>
                </div>
            </div>
        </div>
    );
}

export default Profile;
