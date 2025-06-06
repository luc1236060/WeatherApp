import React from "react";
import "./TempButtons.css"
import celsius from "../../assets/celsius.png"
import fahrenheit from "../../assets/fahrenheit.png"

const TempButtons = () => {
    const [unit, changeUnit] = React.useState('F')

    const switchUnit = (newUnit) => {
        if (newUnit != unit) {
            changeUnit(newUnit);
        }
    };

    return (    
        <div className="TempButtons">
            <div className="tempbuttons-layout">
                <button
                    onClick={() =>switchUnit('C')} 
                    className={`toggle-button ${unit == 'C' ? 'active' : ''}`}
                    aria-label="Celsius"
                >
                   C{/*<img src={celsius} alt="celsius"/> */}
                </button>
                <button
                    onClick={() =>switchUnit('F')} 
                    className={`toggle-button ${unit == 'F' ? 'active' : ''}`}
                    aria-label="Fahrenheit"
                >
                    F{/*<img src={fahrenheit} alt="fahrenheit"/>*/}
                </button>
            </div>

        </div>
    );
};

export default TempButtons;