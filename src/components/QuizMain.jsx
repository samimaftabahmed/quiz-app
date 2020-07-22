import React, {Component} from 'react';
import quizService from "../service/quizService"

class QuizMain extends Component {

    state = {
        questionBank: []
    };

    getQuestions = () => {

        quizService.then(question => {
            this.setState({questionBank: question});
        });
    }

    componentDidMount() {
        this.getQuestions();
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
                        this.state.questionBank.map(q => {
                            return <h4>{q.question}</h4>
                        })
                    }
                </div>
            </div>
        );
    }
}

export default QuizMain;
