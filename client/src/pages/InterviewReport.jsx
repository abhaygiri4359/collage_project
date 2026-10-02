import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import axios from "axios"
import { ServerUrl } from '../App';
import Step3Report from '../components/Step3Report';
function InterviewReport() {
  const {id} = useParams()
  const [report, setReport] = useState(null);
  const [error, setError] = useState(null);
   
  useEffect(()=>{
    const fetchReport = async () => {
      try {
        const result = await axios.get(ServerUrl + "/api/interview/report/" + id , {withCredentials:true})
        setReport(result.data)
      } catch (err) {
        console.error(err)
        setError(err.response?.data?.message || "Failed to load interview report.")
      }
    }

    fetchReport()
  },[id])

  if (error) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center p-4">
        <div className="bg-red-50 text-red-700 p-6 rounded-2xl max-w-md text-center border border-red-200">
          <p className="font-semibold text-lg mb-2">Error</p>
          <p className="text-sm mb-4">{error}</p>
          <a href="/" className="inline-block px-4 py-2 bg-gray-900 text-white rounded-xl text-xs font-semibold">
            Return Home
          </a>
        </div>
      </div>
    );
  }

  if (!report) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-gray-500 text-lg">
          Loading Report...
        </p>
      </div>
    );
  }

  return <Step3Report report={report}/>
}

export default InterviewReport
