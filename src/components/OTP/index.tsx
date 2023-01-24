import React, { useState } from "react";
import { Timer } from "./CircularTimer";

interface IOTPProps{
    value:"email"|"sms";
    onChange:(value:"email"|"sms")=>void;
    onSendOtp:()=>void;
    submitLabel?:string;
    resendLabel?:string;

}
export const OTPMethod:React.FunctionComponent<IOTPProps> =({value,onChange,onSendOtp,submitLabel="Send OTP",resendLabel="Resend"})=>{
    const [isClickedOnce, setIsClickedOnce] = useState<boolean>(false);
    const [isProgressing, setIsProgressing] = useState<boolean>(false)

    const handleSubmit=()=>{
        if(!isClickedOnce){
            setIsClickedOnce(true)
        }
        onSendOtp()
        setIsProgressing(true)
    }

    const onComplete=()=>{
        setIsProgressing(false)
    }

    return (
        <div className="py-2 flex flex-wrap items-center justify-between">
            <div className="flex items-center">
               <input type='radio' checked={value==="email"}  name='otp' value="email" onClick={()=>{onChange('email')}} /><label className="ml-2">Email</label>
               <input type='radio' checked={value==="sms"}  name='otp' value="sms" onClick={()=>{onChange('sms')}} className="ml-6"/><label className="ml-2">SMS</label>
            </div>
            <div className="m-2 flex flex-grow justify-end items-center"> 
            {isProgressing&&<Timer totalTime={90*1000} onComplete={onComplete}/>}
            </div>
            <button className="m-1 text-sm text-foreground-accent p-2 rounded border border-primary " onClick={handleSubmit} disabled={isProgressing}>{isClickedOnce?resendLabel:submitLabel} </button>
       </div> 
    );
}

