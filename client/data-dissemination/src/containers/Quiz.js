import {registerAnswer} from '../actions/quiz';
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
        finishQuiz: () => console.log('finish quiz')
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Quiz)