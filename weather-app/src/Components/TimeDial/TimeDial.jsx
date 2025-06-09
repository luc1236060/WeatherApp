import React from "react";
import "./TimeDial.css";
import TimeDialPic from "../../assets/TimeDial.png";

//Not gonna use this but takes time from local device,
//and spins the image to represent like a "time dial"
//Kinda like clock from minecraft.

const TimeDial = ({time}) => {
    const [angle, setAngle] = React.useState(0);
    const [displayTime, setDisplayTime] = React.useState("");

    React.useEffect(() => {
        const updateAngle = () => {
            const now = time ? new Date(time) : new Date();
            const secondsSinceMidnight = now.getHours() * 3600 + now.getMinutes() * 60 + now.getSeconds();
            const fractionOfDay = secondsSinceMidnight / (24 * 3600);
            const computedAngle = 180 - fractionOfDay * 360;
            setAngle(computedAngle);
            const formatedTime = now.toLocaleTimeString([], {hour: '2-digit', minute: '2-digit'});
            setDisplayTime(formatedTime);
        }

        updateAngle();
        const interval = setInterval(updateAngle, 60 * 1000);
        return () => clearInterval(interval);
        
    }, [time]);

    return(
        <div className="TimeDial">
            <div className="timedial-layout">
                <img src={TimeDialPic} alt="Time" style={{transform: `rotate(${angle}deg)`}}/>
                <p>Your Local Time: {displayTime}</p>
            </div>
        </div>
    );
};

export default TimeDial;