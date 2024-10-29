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
        <div className='bg-gradient-to-r from-green-400 to-blue-500 w-full h-screen flex justify-center items-center'>
            <div className='w-full sm:w-[400px] p-8 h-[400px] bg-white rounded-lg shadow-xl transition-transform duration-300 hover:scale-105'>
                <h3 className='text-3xl font-bold text-gray-800 text-center'>Register</h3>
                <p className='text-gray-600 text-sm text-center'>
                    Have an Account? <Link className='text-blue-500 underline' to="/login">Sign in</Link>
                </p>
                <form className='flex flex-col gap-y-4 mt-4' onSubmit={handleOnSubmit}>
                    <div className='flex gap-x-2 w-full'>
                        <input
                            onChange={handleOnChange}
                            className='bg-[#f7f7f7] h-12 p-3 border-2 border-gray-300 rounded-md focus:outline-none focus:border-blue-500 transition'
                            type="text"
                            name="firstname"
                            placeholder='First Name'
                            value={formData.firstname}
                            required
                        />
                        <input
                            onChange={handleOnChange}
                            className='bg-[#f7f7f7] h-12 p-3 border-2 border-gray-300 rounded-md focus:outline-none focus:border-blue-500 transition'
                            type="text"
                            name="lastname"
                            placeholder='Last Name'
                            value={formData.lastname}
                            required
                        />
                    </div>
                    <input
                        onChange={handleOnChange}
                        className='bg-[#f7f7f7] h-12 p-3 border-2 border-gray-300 rounded-md focus:outline-none focus:border-blue-500 transition'
                        type="email"
                        name="email"
                        placeholder="Email"
                        value={formData.email}
                        required
                    />
                    <div className='relative'>
                        <input
                            onChange={handleOnChange}
                            className='bg-[#f7f7f7] h-12 p-3 border-2 border-gray-300 rounded-md focus:outline-none focus:border-blue-500 transition'
                            type={showPass ? "text" : "password"}
                            name="password"
                            placeholder="Password"
                            value={formData.password}
                            required
                        />
                        <button
                            type='button'
                            onClick={() => setShowPass(!showPass)}
                            className='absolute top-3 right-4 text-gray-500'
                        >
                            {showPass ? <BsEmojiExpressionless className='w-6 h-6' /> : <BsEmojiLaughing className='w-6 h-6' />}
                        </button>
                    </div>
                    <button
                        className='w-full h-12 font-bold text-white bg-blue-600 rounded-md transition hover:bg-blue-700'
                        type='submit'
                        disabled={isLoading}
                    >
                        {isLoading ? (
                            <div className='flex justify-center'>
                                <lottie-player src="https://assets3.lottiefiles.com/packages/lf20_jcikwtux.json" background="transparent" speed="1" style={{ width: "30px", height: "30px" }} loop autoplay></lottie-player>
                            </div>
                        ) : (
                            "Register"
                        )}
                    </button>
                </form>
            </div>
        </div>
    );
}

export default Register;
