import { call, put, takeLatest } from 'redux-saga/effects'
import { cyberBugsServices } from '../../../services/CyberBugsServices/CyberBugsServices'
import { STATUS_CODE } from '../../../utils/constants/settingSystem'
import { ADD_COMMENT_SAGA, DELETE_COMMENT_SAGA, EDIT_COMMENT_SAGA, GET_TASK_DETAIL_MODAL_CYBERBUGS_SAGA } from '../../types/CyberBugsTypes/CyberBugsTypes'
import parse from 'html-react-parser'

function* addComment(action) {
    let contentCommentParser = parse(action.comment.contentComment);
    action.comment.contentComment = contentCommentParser.props.children;
    try {
        let {data, status} = yield call(() => cyberBugsServices.addCommentCyberBugsServices(action.comment))
        if (status === STATUS_CODE.SUCCESS) {
            yield put({
                type: GET_TASK_DETAIL_MODAL_CYBERBUGS_SAGA,
                taskId: action.comment.taskId
            })
        }
    } catch(err) {
        console.log(err)
    }
}

export function* theoDoiAddComment() {
    yield takeLatest(ADD_COMMENT_SAGA, addComment)
}

function* editComment(action) {
    let contentCommentParser = parse(action.comment.contentComment);
    action.comment.contentComment = contentCommentParser.props.children;
    try {
        let {data, status} = yield call(() => cyberBugsServices.editCommentCyberBugsServices(action.comment))
        if (status === STATUS_CODE.SUCCESS) {
            yield put({
                type: GET_TASK_DETAIL_MODAL_CYBERBUGS_SAGA,
                taskId: action.comment.taskId
            })
        }
    } catch(err) {
        console.log(err)
    }
}

export function* theoDoiEditComment() {
    yield takeLatest(EDIT_COMMENT_SAGA, editComment)
}

function* deleteComment(action) {
    try {
        let {data, status} = yield call(() => cyberBugsServices.deleteCommentCyberBugsServices(action.idComment))
        if (status === STATUS_CODE.SUCCESS) {
            yield put({
                type: GET_TASK_DETAIL_MODAL_CYBERBUGS_SAGA,
                taskId: action.taskId
            })
        }
    } catch(err) {
        console.log(err)
    }
}

export function* theoDoiDeleteComment() {
    yield takeLatest(DELETE_COMMENT_SAGA, deleteComment)
}