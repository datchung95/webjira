import React, { Fragment, useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import parse from 'html-react-parser'
import { ADD_COMMENT_SAGA, CHANGE_VALUE_MEMBERS_MODAL_CYBERBUGS, CHANGE_VALUE_MODAL_CYBERBUGS, DELETE_COMMENT_SAGA, DELETE_MEMBERS_MODAL_CYBERBUGS, EDIT_COMMENT_SAGA, GET_ALL_COMMENT_SAGA, GET_PRIORITY_FORM_CREATE_TASK_SAGA, GET_STATUS_FORM_CREATE_TASK_SAGA, GET_TASK_TYPE_FORM_CREATE_TASK_SAGA, HANDLE_CHANGE_CALL_API_MODAL_CYBERBUGS, UPDATE_STATUS_MODAL_CYBERBUGS_SAGA } from '../../redux/types/CyberBugsTypes/CyberBugsTypes';
import { Editor } from '@tinymce/tinymce-react';
import { Select } from 'antd';

const { Option } = Select;

export default function ModalCyberBugs() {

    const { modalTaskDetail } = useSelector(state => state.ModalIndexTaskDetailReducer);
    
    const dispatch = useDispatch();
    const { status, priority, taskType } = useSelector(state => state.ModalFormCreateTaskReducer);
    const { projectDetail } = useSelector(state => state.GetProjectDetailReducer)

    const [stateDes, setStateDes] = useState(false);

    const [stateCom, setStateCom] = useState(false);

    const [historyContent, setHistoryContent] = useState(modalTaskDetail.description);
    const [stateContent, setStateContent] = useState(modalTaskDetail.description);

    const [stateContentCom, setStateContentCom] = useState(modalTaskDetail.lstComment?.commentContent);
    const [stateContentComEdit, setStateContentComEdit] = useState({value: "", id: ""});

    useEffect(() => {
        dispatch({
            type: GET_STATUS_FORM_CREATE_TASK_SAGA
        })
        dispatch({
            type: GET_PRIORITY_FORM_CREATE_TASK_SAGA
        })
        dispatch({
            type: GET_TASK_TYPE_FORM_CREATE_TASK_SAGA
        })
    }, [])

    const renderTimeTracking = () => {

        const { timeTrackingSpent, timeTrackingRemaining } = modalTaskDetail;
        const max = Number(timeTrackingSpent) + Number(timeTrackingRemaining);
        const percent = Number(timeTrackingSpent) / max * 100;

        return <div>
            <div style={{ display: 'flex' }}>
                <i className="fa fa-clock" />
                <div style={{ width: '100%' }}>
                    <div className="progress">
                        <div className="progress-bar" role="progressbar" style={{ width: `${percent}%` }} aria-valuenow={Number(timeTrackingSpent)} aria-valuemin={0} aria-valuemax={max} />
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                        <p className="logged">{Number(timeTrackingSpent)}h logged</p>
                        <p className="estimate-time">{Number(timeTrackingRemaining)}h remaining</p>
                    </div>
                </div>
            </div>
            <div className="row">
                <div className="col-6">
                    <input onChange={handleChangeValue} className="form-control" name="timeTrackingSpent" />
                </div>
                <div className="col-6">
                    <input onChange={handleChangeValue} className="form-control" name="timeTrackingRemaining" />
                </div>
            </div>
        </div>
    }

    const renderDescription = () => {
        const jsxDes = parse(modalTaskDetail.description);
        return <div>
            {stateDes ? <div>
                <Editor
                    initialValue={modalTaskDetail.description}
                    name="description1"
                    init={{
                        height: 200,
                        menubar: false,
                        plugins: [
                            'advlist autolink lists link image charmap print preview anchor',
                            'searchreplace visualblocks code fullscreen',
                            'insertdatetime media table paste code help wordcount'
                        ],
                        toolbar: 'undo redo | formatselect | ' +
                            'bold italic backcolor | alignleft aligncenter ' +
                            'alignright alignjustify | bullist numlist outdent indent | ' +
                            'removeformat | help',
                        content_style: 'body { font-family:Helvetica,Arial,sans-serif; font-size:14px }'
                    }}
                    onEditorChange={(content, editor) => {
                        setStateContent(content)
                    }}
                />
                <button className="btn btn-success" onClick={() => {
                    dispatch({
                        type: HANDLE_CHANGE_CALL_API_MODAL_CYBERBUGS,
                        actionType: CHANGE_VALUE_MODAL_CYBERBUGS,
                        name: "description",
                        value: stateContent
                    })
                    setStateDes(!stateDes)
                    setHistoryContent(stateContent)
                }}>Save</button>
                <button className="btn btn-primary" onClick={() => {
                    dispatch({
                        type: HANDLE_CHANGE_CALL_API_MODAL_CYBERBUGS,
                        actionType: CHANGE_VALUE_MODAL_CYBERBUGS,
                        name: "description",
                        value: historyContent
                    })
                    setStateDes(false)
                }}>Close</button>
            </div> : <div onClick={() => { setStateDes(!stateDes) }}>{jsxDes}</div>}
        </div>
    }

    const renderComment = () => {
        return <Fragment>
            <div className="block-comment d-md-flex d-block my-3">
                <div className="avatar">
                    <img src={require("../../assets/img/download (1).jfif")} alt="img" />
                </div>
                <div className="input-comment">
                    {stateCom === false ? <div>
                        <Editor
                            name="comment"
                            init={{
                                height: 200,
                                menubar: false,
                                plugins: [
                                    'advlist autolink lists link image charmap print preview anchor',
                                    'searchreplace visualblocks code fullscreen',
                                    'insertdatetime media table paste code help wordcount'
                                ],
                                toolbar: 'undo redo | formatselect | ' +
                                    'bold italic backcolor | alignleft aligncenter ' +
                                    'alignright alignjustify | bullist numlist outdent indent | ' +
                                    'removeformat | help',
                                content_style: 'body { font-family:Helvetica,Arial,sans-serif; font-size:14px }'
                            }}
                            onEditorChange={(content, editor) => {
                                setStateContentCom(content)
                            }}
                        />
                        <div className="mt-3">
                            <button className="btn btn-primary mr-3" onClick={() => {
                                dispatch({
                                    type: ADD_COMMENT_SAGA,
                                    comment: {
                                        taskId: modalTaskDetail.taskId,
                                        contentComment: stateContentCom
                                    }
                                })
                            }}>Add</button>
                        </div>
                    </div> : <div>
                        <Editor
                            initialValue={stateContentComEdit.value}
                            name="comment1"
                            init={{
                                height: 200,
                                menubar: false,
                                plugins: [
                                    'advlist autolink lists link image charmap print preview anchor',
                                    'searchreplace visualblocks code fullscreen',
                                    'insertdatetime media table paste code help wordcount'
                                ],
                                toolbar: 'undo redo | formatselect | ' +
                                    'bold italic backcolor | alignleft aligncenter ' +
                                    'alignright alignjustify | bullist numlist outdent indent | ' +
                                    'removeformat | help',
                                content_style: 'body { font-family:Helvetica,Arial,sans-serif; font-size:14px }'
                            }}
                            onEditorChange={(content, editor) => {
                                setStateContentCom(content)
                            }}
                        />
                        <div className="mt-3">
                            <button className="btn btn-primary mr-3" onClick={() => {
                                setStateCom(false);
                                dispatch({
                                    type: EDIT_COMMENT_SAGA,
                                    comment: {
                                        id: stateContentComEdit.id,
                                        contentComment: stateContentCom,
                                        taskId: modalTaskDetail.taskId
                                    }
                                })
                            }}>Save</button>
                            <button className="btn btn-light" onClick={() => {
                                setStateCom(false)
                            }}>Close</button>
                        </div></div>}
                </div>
            </div>
            <div className="lastest-comment mt-4">
                {modalTaskDetail.lstComment?.map((item, index) => {
                    return <div className="comment-item mb-3" key={index}>
                        <div className="display-comment" style={{ display: 'flex' }}>
                            <div className="avatar">
                                <img src={item.avatar} alt="img" />
                            </div>
                            <div>
                                <p style={{ marginBottom: 5 }}>
                                    {item.name}
                                </p>
                                <p style={{ marginBottom: 5 }}>
                                    {item.commentContent}
                                </p>
                                <div>
                                    <span style={{ color: '#929398', marginRight: "10px", cursor: "pointer" }} onClick={() => {
                                        setStateCom(true);
                                        setStateContentComEdit({
                                            value: item.commentContent,
                                            id: item.id
                                        })
                                    }}>Edit</span>
                                    •
                                    <span style={{ color: '#929398', marginLeft: "10px", cursor: "pointer" }} onClick={() => {
                                        dispatch({
                                            type: DELETE_COMMENT_SAGA,
                                            idComment: item.id,
                                            taskId: modalTaskDetail.taskId
                                        })
                                    }}>Delete</span>
                                </div>
                            </div>
                        </div>
                    </div>
                })}
            </div>
        </Fragment>
    }

    const renderAddMembers = () => {
        return projectDetail.members?.filter(mem => {
            let index = modalTaskDetail.assigness?.findIndex(user => user.id === mem.userId);
            if (index !== -1) {
                return false
            }
            return true
        }).map((item, index) => {
            return { value: item.userId, label: item.name }
        })
    }

    const handleChangeValue = (e) => {
        const { name, value } = e.target;
        dispatch({
            type: HANDLE_CHANGE_CALL_API_MODAL_CYBERBUGS,
            actionType: CHANGE_VALUE_MODAL_CYBERBUGS,
            name,
            value
        })
    }

    return (
        <Fragment>
            <div className="modal fade" id="infoModal" tabIndex={-1} role="dialog" aria-labelledby="infoModal" aria-hidden="true">
                <div className="modal-dialog modal-info">
                    <div className="modal-content">
                        <div className="modal-header">
                            <div className="task-title">
                                <i className="fa fa-bookmark" />
                                <select className="form-control" value={modalTaskDetail.typeId} name="typeId" onChange={handleChangeValue}>
                                    {taskType.map((item, index) => {
                                        return <option key={index} value={item.id}>{item.taskType}</option>
                                    })}
                                </select>
                            </div>
                            <div style={{ display: 'flex' }} className="task-click">
                                <div>
                                    <i className="fab fa-telegram-plane" />
                                    <span style={{ paddingRight: 20 }}>Give feedback</span>
                                </div>
                                <div>
                                    <i className="fa fa-link" />
                                    <span style={{ paddingRight: 20 }}>Copy link</span>
                                </div>
                                <i className="fa fa-trash-alt" style={{ cursor: 'pointer' }} />
                                <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                    <span aria-hidden="true">×</span>
                                </button>
                            </div>
                        </div>
                        <div className="modal-body">
                            <div className="container-fluid">
                                <div className="row">
                                    <div className="col-12 col-md-8">
                                        <p className="issue">{modalTaskDetail.taskName}</p>
                                        <div className="description">
                                            <p>Description</p>
                                            {modalTaskDetail.description ? renderDescription() : ""}
                                        </div>
                                        <div className="comment">
                                            <h6>Comment</h6>
                                            {renderComment()}
                                        </div>
                                    </div>
                                    <div className="col-12 col-md-4">
                                        <div className="status">
                                            <h6>STATUS</h6>
                                            <select className="custom-select" name="statusId" value={modalTaskDetail.statusId} onChange={(e) => {
                                                handleChangeValue(e)
                                            }}>
                                                {status.map((item, index) => {
                                                    return <option key={index} value={item.statusId}>{item.statusName}</option>
                                                })}
                                            </select>
                                        </div>
                                        <div className="assignees">
                                            <h6>ASSIGNEES</h6>
                                            <div>
                                                {modalTaskDetail.assigness?.map((item, index) => {
                                                    return <div key={index} style={{ display: 'flex', marginTop: "10px" }} className="item">
                                                        <div className="avatar">
                                                            <img src={item.avatar} alt="img" />
                                                        </div>
                                                        <p className="name mt-1 ml-1">
                                                            {item.name}
                                                            <button onClick={() => {
                                                                dispatch({
                                                                    type: HANDLE_CHANGE_CALL_API_MODAL_CYBERBUGS,
                                                                    actionType: DELETE_MEMBERS_MODAL_CYBERBUGS,
                                                                    memberId: item.id
                                                                })
                                                            }} style={{ marginLeft: "10px", outline: "none", border: "none" }}>X</button>
                                                        </p>
                                                    </div>
                                                })}
                                                <div style={{ margin: "10px 0px" }}>
                                                    <Select className="d-block" name="lstUser"
                                                        optionFilterProp="label"
                                                        options={renderAddMembers()}
                                                        value="+ Add more"
                                                        onSelect={(value) => {
                                                            let userAss = projectDetail.members?.find(item => item.userId == value)
                                                            userAss = { ...userAss, id: userAss.userId }
                                                            dispatch({
                                                                type: HANDLE_CHANGE_CALL_API_MODAL_CYBERBUGS,
                                                                actionType: CHANGE_VALUE_MEMBERS_MODAL_CYBERBUGS,
                                                                assigness: userAss
                                                            })
                                                        }}>

                                                    </Select>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="priority" style={{ marginBottom: 20 }}>
                                            <h6>PRIORITY</h6>
                                            <select className="form-control" name="priorityId" value={modalTaskDetail.priorityId} onChange={(e) => { handleChangeValue(e) }}>
                                                {priority.map((item, index) => {
                                                    return <option key={index} value={item.priorityId}>{item.priority}</option>
                                                })}
                                            </select>
                                        </div>
                                        <div className="estimate">
                                            <h6>ORIGINAL ESTIMATE (HOURS)</h6>
                                            <input type="text" name="originalEstimate" className="estimate-hours" value={modalTaskDetail.originalEstimate} onChange={(e) => { handleChangeValue(e) }} />
                                        </div>
                                        <div className="time-tracking">
                                            <h6>TIME TRACKING</h6>
                                            {renderTimeTracking()}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </Fragment>
    )
}
