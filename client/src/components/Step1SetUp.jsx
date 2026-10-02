import React, { useState } from 'react'
import { motion } from "motion/react"
import {
    FaUserTie,
    FaBriefcase,
    FaFileUpload,
    FaMicrophoneAlt,
    FaChartLine,
    FaArrowLeft,
    FaCheckCircle,
} from "react-icons/fa";
import { HiSparkles } from "react-icons/hi";
import axios from "axios"
import { ServerUrl } from '../App';
import { useDispatch, useSelector } from 'react-redux';
import { setUserData } from '../redux/userSlice';
import { useNavigate } from 'react-router-dom';

function Step1SetUp({ onStart }) {
    const { userData } = useSelector((state) => state.user)
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const [role, setRole] = useState("");
    const [experience, setExperience] = useState("");
    const [mode, setMode] = useState("Technical");
    const [resumeFile, setResumeFile] = useState(null);
    const [loading, setLoading] = useState(false);
    const [projects, setProjects] = useState([]);
    const [skills, setSkills] = useState([]);
    const [resumeText, setResumeText] = useState("");
    const [analysisDone, setAnalysisDone] = useState(false);
    const [analyzing, setAnalyzing] = useState(false);

    const handleUploadResume = async () => {
        if (!resumeFile || analyzing) return;
        setAnalyzing(true)

        const formdata = new FormData()
        formdata.append("resume", resumeFile)

        try {
            const result = await axios.post(ServerUrl + "/api/interview/resume", formdata, { withCredentials: true })

            setRole(result.data.role || "");
            setExperience(result.data.experience || "");
            setProjects(result.data.projects || []);
            setSkills(result.data.skills || []);
            setResumeText(result.data.resumeText || "");
            setAnalysisDone(true);
            setAnalyzing(false);
        } catch (error) {
            console.log(error)
            setAnalyzing(false);
            alert(error.response?.data?.message || "Failed to analyze resume. Please ensure it is a valid PDF file.");
        }
    }

    const handleStart = async () => {
        setLoading(true)
        try {
            const result = await axios.post(
                ServerUrl + "/api/interview/generate-questions",
                { role, experience, mode, resumeText, projects, skills },
                { withCredentials: true }
            )
            if (userData) {
                dispatch(setUserData({ ...userData, credits: result.data.creditsLeft }))
            }
            setLoading(false)
            onStart(result.data)
        } catch (error) {
            console.log(error)
            setLoading(false)
            alert(error.response?.data?.message || "Failed to generate interview. Please check your credits or try again.");
        }
    }

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            className='min-h-screen flex flex-col justify-center items-center bg-[#f8fafc] px-4 py-8 relative overflow-hidden'
        >
            {/* Ambient background glow */}
            <div className='pointer-events-none absolute -top-40 left-1/2 -translate-x-1/2 w-[800px] h-[500px] bg-gradient-to-tr from-emerald-200/30 via-teal-100/20 to-sky-200/30 blur-[130px] -z-10 rounded-full' />

            <div className='w-full max-w-5xl mb-4 flex justify-between items-center'>
                <button
                    onClick={() => navigate("/")}
                    className='inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/80 backdrop-blur-md border border-gray-200/80 text-gray-700 hover:text-black hover:bg-white text-xs sm:text-sm font-semibold shadow-sm transition-all cursor-pointer'
                >
                    <FaArrowLeft size={12} />
                    <span>Back to Home</span>
                </button>

                <div className='text-xs font-semibold text-emerald-700 bg-emerald-50 border border-emerald-200/70 px-3.5 py-1 rounded-full flex items-center gap-1.5'>
                    <HiSparkles size={14} className='text-emerald-600' />
                    <span>AI Interview Configuration</span>
                </div>
            </div>

            <div className='w-full max-w-5xl bg-white/90 backdrop-blur-xl rounded-3xl shadow-[0_20px_60px_rgba(0,0,0,0.06)] border border-gray-200/80 grid md:grid-cols-2 overflow-hidden'>

                {/* Left Info Panel */}
                <motion.div
                    initial={{ x: -40, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ duration: 0.5 }}
                    className='relative bg-gradient-to-br from-emerald-50/70 via-teal-50/40 to-slate-50 p-8 sm:p-12 flex flex-col justify-between border-b md:border-b-0 md:border-r border-gray-100'
                >
                    <div>
                        <div className='inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-100/70 text-emerald-800 text-xs font-semibold mb-6'>
                            <FaMicrophoneAlt size={12} />
                            Voice & Adaptive AI
                        </div>

                        <h2 className="text-3xl sm:text-4xl font-extrabold text-gray-900 tracking-tight leading-tight mb-4">
                            Configure Your Session
                        </h2>

                        <p className="text-gray-600 text-sm leading-relaxed mb-8">
                            Select your desired career position and experience. The AI dynamically adapts its technical depth and follow-ups.
                        </p>

                        <div className='space-y-4'>
                            {[
                                {
                                    icon: <FaUserTie className="text-emerald-600 text-lg" />,
                                    title: "Role & Experience",
                                    desc: "Customized technical & scenario-based questions"
                                },
                                {
                                    icon: <FaMicrophoneAlt className="text-emerald-600 text-lg" />,
                                    title: "Interactive Voice Evaluation",
                                    desc: "Dynamic real-time speech and context analysis"
                                },
                                {
                                    icon: <FaChartLine className="text-emerald-600 text-lg" />,
                                    title: "Comprehensive Report",
                                    desc: "Strengths, weaknesses and downloadable PDF"
                                },
                            ].map((item, index) => (
                                <motion.div
                                    key={index}
                                    initial={{ y: 20, opacity: 0 }}
                                    animate={{ y: 0, opacity: 1 }}
                                    transition={{ delay: 0.2 + index * 0.1 }}
                                    className='flex items-start gap-3.5 bg-white/80 backdrop-blur-md p-4 rounded-2xl border border-emerald-100/60 shadow-sm'
                                >
                                    <div className='w-9 h-9 rounded-xl bg-emerald-50 flex items-center justify-center shrink-0'>
                                        {item.icon}
                                    </div>
                                    <div>
                                        <h4 className='text-sm font-bold text-gray-900'>{item.title}</h4>
                                        <p className='text-xs text-gray-500 mt-0.5'>{item.desc}</p>
                                    </div>
                                </motion.div>
                            ))}
                        </div>
                    </div>

                    <div className='mt-8 pt-6 border-t border-emerald-100/70 flex items-center gap-2 text-xs text-gray-500'>
                        <FaCheckCircle className='text-emerald-600' />
                        <span>AI calibrates to current tech industry benchmarks</span>
                    </div>
                </motion.div>

                {/* Right Form Panel */}
                <motion.div
                    initial={{ x: 40, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ duration: 0.5 }}
                    className="p-8 sm:p-12 bg-white flex flex-col justify-center"
                >
                    <div className='mb-6'>
                        <h3 className='text-2xl font-extrabold text-gray-900 tracking-tight'>
                            Interview Details
                        </h3>
                        <p className='text-xs text-gray-500 mt-1'>Fill in your details or upload your resume for auto-fill.</p>
                    </div>

                    <div className='space-y-4'>
                        {/* Role Input */}
                        <div className='relative'>
                            <FaUserTie className='absolute top-3.5 left-4 text-gray-400' />
                            <input
                                type='text'
                                placeholder='Target Role (e.g. Frontend Developer, Data Scientist)'
                                className='w-full pl-11 pr-4 py-3 bg-gray-50/70 border border-gray-200 rounded-2xl focus:bg-white focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20 text-sm outline-none transition'
                                onChange={(e) => setRole(e.target.value)}
                                value={role}
                            />
                        </div>

                        {/* Experience Input */}
                        <div className='relative'>
                            <FaBriefcase className='absolute top-3.5 left-4 text-gray-400' />
                            <input
                                type='text'
                                placeholder='Experience (e.g. Fresher, 2 years, 5+ years)'
                                className='w-full pl-11 pr-4 py-3 bg-gray-50/70 border border-gray-200 rounded-2xl focus:bg-white focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20 text-sm outline-none transition'
                                onChange={(e) => setExperience(e.target.value)}
                                value={experience}
                            />
                        </div>

                        {/* Mode Selection */}
                        <div>
                            <select
                                value={mode}
                                onChange={(e) => setMode(e.target.value)}
                                className='w-full py-3 px-4 bg-gray-50/70 border border-gray-200 rounded-2xl focus:bg-white focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20 text-sm outline-none transition cursor-pointer'
                            >
                                <option value="Technical">Technical Round (Coding & System Architecture)</option>
                                <option value="HR">HR Round (Behavioral & Leadership)</option>
                            </select>
                        </div>

                        {/* Resume Upload Dropzone */}
                        {!analysisDone && (
                            <motion.div
                                whileHover={{ scale: 1.01 }}
                                onClick={() => document.getElementById("resumeUpload").click()}
                                className='border-2 border-dashed border-gray-300 hover:border-emerald-500 rounded-2xl p-6 text-center cursor-pointer bg-gray-50/60 hover:bg-emerald-50/40 transition'
                            >
                                <div className='w-12 h-12 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center mx-auto mb-2'>
                                    <FaFileUpload size={20} />
                                </div>

                                <input
                                    type="file"
                                    accept="application/pdf"
                                    id="resumeUpload"
                                    className='hidden'
                                    onChange={(e) => setResumeFile(e.target.files[0])}
                                />

                                <p className='text-xs sm:text-sm font-semibold text-gray-700'>
                                    {resumeFile ? resumeFile.name : "Upload Resume (PDF - Optional)"}
                                </p>
                                <p className='text-[11px] text-gray-400 mt-0.5'>
                                    AI will extract role, skills and past projects automatically
                                </p>

                                {resumeFile && (
                                    <button
                                        type="button"
                                        onClick={(e) => {
                                            e.stopPropagation();
                                            handleUploadResume()
                                        }}
                                        className='mt-3 bg-gray-900 hover:bg-black text-white text-xs font-semibold px-4 py-2 rounded-xl shadow-sm transition cursor-pointer'
                                    >
                                        {analyzing ? "Analyzing Resume..." : "Extract Profile with AI"}
                                    </button>
                                )}
                            </motion.div>
                        )}

                        {/* Resume Analysis Result */}
                        {analysisDone && (
                            <motion.div
                                initial={{ opacity: 0, y: 15 }}
                                animate={{ opacity: 1, y: 0 }}
                                className='bg-emerald-50/60 border border-emerald-200/80 rounded-2xl p-4 space-y-3'
                            >
                                <div className='flex items-center gap-2 text-xs font-bold text-emerald-800'>
                                    <FaCheckCircle className='text-emerald-600' />
                                    <span>Resume Successfully Parsed</span>
                                </div>

                                {skills.length > 0 && (
                                    <div>
                                        <p className='text-[11px] font-semibold text-gray-600 mb-1.5'>Detected Tech Stack:</p>
                                        <div className='flex flex-wrap gap-1.5'>
                                            {skills.slice(0, 10).map((s, i) => (
                                                <span key={i} className='bg-white border border-emerald-200 text-emerald-700 px-2.5 py-0.5 rounded-full text-xs font-medium'>
                                                    {s}
                                                </span>
                                            ))}
                                        </div>
                                    </div>
                                )}
                            </motion.div>
                        )}

                        {/* Submit Button */}
                        <motion.button
                            onClick={handleStart}
                            disabled={!role || !experience || loading}
                            whileHover={{ scale: 1.01 }}
                            whileTap={{ scale: 0.98 }}
                            className='w-full mt-2 bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 disabled:from-gray-300 disabled:to-gray-400 disabled:cursor-not-allowed text-white py-3.5 rounded-2xl text-sm font-bold shadow-lg shadow-emerald-600/20 hover:shadow-xl transition duration-200 cursor-pointer'
                        >
                            {loading ? "Starting Interview..." : "Start AI Interview"}
                        </motion.button>
                    </div>
                </motion.div>
            </div>
        </motion.div>
    )
}

export default Step1SetUp
