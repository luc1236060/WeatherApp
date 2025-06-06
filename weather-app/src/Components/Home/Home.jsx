import React from "react";
import "./Home.css"
import TempButtons from "../TempButtons/TempButtons";
import TimeDial from "../TimeDial/TimeDial";
import Temp from "../Temp/Temp";
import Weather from "../Weather/Weather";

const Home = () => {

    return (

        <div>
            <div className="container">
                <div className="home-layout">
                    <div className="header">
                        
                    </div>
                    <TempButtons/>
                    <TimeDial/>
                    <Temp/>
                </div>
            </div>
        </div>

    );
};

export default Home;