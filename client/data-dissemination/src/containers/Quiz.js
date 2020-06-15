import {registerAnswer, sendQuiz} from '../actions/quiz';
import Quiz from '../components/Quiz';
import {connect} from 'react-redux';

const mapStateToProps = (state, ownProps) => {
    return {
        ...ownProps
    }
}

const mapDispatchToProps = dispatch => {
    return {
        registerAnswer: (answer) => dispatch(registerAnswer(answer)),
        finishQuiz: () => dispatch(sendQuiz())
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Quiz)