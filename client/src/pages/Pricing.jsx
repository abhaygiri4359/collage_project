import React, { useState } from 'react'
import { FaArrowLeft, FaCheckCircle } from 'react-icons/fa'
import { HiSparkles } from 'react-icons/hi'
import { useNavigate } from 'react-router-dom'
import { motion } from "motion/react";
import axios from 'axios';
import { ServerUrl } from '../App';
import { useDispatch } from 'react-redux';
import { setUserData } from '../redux/userSlice';

function Pricing() {
  const navigate = useNavigate()
  const [selectedPlan, setSelectedPlan] = useState("free");
  const [loadingPlan, setLoadingPlan] = useState(null);
  const dispatch = useDispatch()

  const plans = [
    {
      id: "free",
      name: "Free Trial",
      price: "₹0",
      credits: 100,
      description: "Ideal for beginners starting mock interview practice.",
      features: [
        "100 AI Interview Credits",
        "Basic Performance Report",
        "Voice Interview Access",
        "Limited History Tracking",
      ],
      default: true,
    },
    {
      id: "basic",
      name: "Starter Pack",
      price: "₹100",
      credits: 150,
      description: "Great for focused preparation and targeted practice.",
      features: [
        "150 AI Interview Credits",
        "Detailed AI Feedback",
        "Performance Analytics",
        "Full Interview History",
      ],
    },
    {
      id: "pro",
      name: "Pro Pack",
      price: "₹500",
      credits: 650,
      description: "Best value for rigorous campus placement preparation.",
      features: [
        "650 AI Interview Credits",
        "Advanced AI Feedback",
        "Skill Trend Analysis",
        "Priority AI Processing",
      ],
      badge: "Most Popular",
    },
  ];

  const handlePayment = async (plan) => {
    try {
      setLoadingPlan(plan.id)

      const amount =  
      plan.id === "basic" ? 100 :
      plan.id === "pro" ? 500 : 0;

      const result = await axios.post(ServerUrl + "/api/payment/order" , {
        planId: plan.id,
        amount: amount,
        credits: plan.credits,
      },{withCredentials:true})
      
      const options = {
        key: import.meta.env.VITE_RAZORPAY_KEY_ID,
        amount: result.data.amount,
        currency: "INR",
        name: "InterviewAI",
        description: `${plan.name} - ${plan.credits} Credits`,
        order_id: result.data.id,
        handler: async function (response) {
          const verifypay = await axios.post(ServerUrl + "/api/payment/verify", response, { withCredentials: true })
          dispatch(setUserData(verifypay.data.user))
          alert("Payment Successful 🎉 Credits Added!");
          navigate("/")
        },
        theme: {
          color: "#10b981",
        },
      }

      const rzp = new window.Razorpay(options)
      rzp.open()
      setLoadingPlan(null);
    } catch (error) {
      console.log(error)
      setLoadingPlan(null);
    }
  }

  return (
    <div className='min-h-screen bg-[#f8fafc] text-gray-900 py-12 md:py-16 px-4 sm:px-6 relative overflow-hidden'>
      {/* Ambient background glow */}
      <div className='pointer-events-none absolute -top-40 left-1/2 -translate-x-1/2 w-[800px] h-[500px] bg-gradient-to-tr from-emerald-200/30 via-teal-100/20 to-sky-200/30 blur-[130px] -z-10 rounded-full' />

      <div className='max-w-6xl mx-auto mb-12 flex items-center justify-between'>
        <button
          onClick={() => navigate("/")}
          className='inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/80 backdrop-blur-md border border-gray-200/80 text-gray-700 hover:text-black hover:bg-white text-xs sm:text-sm font-semibold shadow-sm transition-all cursor-pointer'
        >
          <FaArrowLeft size={12} />
          <span>Back to Home</span>
        </button>

        <div className='text-xs font-semibold text-emerald-700 bg-emerald-50 border border-emerald-200/70 px-3.5 py-1 rounded-full flex items-center gap-1.5'>
          <HiSparkles size={14} className='text-emerald-600' />
          <span>Simple & Transparent Pricing</span>
        </div>
      </div>

      <div className="text-center max-w-2xl mx-auto mb-16">
        <h1 className="text-3xl sm:text-5xl font-extrabold text-gray-950 tracking-tight leading-tight">
          Flexible Plans for{' '}
          <span className='bg-gradient-to-r from-emerald-600 to-teal-500 bg-clip-text text-transparent'>
            Every Student
          </span>
        </h1>
        <p className="text-gray-500 mt-3 text-sm sm:text-base">
          Unlock unlimited interview practice with instant AI credits and comprehensive reports.
        </p>
      </div>

      <div className='grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto'>
        {plans.map((plan) => {
          const isSelected = selectedPlan === plan.id

          return (
            <motion.div
              key={plan.id}
              whileHover={{ y: -6 }}
              onClick={() => !plan.default && setSelectedPlan(plan.id)}
              className={`relative rounded-3xl p-8 transition-all duration-300 border flex flex-col justify-between
                ${isSelected
                  ? "border-emerald-500 shadow-xl bg-white ring-2 ring-emerald-500/20"
                  : "border-gray-200/80 bg-white/90 backdrop-blur-xl shadow-sm hover:shadow-lg"
                }
                ${plan.default ? "cursor-default" : "cursor-pointer"}
              `}
            >
              <div>
                {/* Badge */}
                {plan.badge && (
                  <div className="absolute -top-3 right-6 bg-gradient-to-r from-emerald-600 to-teal-500 text-white text-[11px] font-bold px-3 py-1 rounded-full shadow-md">
                    {plan.badge}
                  </div>
                )}

                {/* Default Tag */}
                {plan.default && (
                  <div className="absolute top-6 right-6 bg-gray-100 text-gray-600 text-xs font-semibold px-3 py-1 rounded-full">
                    Default
                  </div>
                )}

                {/* Plan Name */}
                <h3 className="text-xl font-bold text-gray-900">
                  {plan.name}
                </h3>

                {/* Price */}
                <div className="mt-4 flex items-baseline gap-2">
                  <span className="text-4xl font-extrabold text-gray-950 tracking-tight">
                    {plan.price}
                  </span>
                  <span className="text-xs font-bold text-emerald-700 bg-emerald-50 border border-emerald-200/60 px-2.5 py-0.5 rounded-full">
                    {plan.credits} Credits
                  </span>
                </div>

                {/* Description */}
                <p className="text-gray-500 mt-3 text-xs sm:text-sm leading-relaxed">
                  {plan.description}
                </p>

                <div className='w-full h-px bg-gray-100 my-6' />

                {/* Features */}
                <div className="space-y-3 text-left">
                  {plan.features.map((feature, i) => (
                    <div key={i} className="flex items-center gap-3">
                      <FaCheckCircle className="text-emerald-500 text-sm shrink-0" />
                      <span className="text-gray-700 text-xs sm:text-sm font-medium">
                        {feature}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {!plan.default && (
                <button
                  disabled={loadingPlan === plan.id}
                  onClick={(e) => {
                    e.stopPropagation();
                    if (!isSelected) {
                      setSelectedPlan(plan.id)
                    } else {
                      handlePayment(plan)
                    }
                  }}
                  className={`w-full mt-8 py-3.5 rounded-2xl font-bold text-sm transition-all shadow-md cursor-pointer ${
                    isSelected
                      ? "bg-gradient-to-r from-emerald-600 to-teal-600 text-white hover:from-emerald-700 hover:to-teal-700 shadow-emerald-600/20"
                      : "bg-gray-100 text-gray-800 hover:bg-gray-200"
                  }`}
                >
                  {loadingPlan === plan.id
                    ? "Processing Payment..."
                    : isSelected
                      ? "Proceed to Pay"
                      : "Select Plan"}
                </button>
              )}
            </motion.div>
          )
        })}
      </div>
    </div>
  )
}

export default Pricing
