import React, { useEffect } from 'react'
import { Editor } from '@tinymce/tinymce-react'
import { withFormik } from 'formik'
import * as Yup from 'yup';
import { connect, useSelector, useDispatch } from 'react-redux'
import { CREATE_PROJECT_SAGA, GET_ALL_PROJECT_CATEGORY_SAGA } from '../../../redux/types/CyberBugsTypes/CyberBugsTypes';

function CreateProject(props) {

    const handleEditorChange = (content, editor) => {
        //dùng setFieldValue của formik để set giá trị cho description
        setFieldValue("description", content);
    }

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

    useEffect(() => {
        //khi component được render thì sẽ gọi api lấy projectcategory chỉ chạy 1 lần
        dispatch({ type: GET_ALL_PROJECT_CATEGORY_SAGA });
    }, [])

    return (
        <div className="container mt-5">
            <h3 className="text-center">Create Project</h3>
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <p>Name</p>
                    <input onChange={handleChange} className="form-control" name="projectName" />
                </div>
                <div className="form-group">
                    <p>Description</p>
                    <Editor
                        name="description"
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
                <div className="form-group">
                    <select onChange={handleChange} name="categoryId" className="form-control">
                        {arrProjectCategory.map((item, index) => {
                            return <option value={item.id} key={index}>{item.projectCategoryName}</option>
                        })}
                    </select>
                </div>
                <button type="submit" className="btn btn-outline-primary">Create</button>
            </form>
        </div>
    )
}

//hàm createProjectForm bọc component CreateProject thì CreateProject cũng nhận được props của createProjectForm
const createProjectForm = withFormik({
    //enableReinitialize khi arrProjectCategory thay đổi thì chạy lại hàm mapPropsToValues nếu không có lệnh enableReinitialize: true thì nó chỉ chạy 1 lần duy nhất khi load component
    enableReinitialize: true,
    mapPropsToValues: (props) => {
        return {
            projectName: "",
            description: "",
            categoryId: `${props.arrProjectCategory[0] ?.id}`
        }
    },
    validationSchema: Yup.object().shape({

    }),
    handleSubmit: (values, { props, setSubmitting }) => {
        props.dispatch({
            type: CREATE_PROJECT_SAGA,
            newProject: values
        })
    },  

    displayName: "CreateProjectFormik",
})(CreateProject);

//tạo map to props để createProjectForm nhận được props là arrProjectCategory vì hàm connect bọc createProjectForm
const mapStateToProps = (state) => ({
    arrProjectCategory: state.ProjectCategoryReducer.arrProjectCategory
})

export default connect(mapStateToProps)(createProjectForm)