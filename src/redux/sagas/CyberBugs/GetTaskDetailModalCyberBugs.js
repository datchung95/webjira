import { call, put, takeLatest } from 'redux-saga/effects'
import { cyberBugsServices } from '../../../services/CyberBugsServices/CyberBugsServices';
import { STATUS_CODE } from '../../../utils/constants/settingSystem';
import { GET_TASK_DETAIL_MODAL_CYBERBUGS, GET_TASK_DETAIL_MODAL_CYBERBUGS_SAGA } from '../../types/CyberBugsTypes/CyberBugsTypes'

function* getTaskDetailModalCyberBugs(action) {
    try {
        const {data, status} = yield call(() => cyberBugsServices.getTaskDetailModalCyberBugs(action.taskId));
        if (status === STATUS_CODE.SUCCESS) {
            yield put({
                type: GET_TASK_DETAIL_MODAL_CYBERBUGS,
                modalTaskDetail: data.content
            })
        }
    } catch(err) {
        console.log(err)
    }
}

export function* theoDoiGetTaskDetailModalCyberBugs() {
    yield takeLatest(GET_TASK_DETAIL_MODAL_CYBERBUGS_SAGA, getTaskDetailModalCyberBugs);
}