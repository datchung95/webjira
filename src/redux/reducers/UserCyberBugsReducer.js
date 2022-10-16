import { USER_LOGIN } from "../../utils/constants/settingSystem";
import { GET_SEARCH_USER, GET_USER_BY_PROJECT_FORM_CREATE_TASK, USLOGIN } from "../types/CyberBugsTypes/CyberBugsTypes";

let usLogin = {};

if (localStorage.getItem(USER_LOGIN)) {
    usLogin = JSON.parse(localStorage.getItem(USER_LOGIN));
}

const stateUser = {
    userLogin: usLogin,
    userSearch: []
}

const UserCyberBugsReducer = (state = stateUser, action) => {
    switch(action.type) {
        case USLOGIN: {
            state.userLogin = action.userLogin;
            return {...state};
        }
        case GET_SEARCH_USER: {
            state.userSearch = action.user
            return {...state};
        }
        case GET_USER_BY_PROJECT_FORM_CREATE_TASK: {
            state.userSearch = action.userSearch
            return {...state}
        }
        default: return {...state}
    }
}

export default UserCyberBugsReducer;