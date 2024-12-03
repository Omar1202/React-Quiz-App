import { useState, useCallback } from 'react';
import QUESTIONS from '../questions.js';
import Question from './Question.jsx';
import Sumary from './Summary.jsx';

export default function Quiz() {
    const [answers, storeAnswers] = useState([]);

    let actualQuestionIdx = answers.length;
       
    let quizCompleted = answers.length === QUESTIONS.length;

    const handleSelectAnswer = useCallback(function handleSelectAnswer(selectedAnswer) {
        
        storeAnswers( (prevAnswers) => {
            return [...prevAnswers, selectedAnswer];
        });
    });

    const handleSkipAnswer = useCallback(() => {
        handleSelectAnswer(null)
    }, [handleSelectAnswer]);

    let content = null;
    if(quizCompleted) {
        content = (
            <Sumary data={answers} />
        )
    } else {
        content = (<div id="quiz">
            {
                actualQuestionIdx < QUESTIONS.length && (
                   <Question 
                   key={actualQuestionIdx}
                   actualIdx={actualQuestionIdx}
                   skipF={handleSkipAnswer}
                   onSelectF={handleSelectAnswer}
                   />
                )
            }
        </div>
        );
    }
    
    return (
        <>
        {content}
        </>
    )
}