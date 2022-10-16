import { GET_PROJECT_DETAIL } from "../types/CyberBugsTypes/CyberBugsTypes";

const projectDetailState = {
    projectDetail: {}
}

const GetProjectDetailReducer = (state = projectDetailState, action) => {
    switch (action.type) {
        case GET_PROJECT_DETAIL: {
            state.projectDetail = action.projectDetail;
            return {...state}
        }
        default: return {...state}
    }
}

export default GetProjectDetailReducer;