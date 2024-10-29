/* eslint-disable no-unused-vars */

import { Link, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { registerUser, validUser } from '../Api/Auth.js';
import { BsEmojiLaughing, BsEmojiExpressionless } from "react-icons/bs";
import { toast } from 'react-toastify';

const defaultData = {
    firstname: "",
    lastname: "",
    email: "",
    password: ""
};

function Register() {
    const [formData, setFormData] = useState(defaultData);
    const [isLoading, setIsLoading] = useState(false);
    const [showPass, setShowPass] = useState(false);
    const pageRoute = useNavigate();

    const handleOnChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleOnSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        if (formData.email.includes("@") && formData.password.length > 6) {
            try {
                const { data } = await registerUser(formData);
                if (data?.token) {
                    localStorage.setItem("userToken", data.token);
                    toast.success("Successfully Registered😍");
                    pageRoute("/chats");
                } else {
                    toast.error("Invalid Credentials!");
                }
            } catch (error) {
                toast.error("Registration failed!");
            } finally {
                setIsLoading(false);
            }
        } else {
            toast.warning("Provide valid Credentials!");
            setFormData({ ...formData, password: "" });
            setIsLoading(false);
        }
    };

    useEffect(() => {
        const isValid = async () => {
            const data = await validUser();
            if (data?.user) {
                window.location.href = "/chats";
            }
        };
        isValid();
    }, []);

    return (
        <div className='bg-[#121418] w-[100vw] h-[100vh] flex justify-center items-center'>
            <div className='w-[90%] sm:w-[400px] pl-0 ml-0 h-[400px] sm:pl-0 sm:ml-9 mt-10 relative'>
                <div className='absolute -top-7 left-0'>
                    <h3 className='text-[25px] font-bold tracking-wider text-[#fff]'>Register</h3>
                    <p className='text-[#fff] text-[12px] tracking-wider font-medium'>
                        Have an Account? <Link className='text-[rgba(0,195,154,1)] underline' to="/login">Sign in</Link>
                    </p>
                </div>
                <form className='flex flex-col gap-y-3 mt-[12%]' onSubmit={handleOnSubmit}>
                    <div className='flex gap-x-2 w-[100%]'>
                        <input onChange={handleOnChange} className='bg-[#222222] h-[50px] pl-3 text-[#ffff] w-[49%] sm:w-[47%]' type="text" name="firstname" placeholder='First Name' value={formData.firstname} required />
                        <input onChange={handleOnChange} className='bg-[#222222] h-[50px] pl-3 text-[#ffff] w-[49%] sm:w-[47%]' type="text" name="lastname" placeholder='Last Name' value={formData.lastname} required />
                    </div>
                    <div>
                        <input onChange={handleOnChange} className='bg-[#222222] h-[50px] pl-3 text-[#ffff] w-[100%] sm:w-[96.3%]' type="email" name="email" placeholder="Email" value={formData.email} required />
                    </div>
                    <div className='relative flex flex-col gap-y-3'>
                        <input onChange={handleOnChange} className='bg-[#222222] h-[50px] pl-3 text-[#ffff] w-[100%] sm:w-[96.3%]' type={showPass ? "text" : "password"} name="password" placeholder="Password" value={formData.password} required />
                        {
                            !showPass ?
                                <button type='button' onClick={() => setShowPass(!showPass)}>
                                    <BsEmojiLaughing className='text-[#fff] absolute top-3 right-4 sm:right-6 w-[30px] h-[25px]' />
                                </button> :
                                <button type='button' onClick={() => setShowPass(!showPass)}>
                                    <BsEmojiExpressionless className='text-[#fff] absolute top-3 right-4 sm:right-6 w-[30px] h-[25px]' />
                                </button>
                        }
                    </div>
                    <button
                        style={{ background: "linear-gradient(90deg, rgba(0,195,154,1) 0%, rgba(224,205,115,1) 100%)" }}
                        className='w-[100%] sm:w-[96.3%] h-[50px] font-bold text-[#121418] tracking-wide text-[17px] relative'
                        type='submit'
                    >
                        {isLoading && (
                            <div className='absolute -top-[53px] left-[29.5%] sm:-top-[53px] sm:left-[87px]'>
                                <lottie-player src="https://assets2.lottiefiles.com/packages/lf20_h9kds1my.json" background="transparent" speed="1" style={{ width: "200px", height: "160px" }} loop autoplay></lottie-player>
                            </div>
                        )}
                        <p style={{ display: isLoading ? "none" : "block" }} className='test-[#fff]'>Register</p>
                    </button>
                </form>
            </div>
        </div>
    );
}

export default Register;