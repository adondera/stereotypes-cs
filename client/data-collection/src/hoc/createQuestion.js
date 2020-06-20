import BinaryQuestion from "../components/QuestionTypes/BinaryQuestion";
import LikertScaleQuestion from "../components/QuestionTypes/LikertScaleQuestion.js";
import React from "react";
import Video from "../components/QuestionTypes/Video";
import Information from "../components/QuestionTypes/Information";
import Finish from "../components/QuestionTypes/Finish";
import MultipleChoice from "../components/QuestionTypes/MultipleChoice";
import FinishModal from "../components/FinishModal";
import { Redirect } from "react-router";
import MultipleChoiceSpecial from "../components/QuestionTypes/MultipleChoiceSpecial";
import OpenQuestion from "../components/QuestionTypes/OpenQuestion";
import ResearcherNotes from "../components/QuestionTypes/ResearcherNotes";
import BinaryInformation from '../components/QuestionTypes/BinaryInformation';

/*
Create mapping between type and Component to be rendered
*/
const mapTypeToComponent = {
  binary: BinaryQuestion,
  likert: LikertScaleQuestion,
  video: Video,
  information: Information,
  finish: Finish,
  mc_single_answer: MultipleChoice,
  mc_multiple_answer: MultipleChoiceSpecial,
  open_question: OpenQuestion,
  researcher_notes: ResearcherNotes,
  binary_information: BinaryInformation
};

/*
HOC Component to Wrap question types for injecting type and 
add Modal for exiting quiz pr•••••••ematurely
*/
export function createQuestion(Question) {
  return class QuestionHoc extends React.Component {
    constructor(props) {
      super(props);
      this.state = { show: false };
      this.addQListener();
    }
    updateState = (event) => {
      if (event.key === "q") {
        if (
          this.props.questionData.q_type === "open_question" ||
          this.props.questionData.q_type === "researcher_notes"
        ) return;
        this.setState({ show: true });
      }
    };
    addQListener = () => {
      window.addEventListener("keyup", this.updateState);
    };

    componentWillUnmount() {
      window.removeEventListener("keyup", this.updateState);
    }
    render() {
      var QuestionType = React.Fragment;
      if (this.props.questionIndex > 0) {
        QuestionType = mapTypeToComponent[this.props.questionData.q_type];
      }
      return (
        <React.Fragment>
          {this.props.questionIndex === 0 ? (
            <Redirect to="/app" />
          ) : (
            <Question {...this.props}>
              <FinishModal
                show={this.state.show}
                onSkipQuiz={() => this.props.onSkipQuiz()}
                handleCloseModal={() => this.setState({ show: false })}
                handleCloseQuiz={() => {
                  this.props.onQuizFinished();
                  this.props.clearQuestions();
                }}
              />
              <QuestionType
                key={this.props.questionData.q_type}
                disableKeys={this.state.show}
                {...this.props.questionData}
                questionIndex={this.props.questionIndex}
                onNext={() =>
                  this.props.onQuestionChange(this.props.questionIndex)
                }
                onFinish={() => this.props.onQuizFinished()}
              ></QuestionType>
            </Question>
          )}
        </React.Fragment>
      );
    }
  };
}
