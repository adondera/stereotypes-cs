const loginReducer = (state = {}, action) => {
    switch (action.type) {
        case 'CHANGE_TEXT':
            return {
                ...state,
                text: action.text
            }
        case 'BUTTON_CLICK':
            console.log('CLICKED BUTTON')
            return {
                ...state
            }
        default:
            return state
    }
}

export default loginReducer;