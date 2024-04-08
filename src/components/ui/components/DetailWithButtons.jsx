import React from "react";

export default function DetailWithButtons({ summary, options, selectedOption, setOption }) {

    return (
        <details
            open={true}
            className='config-ui__details'
            onClick={(e) => e.preventDefault()}
        >
            <summary>
                {summary}
                {/* <span>{selectedOption}</span> */}
            </summary>
            <div className='config-ui__selection-buttons'>
                {options.map((option, index) => (
                    <button
                        key={index}
                        className={selectedOption === option.label ? 'active-selection-button' : ''}
                        onClick={() => {
                            setOption(option.value)
                        }}
                    >
                        {option.label}
                    </button>
                ))}
            </div>
        </details>
    );
}