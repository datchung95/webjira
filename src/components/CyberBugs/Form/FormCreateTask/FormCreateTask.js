import { Editor } from '@tinymce/tinymce-react'
import React, { useEffect, useState } from 'react'
import { Select, Slider } from 'antd';
import { useSelector, useDispatch, connect } from 'react-redux';
import { CREATE_TASK_FORM_CREATE_TASK_SAGA, GET_ALL_PROJECT_FORM_CREATE_TASK_SAGA, GET_PRIORITY_FORM_CREATE_TASK_SAGA, GET_SEARCH_USER_SAGA, GET_STATUS_FORM_CREATE_TASK_SAGA, GET_TASK_TYPE_FORM_CREATE_TASK_SAGA, GET_USER_BY_PROJECT_FORM_CREATE_TASK_SAGA, SUBMIT_FORM_CREATE_TASK } from '../../../../redux/types/CyberBugsTypes/CyberBugsTypes';
import { withFormik } from 'formik'
import * as Yup from 'yup'

const children = [];

function FormCreateTask(props) {

    const {
        values,
        touched,
        errors,
        handleChange,
        handleBlur,
        handleSubmit,
        set,
        setFieldValue
    } = props;

    const [size, setSize] = useState('middle');

    const [timeTracking, setTimeTracking] = useState({
        timeTrackingSpent: 0,
        timeTrackingRemaining: 0
    })

    const handleEditorChange = (content, editor) => {
        setFieldValue("description", content);
    }

    const dispatch = useDispatch();
    const { project, taskType, priority, status } = useSelector(state => state.ModalFormCreateTaskReducer);

    const { userSearch } = useSelector(state => state.UserCyberBugsReducer);

    const userOption = userSearch?.map((item, index) => {
        return { value: item.userId, label: item.name }
    })

    useEffect(() => {
        dispatch({
            type: GET_ALL_PROJECT_FORM_CREATE_TASK_SAGA
        })
        dispatch({
            type: GET_TASK_TYPE_FORM_CREATE_TASK_SAGA
        })
        dispatch({
            type: GET_PRIORITY_FORM_CREATE_TASK_SAGA
        })
        dispatch({
            type: GET_STATUS_FORM_CREATE_TASK_SAGA
        })
        dispatch({
            type: GET_SEARCH_USER_SAGA,
            keyWord: ""
        })
        dispatch({
            type: SUBMIT_FORM_CREATE_TASK,
            submitFunction: handleSubmit
        })
    }, [])

    return (
        <form className="container" onSubmit={handleSubmit}>
            <div className="form-group">
                <p>Project</p>
                <select name="projectId" className="form-control" style={{ cursor: "pointer" }} onChange={(e) => {
                    setFieldValue("projectId", e.target.value)
                    dispatch({
                        type: GET_USER_BY_PROJECT_FORM_CREATE_TASK_SAGA,
                        projectId: e.target.value
                    })
                }}>
                    {project.map((item, index) => {
                        return <option key={index} value={item.id}>{item.projectName}</option>
                    })}
                </select>
            </div>
            <div className="form-group">
                <p>Task Name</p>
                <input className="form-control" name="taskName" onChange={handleChange} />
            </div>
            <div className="form-group">
                <p>Status</p>
                <select className="form-control" name="statusId" onChange={handleChange}>
                    {status.map((item, index) => {
                        return <option key={index} value={item.statusId}>{item.statusName}</option>
                    })}
                </select>
            </div>
            <div className="form-group">
                <div className="row">
                    <div className="col-6">
                        <p>Priority</p>
                        <select name="priorityId" className="form-control" style={{ cursor: "pointer" }} onChange={handleChange}>
                            {priority.map((item, index) => {
                                return <option key={index} value={item.priorityId}>{item.priority}</option>
                            })}
                        </select>
                    </div>
                    <div className="col-6">
                        <p>Task Type</p>
                        <select name="typeId" className="form-control" style={{ cursor: "pointer" }} onChange={handleChange}>
                            {taskType.map((item, index) => {
                                return <option key={index} value={item.id}>{item.taskType}</option>
                            })}
                        </select>
                    </div>
                </div>
            </div>
            <div className="form-group">
                <div className="row">
                    <div className="col-6">
                        <p>Assingees</p>
                        <Select
                            mode="multiple"
                            size={size}
                            placeholder="Please select"
                            options={userOption}
                            // defaultValue={}
                            optionFilterProp="label"
                            onChange={(values) => {
                                setFieldValue("listUserAsign", values)
                            }}
                            onSearch={() => {
                                
                            }}
                            style={{
                                width: '100%',
                            }}
                        >
                            {children}
                        </Select>
                        <div className="row" style={{ marginTop: "20px" }}>
                            <div className="col-12">
                                <p>Original Estimate</p>
                                <input type="number" min="0" defaultValue="0" name="originalEstimate" className="form-control" onChange={handleChange} />
                            </div>
                        </div>
                    </div>
                    <div className="col-6">
                        <p>Time Tracking</p>
                        <Slider max={Number(timeTracking.timeTrackingSpent) + Number(timeTracking.timeTrackingRemaining)} value={timeTracking.timeTrackingSpent} />
                        <div className="row">
                            <div className="col-6 text-left font-weight-bold">{timeTracking.timeTrackingSpent}h logged</div>
                            <div className="col-6 text-right font-weight-bold">{timeTracking.timeTrackingRemaining}h remaining</div>
                        </div>
                        <div className="row" style={{ marginTop: "10px" }}>
                            <div className="col-6">
                                <p>Time spent</p>
                                <input type="number" min="0" defaultValue="0" className="form-control" name="timeTrackingSpent" onChange={(e) => {
                                    setTimeTracking({
                                        ...timeTracking,
                                        timeTrackingSpent: e.target.value
                                    });
                                    setFieldValue("timeTrackingSpent", e.target.value)
                                }} />
                            </div>
                            <div className="col-6">
                                <p>Time remaning</p>
                                <input type="number" min="0" defaultValue="0" className="form-control" name="timeTrackingRemaining" onChange={(e) => {
                                    setTimeTracking({
                                        ...timeTracking,
                                        timeTrackingRemaining: e.target.value
                                    });
                                    setFieldValue("timeTrackingRemaining", e.target.value)
                                }} />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="form-group">
                <p>Description</p>
                <Editor
                    // value={values.description}
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
                    onEditorChange={handleEditorChange}
                />
            </div>
        </form>
    )
}

const formCreateProject = withFormik({
    enableReinitialize: true,
    mapPropsToValues: (props) => {
        const { project, taskType, priority, status } = props

        return {
            listUserAsign: [],
            taskName: "",
            description: "",
            statusId: status[0]?.statusId,
            originalEstimate: 0,
            timeTrackingSpent: 0,
            timeTrackingRemaining: 0,
            projectId: project[0]?.id,
            typeId: taskType[0]?.id,
            priorityId: priority[0]?.priorityIdpriorityId
        }
    },
    validationSchema: Yup.object().shape({

    }),
    handleSubmit: (values, { props, setSubmitting }) => {
        props.dispatch({
            type: CREATE_TASK_FORM_CREATE_TASK_SAGA,
            taskObject: values
        })
    },

    displayName: "formCreateProject",
})(FormCreateTask);

const mapStateToProps = (state) => ({
    project: state.ModalFormCreateTaskReducer.project,
    taskType: state.ModalFormCreateTaskReducer.taskType,
    priority: state.ModalFormCreateTaskReducer.taskType,
    status: state.ModalFormCreateTaskReducer.status
})

export default connect(mapStateToProps)(formCreateProject);