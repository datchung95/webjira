import { baseServices } from "../baseServices";

class CyberBugsServices extends baseServices {
    constructor() {
        super()
    }
    signInCyberBugs(userLogin) {
        return this.post("Users/signin", userLogin);
    }
    getAllProjectCategory() {
        return this.get("ProjectCategory");
    }
    createProject(newProject) {
        return this.post("Project/createProject", newProject);
    }
    createProjectAuthorize(newProject) {
        return this.post("Project/createProjectAuthorize", newProject);
    }
    getAllProjectManagement() {
        return this.get("Project/getAllProject");
    }
    editProjectCyberBugs(projectUpdate) {
        return this.put(`Project/updateProject?projectId=${projectUpdate.id}`, projectUpdate);
    }
    deleteProjectCyberBugs(project) {
        return this.delete(`Project/deleteProject?projectId=${project}`);
    }
    getSearchUserServices(keyWord) {
        return this.get(`Users/getUser?keyword=${keyWord}`);
    }
    addMemberProjectServices(userProject) {
        return this.post("Project/assignUserProject", userProject);
    }
    removeMemberProjectServices(userProject) {
        return this.post("Project/removeUserFromProject", userProject);
    }
    getProjectDetailServices(projectId) {
        return this.get(`Project/getProjectDetail?id=${projectId}`);
    }
    getAllProjectModalCreateTaskServices() {
        return this.get("Project/getAllProject"); 
    }
    getTaskTypeModalCreateTaskServices() {
        return this.get("TaskType/getAll");
    }
    getPriorityModalCreateTaskServices() {
        return this.get("Priority/getAll");
    }
    getStatusModalCreateTaskServices() {
        return this.get("Status/getAll");
    }
    createTaskModalCreateTaskServices(taskObject) {
        return this.post("Project/createTask", taskObject);
    }
    getUserByProjectModalCreateTaskServices(projectId) {
        return this.get(`Users/getUserByProjectId?idProject=${projectId}`);
    }
    getTaskDetailModalCyberBugs(taskId) {
        return this.get(`Project/getTaskDetail?taskId=${taskId}`)
    }
    updateStatusModalCyberBugs(taskUpdate) {
        return this.put("Project/updateStatus", taskUpdate);
    }
    updateTaskModalCyberBugs(taskUpdate) {
        return this.post("Project/updateTask", taskUpdate);
    }
    signUpCyberBugsServices(user) {
        return this.post("Users/signup", user)
    }
    getAllUserCyberBugsServices() {
        return this.get("Users/getUser")
    }
    deleteUserCyberBugsServices(userId) {
        return this.delete(`Users/deleteUser?id=${userId}`)
    }
    editUserCyberBugsServices(user) {
        return this.put("Users/editUser", user)
    }
    searchUserCyberBugsServices(keyword) {
        return this.get(`Users/getUser?keyword=${keyword}`)
    }
    addCommentCyberBugsServices(comment) {
        return this.post("Comment/insertComment", comment)
    }
    editCommentCyberBugsServices(comment) {
        return this.put(`Comment/updateComment?id=${comment.id}&contentComment=${comment.contentComment}`)
    }
    deleteCommentCyberBugsServices(idComment) {
        return this.delete(`Comment/deleteComment?idComment=${idComment}`)
    }
}

export const cyberBugsServices = new CyberBugsServices();