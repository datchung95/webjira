import { takeLatest, put, delay, call } from 'redux-saga/effects'
import { cyberBugsServices } from '../../../services/CyberBugsServices/CyberBugsServices';
import { STATUS_CODE } from '../../../utils/constants/settingSystem';
import { CLOSE_DRAWER, DELETE_USER_SAGA, EDIT_USER_SAGA, GET_ALL_USER, GET_ALL_USER_SAGA, SEARCH_USER, SEARCH_USER_SAGA } from '../../types/CyberBugsTypes/CyberBugsTypes'
import { DISPLAY_LOADING, HIDDEN_LOADING } from '../../types/LoadingType';
import openNotificationWithIcon from '../../../utils/Notification/notificationCyberBugs';

function* getAllUserCyberBugs(action) {
    yield put({
        type: DISPLAY_LOADING
    })
    yield delay(500);
    try {
        let {data, status} = yield call(() => cyberBugsServices.getAllUserCyberBugsServices())
        if (status === STATUS_CODE.SUCCESS) {
            yield put({
                type: GET_ALL_USER,
                allUser: data.content
            })
        } 
    } catch(err) {
        console.log(err)
    }
    yield put({
        type: HIDDEN_LOADING
    })
}

export function* theoDoiGetAllUserCyberBugs() {
    yield takeLatest(GET_ALL_USER_SAGA, getAllUserCyberBugs)
}

function* deleteUserCyberBugs(action) {
    yield put({
        type: DISPLAY_LOADING
    })
    yield delay(500);
    try {
        let {data, status} = yield call(() => cyberBugsServices.deleteUserCyberBugsServices(action.userId))
        if (status === STATUS_CODE.SUCCESS) {
            yield put({
                type: GET_ALL_USER_SAGA,
            })
            openNotificationWithIcon("success", "Delete User Thành Công")
        } 
    } catch(err) {
        console.log(err)
    }
    yield put({
        type: HIDDEN_LOADING
    })
}

export function* theoDoiDeleteUserCyberBugs() {
    yield takeLatest(DELETE_USER_SAGA, deleteUserCyberBugs)
}

function* editUserCyberBugs(action) {
    yield put({
        type: DISPLAY_LOADING
    })
    yield delay(500);
    try {
        let {data, status} = yield call(() => cyberBugsServices.editUserCyberBugsServices(action.user))
        if (status === STATUS_CODE.SUCCESS) {
            yield put({
                type: GET_ALL_USER_SAGA,
            })
            yield put({
                type: CLOSE_DRAWER
            })
            openNotificationWithIcon("success", "Edit User Thành Công")
        } 
    } catch(err) {
        console.log(err)
    }
    yield put({
        type: HIDDEN_LOADING
    })
}

export function* theoDoiEditUserCyberBugs() {
    yield takeLatest(EDIT_USER_SAGA, editUserCyberBugs)
}

function* searchUserCyberBugs(action) {
    yield put({
        type: DISPLAY_LOADING
    })
    yield delay(500);
    try {
        console.log(action)
        let {data, status} = yield call(() => cyberBugsServices.searchUserCyberBugsServices(action.keyword))
        if (status === STATUS_CODE.SUCCESS) {
            console.log(data)
            yield put({
                type: SEARCH_USER,
                user: data.content
            })
        } 
    } catch(err) {
        console.log(err)
    }
    yield put({
        type: HIDDEN_LOADING
    })
}

export function* theoDoiSearchUserCyberBugs() {
    yield takeLatest(SEARCH_USER_SAGA, searchUserCyberBugs)
}