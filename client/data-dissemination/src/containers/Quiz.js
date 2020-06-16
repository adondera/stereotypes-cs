import {registerAnswer} from '../actions/quiz';
import {incrementQuizIndex} from '../actions/app'
import Quiz from '../components/Quiz';
import {connect} from 'react-redux';

const mapStateToProps = (state, ownProps) => {
    return {
        ...ownProps
    }
}

const mapDispatchToProps = dispatch => {
    return {
        incrementQuizIndex: () => dispatch(incrementQuizIndex()),
        registerAnswer: (answer) => dispatch(registerAnswer(answer)),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Quiz)