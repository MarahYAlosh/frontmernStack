import React, { useEffect, useState } from "react";
// import "./StopWatch.css";
import Timer from "../components/Timer";

function StopWatch({ done, handlePauseResume }) {
    const [isActive, setIsActive] = useState(true);
    const [isPaused, setIsPaused] = useState(false);
    const [time, setTime] = useState(0);
    const [pausedTime, setPausedTime] = useState(0);

    useEffect(() => {
        let interval = null;

        if (isActive && isPaused === false) {
            interval = setInterval(() => {
                setTime((time) => time + 10);
            }, 10);
        } else {
            clearInterval(interval);
        }
        return () => {
            clearInterval(interval);
        };
    }, [isActive, isPaused]);

    const handleStart = () => {
        setIsActive(true);
        setIsPaused(false);
    };


    const handleReset = () => {
        setIsActive(false);
        setTime(0);
    };

    useEffect(() => {
        if (done) {
            setPausedTime(time);
            handlePauseResume({ second: +("0" + Math.floor((time / 1000) % 60)).slice(-2), minute: +("0" + Math.floor((time / 60000) % 60)).slice(-2) });

           // setIsPaused(!isPaused);
            setIsPaused(true);
        }
    }, [done]);
    return (
        <div className="stop-watch">
            <Timer time={time} />

        </div>
    );
}

export default StopWatch;