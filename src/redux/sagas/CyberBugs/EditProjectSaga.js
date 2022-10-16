import {call, delay, put, takeLatest} from 'redux-saga/effects'
import { cyberBugsServices } from '../../../services/CyberBugsServices/CyberBugsServices'
import { STATUS_CODE } from '../../../utils/constants/settingSystem';
import { CLOSE_DRAWER, EDIT_PROJECT_CYBERBUGS_SAGA, GET_ALL_PROJECT_MANAGEMENT_SAGA } from '../../types/CyberBugsTypes/CyberBugsTypes'
import { DISPLAY_LOADING, HIDDEN_LOADING } from '../../types/LoadingType';
import notificationCyberBugs from '../../../utils/Notification/notificationCyberBugs'

function* editProject(action) {
    yield put({
        type: DISPLAY_LOADING
    })
    yield delay(500);
    try {
        const {data, status} = yield call(() => cyberBugsServices.editProjectCyberBugs(action.projectUpdate));
        if (status === STATUS_CODE.SUCCESS) {
            yield put({
                type: GET_ALL_PROJECT_MANAGEMENT_SAGA,
            })
            yield put({
                type: CLOSE_DRAWER
            })
            notificationCyberBugs("success", "Edit thành công");
        }
    } catch(err) {
        console.log(err);
        notificationCyberBugs("error", "Edit thất bại");
    }
    yield put({
        type: HIDDEN_LOADING
    })
}

export function* theoDoiEditProject() {
    yield takeLatest(EDIT_PROJECT_CYBERBUGS_SAGA, editProject)
}