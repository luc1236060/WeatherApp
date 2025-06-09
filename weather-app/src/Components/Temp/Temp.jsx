import React from "react";
import "./temp.css";
import 'weather-icons/css/weather-icons.min.css';

const Temp = ({unit, onWeatherTimeChange}) => {

    const [tempC, setTempC] = React.useState(null);
    const [city, setCity] = React.useState("");
    const [location, setLocation] = React.useState(null);
    const [weatherCode, setWeatherCode] = React.useState(null);
    const [humidity, setHumidity] = React.useState(null);
    const [windSpeed, setWindSpeed] = React.useState(null);
    const [cloudCoverage, setCloudCoverage] = React.useState(null);
    const [loading, setLoading] = React.useState(false);
    const [error, setError] = React.useState(null);

    const getCondition = (code) => {
        switch(code) {
            case 0: return "Clear sky";
            case 1:
            case 2:
            case 3: return "Cloudy";
            case 45:
            case 48: return "Fog";
            case 51:
            case 53:
            case 55: return "Drizzle";
            case 61:
            case 63:
            case 65: return "Rain";
            case 66:
            case 67: return "Freezing rain";
            case 71:
            case 73:
            case 75:
            case 77: return "Snow";
            case 80:
            case 81:
            case 82: return "Rain showers";
            case 85:
            case 86: return "Snow showers";
            case 95: return "Thunderstorm";
            case 96:
            case 99: return "Storm with hail";
            default: return "Unknown conditions";
        }
    };

    const getConditionIcon = (code) => {
        switch(code) {
            case 0: return "wi wi-day-sunny";
            case 1:
            case 2:
            case 3: return "wi wi-day-cloudy";
            case 45:
            case 48: return "wi wi-day-fog";
            case 51:
            case 53:
            case 55: return "wi wi-sprinkle";
            case 61:
            case 63:
            case 65: return "wi wi-day-rain";
            case 66:
            case 67: return "wi wi-day-sleet";
            case 71:
            case 73:
            case 75:
            case 77: return "wi wi-day-snow";
            case 80:
            case 81:
            case 82: return "wi wi-day-showers";
            case 85:
            case 86: return "Snow showers";
            case 95: return "wi wi-day-thunderstorm";
            case 96:
            case 99: return "wi wi-day-sleet-storm";
            default: return "wi wi-horizon";
        }
    }

    const getTempColor = (temp) => {
        if(temp == null) return "temp-default";

        const tempF = (temp * 9) / 5 + 32;

        if(tempF < 20) return "temp-colder";
        if(tempF >= 21 && tempF <= 40) return "temp-cold";
        if(tempF >= 41 && tempF <= 60) return "temp-chilly";
        if(tempF >= 61 && tempF <= 70) return "temp-neutral";
        if(tempF >= 71 && tempF <= 80) return "temp-warm";
        if(tempF >= 81 && tempF <= 90) return "temp-warmer";
        if(tempF >= 91 && tempF <= 95) return "temp-hot";
        return "temp-hotter";
    }

    const search = async (event) => {
        event.preventDefault();
        setLoading(true);
        setError(null);

        try {
            const geoResponse = await fetch (`https://geocoding-api.open-meteo.com/v1/search?name=${encodeURIComponent(city)}`);
            const geoData = await geoResponse.json();

            if(geoData.results && geoData.results.length > 0) {
                const {latitude, longitude, name, country} = geoData.results[0];
                setLocation({name, country});
                
                const weatherUrl =`https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}
                &current_weather=true&hourly=relativehumidity_2m, cloudcover`.replace(/\s+/g,'');
                const weatherResponse = await fetch(weatherUrl);
                const weatherData = await weatherResponse.json();
                
                if(weatherData.current_weather) {
                    const cw = weatherData.current_weather;
                    setTempC(cw.temperature);
                    setWindSpeed(cw.windspeed);
                    setWeatherCode(cw.weathercode);

                    if(onWeatherTimeChange) {
                        onWeatherTimeChange(cw.time);
                    }

                    const times = weatherData.hourly.time;
                    const currentHour = cw.time.slice(0, 13);
                    const idx = times.findIndex((t) => t.slice(0, 13) == currentHour);

                    if(idx > -1) {
                        setHumidity(weatherData.hourly.relativehumidity_2m[idx]);
                        setCloudCoverage(weatherData.hourly.cloudcover[idx]);
                    }
                    
                } else {
                    setTempC(null);
                    setError("Weather data not found.");
                } 

            } else {
                setError("City not found.");
                setLocation(null);
                setTempC(null);
            }
        } catch(err) {
            console.error(err);
            setError("Error fetching data.");
        } finally {
            setLoading(false);
        }
    }

    const displayTemp = tempC !== null ? unit === "F" ?
    `${Math.round((tempC * 9) / 5 + 32)} °F` : `${tempC} °C` : "N/A";

    const displaySpeed = windSpeed !== null ? unit === "F" ?
    `${Math.round(windSpeed * 0.621371)} mph` : `${windSpeed} km/h` : "N/A";

    return(
        <div className="Temp">
            <div className="temp-layout">
                <div className="top">
                    <h1>The Weather</h1>
                    <h2>
                        {location ? `${location.name}, ${location.country}` : "Please Enter a location."}
                    </h2>
                    <div className="temp-output">
                       {loading ? (<p>Loading...</p>) : (<h2 className={getTempColor(tempC)}>{displayTemp}</h2>)} 
                    </div>
                    <form onSubmit={search}>
                        <div className="input-wrapper">
                            <input type="text" placeholder="Enter City ..." value={city} onChange={(e) => setCity(e.target.value)}/>
                            <button type="submit"><i className="fa-solid fa-magnifying-glass"></i></button>
                        </div>
                    </form>
                    {error && <p style={{color: "red"}}>{error}</p>}
                </div>
                <div className="bottom">
                    <div className="current-conditions">
                        <i className={getConditionIcon(weatherCode)}></i>
                        <p>
                            {weatherCode !== null ? getCondition(weatherCode) : "What is the weather?"}
                        </p>
                    </div>
                    <div className="other-details">
                        <div className="humidity">
                            <h3>Humidity</h3>
                            <i className="wi wi-sprinkle"></i>
                            <p>{humidity !== null ? `${humidity}%` : "N/A"}</p>
                        </div>
                        <div className="wind-speed">
                            <h3>Wind Speed</h3>
                            <i className="wi wi-strong-wind"></i>
                            <p>{displaySpeed}</p>
                        </div>
                        <div className="cloud-over-total">
                            <h3>Cloud Coverage</h3>
                            <i className="wi wi-cloud"></i>
                            <p>{cloudCoverage !== null ? `${cloudCoverage}%` : "N/A"}</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Temp;