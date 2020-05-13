import BinaryQuestion from "../components/QuestionTypes/BinaryQuestion";
import LikertScaleQuestion from "../components/QuestionTypes/LikertScaleQuestion.js";
import React from "react";
import Video from "../components/QuestionTypes/Video";
import Information from "../components/QuestionTypes/Information";
import Finish from "../components/QuestionTypes/Finish";
import { Redirect } from "react-router";
const mapTypeToComponent = {
  1: BinaryQuestion,
  2: LikertScaleQuestion,
  3: Video,
  4: Information,
  5: Finish,
};

export function createQuestion(Question) {
  return class QuestionHoc extends React.Component {
    render() {
      return (
        <React.Fragment>
          {this.props.questionIndex === 0 ? (
            <Redirect to="/app" />
          ) : (
            <Question
              {...this.props}
              questionType={mapTypeToComponent[this.props.questionData.type]}
            ></Question>
          )}
        </React.Fragment>
      );
    }
  };
}
