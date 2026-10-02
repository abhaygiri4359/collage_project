import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { motion } from "motion/react"
import { BsRobot, BsCoin, BsClockHistory, BsLightningCharge } from "react-icons/bs";
import { HiOutlineLogout } from "react-icons/hi";
import { FaUserAstronaut } from "react-icons/fa";
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { ServerUrl } from '../App';
import { setUserData } from '../redux/userSlice';
import AuthModel from './AuthModel';

function Navbar() {
    const { userData } = useSelector((state) => state.user)
    const [showCreditPopup, setShowCreditPopup] = useState(false)
    const [showUserPopup, setShowUserPopup] = useState(false)
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const [showAuth, setShowAuth] = useState(false);

    const handleLogout = async () => {
        try {
            await axios.get(ServerUrl + "/api/auth/logout", { withCredentials: true })
            dispatch(setUserData(null))
            setShowCreditPopup(false)
            setShowUserPopup(false)
            navigate("/")
        } catch (error) {
            console.log(error)
        }
    }

    return (
        <header className='sticky top-0 z-50 flex justify-center px-4 pt-4 pb-2'>
            <motion.div
                initial={{ opacity: 0, y: -25 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, ease: "easeOut" }}
                className='w-full max-w-6xl backdrop-blur-xl bg-white/85 rounded-2xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-gray-200/70 px-6 py-3 flex justify-between items-center relative transition-all'
            >
                {/* Brand / Logo */}
                <div 
                    onClick={() => navigate("/")} 
                    className='flex items-center gap-3 cursor-pointer group'
                >
                    <div className='w-10 h-10 rounded-xl bg-gradient-to-tr from-emerald-600 via-emerald-500 to-teal-400 text-white flex items-center justify-center shadow-md shadow-emerald-500/20 group-hover:scale-105 transition-transform duration-200'>
                        <BsRobot size={20} />
                    </div>
                    <div className='flex flex-col'>
                        <div className='flex items-center gap-2'>
                            <h1 className='font-bold text-gray-900 text-base md:text-lg tracking-tight group-hover:text-emerald-700 transition-colors'>
                                Interview<span className='text-emerald-600'>AI</span>
                            </h1>
                        </div>
                        <span className='text-[11px] text-gray-400 font-medium hidden md:inline'>
                            Smart Interview Platform
                        </span>
                    </div>
                </div>

                {/* Right Actions */}
                <div className='flex items-center gap-3 md:gap-4 relative'>
                    {/* Credits Button */}
                    <div className='relative'>
                        <button
                            onClick={() => {
                                if (!userData) {
                                    setShowAuth(true)
                                    return;
                                }
                                setShowCreditPopup(!showCreditPopup);
                                setShowUserPopup(false)
                            }}
                            className='flex items-center gap-2 bg-gradient-to-r from-emerald-50 to-teal-50 border border-emerald-200/80 px-3.5 py-1.5 md:py-2 rounded-full text-sm font-semibold text-emerald-800 hover:shadow-sm hover:border-emerald-300 transition-all cursor-pointer'
                        >
                            <BsCoin size={17} className="text-emerald-600" />
                            <span>{userData?.credits ?? 0}</span>
                            <span className='hidden sm:inline text-xs text-emerald-600 font-normal'>Credits</span>
                        </button>

                        {/* Credits Popover */}
                        {showCreditPopup && (
                            <div className='absolute right-0 mt-3 w-72 bg-white/95 backdrop-blur-xl shadow-2xl border border-gray-200/80 rounded-2xl p-5 z-50 animate-in fade-in zoom-in-95 duration-150'>
                                <div className='flex items-center gap-2 mb-2'>
                                    <div className='w-8 h-8 rounded-lg bg-emerald-50 flex items-center justify-center text-emerald-600'>
                                        <BsLightningCharge size={16} />
                                    </div>
                                    <h4 className='font-semibold text-gray-900 text-sm'>Interview Credits</h4>
                                </div>
                                <p className='text-xs text-gray-500 mb-4 leading-relaxed'>
                                    You currently have <strong className='text-gray-800 font-semibold'>{userData?.credits || 0}</strong> credits left. Upgrade to unlock full mock interviews.
                                </p>
                                <button
                                    onClick={() => {
                                        setShowCreditPopup(false);
                                        navigate("/pricing");
                                    }}
                                    className='w-full bg-gradient-to-r from-gray-900 to-black hover:from-black hover:to-gray-900 text-white py-2.5 rounded-xl text-xs font-semibold shadow-md hover:shadow-lg transition-all cursor-pointer'
                                >
                                    Get More Credits
                                </button>
                            </div>
                        )}
                    </div>

                    {/* User Profile / Auth Button */}
                    <div className='relative'>
                        {userData ? (
                            <button
                                onClick={() => {
                                    setShowUserPopup(!showUserPopup);
                                    setShowCreditPopup(false);
                                }}
                                className='w-10 h-10 bg-gradient-to-br from-gray-900 to-gray-700 text-white rounded-full flex items-center justify-center font-bold text-sm shadow-md ring-2 ring-emerald-500/30 hover:ring-emerald-500 transition-all cursor-pointer'
                            >
                                {userData?.name?.slice(0, 1).toUpperCase()}
                            </button>
                        ) : (
                            <button
                                onClick={() => setShowAuth(true)}
                                className='flex items-center gap-2 bg-gray-900 hover:bg-black text-white px-4 py-2 rounded-full text-xs md:text-sm font-semibold shadow-sm transition-all cursor-pointer'
                            >
                                <FaUserAstronaut size={13} />
                                <span>Sign In</span>
                            </button>
                        )}

                        {/* User Dropdown */}
                        {showUserPopup && (
                            <div className='absolute right-0 mt-3 w-56 bg-white/95 backdrop-blur-xl shadow-2xl border border-gray-200/80 rounded-2xl p-3 z-50'>
                                <div className='px-3 py-2 border-b border-gray-100 mb-2'>
                                    <p className='text-xs text-gray-400 font-medium'>Signed in as</p>
                                    <p className='text-sm font-bold text-gray-900 truncate'>{userData?.name}</p>
                                    <p className='text-[11px] text-gray-500 truncate'>{userData?.email}</p>
                                </div>

                                <button
                                    onClick={() => {
                                        setShowUserPopup(false);
                                        navigate("/history");
                                    }}
                                    className='w-full text-left text-xs font-medium py-2 px-3 hover:bg-gray-100 rounded-xl text-gray-700 flex items-center gap-2.5 transition-colors cursor-pointer'
                                >
                                    <BsClockHistory size={14} className="text-gray-500" />
                                    Interview History
                                </button>

                                <button
                                    onClick={handleLogout}
                                    className='w-full text-left text-xs font-medium py-2 px-3 hover:bg-red-50 rounded-xl text-red-600 flex items-center gap-2.5 transition-colors cursor-pointer mt-1'
                                >
                                    <HiOutlineLogout size={15} />
                                    Logout
                                </button>
                            </div>
                        )}
                    </div>
                </div>
            </motion.div>

            {showAuth && <AuthModel onClose={() => setShowAuth(false)} />}
        </header>
    )
}

export default Navbar
