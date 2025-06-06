import React from "react"
import "./temp.css";


const Temp = () => {

    const [city, setCity] = React.useState("");
    const [location, setLocation] = React.useState(null);
    const [temp, setTemp] = React.useState(null);
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
                    setTemp(cw.temperature);
                    setWindSpeed(cw.windspeed);
                    setWeatherCode(cw.weathercode);

                    const times = weatherData.hourly.time;
                    const idx = times.findIndex((t) => t == cw.time);

                    if(idx > -1) {
                        setHumidity(weatherData.hourly.relativehumidity_2m[idx]);
                        setCloudCoverage(weatherData.hourly.cloudcover[idx]);
                    }
                    
                } else {
                    setTemp(null);
                    setError("Weather data not found.");
                } 

            } else {
                setError("City not found.");
                setLocation(null);
                setTemp(null);
            }
        } catch(err) {
            console.error(err);
            setError("Error fetching data.");
        } finally {
            setLoading(false);
        }
    }

    return(
        <div className="Temp">
            <div className="temp-layout">
                <div className="top">
                    <h2>
                        {location ? `${location.name}, ${location.country}` : "Location"}
                    </h2>
                    {loading ? (<p>Loading...</p>) : (<h2>{temp !== null ? `${temp} °C` : "Temp"}</h2>)}
                    <form onSubmit={search}>
                        <input type="text" placeholder="Enter City ..." value={city} onChange={(e) => setCity(e.target.value)}/>
                        <button type="submit">Get the Weather</button>
                    </form>
                    {error && <p style={{color: "red"}}>{error}</p>}
                </div>
                <div className="bottom">
                    <div className="current-conditions">
                        <p>
                            {weatherCode !== null ? getCondition(weatherCode) : "Weather Condition"}
                        </p>
                    </div>
                    <div className="other-details">
                        <div className="humidity">
                            <h3>Humidity</h3>
                            <p>{humidity !== null ? `${humidity}%` : "Humidity"}</p>
                        </div>
                        <div className="wind-speed">
                            <h3>Wind Speed</h3>
                            <p>{windSpeed !== null ? `${windSpeed}% km/h` : "Wind Speed"}</p>
                        </div>
                        <div className="cloud-over-total">
                            <h3>Cloud Coverage</h3>
                            <p>{cloudCoverage !== null ? `${cloudCoverage}%` : "Cloud Coverage"}</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Temp;