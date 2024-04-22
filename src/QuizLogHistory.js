import React from 'react';

function QuizLogHistory({ log }) {
    return (
        <div className="quiz-log-history">
            <h2>Quiz History</h2>
            {log.length > 0 ? (
                <ul>
                    {log.map((entry, index) => (
                        <li key={index}>
                            Date: {entry.date.toLocaleDateString()} - Score: {entry.score}/{entry.totalQuestions}
                        </li>
                    ))}
                </ul>
            ) : (
                <p>No history to display.</p>
            )}
        </div>
    );
}

export default QuizLogHistory;
