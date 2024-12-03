import completedImg from '../assets/quiz-complete.png';
import QUESTIONS from '../questions.js';

export default function Sumary({ data }) {
    const skipped = Math.round((data.filter( (answ) => answ === null ).length)* 100 / data.length);
    const correct = Math.round((data.filter( (answ, idx) => answ === QUESTIONS[idx].answers[0] ).length)* 100 / data.length);
    const incorrect = 100 - skipped - correct;


    return (
        <div id="summary">
            <img src={completedImg} alt="" />
            <h2>Quiz Completed!</h2>
            <div id="summary-stats">
                <p>
                    <span className="number">{skipped}%</span>
                    <span className="text">skipped</span>
                </p>
                <p>
                    <span className="number">{correct}%</span>
                    <span className="text">Answered correctly</span>
                </p>
                <p>
                    <span className="number">{incorrect}%</span>
                    <span className="text">Answered incorrectly</span>
                </p>
            </div>
            <ol>
                {data.map( (answer, idx) => {
                    let cssClass = "user-answer";

                    if(answer === null){
                        cssClass += ' skipped';
                    }
                    else if(answer === QUESTIONS[idx].answers[0]) {
                        cssClass += " correct";
                    } else {
                        cssClass += " wrong";
                    }

                    return (
                        <li key={idx}>
                            <h3>{idx+1}</h3>
                            <p className="question">{QUESTIONS[idx].text}</p>
                            <p className={cssClass}>{answer ?? 'Skipped'}</p>
                        </li>
                    )
                } )}
            </ol>
        </div>
    );
}