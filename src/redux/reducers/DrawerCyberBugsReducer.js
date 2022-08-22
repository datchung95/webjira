import { CLOSE_DRAWER, OPEN_DRAWER, OPEN_DRAWER_EDIT_PROJECT, OPEN_FORM_CREATE_TASK, OPEN_FORM_EDIT_USER, SUBMIT_FORM_CREATE_TASK, SUBMIT_FORM_EDIT_PROJECT, SUBMIT_FORM_EDIT_USER } from "../types/CyberBugsTypes/CyberBugsTypes";
import React from 'react'

const drawerState = {
    visible: false,
    componentDrawerContent: <p></p>,
    title: "",
    callBackSubmit: (propsValue) => {},
    userEdit: {}
}

const DrawerCyberBugsReducer = (state = drawerState, action) => {
    switch (action.type) {
        case OPEN_DRAWER: {
            return {...state, visible: true};
        }
        case CLOSE_DRAWER: {
            return {...state, visible: false};
        }
        case OPEN_DRAWER_EDIT_PROJECT: {
            return {...state, visible: true, componentDrawerContent: action.component, title: action.title};
        }
        case SUBMIT_FORM_EDIT_PROJECT: {
            return {...state, callBackSubmit: action.submitForm};
        }
        case OPEN_FORM_CREATE_TASK: {
            state.visible = true;
            state.componentDrawerContent = action.component;
            state.title = action.title;
            return {...state}
        }
        case SUBMIT_FORM_CREATE_TASK: {
            return {...state, callBackSubmit: action.submitFunction}
        }
        case OPEN_FORM_EDIT_USER: {
            return {...state, visible: true, componentDrawerContent: action.componentDrawerContent, title: action.title, userEdit: action.user}
        }
        case SUBMIT_FORM_EDIT_USER: {
            return {...state, callBackSubmit: action.submitFunction}
        }
        default: return { ...state };
    }
}

export default DrawerCyberBugsReducer;