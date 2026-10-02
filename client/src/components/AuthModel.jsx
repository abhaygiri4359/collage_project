import React, { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { FaTimes } from "react-icons/fa";
import Auth from '../pages/Auth';

function AuthModel({ onClose }) {
    const { userData } = useSelector((state) => state.user)

    useEffect(() => {
        if (userData) {
            onClose()
        }
    }, [userData, onClose])

    return (
        <div className='fixed inset-0 z-[999] flex items-center justify-center bg-slate-950/40 backdrop-blur-md px-4 animate-in fade-in duration-200'>
            <div className='relative w-full max-w-md'>
                <button 
                    onClick={onClose} 
                    className='absolute top-6 right-6 z-10 w-8 h-8 rounded-full bg-gray-100/90 hover:bg-gray-200 text-gray-500 hover:text-gray-900 flex items-center justify-center transition-colors cursor-pointer'
                >
                    <FaTimes size={14} />
                </button>
                <Auth isModel={true} />
            </div>
        </div>
    )
}

export default AuthModel
