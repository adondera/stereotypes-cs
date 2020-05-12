import { connect } from "react-redux";
import Question from "../components/Question";

const mapStateToProps = (state, ownProps) => {
    const questionIndex = state.mainAppReducer.questionIndex
    return {
        questionData: state.mainAppReducer.questions.questions[questionIndex-1],
        questionIndex: ownProps.questionIndex,
        quizStarted: ownProps.quizStarted,
        onQuestionChange: ownProps.onQuestionChange,
    }
}

export default connect(mapStateToProps)(Question)