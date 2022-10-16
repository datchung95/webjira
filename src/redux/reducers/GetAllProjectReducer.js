import { GET_ALL_PROJECT_MANAGEMENT } from "../types/CyberBugsTypes/CyberBugsTypes";

const projectState = {
    projectList: []
}

const GetAllProjectReducer = (state = projectState, action) => {
    switch (action.type) {
        case GET_ALL_PROJECT_MANAGEMENT: {
            state.projectList = action.data
            return {...state};
        }
        default: return {...state};
    }
}

export default GetAllProjectReducer;