import { call, delay, put, takeLatest } from 'redux-saga/effects'
import { cyberBugsServices } from '../../../services/CyberBugsServices/CyberBugsServices'
import { STATUS_CODE } from '../../../utils/constants/settingSystem';
import { CREATE_PROJECT_SAGA, GET_ALL_PROJECT_MANAGEMENT } from '../../types/CyberBugsTypes/CyberBugsTypes';
import { DISPLAY_LOADING, HIDDEN_LOADING } from '../../types/LoadingType';
import { history } from '../../../utils/libs/history'
import notificationCyberBugs from '../../../utils/Notification/notificationCyberBugs'

function* createProject(action) {
    yield put({
        type: DISPLAY_LOADING
    })
    yield delay(500);
    try {
        const { data, status } = yield call(() => cyberBugsServices.createProjectAuthorize(action.newProject));
        if (status === STATUS_CODE.SUCCESS) {
            yield put({
                type: GET_ALL_PROJECT_MANAGEMENT
            })
            history.push("/projectmanagement");
            notificationCyberBugs("success", "Tạo project thành công");
        }
    } catch (err) {
        console.log(err);
        notificationCyberBugs("error", "Tạo project thất bại");
    }
    yield put({
        type: HIDDEN_LOADING
    })
}

export function* theoDoiCreateProject() {
    yield takeLatest(CREATE_PROJECT_SAGA, createProject);
}