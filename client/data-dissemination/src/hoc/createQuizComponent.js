import BinaryQuestion from "../components/quizComponents/BinaryQuestion";
import LikertScaleQuestion from "../components/quizComponents/Likert";
import React from "react";

/*
Create mapping between type and Component to be rendered
*/
const mapTypeToComponent = {
  1: BinaryQuestion,
  2: LikertScaleQuestion,
};


/*
HOC Component to Wrap question types for injecting type and 
add Modal for exiting quiz prematurely
*/
export function createQuizComponent(Quiz) {
  return class QuizHoc extends React.Component {
    render() {
      console.log(this.props.quizData)
      var QuizContentType = React.Fragment;
      QuizContentType = this.props.quizData.length > 0 ? mapTypeToComponent[this.props.quizData[this.props.quizIndex].type] : React.Fragment;
      var contentData = this.props.quizData.length > 0 ? this.props.quizData[this.props.quizIndex] : {};
      return (
        <React.Fragment>
            <Quiz {...this.props}>
              <QuizContentType onNext={this.props.incrementQuizIndex} key={this.props.quizIndex} {...contentData}> 
              </QuizContentType>
            </Quiz>
        </React.Fragment>
      );
    }
  };
}

