import { call, delay, put, takeLatest } from 'redux-saga/effects'
import { cyberBugsServices } from '../../../services/CyberBugsServices/CyberBugsServices'
import { GET_PROJECT_DETAIL, GET_PROJECT_DETAIL_SAGA } from '../../types/CyberBugsTypes/CyberBugsTypes';
import { DISPLAY_LOADING, HIDDEN_LOADING } from '../../types/LoadingType';
import { history } from '../../../utils/libs/history'
import { STATUS_CODE } from '../../../utils/constants/settingSystem';

function* getProjectDetail(action) {
    yield put({
        type: DISPLAY_LOADING
    })
    yield delay(500);
    try {
        let { data, status } = yield call(() => cyberBugsServices.getProjectDetailServices(action.projectId));
        if (status === STATUS_CODE.SUCCESS) {
            yield put({
                type: GET_PROJECT_DETAIL,
                projectDetail: data.content
            })
        }
    } catch (err) {
        console.log(err);
        history.push("/projectmanagement");
    }
    yield put({
        type: HIDDEN_LOADING
    })
}

export function* theoDoiGetProjectDetail() {
    yield takeLatest(GET_PROJECT_DETAIL_SAGA, getProjectDetail)
}