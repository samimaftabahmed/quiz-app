import React, {useState} from 'react';

const QuestionBox = ({question, options, selected}) => {

    const [answer, setAnswer] = useState(options)

    return (
        <div className="questionBox">
            <div className="question">
                {question}
            </div>

            {
                answer.map((text, index) =>
                    (<button key={index} className="answerBtn" onClick={() => answerSelected(text)}>
                        {text}
                    </button>))
            }

        </div>
    );

    function answerSelected(text) {
        setAnswer([text]);
        selected(text);
    }
}

export default QuestionBox;
