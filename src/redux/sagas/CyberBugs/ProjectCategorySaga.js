import { call, put, takeLatest } from 'redux-saga/effects'
import { cyberBugsServices } from '../../../services/CyberBugsServices/CyberBugsServices'
import { STATUS_CODE } from '../../../utils/constants/settingSystem';
import { GET_ALL_PROJECT_CATEGORY, GET_ALL_PROJECT_CATEGORY_SAGA } from '../../types/CyberBugsTypes/CyberBugsTypes';

function* getAllProjectCategory(action) {
    try {
        const {data, status} = yield call(() => cyberBugsServices.getAllProjectCategory());
        if (status === STATUS_CODE.SUCCESS) {
            yield put({
                type: GET_ALL_PROJECT_CATEGORY,
                data
            })
        }
    } catch(err) {
        console.log(err)
    }
}

export function* theoDoiGetAllProjectCategory() {
    yield takeLatest(GET_ALL_PROJECT_CATEGORY_SAGA, getAllProjectCategory)
}