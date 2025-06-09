import React from "react";
import "./Home.css";
import TempButtons from "../TempButtons/TempButtons";
import TimeDial from "../TimeDial/TimeDial";
import Temp from "../Temp/Temp";

const Home = () => {
    const [weatherTime, setWeatherTime] = React.useState(null);
    const [unit, setUnit] = React.useState("F");

    return (
        <div>
            <div className="container">
                <div className="home-layout">
                    <div className="header">
                        {/*<TimeDial time={weatherTime}/>*/}
                        <TempButtons unit={unit} changeUnit={setUnit}/>
                    </div>
                    <Temp unit={unit} onWeatherTimeChange={setWeatherTime}/>
                </div>
            </div>
        </div>
    );
};

export default Home;