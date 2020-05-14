export const saveQuestionAction = (answer, questionType) => {
  return {
    type: "SAVE_QUESTION_ANSWER",
    answer: answer,
    questionType: questionType,
  };
};
