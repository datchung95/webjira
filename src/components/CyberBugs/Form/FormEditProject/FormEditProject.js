import { Editor } from '@tinymce/tinymce-react'
import { withFormik } from 'formik'
import * as Yup from 'yup'
import React, { useEffect } from 'react'
import { connect, useDispatch, useSelector } from 'react-redux'
import { EDIT_PROJECT_CYBERBUGS_SAGA, GET_ALL_PROJECT_CATEGORY_SAGA, SUBMIT_FORM_EDIT_PROJECT } from '../../../../redux/types/CyberBugsTypes/CyberBugsTypes';

function FormEditProject(props) {

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

    const arrProjectCategory = useSelector(state => state.ProjectCategoryReducer.arrProjectCategory);

    const dispatch = useDispatch();

    // const submitForm = (e) => {
    //     e.preventDefault();
    // }

    useEffect(() => {
        dispatch({
            type: SUBMIT_FORM_EDIT_PROJECT,
            submitForm: handleSubmit
        })
        dispatch({ type: GET_ALL_PROJECT_CATEGORY_SAGA });
    }, [])

    const handleEditorChange = (content, editor) => {
        setFieldValue("description", content);
    }

    return (
        <form className="container" onSubmit={handleSubmit}>
            <div className="row">
                <div className="col-4">
                    <div className="form-group">
                        <p>Project Id</p>
                        <input className="form-control" value={values.id} name="id" disabled={true} />
                    </div>
                </div>
                <div className="col-4">
                    <div className="form-group">
                        <p>Project Name</p>
                        <input onChange={handleChange} value={values.projectName} className="form-control" name="projectName" />
                    </div>
                </div>
                <div className="col-4">
                    <div className="form-group">
                        <p>Project Category</p>
                        <div className="form-group">
                            <select onChange={handleChange} name="categoryId" className="form-control" value={values.categoryId}>
                                {arrProjectCategory.map((item, index) => {
                                    return <option value={item.id} key={index}>{item.projectCategoryName}</option>
                                })}
                            </select>
                        </div>
                    </div>
                </div>
                <div className="col-12">
                    <div className="form-group">
                        <p>Description</p>
                        <Editor
                            value={values.description}
                            name="description1"
                            init={{
                                height: 300,
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
                </div>
            </div>
        </form>
    )
}

const editProjectForm = withFormik({
    enableReinitialize: true,
    mapPropsToValues: (props) => {
        const { projectEdit } = props
        return {
            id: projectEdit.id,
            projectName: projectEdit.projectName,
            categoryId: projectEdit.categoryId,
            description: projectEdit.description
        }
    },
    validationSchema: Yup.object().shape({

    }),
    handleSubmit: (values, { props, setSubmitting }) => {
        props.dispatch({
            type: EDIT_PROJECT_CYBERBUGS_SAGA,
            projectUpdate: values
        })
    },

    displayName: "EditProjectFormik",
})(FormEditProject);

const mapStateToProps = (state) => ({
    projectEdit: state.EditProjectCyberBugsReducer.projectEdit
})

export default connect(mapStateToProps)(editProjectForm)