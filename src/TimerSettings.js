import React from 'react';

function TimerSettings({ duration, onDurationChange }) {
    return (
        <div>
            <label>Set Timer Duration (minutes):</label>
            <input
                type="number"
                value={duration}
                onChange={(e) => onDurationChange(Number(e.target.value))}
                min="1"
                max="60"
            />
        </div>
    );
}

export default TimerSettings;
