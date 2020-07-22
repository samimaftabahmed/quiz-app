import React, {Component} from 'react';
import quizService from "../service/quizService"
import QuestionBox from "./QuestionBox";
import Result from "./Result";

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

    playAgain = () => {
        this.getQuestions();
        this.setState({
            score: 0,
            responses: 0
        })
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
                                                selected={answer => this.computeAnswer(answer, q.correct)}/>
                        })
                    }

                    {
                        this.state.responses === 5 ? (
                            <Result score={this.state.score} playAgain={this.playAgain}/>) : null
                    }


                </div>
            </div>
        );
    }
}

export default QuizMain;
