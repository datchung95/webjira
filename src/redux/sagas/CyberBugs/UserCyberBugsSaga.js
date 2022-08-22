import { stringify } from 'rc-field-form/es/useWatch';
import { call, delay, put, takeLatest } from 'redux-saga/effects'
import { cyberBugsServices } from '../../../services/CyberBugsServices/CyberBugsServices';
import { STATUS_CODE, TOKEN, USER_LOGIN } from '../../../utils/constants/settingSystem';
import { history } from '../../../utils/libs/history';
import openNotificationWithIcon from '../../../utils/Notification/notificationCyberBugs';
import { ADD_MEMBER_SAGA, GET_ALL_PROJECT_MANAGEMENT_SAGA, GET_SEARCH_USER, GET_SEARCH_USER_SAGA, REMOVE_MEMBER_SAGA, SIGNIN_API, SIGN_UP_SAGA, USLOGIN } from '../../types/CyberBugsTypes/CyberBugsTypes'
import { DISPLAY_LOADING, HIDDEN_LOADING } from '../../types/LoadingType';

function* signIn(action) {
    yield put({
        type: DISPLAY_LOADING
    })
    yield delay(500);
    try {
        let { data, status } = yield call(() => cyberBugsServices.signInCyberBugs(action.userLogin));
        localStorage.setItem(TOKEN, data.content.accessToken);
        localStorage.setItem(USER_LOGIN, stringify(data.content))
        yield put({
            type: USLOGIN,
            userLogin: data.content
        })
        history.push("/projectmanagement");
    } catch (err) {
        alert(err.response.data)
    }
    yield put({
        type: HIDDEN_LOADING
    })
}

export function* theoDoiSignIn() {
    yield takeLatest(SIGNIN_API, signIn)
}

function* getSearchUser(action) {
    try {
        let { data, status } = yield call(() => cyberBugsServices.getSearchUserServices(action.keyWord));
        if (status === STATUS_CODE.SUCCESS) {
            yield put({
                type: GET_SEARCH_USER,
                user: data.content
            })
        }
    } catch (err) {
        alert(err.response.data)
    }
}

export function* theoDoiGetSearchUser() {
    yield takeLatest(GET_SEARCH_USER_SAGA, getSearchUser)
}

function* addMemberProject(action) {
    try {
        let { data, status } = yield call(() => cyberBugsServices.addMemberProjectServices(action.userProject));
        if (status === STATUS_CODE.SUCCESS) {
            yield put({
                type: GET_ALL_PROJECT_MANAGEMENT_SAGA
            })
        }
    } catch (err) {
        console.log(err)
    }
}

export function* theoDoiAddMemberProject() {
    yield takeLatest(ADD_MEMBER_SAGA, addMemberProject)
}

function* removeMemberProject(action) {
    try {
        let { data, status } = yield call(() => cyberBugsServices.removeMemberProjectServices(action.userProject));
        if (status === STATUS_CODE.SUCCESS) {
            yield put({
                type: GET_ALL_PROJECT_MANAGEMENT_SAGA
            })
        }
    } catch (err) {
        console.log(err)
    }
}

export function* theoDoiRemoveMemberProject() {
    yield takeLatest(REMOVE_MEMBER_SAGA, removeMemberProject)
}

function* signUpCyberBugs(action) {
    yield put({
        type: DISPLAY_LOADING
    })
    yield delay(500);
    try {
        let { data, status } = yield call(() => cyberBugsServices.signUpCyberBugsServices(action.user));
        if (status === STATUS_CODE.SUCCESS) {
            openNotificationWithIcon("success", "Đăng ký thành công");
            history.push("/")
        }
    } catch (err) {
        console.log(err)
    }
    yield put({
        type: HIDDEN_LOADING
    })
}

export function* theoDoiSignUpCyberBugs() {
    yield takeLatest(SIGN_UP_SAGA, signUpCyberBugs)
}