import { GET_ALL_USER, SEARCH_USER } from "../types/CyberBugsTypes/CyberBugsTypes"

const stateUserManagement = {
    allUser: [],
}

const UserManagementReducer = (state = stateUserManagement, action) => {
    switch (action.type) { 
        case GET_ALL_USER: {
            state.allUser = action.allUser;
            return {...state}
        }
        case SEARCH_USER: {
            state.allUser = action.user;
            return {...state}
        }
        default: return { ...state }
    }
}

export default UserManagementReducer