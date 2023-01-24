import { useEffect, useState } from "react";

interface ITimer{
    totalTime:number;
    onComplete:()=>void;
    isCircular?:boolean
}
export const  Timer:React.FunctionComponent<ITimer> =({totalTime,onComplete,isCircular=true})=>{
    const [progress, setProgress] = useState(100);
    const [secondPassed, setSecondPassed] = useState(0);
  
    useEffect(() => {
      const timer = setInterval(() => {
        setProgress((prevProgress) => (prevProgress <= 0 ? 100 : prevProgress - 1));
      }, totalTime / 100);

      const secondTimer=setInterval(()=>{
        setSecondPassed((prevSecondPassed)=>(prevSecondPassed+1))
      },1000)
  
      setTimeout(() => {
        onComplete()
      }, totalTime);
  
      return () => {
        clearInterval(secondTimer);
        clearInterval(timer);
      };
    }, []);
  
    return ( 
      isCircular ?
      <div className="m-1">                   
       <div className="radial-progress text-primary" style={{"--value":progress, "--size":"3rem","--thickness": "2px"} as React.CSSProperties}>
         {(totalTime/1000)-secondPassed}
       </div>
      </div>:
     <span
     style={
       {
         "--value": progress,
         "--size": "3rem",
         "--thickness": "2px",
       } as React.CSSProperties
     }
   >
     {totalTime / 1000 - secondPassed}
   </span>
    );
  }