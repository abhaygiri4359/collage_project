import React, { useState } from 'react'
import Navbar from '../components/Navbar'
import { useSelector } from 'react-redux'
import { motion } from "motion/react";
import {
  BsRobot,
  BsMic,
  BsClock,
  BsBarChart,
  BsFileEarmarkText,
  BsArrowRight,
  BsCheck2Circle
} from "react-icons/bs";
import { HiSparkles } from "react-icons/hi";
import { useNavigate } from 'react-router-dom';
import AuthModel from '../components/AuthModel';
import hrImg from "../assets/HR.png";
import techImg from "../assets/tech.png";
import confidenceImg from "../assets/confi.png";
import creditImg from "../assets/credit.png";
import evalImg from "../assets/ai-ans.png";
import resumeImg from "../assets/resume.png";
import pdfImg from "../assets/pdf.png";
import analyticsImg from "../assets/history.png";
import Footer from '../components/Footer';

function Home() {
  const { userData } = useSelector((state) => state.user)
  const [showAuth, setShowAuth] = useState(false);
  const navigate = useNavigate()

  return (
    <div className='min-h-screen bg-[#f8fafc] text-gray-900 flex flex-col relative overflow-hidden'>
      {/* Ambient background glows */}
      <div className='pointer-events-none absolute -top-40 left-1/2 -translate-x-1/2 w-[900px] h-[500px] bg-gradient-to-tr from-emerald-200/40 via-teal-100/30 to-sky-200/40 blur-[120px] -z-10 rounded-full' />
      <div className='pointer-events-none absolute top-[600px] -right-40 w-[600px] h-[500px] bg-gradient-to-bl from-emerald-100/40 to-teal-50/20 blur-[130px] -z-10 rounded-full' />

      <Navbar />

      <main className='flex-1 px-4 sm:px-6 py-12 md:py-20'>
        <div className='max-w-6xl mx-auto'>

          {/* Hero Top Pill */}
          <div className='flex justify-center mb-6'>
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.4 }}
              className='inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full bg-white/90 backdrop-blur-md border border-emerald-200/80 shadow-[0_2px_12px_rgba(16,185,129,0.08)] text-xs md:text-sm font-semibold text-emerald-800'
            >
              <span className='relative flex h-2 w-2'>
                <span className='animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75'></span>
                <span className='relative inline-flex rounded-full h-2 w-2 bg-emerald-500'></span>
              </span>
              <HiSparkles size={16} className="text-emerald-600" />
              <span>AI Powered Smart Interview Platform</span>
            </motion.div>
          </div>

          {/* Hero Typography & CTA */}
          <div className='text-center mb-24 md:mb-32'>
            <motion.h1
              initial={{ opacity: 0, y: 25 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className='text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold tracking-tight leading-[1.15] max-w-4xl mx-auto text-gray-950'
            >
              Master Your Interviews with{' '}
              <span className='bg-gradient-to-r from-emerald-600 via-teal-500 to-cyan-600 bg-clip-text text-transparent'>
                AI Intelligence
              </span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.25 }}
              className='text-gray-600 mt-6 max-w-2xl mx-auto text-base sm:text-lg md:text-xl font-normal leading-relaxed'
            >
              Role-based adaptive mock interviews with dynamic voice follow-ups,
              real-time confidence metrics, and comprehensive performance analysis.
            </motion.p>

            {/* CTAs */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.35 }}
              className='flex flex-wrap justify-center items-center gap-4 mt-10'
            >
              <button
                onClick={() => {
                  if (!userData) {
                    setShowAuth(true);
                    return;
                  }
                  navigate("/interview");
                }}
                className='group relative inline-flex items-center gap-2.5 bg-gradient-to-r from-gray-950 via-gray-900 to-gray-800 hover:from-black hover:to-gray-900 text-white px-9 py-3.5 rounded-full font-semibold text-sm md:text-base shadow-lg shadow-black/15 hover:shadow-xl hover:shadow-emerald-900/20 hover:scale-[1.02] active:scale-[0.98] transition-all cursor-pointer'
              >
                <span>Start Free Interview</span>
                <BsArrowRight size={16} className='group-hover:translate-x-1 transition-transform' />
              </button>

              <button
                onClick={() => {
                  if (!userData) {
                    setShowAuth(true);
                    return;
                  }
                  navigate("/history");
                }}
                className='inline-flex items-center gap-2 bg-white/80 hover:bg-white backdrop-blur-md border border-gray-200 hover:border-gray-300 text-gray-700 hover:text-black px-8 py-3.5 rounded-full font-semibold text-sm md:text-base shadow-sm hover:shadow transition-all cursor-pointer'
              >
                <span>View Past History</span>
              </button>
            </motion.div>
          </div>

          {/* 3 Step Interactive Workflow Cards */}
          <div className='flex flex-col md:flex-row justify-center items-stretch gap-8 mb-32 max-w-5xl mx-auto'>
            {[
              {
                icon: <BsRobot size={26} />,
                step: "STEP 01",
                title: "Role & Experience",
                desc: "Select your desired tech or non-tech role. AI calibrates difficulty dynamically to match your target level."
              },
              {
                icon: <BsMic size={26} />,
                step: "STEP 02",
                title: "Smart Voice Simulation",
                desc: "Engage in natural voice-based questioning with contextual follow-ups that challenge your problem solving."
              },
              {
                icon: <BsClock size={26} />,
                step: "STEP 03",
                title: "Real-Time Feedback",
                desc: "Get instant scores on technical depth, tone confidence, and an in-depth downloadable improvement report."
              }
            ].map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.15 }}
                whileHover={{ y: -8, scale: 1.02 }}
                className={`
                  relative flex-1 bg-white/90 backdrop-blur-xl rounded-3xl border border-gray-200/80 
                  p-8 pt-12 shadow-[0_10px_30px_rgba(0,0,0,0.04)] hover:shadow-2xl hover:border-emerald-400 
                  transition-all duration-300 flex flex-col items-center text-center
                  ${index === 1 ? "md:-mt-4 border-emerald-200/90 shadow-lg ring-1 ring-emerald-500/20" : ""}
                `}
              >
                {/* Floating Icon Box */}
                <div className='absolute -top-7 left-1/2 -translate-x-1/2 w-14 h-14 rounded-2xl bg-gradient-to-tr from-emerald-600 to-teal-400 text-white flex items-center justify-center shadow-lg shadow-emerald-500/30 border-2 border-white'>
                  {item.icon}
                </div>

                <span className='inline-block text-[11px] font-bold text-emerald-600 bg-emerald-50 border border-emerald-200/60 px-3 py-1 rounded-full mb-3 tracking-wider'>
                  {item.step}
                </span>
                <h3 className='font-bold text-gray-900 text-lg md:text-xl mb-3'>
                  {item.title}
                </h3>
                <p className='text-sm text-gray-500 leading-relaxed'>
                  {item.desc}
                </p>
              </motion.div>
            ))}
          </div>

          {/* Advanced AI Capabilities */}
          <section className='mb-32'>
            <div className='text-center max-w-2xl mx-auto mb-16'>
              <span className='text-xs font-bold text-emerald-600 uppercase tracking-widest bg-emerald-50 border border-emerald-200/70 px-3.5 py-1 rounded-full'>
                Core Features
              </span>
              <h2 className='text-3xl sm:text-4xl font-extrabold text-gray-900 mt-4'>
                Advanced AI{' '}
                <span className='bg-gradient-to-r from-emerald-600 to-teal-500 bg-clip-text text-transparent'>
                  Capabilities
                </span>
              </h2>
              <p className='text-gray-500 text-sm sm:text-base mt-3'>
                Cutting-edge AI algorithms designed to replicate rigorous top-tier technical and HR interview rounds.
              </p>
            </div>

            <div className='grid md:grid-cols-2 gap-8'>
              {[
                {
                  image: evalImg,
                  icon: <BsBarChart size={20} />,
                  title: "AI Answer Evaluation",
                  desc: "Multidimensional scoring that evaluates communication clarity, technical correctness, and concise structuring."
                },
                {
                  image: resumeImg,
                  icon: <BsFileEarmarkText size={20} />,
                  title: "Resume-Based Questioning",
                  desc: "Upload your resume in PDF format. The platform automatically extracts your listed tech stack and projects for deep inquiry."
                },
                {
                  image: pdfImg,
                  icon: <BsCheck2Circle size={20} />,
                  title: "Downloadable PDF Analytics",
                  desc: "Export comprehensive breakdown reports with clear actionable advice, highlighted strengths, and key preparation gaps."
                },
                {
                  image: analyticsImg,
                  icon: <BsBarChart size={20} />,
                  title: "Growth History & Progress",
                  desc: "Track your progress across multiple interview attempts with performance analytics, metrics, and score histories."
                }
              ].map((item, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  whileHover={{ y: -4 }}
                  className='group bg-white/90 backdrop-blur-md border border-gray-200/80 rounded-3xl p-8 shadow-sm hover:shadow-xl hover:border-emerald-300 transition-all'
                >
                  <div className='flex flex-col sm:flex-row items-center gap-6'>
                    <div className='w-full sm:w-1/2 flex justify-center bg-gray-50/80 rounded-2xl p-4 group-hover:bg-emerald-50/40 transition-colors'>
                      <img
                        src={item.image}
                        alt={item.title}
                        className='w-full h-auto object-contain max-h-48 group-hover:scale-105 transition-transform duration-300'
                      />
                    </div>

                    <div className='w-full sm:w-1/2'>
                      <div className='w-11 h-11 rounded-xl bg-gradient-to-tr from-emerald-50 to-teal-50 border border-emerald-200/80 text-emerald-600 flex items-center justify-center mb-4 shadow-sm'>
                        {item.icon}
                      </div>
                      <h3 className='font-bold text-gray-900 text-lg md:text-xl mb-2'>
                        {item.title}
                      </h3>
                      <p className='text-gray-500 text-xs sm:text-sm leading-relaxed'>
                        {item.desc}
                      </p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </section>

          {/* Multiple Interview Modes */}
          <section className='mb-24'>
            <div className='text-center max-w-2xl mx-auto mb-16'>
              <span className='text-xs font-bold text-emerald-600 uppercase tracking-widest bg-emerald-50 border border-emerald-200/70 px-3.5 py-1 rounded-full'>
                Simulation Modes
              </span>
              <h2 className='text-3xl sm:text-4xl font-extrabold text-gray-900 mt-4'>
                Tailored Interview{' '}
                <span className='bg-gradient-to-r from-emerald-600 to-teal-500 bg-clip-text text-transparent'>
                  Tracks
                </span>
              </h2>
              <p className='text-gray-500 text-sm sm:text-base mt-3'>
                Practice exactly what you need with tailored interview configurations.
              </p>
            </div>

            <div className='grid md:grid-cols-2 gap-8'>
              {[
                {
                  img: hrImg,
                  title: "HR Behavioral Mode",
                  desc: "Scenario-based behavioral rounds, STAR-method answers, leadership questions, and cultural fitment."
                },
                {
                  img: techImg,
                  title: "Technical Engineering Mode",
                  desc: "Rigorous coding logic, architecture, database schemas, and deep role-specific questions."
                },
                {
                  img: confidenceImg,
                  title: "Tone & Confidence Analysis",
                  desc: "Voice modulation, hesitation detection, and speech cadence tracking to polish your delivery."
                },
                {
                  img: creditImg,
                  title: "Credit-Based Practice",
                  desc: "Flexible interview credit packages so students can practice unlimited mock sessions anytime."
                }
              ].map((mode, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  whileHover={{ y: -5 }}
                  className='bg-white/90 backdrop-blur-md border border-gray-200/80 rounded-3xl p-7 shadow-sm hover:shadow-xl hover:border-teal-300 transition-all'
                >
                  <div className='flex items-center justify-between gap-6'>
                    <div className='w-3/5'>
                      <h3 className='font-bold text-gray-900 text-lg md:text-xl mb-2'>
                        {mode.title}
                      </h3>
                      <p className='text-gray-500 text-xs sm:text-sm leading-relaxed'>
                        {mode.desc}
                      </p>
                    </div>

                    <div className='w-2/5 flex justify-end'>
                      <div className='p-3 bg-gray-50/80 rounded-2xl border border-gray-100 flex items-center justify-center'>
                        <img
                          src={mode.img}
                          alt={mode.title}
                          className='w-24 h-24 object-contain hover:scale-105 transition-transform'
                        />
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </section>

        </div>
      </main>

      {showAuth && <AuthModel onClose={() => setShowAuth(false)} />}

      <Footer />
    </div>
  )
}

export default Home
