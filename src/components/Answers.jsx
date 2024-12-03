import { useRef } from "react";

export default function Answer({ answers, selectedAnswer, answerState, onSelect}) {
    const shuffledAnswers = useRef();

    if(!shuffledAnswers.current) {
        shuffledAnswers.current = [...answers];
        shuffledAnswers.current.sort(() => Math.random() - 0.5);
    }
    
    return (
    <ul id='answers'>
        {
            shuffledAnswers.current.map((ans) => {
                const isSelected = ans === selectedAnswer;
                let cssClass = "";

                if(answerState === 'answered' && isSelected ) {
                    cssClass = 'selected';
                }
                if(answerState !== 'answered' && isSelected) {
                    cssClass = answerState;
                }
                return (
                    <li key={ans} className='answer'>
                        <button className={cssClass} onClick={() => onSelect(ans)} disabled={answerState !== ''}>{ans}</button>
                    </li>
                );
            })
        }
    </ul>
    );
}