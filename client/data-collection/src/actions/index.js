export const changeText = (event) => {
    return {
        type: 'CHANGE_TEXT',
        text: event.target.value
    }
}

export const buttonClick = () => {
    return {
        type: 'BUTTON_CLICK'
    }
}

export const LoginActions = {
    CHANGE_TEXT: 'CHANGE_TEXT',
    BUTTON_CLICK: 'BUTTON_CLICK'
}