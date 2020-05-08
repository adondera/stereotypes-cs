import {login} from '../utils/requests/postRequsts';

export const changePassword = (event) => {
    return {
        type: 'CHANGE_PASSWORD',
        password: event.target.value
    }
}

export const changeUsername = (event) => {
    return {
        type: 'CHANGE_USERNAME',
        username: event.target.value
    }
}

export const onSubmit = (username, password) => {
    const response = login(); 
    return {
        type: 'ON_SUBMIT',
        isLoggedIn: true
    }
}


export const LoginActions = {
    CHANGE_PASSWORD: 'CHANGE_PASSWORD',
    CHANGE_USERNAME: 'CHANGE_USERNAME',
    ON_SUBMIT: 'ON_SUBMIT'
}