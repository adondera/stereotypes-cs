import BinaryQuestion from "../components/quizComponents/BinaryQuestion";
import React from "react";
import { Redirect } from "react-router";

/*
Create mapping between type and Component to be rendered
*/
const mapTypeToComponent = {
  1: BinaryQuestion,
};


/*
HOC Component to Wrap question types for injecting type and 
add Modal for exiting quiz prematurely
*/
export function createQuizComponent(Quiz) {
  return class QuizHoc extends React.Component {
    constructor(props) {
      super(props);
    }
    render() {
      var QuizContentType = React.Fragment;
    QuizContentType = mapTypeToComponent[1];
      return (
        <React.Fragment>
            <Quiz {...this.props}>
              <QuizContentType>
              </QuizContentType>
            </Quiz>
        </React.Fragment>
      );
    }
  };
}

