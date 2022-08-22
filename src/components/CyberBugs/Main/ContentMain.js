import React from 'react'
import { useDispatch } from 'react-redux'
import { GET_TASK_DETAIL_MODAL_CYBERBUGS_SAGA, UPDATE_STATUS_MODAL_CYBERBUGS_SAGA } from '../../../redux/types/CyberBugsTypes/CyberBugsTypes';
import { DragDropContext, Draggable, Droppable } from 'react-beautiful-dnd'

export default function ContentMain(props) {

    const dispatch = useDispatch();

    const handleDragEnd = (res) => {
        const { destination, source } = res;
        const {taskId, projectId} = JSON.parse(res.draggableId)
        if (!destination) {
            return ;
        }
        if (destination.droppableId === source.droppableId && destination.index === source.index) {
            return ;
        }
        dispatch({
            type: UPDATE_STATUS_MODAL_CYBERBUGS_SAGA,
            taskUpdate: {
                taskId: taskId,
                statusId: destination.droppableId,
                projectId: projectId
            }
        })
    }

    const renderTaskList = () => {
        return <DragDropContext onDragEnd={handleDragEnd}>
            {props.lstTask?.map((item, index) => {
                return <Droppable droppableId={item.statusId} key={index} >
                    {(provided) => {
                        return <div className="card pb-3" style={{ width: '17rem', height: 'auto' }}>
                            <div className="card-header">
                                {item.statusName}
                            </div>
                            <ul ref={provided.innerRef} {...provided.droppableProps} className="list-group list-group-flush" style={{ height: "100%" }}>
                                {item.lstTaskDeTail.map((list, index) => {
                                    return <Draggable key={list.taskId.toString()} draggableId={JSON.stringify({taskId: list.taskId.toString(), projectId: list.projectId.toString()})} index={index}>
                                        {(provided) => {
                                            return <li ref={provided.innerRef} {...provided.draggableProps} {...provided.dragHandleProps} onClick={() => {
                                                dispatch({
                                                    type: GET_TASK_DETAIL_MODAL_CYBERBUGS_SAGA,
                                                    taskId: list.taskId
                                                })
                                            }} className="list-group-item" data-toggle="modal" data-target="#infoModal">
                                                <p className="font-weight-bold">{list.taskName}</p>
                                                <div className="block" style={{ display: 'flex' }}>
                                                    <div className="block-left">
                                                        <p>{list.priorityTask.priority}</p>
                                                    </div>
                                                    <div className="block-right">
                                                        <div className="avatar-group" style={{ display: 'flex' }}>
                                                            <div className="avatar">
                                                                {list.assigness.map((member, index) => {
                                                                    return <img key={index} src={member.avatar} alt="member" />
                                                                })}
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </li>
                                        }}
                                    </Draggable>
                                })}
                                {provided.placeholder}
                            </ul>
                        </div>
                    }}
                </Droppable>
            })}
        </DragDropContext>
    }

    return (
        <div className="content" style={{ display: 'flex' }}>
            {renderTaskList()}
        </div>
    )
}
