import {getParticipants} from '../utils/requests/getParticipants'

export const fetchParticipants = (accessToken, dispatch) => {
    getParticipants(accessToken, 
        (res) => dispatch({type: 'PARTICIPANTS_LOADED', participants: res.data}),
        () => dispatch({type: 'PARTICIPANTS_FAILED'}))
    return {
        type: 'FETCH_PARTICIPANTS'
    }
}