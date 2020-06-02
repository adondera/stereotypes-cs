export const registerAnswer = (answer) => {
    return {
        type: 'REGISTER_ANSWER',
        answer: {...answer}
    }
}