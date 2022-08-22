import { call, put, select, takeLatest } from 'redux-saga/effects'
import { cyberBugsServices } from '../../../services/CyberBugsServices/CyberBugsServices'
import { CHANGE_VALUE_MEMBERS_MODAL_CYBERBUGS, CHANGE_VALUE_MODAL_CYBERBUGS, DELETE_MEMBERS_MODAL_CYBERBUGS, GET_PROJECT_DETAIL_SAGA, GET_TASK_DETAIL_MODAL_CYBERBUGS_SAGA, HANDLE_CHANGE_CALL_API_MODAL_CYBERBUGS, UPDATE_STATUS_MODAL_CYBERBUGS_SAGA, UPDATE_TASK_MODAL_CYBERBUGS } from '../../types/CyberBugsTypes/CyberBugsTypes'
import { STATUS_CODE } from '../../../utils/constants/settingSystem';

function* updateStatusModalCyberBugs(action) {
    try {
        let { data, status } = yield call(() => cyberBugsServices.updateStatusModalCyberBugs(action.taskUpdate));
        if (status === STATUS_CODE.SUCCESS) {
            yield put({
                type: GET_PROJECT_DETAIL_SAGA,
                projectId: action.taskUpdate.projectId
            })
            yield put({
                type: GET_TASK_DETAIL_MODAL_CYBERBUGS_SAGA,
                taskId: action.taskUpdate.taskId
            })
        }
    } catch (err) {
        console.logl(err)
    }
}

export function* theoDoiUpdateStatusModalCyberBugs() {
    yield takeLatest(UPDATE_STATUS_MODAL_CYBERBUGS_SAGA, updateStatusModalCyberBugs)
}

function* updateModalCyberBugs(action) {
    
}

export function* theoDoiUpdateTaskModalCyberBugs() {
    yield takeLatest(UPDATE_TASK_MODAL_CYBERBUGS, updateModalCyberBugs)
}

function* handleChangeCallApiModalCyberBugs(action) {
    switch(action.actionType) {
        case CHANGE_VALUE_MODAL_CYBERBUGS: {
            const {name, value} = action;
            yield put({
                type: CHANGE_VALUE_MODAL_CYBERBUGS,
                name,
                value
            })
        }; break
        case CHANGE_VALUE_MEMBERS_MODAL_CYBERBUGS: {
            yield put({
                type: CHANGE_VALUE_MEMBERS_MODAL_CYBERBUGS,
                assigness: action.assigness
            })
        }; break
        case DELETE_MEMBERS_MODAL_CYBERBUGS: {
            yield put({
                type: DELETE_MEMBERS_MODAL_CYBERBUGS,
                memberId: action.memberId
            })
        }; break
    }

    let modalTaskDetail = yield select(state => state.ModalIndexTaskDetailReducer.modalTaskDetail);
    let listUserAsign = modalTaskDetail.assigness?.map((item, index) => {return item.id})
    // let listUserAsign = [];
    // let userId;
    // for (let i in modalTaskDetail.assigness) {
    //     userId = modalTaskDetail.assigness[i].id
    //     listUserAsign.push(userId)
    // }
    modalTaskDetail = {...modalTaskDetail,listUserAsign}
    try {
        const {data, status} = yield call(() => cyberBugsServices.updateTaskModalCyberBugs(modalTaskDetail));
        console.log(data)
        if (status === STATUS_CODE.SUCCESS) {
            yield put({
                type: GET_PROJECT_DETAIL_SAGA,
                projectId: modalTaskDetail.projectId
            })
            yield put({
                type: GET_TASK_DETAIL_MODAL_CYBERBUGS_SAGA,
                taskId: modalTaskDetail.taskId
            })
        }
    } catch(err) {
        console.log(err)
    }
}

export function* theoDoiHandleChangeCallApiModalCyberBugs() {
    yield takeLatest(HANDLE_CHANGE_CALL_API_MODAL_CYBERBUGS, handleChangeCallApiModalCyberBugs);
}