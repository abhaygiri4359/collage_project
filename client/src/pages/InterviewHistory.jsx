import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from "axios"
import { ServerUrl } from '../App'
import { FaArrowLeft } from 'react-icons/fa'
import { BsClockHistory, BsRobot, BsArrowRight } from 'react-icons/bs'
import { HiSparkles } from 'react-icons/hi'

function InterviewHistory() {
    const [interviews, setInterviews] = useState([])
    const navigate = useNavigate()

    useEffect(() => {
        const getMyInterviews = async () => {
            try {
                const result = await axios.get(ServerUrl + "/api/interview/get-interview", { withCredentials: true })
                setInterviews(result.data)
            } catch (error) {
                console.log(error)
            }
        }
        getMyInterviews()
    }, [])

    return (
        <div className='min-h-screen bg-[#f8fafc] text-gray-900 py-10 px-4 sm:px-6 relative overflow-hidden'>
            {/* Ambient background glow */}
            <div className='pointer-events-none absolute -top-40 left-1/2 -translate-x-1/2 w-[800px] h-[500px] bg-gradient-to-tr from-emerald-200/30 via-teal-100/20 to-sky-200/30 blur-[130px] -z-10 rounded-full' />

            <div className='max-w-4xl mx-auto'>
                {/* Header */}
                <div className='mb-10 flex items-center justify-between flex-wrap gap-4'>
                    <button
                        onClick={() => navigate("/")}
                        className='inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/80 backdrop-blur-md border border-gray-200/80 text-gray-700 hover:text-black hover:bg-white text-xs sm:text-sm font-semibold shadow-sm transition-all cursor-pointer'
                    >
                        <FaArrowLeft size={12} />
                        <span>Back to Home</span>
                    </button>

                    <div className='text-xs font-semibold text-emerald-700 bg-emerald-50 border border-emerald-200/70 px-3.5 py-1 rounded-full flex items-center gap-1.5'>
                        <HiSparkles size={14} className='text-emerald-600' />
                        <span>Past Performance Log</span>
                    </div>
                </div>

                <div className='mb-8'>
                    <h1 className='text-3xl sm:text-4xl font-extrabold text-gray-950 tracking-tight'>
                        Interview History
                    </h1>
                    <p className='text-gray-500 text-sm mt-1.5'>
                        Review your completed AI interview sessions and in-depth performance evaluations.
                    </p>
                </div>

                {interviews.length === 0 ? (
                    <div className='bg-white/90 backdrop-blur-xl p-12 rounded-3xl border border-gray-200/80 shadow-sm text-center flex flex-col items-center'>
                        <div className='w-14 h-14 rounded-2xl bg-emerald-50 text-emerald-600 flex items-center justify-center mb-4 shadow-sm'>
                            <BsClockHistory size={24} />
                        </div>
                        <h3 className='text-lg font-bold text-gray-900 mb-1'>No Interviews Found</h3>
                        <p className='text-gray-500 text-xs sm:text-sm max-w-sm mb-6'>
                            You haven't completed any mock interview sessions yet. Start your first session now!
                        </p>
                        <button
                            onClick={() => navigate("/interview")}
                            className='inline-flex items-center gap-2 bg-gradient-to-r from-gray-950 to-gray-800 hover:from-black hover:to-gray-900 text-white px-6 py-2.5 rounded-full text-xs sm:text-sm font-semibold shadow-md transition-all cursor-pointer'
                        >
                            <span>Start First Interview</span>
                            <BsArrowRight size={14} />
                        </button>
                    </div>
                ) : (
                    <div className='grid gap-4'>
                        {interviews.map((item, index) => (
                            <div
                                key={index}
                                onClick={() => navigate(`/report/${item._id}`)}
                                className='group bg-white/90 backdrop-blur-xl p-6 rounded-3xl shadow-sm hover:shadow-xl hover:border-emerald-300 transition-all duration-200 cursor-pointer border border-gray-200/80 flex flex-col sm:flex-row sm:items-center justify-between gap-4'
                            >
                                <div className='flex items-start gap-4'>
                                    <div className='w-11 h-11 rounded-2xl bg-gradient-to-tr from-emerald-50 to-teal-50 border border-emerald-200/80 text-emerald-600 flex items-center justify-center shrink-0 shadow-sm group-hover:scale-105 transition-transform'>
                                        <BsRobot size={20} />
                                    </div>
                                    <div>
                                        <h3 className="text-base sm:text-lg font-bold text-gray-900 group-hover:text-emerald-700 transition-colors">
                                            {item.role}
                                        </h3>
                                        <p className="text-gray-500 text-xs mt-0.5 font-medium">
                                            {item.experience} • <span className='text-emerald-600 font-semibold'>{item.mode} Round</span>
                                        </p>
                                        <p className="text-[11px] text-gray-400 mt-2">
                                            {new Date(item.createdAt).toLocaleDateString(undefined, {
                                                year: 'numeric',
                                                month: 'short',
                                                day: 'numeric'
                                            })}
                                        </p>
                                    </div>
                                </div>

                                <div className='flex items-center justify-between sm:justify-end gap-6 pt-3 sm:pt-0 border-t sm:border-t-0 border-gray-100'>
                                    <div className="text-left sm:text-right">
                                        <p className="text-xl font-extrabold text-emerald-600 tracking-tight">
                                            {item.finalScore || 0}<span className='text-xs text-gray-400 font-medium'>/10</span>
                                        </p>
                                        <p className="text-[10px] text-gray-400 font-medium uppercase tracking-wider">
                                            Score
                                        </p>
                                    </div>

                                    <span
                                        className={`px-3.5 py-1 rounded-full text-xs font-semibold capitalize ${
                                            item.status === "completed"
                                                ? "bg-emerald-50 text-emerald-700 border border-emerald-200/70"
                                                : "bg-amber-50 text-amber-700 border border-amber-200/70"
                                        }`}
                                    >
                                        {item.status}
                                    </span>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    )
}

export default InterviewHistory
