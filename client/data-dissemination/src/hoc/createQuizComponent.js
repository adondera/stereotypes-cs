import BinaryQuestion from "../components/quizComponents/BinaryQuestion";
import React from "react";

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
    render() {
      var QuizContentType = React.Fragment;
    QuizContentType = mapTypeToComponent[1];
      return (
        <React.Fragment>
            <Quiz>
              <QuizContentType {...this.props}> 
              </QuizContentType>
            </Quiz>
        </React.Fragment>
      );
    }
  };
}

