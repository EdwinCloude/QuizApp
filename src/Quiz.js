import React, { useState } from 'react';
import Question from './Question';
import FileUpload from './FileUpload';
import Timer from './Timer';
import TimerSettings from './TimerSettings'; // Import the TimerSettings component
import QuizLogHistory from './QuizLogHistory';

function Quiz() {
    const [questions, setQuestions] = useState([]);
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [score, setScore] = useState(0);
    const [quizStarted, setQuizStarted] = useState(false);
    const [showResults, setShowResults] = useState(false);
    const [userSetTimerDuration, setUserSetTimerDuration] = useState(10); // State for user-set timer duration
    const [quizLog, setQuizLog] = useState([]); // Log of quiz results

    const handleFileLoaded = (loadedQuestions) => {
        setQuestions(loadedQuestions);
        setShowResults(false);
        setCurrentQuestionIndex(0);
        setScore(0);
        setQuizStarted(true);
    };

    const handleAnswer = (isCorrect) => {
        if (isCorrect) {
            setScore((prevScore) => prevScore + 1);
        }
        const nextIndex = currentQuestionIndex + 1;
        if (nextIndex < questions.length) {
            setCurrentQuestionIndex(nextIndex);
        } else {
            setShowResults(true);
            setQuizStarted(false);
            setQuizLog((log) => [
                ...log,
                { date: new Date(), score, totalQuestions: questions.length },
            ]);
        }
    };

    const handleTimeUp = () => {
        setShowResults(true);
        setQuizStarted(false);
        setQuizLog((log) => [
            ...log,
            { date: new Date(), score, totalQuestions: questions.length },
        ]);
    };

    const resetQuiz = () => {
        setQuestions([]);
        setShowResults(false);
        setCurrentQuestionIndex(0);
        setScore(0);
        setQuizStarted(false);
    };

    const playAgain = () => {
        setShowResults(false);
        setCurrentQuestionIndex(0);
        setScore(0);
        setQuizStarted(true);
    };

    const handleTimerDurationChange = (newDuration) => {
        setUserSetTimerDuration(newDuration);
    };

    return (
        <div className="App">
            {!quizStarted && !showResults && (
                <>
                    <FileUpload onFileLoaded={handleFileLoaded} />
                    <TimerSettings duration={userSetTimerDuration} onDurationChange={handleTimerDurationChange} />
                </>
            )}
            {quizStarted && !showResults && (
                <>
                    <Timer duration={userSetTimerDuration} onTimeUp={handleTimeUp} />
                    <Question
                        questionText={questions[currentQuestionIndex]?.questionText}
                        options={questions[currentQuestionIndex]?.options}
                        onAnswer={handleAnswer}
                    />
                </>
            )}
            {showResults && (
                <>
                    <h2>Your score: {score}/{questions.length}</h2>
                    <button onClick={playAgain}>Play Again</button>
                    <button onClick={resetQuiz}>Quit</button>
                    <QuizLogHistory log={quizLog} />
                </>
            )}
        </div>
    );
}

export default Quiz;
