import { call, put, takeLatest } from 'redux-saga/effects'
import { cyberBugsServices } from '../../../services/CyberBugsServices/CyberBugsServices'
import { STATUS_CODE } from '../../../utils/constants/settingSystem';
import { CLOSE_DRAWER, CREATE_TASK_FORM_CREATE_TASK_SAGA, GET_ALL_PROJECT_FORM_CREATE_TASK, GET_ALL_PROJECT_FORM_CREATE_TASK_SAGA, GET_PRIORITY_FORM_CREATE_TASK, GET_PRIORITY_FORM_CREATE_TASK_SAGA, GET_PROJECT_DETAIL_SAGA, GET_STATUS_FORM_CREATE_TASK, GET_STATUS_FORM_CREATE_TASK_SAGA, GET_TASK_TYPE_FORM_CREATE_TASK, GET_TASK_TYPE_FORM_CREATE_TASK_SAGA, GET_USER_BY_PROJECT_FORM_CREATE_TASK, GET_USER_BY_PROJECT_FORM_CREATE_TASK_SAGA } from '../../types/CyberBugsTypes/CyberBugsTypes'
import openNotificationWithIcon from '../../../utils/Notification/notificationCyberBugs'

function* getAllProjectModal(action) {
    try {
        let {data, status} = yield call(() => cyberBugsServices.getAllProjectModalCreateTaskServices());
        if (status === STATUS_CODE.SUCCESS) {
            yield put({
                type: GET_ALL_PROJECT_FORM_CREATE_TASK,
                project: data.content
            })
            yield put({
                type: GET_USER_BY_PROJECT_FORM_CREATE_TASK_SAGA,
                projectId: data.content[0].id
            })
        }
    } catch(err) {
        console.log(err)
    }
}

export function* theoDoiGetAllProjectModal() {
    yield takeLatest(GET_ALL_PROJECT_FORM_CREATE_TASK_SAGA, getAllProjectModal)
}

function* getTaskTypeModal(action) {
    try {
        let {data, status} = yield call(() => cyberBugsServices.getTaskTypeModalCreateTaskServices());
        if (status === STATUS_CODE.SUCCESS) {
            yield put({
                type: GET_TASK_TYPE_FORM_CREATE_TASK,
                taskType: data.content
            })
        }
    } catch(err) {
        console.log(err)
    }
}

export function* theoDoiGetTaskTypeModal() {
    yield takeLatest(GET_TASK_TYPE_FORM_CREATE_TASK_SAGA, getTaskTypeModal)
}

function* getPriorityModal(action) {
    try {
        let {data, status} = yield call(() => cyberBugsServices.getPriorityModalCreateTaskServices());
        if (status === STATUS_CODE.SUCCESS) {
            yield put({
                type: GET_PRIORITY_FORM_CREATE_TASK,
                priority: data.content
            })
        }
    } catch(err) {
        console.log(err)
    }
}

export function* theoDoiGetPriorityModal() {
    yield takeLatest(GET_PRIORITY_FORM_CREATE_TASK_SAGA, getPriorityModal)
}

function* createTaskModal(action) {
    try {
        let {data, status} = yield call(() => cyberBugsServices.createTaskModalCreateTaskServices(action.taskObject));
        yield put({
            type: CLOSE_DRAWER
        })
        openNotificationWithIcon("success", "tạo task thành công")
    } catch(err) {
        console.log(err)
    }
}

export function* theoDoiCreateTaskModal() {
    yield takeLatest(CREATE_TASK_FORM_CREATE_TASK_SAGA, createTaskModal)
}

function* getStatusModal(action) {
    try {
        let {data, status} = yield call(() => cyberBugsServices.getStatusModalCreateTaskServices());
        if (status === STATUS_CODE.SUCCESS) {
            yield put({
                type: GET_STATUS_FORM_CREATE_TASK,
                status: data.content
            })
        }
    } catch(err) {
        console.log(err)
    }
}

export function* theoDoiGetStatusModal() {
    yield takeLatest(GET_STATUS_FORM_CREATE_TASK_SAGA, getStatusModal)
}

function* getUserByprojectModal(action) {
    try {
        let {data, status} = yield call(() => cyberBugsServices.getUserByProjectModalCreateTaskServices(action.projectId));
        if (status === STATUS_CODE.SUCCESS) {
            yield put({
                type: GET_USER_BY_PROJECT_FORM_CREATE_TASK,
                userSearch: data.content
            })
        }
    } catch(err) {
        // console.log(err)
        if (err.response.status === STATUS_CODE.NOT_FOUND) {
            yield put({
                type: GET_USER_BY_PROJECT_FORM_CREATE_TASK,
                userSearch: []
            })
        }
    }
}

export function* theoDoiGetUserByprojectModal() {
    yield takeLatest(GET_USER_BY_PROJECT_FORM_CREATE_TASK_SAGA, getUserByprojectModal)
}