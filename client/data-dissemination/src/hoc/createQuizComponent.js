import BinaryQuestion from '../components/quizComponents/BinaryQuestion';
import LikertScaleQuestion from '../components/quizComponents/Likert';
import Finish from '../components/quizComponents/Finish';
import Information from '../components/quizComponents/Information';
import Video from '../components/quizComponents/Video';
import MultipleChoise from '../components/quizComponents/MultipleChoise';
import MultipleChoiseSpecial from "../components/quizComponents/MultipleChoiseSpecial";
import BinaryInformation from "../components/quizComponents/BinaryInformation"
import React from 'react';
import withProps from '../hoc/withProps';
import { Redirect } from 'react-router';

/*
Create mapping between type and Component to be rendered
*/
const mapTypeToComponent = {
  'binary': BinaryQuestion,
  'binary_information': BinaryInformation,
  'likert': LikertScaleQuestion,
  'video': Video,
  'information': Information,
  'finish': Finish,
  'mc_single_answer': MultipleChoise,
  'mc_multiple_answer': MultipleChoiseSpecial
};


/*
HOC Component to Wrap question types for injecting type and 
add Modal for exiting quiz prematurely
*/
export function createQuizComponent(Quiz) {
  return class QuizHoc extends React.Component {
    render() {
      const redirectProps = {to: '/'}
      const contentData = this.props.quizIsLoaded ? this.props.quizData[this.props.quizIndex] : {}
      const contentProps = {onNext: this.props.incrementQuizIndex, key: this.props.quizIndex,  ...contentData, registerAnswer: this.props.registerAnswer}
      if (contentData.q_type === 'finish') contentProps.finishQuiz = this.props.finishQuiz
      const QuizContentType = this.props.quizIsLoaded ? withProps(contentProps, mapTypeToComponent[this.props.quizData[this.props.quizIndex].q_type]) : withProps(redirectProps, Redirect)
      return (
        <React.Fragment>
            <Quiz {...this.props}>
              <QuizContentType/> 
            </Quiz>
        </React.Fragment>
      );
    }
  };
}

