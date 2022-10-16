import {applyMiddleware, combineReducers, createStore} from 'redux'
import LoadingReducer from './reducers/LoadingReducer';
import ModalReducer from './reducers/ModalReducer';
import UserCyberBugsReducer from './reducers/UserCyberBugsReducer';
import createMiddleWareSaga from 'redux-saga'
import { rootSaga } from './sagas/rootSaga';
import ProjectCategoryReducer from './reducers/ProjectCategoryReducer';
import GetAllProjectReducer from './reducers/GetAllProjectReducer';
import DrawerCyberBugsReducer from './reducers/DrawerCyberBugsReducer';
import EditProjectCyberBugsReducer from './reducers/EditProjectCyberBugsReducer';
import GetProjectDetailReducer from './reducers/GetProjectDetailReducer';
import ModalFormCreateTaskReducer from './reducers/ModalFormCreateTaskReducer';
import ModalIndexTaskDetailReducer from './reducers/ModalIndexTaskDetailReducer';
import UserManagementReducer from './reducers/UserManagementReducer';

const middleWareSaga = createMiddleWareSaga();

const rootReducer = combineReducers({
    LoadingReducer,
    ModalReducer,
    UserCyberBugsReducer,
    ProjectCategoryReducer,
    GetAllProjectReducer,
    DrawerCyberBugsReducer,
    EditProjectCyberBugsReducer,
    GetProjectDetailReducer,
    ModalFormCreateTaskReducer,
    ModalIndexTaskDetailReducer,
    UserManagementReducer
})

const store = createStore(rootReducer, applyMiddleware(middleWareSaga));

middleWareSaga.run(rootSaga);

export default store;