import { all } from 'redux-saga/effects'
import { theoDoiAddComment, theoDoiDeleteComment, theoDoiEditComment } from './CyberBugs/CommentSaga'
import { theoDoiCreateProject } from './CyberBugs/CreateProjectSaga'
import { theoDoiDeleteProject } from './CyberBugs/DeleteProjectSaga'
import { theoDoiEditProject } from './CyberBugs/EditProjectSaga'
import { theoDoiGetAllProject } from './CyberBugs/GetAllProjectSaga'
import { theoDoiGetProjectDetail } from './CyberBugs/GetProjectDetailSaga'
import { theoDoiGetTaskDetailModalCyberBugs } from './CyberBugs/GetTaskDetailModalCyberBugs'
import { theoDoiCreateTaskModal, theoDoiGetAllProjectModal, theoDoiGetPriorityModal, theoDoiGetStatusModal, theoDoiGetTaskTypeModal, theoDoiGetUserByprojectModal } from './CyberBugs/ModalFormCreateProjectSaga'
import { theoDoiGetAllProjectCategory } from './CyberBugs/ProjectCategorySaga'
import { theoDoiHandleChangeCallApiModalCyberBugs, theoDoiUpdateStatusModalCyberBugs, theoDoiUpdateTaskModalCyberBugs } from './CyberBugs/UpdateTaskModalCyberBugs'
import { theoDoiAddMemberProject, theoDoiGetSearchUser, theoDoiRemoveMemberProject, theoDoiSignIn, theoDoiSignUpCyberBugs } from './CyberBugs/UserCyberBugsSaga'
import { theoDoiDeleteUserCyberBugs, theoDoiEditUserCyberBugs, theoDoiGetAllUserCyberBugs, theoDoiSearchUserCyberBugs } from './CyberBugs/UserManagementSaga'
// import * as ToDoListSaga from './ToDoListSaGa'

export function* rootSaga() {
    //call theo dõi tất cả action saga
    yield all([
        
        //nghiệp vụ cyberbugs
        theoDoiSignIn(),
        theoDoiGetAllProjectCategory(),
        theoDoiCreateProject(),
        theoDoiGetAllProject(),
        theoDoiEditProject(),
        theoDoiDeleteProject(),
        theoDoiGetSearchUser(),
        theoDoiAddMemberProject(),
        theoDoiRemoveMemberProject(),
        theoDoiGetProjectDetail(),
        theoDoiGetAllProjectModal(),
        theoDoiGetTaskTypeModal(),
        theoDoiGetPriorityModal(),
        theoDoiCreateTaskModal(),
        theoDoiGetStatusModal(),
        theoDoiGetUserByprojectModal(),
        theoDoiGetTaskDetailModalCyberBugs(),
        theoDoiUpdateTaskModalCyberBugs(),
        theoDoiHandleChangeCallApiModalCyberBugs(),
        theoDoiUpdateStatusModalCyberBugs(),
        theoDoiSignUpCyberBugs(),
        theoDoiGetAllUserCyberBugs(),
        theoDoiDeleteUserCyberBugs(),
        theoDoiEditUserCyberBugs(),
        theoDoiSearchUserCyberBugs(),
        theoDoiAddComment(),
        theoDoiEditComment(),
        theoDoiDeleteComment()
    ])
}