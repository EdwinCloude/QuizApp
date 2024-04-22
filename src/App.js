import React, { useState } from 'react';
import './App.css';
import FileUpload from './FileUpload';
import Quiz from './Quiz';

function App() {
    const [questions, setQuestions] = useState([]);
    const [quizStarted, setQuizStarted] = useState(false);
    const [fileLoaded, setFileLoaded] = useState(false); // Added state for file load status

    const handleFileLoaded = (newQuestions) => {
        setQuestions(newQuestions);
        setQuizStarted(true);
        setFileLoaded(true); // Update file loaded status when new questions are loaded
    };

    // Function to handle the file load status change
    const handleFileLoadStatusChange = (status) => {
        setFileLoaded(status);
    };

    const handleQuizEnd = () => {
        setQuizStarted(false);
        setFileLoaded(false); // Reset file loaded status when quiz ends
    };

    return (
        <div className="App">
            <header className="App-header">
                <h1>Quiz Application</h1>
                {!quizStarted ? (
                    // Pass the handleFileLoadStatusChange function to FileUpload
                    <FileUpload onFileLoaded={handleFileLoaded} onFileLoadStatusChange={handleFileLoadStatusChange} />
                ) : (
                    // Pass fileLoaded to Quiz so it knows when the file has been loaded
                    <Quiz questions={questions} fileLoaded={fileLoaded} onQuizEnd={handleQuizEnd} />
                )}
            </header>
        </div>
    );
}

export default App;
