const loginReducer = (state = {}, action) => {
    switch (action.type) {
        case 'CHANGE_USERNAME':
            return {
                ...state,
                username: action.username
            }
        case 'CHANGE_PASSWORD':
            return {
                ...state,
                password: action.password
            }
        case 'ON_SUBMIT':
            return {
                ...state,
                isLoggedIn: action.isLoggedIn
            }
        default:
            return state
    }
}

export default loginReducer;