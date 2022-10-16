import { Editor } from '@tinymce/tinymce-react'
import React, { useEffect, useState } from 'react'
import { Select, Slider } from 'antd';
import { useSelector, useDispatch, connect } from 'react-redux';
import { CREATE_TASK_FORM_CREATE_TASK_SAGA, GET_ALL_PROJECT_FORM_CREATE_TASK_SAGA, GET_PRIORITY_FORM_CREATE_TASK_SAGA, GET_SEARCH_USER_SAGA, GET_STATUS_FORM_CREATE_TASK_SAGA, GET_TASK_TYPE_FORM_CREATE_TASK_SAGA, GET_USER_BY_PROJECT_FORM_CREATE_TASK_SAGA, SUBMIT_FORM_CREATE_TASK } from '../../../../redux/types/CyberBugsTypes/CyberBugsTypes';
import { withFormik } from 'formik'
import * as Yup from 'yup'

const children = [];

const { Option } = Select;

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
                <Select className='w-100' placeholder="Select My Project" name="projectId" style={{ cursor: "pointer" }} onChange={(value) => {
                    setFieldValue("projectId", value)
                    dispatch({
                        type: GET_USER_BY_PROJECT_FORM_CREATE_TASK_SAGA,
                        projectId: value
                    })
                }}>
                    {project.map((item, index) => {
                        return <Option key={index} value={item.id}>{item.projectName}</Option>
                    })}
                </Select>
                {touched.projectId && <p className='text-danger'>{errors.projectId}</p>}
            </div>
            <div className="form-group">
                <p>Task Name</p>
                <input className="form-control" name="taskName" onChange={handleChange} />
                {touched.taskName && <p className='text-danger'>{errors.taskName}</p>}
            </div>
            <div className="form-group">
                <p>Status</p>
                <Select className='w-100' name="statusId" placeholder="Select Status" onChange={(value) => {
                    setFieldValue("statusId", value)
                }}>
                    {status.map((item, index) => {
                        return <Option key={index} value={item.statusId}>{item.statusName}</Option>
                    })}
                </Select>
                {touched.statusId && <p className='text-danger'>{errors.statusId}</p>}
            </div>
            <div className="form-group">
                <div className="row">
                    <div className="col-12 col-md-6">
                        <p>Priority</p>
                        <Select className='w-100' name="priorityId" placeholder="Select Priority" style={{ cursor: "pointer" }} onChange={(value) => {
                            setFieldValue("priorityId", value)
                        }}>
                            {priority.map((item, index) => {
                                return <Option key={index} value={item.priorityId}>{item.priority}</Option>
                            })}
                        </Select>
                        {touched.priorityId && <p className='text-danger'>{errors.priorityId}</p>}
                    </div>
                    <div className="col-12 col-md-6">
                        <p>Task Type</p>
                        <Select className='w-100' name="typeId" placeholder="Select Task Type" style={{ cursor: "pointer" }} onChange={(value) => {
                            setFieldValue("typeId", value)
                        }}>
                            {taskType.map((item, index) => {
                                return <Option value={item.id}>{item.taskType}</Option>
                            })}
                        </Select>
                        {touched.typeId && <p className='text-danger'>{errors.typeId}</p>}
                    </div>
                </div>
            </div>
            <div className="form-group">
                <div className="row">
                    <div className="col-12 col-md-6">
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
                    <div className="col-12 col-md-6">
                        <p>Time Tracking</p>
                        <Slider max={Number(timeTracking.timeTrackingSpent) + Number(timeTracking.timeTrackingRemaining)} value={timeTracking.timeTrackingSpent} />
                        <div className="row">
                            <div className="col-6 text-left font-weight-bold">{timeTracking.timeTrackingSpent}h logged</div>
                            <div className="col-6 text-right font-weight-bold">{timeTracking.timeTrackingRemaining}h remaining</div>
                        </div>
                        <div className="row" style={{ marginTop: "10px" }}>
                            <div className="col-12 col-md-6">
                                <p>Time spent</p>
                                <input type="number" min="0" defaultValue="0" className="form-control" name="timeTrackingSpent" onChange={(e) => {
                                    setTimeTracking({
                                        ...timeTracking,
                                        timeTrackingSpent: e.target.value
                                    });
                                    setFieldValue("timeTrackingSpent", e.target.value)
                                }} />
                            </div>
                            <div className="col-12 col-md-6">
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
    mapPropsToValues: (props) => {
        return {
            listUserAsign: [],
            taskName: "",
            description: "",
            statusId: "",
            originalEstimate: 0,
            timeTrackingSpent: 0,
            timeTrackingRemaining: 0,
            projectId: "",
            typeId: "",
            priorityId: ""
        }
    },
    validationSchema: Yup.object().shape({
        taskName: Yup.string().trim().required("Task name is required"),
        description: Yup.string().trim().required("Description is required"),
        statusId: Yup.string().trim().required("Status is required"),
        projectId: Yup.string().trim().required("Project is required"),
        typeId: Yup.string().trim().required("Task Type is required"),
        priorityId: Yup.string().trim().required("Priority is required")
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