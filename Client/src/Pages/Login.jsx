import { useEffect, useState } from 'react';
import { loginUser, validUser } from '../Api/Auth.js';
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
                    console.log("prince kumar", data?.token)
                    localStorage.setItem("userToken", data.token);
                    toast.success("Successfully Logged In!");
                    pageRoute("/chats");
                } else {
                    toast.error("Invalid Credentials!");
                    setFormData({  });
                }
            } catch (error) {
                console.error("Login Error:", error);
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
        <div className='bg-[#121418] w-full h-screen flex justify-center items-center'>
            <div className='w-full sm:w-[400px] p-4 sm:p-0 h-[400px] mt-20 relative'>
                <div className='absolute -top-5 left-0'>
                    <h3 className='text-[25px] font-bold tracking-wider text-white'>Login</h3>
                    <p className='text-white text-[12px] tracking-wider font-medium'>
                        No Account? <Link className='text-[rgba(0,195,154,1)] underline' to="/register">Sign up</Link>
                    </p>
                </div>
                <form className='flex flex-col gap-y-3 mt-20' onSubmit={formSubmit}>
                    <input
                        className="w-full sm:w-[80%] bg-[#222222] h-12 pl-3 text-white"
                        onChange={handleOnChange}
                        name="email"
                        type="text"
                        placeholder='Email'
                        value={formData.email}
                        required
                    />
                    <div className='relative'>
                        <input
                            className='w-full sm:w-[80%] bg-[#222222] h-12 pl-3 text-white'
                            onChange={handleOnChange}
                            type={showPass ? "text" : "password"}
                            name="password"
                            placeholder='Password'
                            value={formData.password}
                            required
                        />
                        <button
                            type='button'
                            onClick={() => setShowPass(!showPass)}
                            className='absolute top-3 right-5 sm:right-10 text-white'
                        >
                            {showPass ? <BsEmojiExpressionless className='w-6 h-6' /> : <BsEmojiLaughing className='w-6 h-6' />}
                        </button>
                    </div>
                    <button
                        className='w-full sm:w-[80%] h-12 font-bold text-[#121418] tracking-wide text-lg'
                        style={{ background: "linear-gradient(90deg, rgba(0,195,154,1) 0%, rgba(224,205,115,1) 100%)" }}
                        type='submit'
                        disabled={isLoading}
                    >
                        {isLoading ? (
                            <div className='flex justify-center'>
                                <lottie-player src="https://assets3.lottiefiles.com/packages/lf20_jcikwtux.json" background="transparent" speed="1" style={{ width: "60px", height: "60px" }} loop autoplay></lottie-player>
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
