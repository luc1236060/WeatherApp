import React from "react";
import "./TempButtons.css";

const TempButtons = ({unit, changeUnit}) => {

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
                   °C
                </button>
                <button
                    onClick={() =>switchUnit('F')} 
                    className={`toggle-button ${unit == 'F' ? 'active' : ''}`}
                    aria-label="Fahrenheit"
                >
                    °F
                </button>
            </div>
        </div>
    );
};

export default TempButtons;