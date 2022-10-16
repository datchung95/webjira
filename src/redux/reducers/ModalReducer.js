import React from 'react'

const stateModal = {
    Component: <div></div>
}

const ModalReducer = (state = stateModal, action) => {
    switch (action.type) {
        case "OPEN_FORM": {
            state.Component = action.Component;
            return {...state}
        }
        default: return {...state}
    }
}

export default ModalReducer;