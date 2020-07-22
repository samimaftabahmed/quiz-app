import React, {Component} from 'react';
import quizService from "../service/quizService"
import QuestionBox from "./QuestionBox";

class QuizMain extends Component {

    state = {
        questionBank: [],
        score: 0,
        responses: 0
    };

    getQuestions = () => {

        quizService.then(question => {
            this.setState({questionBank: question});
        });
    }

    componentDidMount() {
        this.getQuestions();
    }

    computeAnswer = (answer, correctAnswer) => {
        if (answer === correctAnswer) {
            this.setState({score: this.state.score + 1})
        }
        this.setState(
            {responses: this.state.responses < 5 ? this.state.responses + 1 : 5}
        )
    }


    render() {
        return (
            <div>
                <div className="container">
                    <div className="title">
                        CoolQuiz
                    </div>
                    {
                        this.state.questionBank.length > 0 &&
                        this.state.responses < 5 &&
                        this.state.questionBank.map(q => {
                            return <QuestionBox question={q.question} options={q.answers} key={q.questionId}
                                                selected={answer => this.computeAnswer(q.answers, q.correct)}/>
                        })
                    }
                </div>
            </div>
        );
    }
}

export default QuizMain;
