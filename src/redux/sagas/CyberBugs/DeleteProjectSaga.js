import { call, delay, put, takeLatest } from 'redux-saga/effects'
import { cyberBugsServices } from '../../../services/CyberBugsServices/CyberBugsServices';
import { STATUS_CODE } from '../../../utils/constants/settingSystem';
import { DELETE_PROJECT_SAGA, GET_ALL_PROJECT_MANAGEMENT_SAGA } from '../../types/CyberBugsTypes/CyberBugsTypes'
import { DISPLAY_LOADING, HIDDEN_LOADING } from '../../types/LoadingType';
import notificationCyberBugs from '../../../utils/Notification/notificationCyberBugs'

function* deleteProject(action) {
    yield put({
        type: DISPLAY_LOADING
    })
    yield delay(500);
    try {
        const { data, status } = yield call(() => cyberBugsServices.deleteProjectCyberBugs(action.project.id));
        if (status === STATUS_CODE.SUCCESS) {
            yield put({
                type: GET_ALL_PROJECT_MANAGEMENT_SAGA
            })
            notificationCyberBugs("success", "Xóa thành công");
        }
    } catch(err) {
        console.log(err);
        notificationCyberBugs("error", "Xóa thất bại");
    }
    yield put({
        type: HIDDEN_LOADING
    })
}

export function* theoDoiDeleteProject() {
    yield takeLatest(DELETE_PROJECT_SAGA, deleteProject);
}