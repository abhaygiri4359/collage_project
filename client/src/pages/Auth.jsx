import React, { useState } from 'react'
import { BsRobot } from "react-icons/bs";
import { IoSparkles } from "react-icons/io5";
import { motion } from "motion/react"
import { FcGoogle } from "react-icons/fc";
import { signInWithPopup } from 'firebase/auth';
import { auth, provider } from '../utils/firebase';
import axios from 'axios';
import { ServerUrl } from '../App';
import { useDispatch } from 'react-redux';
import { setUserData } from '../redux/userSlice';
import { useNavigate } from 'react-router-dom';

function Auth({ isModel = false }) {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const [loading, setLoading] = useState(false)
    const [authError, setAuthError] = useState("")

    const handleGoogleAuth = async () => {
        setLoading(true)
        setAuthError("")
        try {
            const response = await signInWithPopup(auth, provider)
            let User = response.user
            let name = User.displayName
            let email = User.email
            const result = await axios.post(ServerUrl + "/api/auth/google", { name, email }, { withCredentials: true })
            dispatch(setUserData(result.data))
            if (!isModel) {
                navigate("/")
            }
        } catch (error) {
            console.error("Google Auth Error:", error)
            const backendMsg = error.response?.data?.message
            if (backendMsg) {
                setAuthError(backendMsg)
            } else if (error.code === 'ERR_NETWORK' || error.message === 'Network Error') {
                setAuthError("Network Error: Backend server se connection nahi ho paa raha hai. Kripya check karein ki backend server port 8000 par run ho raha hai.")
            } else {
                setAuthError(error.message || "Failed to sign in. Please try again.")
            }
            dispatch(setUserData(null))
        } finally {
            setLoading(false)
        }
    }

    return (
        <div className={`
            w-full 
            ${isModel ? "py-2" : "min-h-screen bg-[#f8fafc] flex items-center justify-center px-4 sm:px-6 py-20 relative overflow-hidden"}
        `}>
            {!isModel && (
                <div className='pointer-events-none absolute -top-40 left-1/2 -translate-x-1/2 w-[700px] h-[500px] bg-gradient-to-tr from-emerald-200/40 via-teal-100/30 to-sky-200/30 blur-[120px] -z-10 rounded-full' />
            )}

            <motion.div
                initial={{ opacity: 0, y: -20, scale: 0.98 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                transition={{ duration: 0.4 }}
                className={`
                    w-full 
                    ${isModel ? "max-w-md p-8 rounded-3xl" : "max-w-md p-10 rounded-[32px]"}
                    bg-white/95 backdrop-blur-2xl shadow-[0_20px_60px_rgba(0,0,0,0.08)] border border-gray-200/80
                `}
            >
                {/* Brand Logo */}
                <div className='flex items-center justify-center gap-3 mb-6'>
                    <div className='w-11 h-11 rounded-2xl bg-gradient-to-tr from-emerald-600 to-teal-400 text-white flex items-center justify-center shadow-lg shadow-emerald-500/25'>
                        <BsRobot size={22} />
                    </div>
                    <div className='text-left'>
                        <h2 className='font-bold text-gray-900 text-lg leading-tight'>
                            Interview<span className='text-emerald-600'>AI</span>
                        </h2>
                        <span className='text-[11px] font-medium text-emerald-600'>AI Smart Platform</span>
                    </div>
                </div>

                <div className='text-center mb-6'>
                    <h1 className='text-2xl font-extrabold text-gray-900 tracking-tight leading-snug'>
                        Get Started with{' '}
                        <span className='bg-gradient-to-r from-emerald-600 to-teal-500 bg-clip-text text-transparent inline-flex items-center gap-1.5'>
                            AI Interview
                            <IoSparkles size={16} className='text-emerald-500' />
                        </span>
                    </h1>

                    <p className='text-gray-500 text-xs sm:text-sm mt-2.5 leading-relaxed'>
                        Sign in to start customized mock interviews, receive comprehensive feedback, and download detailed reports.
                    </p>
                </div>

                {authError && (
                    <div className='mb-5 p-3.5 bg-red-50/90 border border-red-200 text-red-700 text-xs font-medium rounded-2xl text-center leading-relaxed'>
                        {authError}
                    </div>
                )}

                {/* Google Sign In CTA */}
                <motion.button
                    disabled={loading}
                    onClick={handleGoogleAuth}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className='w-full flex items-center justify-center gap-3 py-3.5 px-6 bg-gradient-to-r from-gray-950 via-gray-900 to-gray-800 hover:from-black hover:to-gray-900 text-white rounded-2xl font-semibold text-sm shadow-md shadow-black/10 hover:shadow-lg transition-all disabled:opacity-50 cursor-pointer'
                >
                    <div className='w-6 h-6 rounded-full bg-white flex items-center justify-center'>
                        <FcGoogle size={18} />
                    </div>
                    <span>{loading ? "Authenticating..." : "Continue with Google"}</span>
                </motion.button>

                <p className='text-center text-[11px] text-gray-400 mt-6'>
                    Secure authentication powered by Firebase Auth
                </p>
            </motion.div>
        </div>
    )
}

export default Auth
