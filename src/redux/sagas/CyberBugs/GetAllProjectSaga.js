import { call, put, takeLatest } from 'redux-saga/effects'
import { cyberBugsServices } from '../../../services/CyberBugsServices/CyberBugsServices';
import { STATUS_CODE } from '../../../utils/constants/settingSystem';
import { GET_ALL_PROJECT_MANAGEMENT, GET_ALL_PROJECT_MANAGEMENT_SAGA } from '../../types/CyberBugsTypes/CyberBugsTypes'

function* getAllProject(action) {
    try {
        const {data, status} = yield call(() => cyberBugsServices.getAllProjectManagement());
        if (status === STATUS_CODE.SUCCESS) {
            yield put({
                type: GET_ALL_PROJECT_MANAGEMENT,
                data: data.content
            })
        }
    } catch(err) {
        console.log(err)
    }
}

export function* theoDoiGetAllProject() {
    yield takeLatest(GET_ALL_PROJECT_MANAGEMENT_SAGA, getAllProject);
}