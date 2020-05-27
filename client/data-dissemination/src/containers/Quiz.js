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
        registerAnswer: () => dispatch(registerAnswer())
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Quiz)