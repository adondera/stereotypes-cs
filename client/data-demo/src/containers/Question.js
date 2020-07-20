import { connect } from "react-redux";
import Question from "../components/Question";
import {clearQuestionsStore} from "../actions/question"

const mapStateToProps = (state, ownProps) => {
    const questionIndex = state.mainAppReducer.questionIndex
    return {
        questionData: state.mainAppReducer.questions.questions[questionIndex-1],
        ...ownProps
    }
}

const mapDispatchToProps = dispatch => ({
    clearQuestions: () => dispatch(clearQuestionsStore()),
})

export default connect(mapStateToProps, mapDispatchToProps)(Question)