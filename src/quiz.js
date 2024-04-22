import React, { useState} from 'react';
import Question from './Question';
import FileUpload from './FileUpload';
import Timer from './Timer';
import QuizLogHistory from './QuizLogHistory';

function Quiz() {
    const [questions, setQuestions] = useState([]);
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [score, setScore] = useState(0);
    const [quizStarted, setQuizStarted] = useState(false);
    const [showResults, setShowResults] = useState(false);
    const [timerDuration, setTimerDuration] = useState(10); // Initial timer duration in minutes
    const [quizLog, setQuizLog] = useState([]); // Log of quiz results

    const handleFileLoaded = (loadedQuestions) => {
        setQuestions(loadedQuestions);
        setQuizStarted(true);
        setShowResults(false);
        setCurrentQuestionIndex(0);
        setScore(0);
        setTimerDuration(10); // Reset timer to initial duration when file is loaded
    };

    const handleAnswer = (isCorrect) => {
        if (isCorrect) {
            setScore(prevScore => prevScore + 1);
        }
        const nextIndex = currentQuestionIndex + 1;
        if (nextIndex < questions.length) {
            setCurrentQuestionIndex(nextIndex);
        } else {
            setShowResults(true);
            setQuizStarted(false);
            setTimerDuration(0); // Stop the timer when quiz ends
            setQuizLog(log => [...log, { date: new Date(), score, totalQuestions: questions.length }]);
        }
    };

    const handleTimeUp = () => {
        setShowResults(true);
        setQuizStarted(false);
        setTimerDuration(0); // Stop the timer when time is up
        setQuizLog(log => [...log, { date: new Date(), score, totalQuestions: questions.length }]);
    };

    const resetQuiz = () => {
        setQuestions([]);
        setCurrentQuestionIndex(0);
        setScore(0);
        setQuizStarted(false);
        setShowResults(false);
        setTimerDuration(10); // Reset timer to initial duration
    };

    const handleQuit = () => {
        resetQuiz();
    };

    const playAgain = () => {
        // Assuming playAgain should start a new quiz with the same questions
        setCurrentQuestionIndex(0);
        setScore(0);
        setShowResults(false);
        setQuizStarted(true);
        setTimerDuration(10); // Reset timer to initial duration for the new quiz
    };

    return (
        <div className="App">
            {!quizStarted && !showResults && (
                <FileUpload key={currentQuestionIndex} onFileLoaded={handleFileLoaded} />
            )}
            {quizStarted && !showResults && (
                <>
                    <Timer duration={timerDuration} onTimeUp={handleTimeUp} />
                    <Question
                        key={`question-${currentQuestionIndex}`}
                        questionText={questions[currentQuestionIndex]?.questionText}
                        options={questions[currentQuestionIndex]?.options}
                        onAnswer={handleAnswer}
                    />
                </>
            )}
            {showResults && (
                <div>
                    <h2>Your score: {score}/{questions.length}</h2>
                    <button onClick={playAgain}>Play Again</button>
                    <button onClick={handleQuit}>Quit</button>
                    <QuizLogHistory log={quizLog} />
                </div>
            )}
        </div>
    );
}

export default Quiz;
