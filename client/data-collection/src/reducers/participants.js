
const participantsReducer = (state = {participants: []}, action) => {
  switch (action.type) {
    case "FETCH_PARTICIPANTS":
      return {
        ...state,
      };
    case "REFRESH_PARTICIPANTS":
        return {
        ...state,
        }
    case "PARTICIPANTS_LOADED":
        return {
            ...state,
            participants: action.participants
        }
    case "PARTICIPANTS_FAILED":
        return {
            ...state,
            participants: []
        }
    default:
      return state;
  }
};

export default participantsReducer;
