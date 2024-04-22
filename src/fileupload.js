import React from 'react';

function FileUpload({ onFileLoaded }) {
    const handleFileRead = async (event) => {
        const file = event.target.files[0];
        if (file) {
            try {
                const reader = new FileReader();
                reader.onload = () => {
                    const text = reader.result;
                    const questions = parseQuizFile(text);
                    onFileLoaded(questions);
                };
                reader.readAsText(file);
            } catch (error) {
                console.error('Error reading file:', error);
            }
        }
    };

    const parseQuizFile = (text) => {
        return text.split('\n\n').map(block => {
            const parts = block.split('\n');
            const questionText = parts[0];
            const options = parts.slice(1).map(option => ({
                text: option.replace('*', '').trim(),
                isCorrect: option.startsWith('*')
            }));
            return { questionText, options };
        });
    };

    return (
        <div className="file-input">
            <label htmlFor="quiz-file-input">Choose a quiz file:</label>
            <input
                id="quiz-file-input"
                type="file"
                accept=".txt"  // Restrict files to .txt only
                onChange={handleFileRead}
                style={{ display: 'block' }}
            />
        </div>
    );
}

export default FileUpload;
