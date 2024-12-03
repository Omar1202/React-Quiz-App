import ProgressBar from './ProgressBar.jsx';
import QUESTIONS from '../questions.js';
import Answers from './Answers.jsx';
import { useState } from 'react';

export default function Question({ 
    actualIdx,
    skipF,
    onSelectF }) {

    const [answer, setAnswer] = useState({
        selectedAnswer: '',
        isCorrect: null
    });

    let timer = 10000;

    if(answer.selectedAnswer) {
        timer = 1000;
    }

    if (answer.isCorrect !== null) {
        timer = 2000;
    }

    let questionText = QUESTIONS[actualIdx].text;
    let answers = QUESTIONS[actualIdx].answers;

    function handleSelectedAnswer(answerR) {
        setAnswer({
            selectedAnswer: answerR,
            isCorrect: null
        });

        setTimeout( () => {
            setAnswer({
                selectedAnswer: answerR,
                isCorrect: QUESTIONS[actualIdx].answers[0] === answerR
            });

            setTimeout( () =>{
                onSelectF(answerR);
            },2000);
        }, 1000);
    }
    
    let answerState = '';

    if(answer.selectedAnswer && answer.isCorrect !== null) {
        answerState = answer.isCorrect ? 'correct': 'wrong';
    } else if(answer.selectedAnswer) {
        answerState = 'answered';
    }
    
    return (
        <div id='question'>
            <ProgressBar 
            key={timer}
            timeMax={timer} 
            onTimeoutF={answer.selectedAnswer === '' ? skipF: null} 
            mode={answerState}
            />

            <h2>{questionText}</h2>

            <Answers
            answers={answers}
            selectedAnswer={answer.selectedAnswer}
            answerState={answerState}
            onSelect={handleSelectedAnswer}
            />
        </div>
    );
}