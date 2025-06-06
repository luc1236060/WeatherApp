import "./TimeDial.css"
import TimeDialPic from "../../assets/TimeDial.png"

const TimeDial = () => {

    return(
        <div className="TimeDial">
            <div className="timedial-layout">
                <img src={TimeDialPic} alt="Time"/>
            </div>
        </div>
    );
};

export default TimeDial;