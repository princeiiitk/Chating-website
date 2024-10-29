import { useEffect, useState } from 'react';
import { loginUser } from '../Api/Auth.js';
import { Link, useNavigate } from 'react-router-dom';
import { BsEmojiLaughing, BsEmojiExpressionless } from "react-icons/bs";
import { toast } from 'react-toastify';

function Login() {
    const [formData, setFormData] = useState({});
    const [isLoading, setIsLoading] = useState(false);
    const [showPass, setShowPass] = useState(false);
    const pageRoute = useNavigate();

    const handleOnChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const formSubmit = async (e) => {
        e.preventDefault();
        if (formData.email.includes("@") && formData.password.length > 6) {
            setIsLoading(true);
            try {
                const { data } = await loginUser(formData);
                if (data?.token) {
                    localStorage.setItem("userToken", data.token);
                    toast.success("Successfully Logged In!");
                    pageRoute("/chats");
                } else {
                    toast.error("Invalid Credentials!");
                    setFormData({});
                }
            } catch (error) {
                toast.error("An error occurred. Please try again!");
            } finally {
                setIsLoading(false);
            }
        } else {
            toast.warning("Provide valid Credentials!");
            setFormData({});
        }
    };

    return (
        <div className='bg-gradient-to-r from-blue-600 to-purple-600 w-full h-screen flex justify-center items-center'>
            <div className='w-full sm:w-[400px] p-8 bg-white rounded-lg shadow-lg'>
                <h3 className='text-2xl font-bold text-center text-gray-800'>Login</h3>
                <p className='text-gray-600 text-center mt-2'>
                    Don't have an account? <Link className='text-blue-500 font-semibold underline' to="/register">Sign up</Link>
                </p>
                <form className='flex flex-col gap-y-4 mt-4' onSubmit={formSubmit}>
                    <input
                        className="w-full h-12 pl-3 text-gray-800 border-2 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        onChange={handleOnChange}
                        name="email"
                        type="text"
                        placeholder='Email'
                        value={formData.email || ""}
                        required
                    />
                    <div className='relative'>
                        <input
                            className='w-full h-12 pl-3 text-gray-800 border-2 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500'
                            onChange={handleOnChange}
                            type={showPass ? "text" : "password"}
                            name="password"
                            placeholder='Password'
                            value={formData.password || ""}
                            required
                        />
                        <button
                            type='button'
                            onClick={() => setShowPass(!showPass)}
                            className='absolute top-2 right-3 text-gray-500 focus:outline-none'
                        >
                            {showPass ? <BsEmojiExpressionless className='w-5 h-5' /> : <BsEmojiLaughing className='w-5 h-5' />}
                        </button>
                    </div>
                    <button
                        className='w-full h-12 font-bold text-white tracking-wide text-lg rounded-md bg-blue-600 hover:bg-blue-700 transition duration-200'
                        type='submit'
                        disabled={isLoading}
                    >
                        {isLoading ? (
                            <div className='flex justify-center'>
                                <lottie-player src="https://assets3.lottiefiles.com/packages/lf20_jcikwtux.json" background="transparent" speed="1" style={{ width: "30px", height: "30px" }} loop autoplay></lottie-player>
                            </div>
                        ) : (
                            "Login"
                        )}
                    </button>
                </form>
            </div>
        </div>
    );
}

export default Login;
