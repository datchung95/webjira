import { GET_PROJECT_EDIT } from "../types/CyberBugsTypes/CyberBugsTypes"

const projectEditState = {
    projectEdit: {
        id: 0,
        projectName: "",
        creator: 0,
        description: "",
        categoryId: "1"
    }
}

const EditProjectCyberBugsReducer = (state = projectEditState, action) => {
    switch (action.type) {
        case GET_PROJECT_EDIT: {
            state.projectEdit = action.project;
            return {...state}
        }
        default: return {...state}
    }
}

export default EditProjectCyberBugsReducer