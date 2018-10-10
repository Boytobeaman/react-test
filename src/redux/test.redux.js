import axios from 'axios';
import { config } from '../config/config';

const TEST = 'TEST';
const ERROR_MSG = 'ERROR_MSG';


const initState = {
    test: "testValue",
}

export function test(state = initState, action) {
    switch (action.type) {
        case TEST:
            return { ...state, test: action.payload }
        default:
            return state
    }
}
function errorMsg(msg) {
    return { msg, type: ERROR_MSG }
}

export function update(data) {
    return dispatch => {
        axios.post(`${config.API_URL}${config.APP_NAME}/user/update`, data)
            .then(res => {
                if (res.status === 200 && res.data.code === 0) {
                    // dispatch(authSuccess(res.data.data))
                } else {
                    // dispatch(errorMsg(res.data.msg))
                }
            })
    }
}
export function testOne({ user, pwd }) {
    if (!user || !pwd) {
        return errorMsg("you must input username and pwd")
    }
    return dispatch => {
        axios.post(`${config.API_URL}${config.APP_NAME}/testOne`, { user, pwd })
            .then(res => {
                if (res.status === 200 && res.data.code === 0) {
                    // dispatch(authSuccess(res.data.data))
                } else {
                    // dispatch(errorMsg(res.data.msg))
                }
            })
    }
}
