import { useEffect, useState } from "react";

const PERIOD = 100;

export default function ProgressBar({ timeMax, onTimeoutF, mode }) {
    const [actualTime, setAtualTime] = useState(timeMax);
    
    useEffect(() => {
        console.log("START TIMEOUT");
        const timeout = setTimeout(onTimeoutF, timeMax);
    
      return () => {
        console.log("CLEAR TIMEOUT");
        clearTimeout(timeout);
      }
    }, [onTimeoutF, timeMax])

    useEffect( () => {
        console.log("START INTERVAL");
        const interval = setInterval( () => {
            setAtualTime( prevTime => prevTime -  PERIOD);
        }, PERIOD)

        return () => {
            console.log("CLEAR INTERVAL");
            clearInterval(interval);
        }
    }, []);


    return <progress  id="question-time" value={actualTime} max={timeMax} className={mode}/>
}