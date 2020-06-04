export const saveQuestionAction = (data) => {
  return {
    type: "SAVE_QUESTION_ANSWER",
    data: data,
  };
};

export const clearQuestionsStore = () => {
    return {
        type: "CLEAR_QUESTIONS"
    }
}

export const sendQuestionsAnswers = (childId, notes='') => {
  const childInfo = {
    notes: notes,
    childId: childId
  }
  return {
    childInfo: childInfo,
    type: "SEND_QUESTIONS_ANSWERS"
  }
}

export const videoWasPlayed = () => {
  return {
    type: 'VIDEO_WAS_PLAYED'
  }
}
