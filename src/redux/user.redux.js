import axios from 'axios';
import { config } from '../config/config';
import Alert from 'react-s-alert';

const AUTH_SUCCESS = 'AUTH_SUCCESS';
const ERROR_MSG = 'ERROR_MSG';
const LOAD_DATA = 'LOAD_DATA';
const LOGOUT = 'LOGOUT'

const initState = {
    isAuth: true,
    redirectTo: '',
    msg: '',
    user: '',
    type: ''
}

function authSuccess(data) {
    return { type: AUTH_SUCCESS, payload: data }
}

export function user(state = initState, action) {
    switch (action.type) {
        case AUTH_SUCCESS:
            return { ...state, msg: '', isAuth: true, ...action.payload, pwd: '', redirectTo: `${config.APP_NAME}/dashboard` }
        case ERROR_MSG:
            return { ...state, isAuth: false, msg: action.msg }
        case LOAD_DATA:
            return { ...state, ...action.payload, isAuth: true }
        case LOGOUT:
            return { ...initState,isAuth: false }
        default:
            return state
    }
}
function errorMsg(msg) {
    return { msg, type: ERROR_MSG }
}
export function loadData(userinfo) {
    return { type: LOAD_DATA, payload: userinfo }
}

export function logoutSubmit(argument) {
    return { type: LOGOUT }
}
export function update(data) {
    return dispatch => {
        axios.post(`${config.API_URL}${config.APP_NAME}/user/update`, data)
            .then(res => {
                if (res.status === 200 && res.data.code === 0) {
                    dispatch(authSuccess(res.data.data))
                } else {
                    dispatch(errorMsg(res.data.msg))
                }
            })
            .catch((res) => {
                console.log('失败')
                Alert.error(res.message, {})
            })
    }
}
export function login({ user, pwd }) {
    if (!user || !pwd) {
        return errorMsg("you must input username and pwd")
    }
    return dispatch => {
        debugger;
        axios.post(`${config.API_URL}${config.APP_NAME}/auth/local`, { identifier: user, password: pwd })
            .then(res => {
                if (res.status === 200) {
                    dispatch(authSuccess(res.data.user))
                } else {
                    dispatch(errorMsg(res.data.msg))
                }
            })
            .catch((res) => {
                console.log('失败')
                Alert.error(res.message, {})
            })
    }
}

export function register({ user, pwd, repeatpwd }) {
    console.log("redux register",user,pwd,repeatpwd)
    if (!user || !pwd ) {
        return errorMsg('input pwd')
    }
    if (pwd !== repeatpwd) {
        return errorMsg("Pwd and confirmPwd is NOT identical!")
    }
    return dispatch => {
        axios.post(`${config.API_URL}${config.APP_NAME}/user/register`, { user, pwd })
            .then(res => {
                if (res.status === 200 && res.data.code === 0) {
                    dispatch(authSuccess({ user, pwd }))
                } else {
                    dispatch(errorMsg(res.data.msg))
                }
            })
            .catch((res) => {
                console.log('失败')
                Alert.error(res.message, {})
            })
    }
}