import BinaryQuestion from "../components/QuestionTypes/BinaryQuestion";
import LikertScaleQuestion from "../components/QuestionTypes/LikertScaleQuestion.js";
import React from "react";
import Video from "../components/QuestionTypes/Video";
import Information from "../components/QuestionTypes/Information";
import Finish from "../components/QuestionTypes/Finish";
import MultipleChoice from "../components/QuestionTypes/MultipleChoice";
import { Redirect } from "react-router";
const mapTypeToComponent = {
  1: BinaryQuestion,
  2: LikertScaleQuestion,
  3: Video,
  4: Information,
  5: Finish,
  6: MultipleChoice,
};

export function createQuestion(Question) {
  return class QuestionHoc extends React.Component {
    render() {
      var QuestionType = React.Fragment
      if (this.props.questionIndex > 0) {
        QuestionType = mapTypeToComponent[this.props.questionData.type];
      }
      return (
        <React.Fragment>
          {this.props.questionIndex === 0 ? (
            <Redirect to="/app" />
          ) : (
            <Question {...this.props}>
              <QuestionType
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
