import { GET_ALL_PROJECT_FORM_CREATE_TASK, GET_PRIORITY_FORM_CREATE_TASK, GET_STATUS_FORM_CREATE_TASK, GET_TASK_TYPE_FORM_CREATE_TASK } from "../types/CyberBugsTypes/CyberBugsTypes"

const initialState = {
    project: [],
    taskType: [],
    priority: [],
    status: []
}

const ModalFormCreateTaskReducer = (state = initialState, action) => {
    switch (action.type) {
        case GET_ALL_PROJECT_FORM_CREATE_TASK: {
            state.project = action.project;
            return {...state};
        }
        case GET_TASK_TYPE_FORM_CREATE_TASK: {
            state.taskType = action.taskType;
            return {...state};
        }
        case GET_PRIORITY_FORM_CREATE_TASK: {
            state.priority = action.priority;
            return {...state};
        }
        case GET_STATUS_FORM_CREATE_TASK: {
            state.status = action.status;
            return {...state};
        }
        default: return {...state}
    }
}

export default ModalFormCreateTaskReducer