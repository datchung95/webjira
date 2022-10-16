import { CHANGE_VALUE_MEMBERS_MODAL_CYBERBUGS, CHANGE_VALUE_MODAL_CYBERBUGS, DELETE_MEMBERS_MODAL_CYBERBUGS, GET_TASK_DETAIL_MODAL_CYBERBUGS } from "../types/CyberBugsTypes/CyberBugsTypes";

const initialState = {
    modalTaskDetail: {}
}

const ModalIndexTaskDetailReducer = (state = initialState, action) => {
    switch (action.type) {
        case GET_TASK_DETAIL_MODAL_CYBERBUGS: {
            return {...state, modalTaskDetail: action.modalTaskDetail};
        }
        case CHANGE_VALUE_MODAL_CYBERBUGS: {
            state.modalTaskDetail[action.name] = action.value;
            return {...state};
            // return {...state, modalTaskDetail: {...state.modalTaskDetail,[action.name]: action.value}}
        }
        case CHANGE_VALUE_MEMBERS_MODAL_CYBERBUGS: {
            // state.modalTaskDetail.assigness.push(action.assigness);
            state.modalTaskDetail.assigness = [...state.modalTaskDetail.assigness, action.assigness]
            return {...state};
        }
        case DELETE_MEMBERS_MODAL_CYBERBUGS: {
            let index = state.modalTaskDetail.assigness.findIndex(mem => mem.id === action.memberId);
            if (index !== -1) {
                state.modalTaskDetail.assigness.splice(index, 1);
            }
            return {...state}
        }
        default: return {...state}
    }
}

export default ModalIndexTaskDetailReducer;