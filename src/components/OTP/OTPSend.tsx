import { RadioGroup } from "@headlessui/react"
import React, { useEffect, useState } from "react"
import { Timer } from "./CircularTimer"

interface IOTPProps {
  onSendOtp: () => void
  submitLabel?: string
  resendLabel?: string
  otpType:"email"|"sms"
  setOtpType: React.Dispatch<React.SetStateAction<"email" | "sms">>
}

export const OTPSend: React.FunctionComponent<IOTPProps> = ({
  onSendOtp,
  resendLabel = "Resend OTP",
  submitLabel = "Send OTP",
  otpType,
  setOtpType
}) => {
  const [isClickedOnce, setIsClickedOnce] = useState<boolean>(false)
  const [isProgressing, setIsProgressing] = useState<boolean>(false)

  const handleSubmit = () => {
    if (!isClickedOnce) {
      setIsClickedOnce(true)
    }
    onSendOtp()
    setIsProgressing(true)
  }

  const onComplete = () => {
    setIsProgressing(false)
  }

  return (
    <>
      
      <div  className={"flex items-center"}>
      
          <div className="flex items-center gap-1">
            <label>Email</label>
            <input type="radio"  checked={otpType==="email"} onClick={()=>setOtpType("email")} value="email"/>
          </div>
        
                
          <div className="flex items-center gap-1 ml-2">
            <label>SMS</label>
            <input type="radio" checked={otpType==="sms"} onClick={()=>setOtpType("sms")} value="sms"/>           
          </div>    
          {!isClickedOnce&& <button
          className="text-blue-500"
          onClick={handleSubmit}
          disabled={isProgressing}
        >
          {"Send OTP"}
        </button>
        }         
          
    </div> 
     
      {isProgressing && (
        <div className="text-sm lg:text-base">
          OTP Expires in
          <span className=""> <Timer isCircular={false} onComplete={onComplete} totalTime={90 * 1000} /> Sec </span>
        </div>      
      )}
      <div className="text-sm lg:text-base">
       {isClickedOnce&&" Didn’t receive OTP? "}
       {isClickedOnce&& <button
          className="text-blue-500"
          onClick={handleSubmit}
          disabled={isProgressing}
        >
          {isClickedOnce ? resendLabel : submitLabel}
        </button>
      }
      </div>
    </>
  )
}

