import "./Weather.css"

const Weather = () => {
    
    return(
        <div className="Weather">
            <div className="weather-layout">
                <div className="current-conditions">
                    <p>Sun / Rain / Storm / Cloudy / Snow</p>
                </div>
                <div className="other-details">
                    <div className="humidity">
                        <p>100% Humidty</p>
                    </div>
                    <div className="wind-speed">
                        <p> 2000 mph Winds</p>
                    </div>
                    <div className="cloud-over-total">
                        <p>100% Cloud Coverage</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Weather;