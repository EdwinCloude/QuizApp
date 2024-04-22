import React, { useEffect, useState } from 'react';

function Timer({ duration, onTimeUp }) {
    const [secondsLeft, setSecondsLeft] = useState(duration * 60);

    useEffect(() => {
        if (secondsLeft <= 0) {
            onTimeUp();
            return;
        }

        const intervalId = setInterval(() => {
            setSecondsLeft((seconds) => seconds - 1);
        }, 1000);

        return () => clearInterval(intervalId);
    }, [secondsLeft, onTimeUp]);

    return (
        <div>
            Time Left: {Math.floor(secondsLeft / 60)}:{String(secondsLeft % 60).padStart(2, '0')}
        </div>
    );
}

export default Timer;
