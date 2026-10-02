import React from 'react'
import { BsRobot, BsHeartFill } from 'react-icons/bs'

function Footer() {
  return (
    <footer className='w-full flex justify-center px-4 pb-10 pt-6 mt-auto'>
      <div className='w-full max-w-6xl backdrop-blur-xl bg-white/80 rounded-3xl shadow-[0_8px_30px_rgb(0,0,0,0.03)] border border-gray-200/80 py-8 px-6 text-center flex flex-col items-center'>
        
        {/* Brand */}
        <div className='flex items-center gap-3 mb-3'>
          <div className='w-9 h-9 rounded-xl bg-gradient-to-tr from-emerald-600 to-teal-400 text-white flex items-center justify-center shadow-md shadow-emerald-500/20'>
            <BsRobot size={18} />
          </div>
          <h3 className='font-bold text-gray-900 text-base tracking-tight'>
            Interview<span className='text-emerald-600'>AI</span>
          </h3>
          <span className='text-[10px] font-semibold bg-emerald-50 text-emerald-700 px-2 py-0.5 rounded-full border border-emerald-200'>
            AI Powered
          </span>
        </div>

        <p className='text-gray-500 text-xs sm:text-sm max-w-lg mx-auto leading-relaxed mb-6'>
          An intelligent mock interview platform engineered to enhance communication proficiency, 
          technical accuracy, and industry interview confidence.
        </p>

        <div className='w-full max-w-md h-px bg-gradient-to-r from-transparent via-gray-200 to-transparent mb-5' />

        <div className='flex flex-wrap items-center justify-center gap-2 text-xs text-gray-400 font-medium'>
          <span>© {new Date().getFullYear()} InterviewAI.</span>
          <span>•</span>
          <span className='inline-flex items-center gap-1.5 text-gray-500'>
            Crafted with <BsHeartFill size={11} className='text-rose-500' /> for College Major Project
          </span>
        </div>
      </div>
    </footer>
  )
}

export default Footer
