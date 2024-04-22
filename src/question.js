import React from 'react';

function Question({ questionText, options, onAnswer }) {
    // Logging for debugging purposes
    console.log("Question Component: Rendering question:", questionText);
    console.log("Question Component: Rendering options:", options);

    if (!questionText) {
        return <div className="question">Loading question...</div>;
    }

    return (
        <div className="question">
            <h2>{questionText}</h2>
            <div className="options">
                {options.map((option, index) => (
                    // Unique key using template literal for combining index and option text
                    <button
                        key={`${index}-${option.text}`}
                        className="option-button"
                        onClick={() => onAnswer(option.isCorrect)}
                    >
                        {option.text}
                    </button>
                ))}
            </div>
        </div>
    );
}

export default Question;
