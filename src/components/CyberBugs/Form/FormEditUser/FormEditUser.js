import React, { useEffect } from 'react'
import { withFormik } from 'formik'
import * as Yup from 'yup';
import { connect, useDispatch } from 'react-redux'
import { EDIT_USER_SAGA, SUBMIT_FORM_EDIT_USER } from '../../../../redux/types/CyberBugsTypes/CyberBugsTypes';

function FormEditUser(props) {

    const {
        values,
        touched,
        errors,
        handleChange,
        handleBlur,
        handleSubmit,
    } = props;

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch({
            type: SUBMIT_FORM_EDIT_USER,
            submitFunction: handleSubmit
        })
    }, [])

    return (
        <form className="container">
            <div className="form-group">
                <p>Id</p>
                <input disabled={true} name="id" className="form-control" value={values.id} onChange={handleChange} />
            </div>
            <div className="form-group">
                <div className="row">
                    <div className="col-6">
                        <p>Email</p>
                        <input name="email" type="email" className="form-control" value={values.email} onChange={handleChange} />
                        <p className="text-danger">{errors.email}</p>
                    </div>
                    <div className="col-6">
                        <p>Password</p>
                        <input name="passWord" type="password" className="form-control" value={values.passWord} onChange={handleChange} />
                        <p className="text-danger">{errors.passWord}</p>
                    </div>
                </div>
                <div className="row">
                    <div className="col-6">
                        <p>Name</p>
                        <input name="name" type="text" className="form-control" value={values.name} onChange={handleChange} />
                        <p className="text-danger">{errors.name}</p>
                    </div>
                    <div className="col-6">
                        <p>Phone</p>
                        <input name="phoneNumber" type="number" className="form-control" value={values.phoneNumber} onChange={handleChange} />
                        <p className="text-danger">{errors.phoneNumber}</p>
                    </div>
                </div>
            </div>
        </form>
    )
}

const formEditUserCyberBugs = withFormik({
    enableReinitialize: true,
    mapPropsToValues: (props) => ({
        id: props.userEdit.userId,
        email: props.userEdit.email,
        passWord: props.userEdit.passWord,
        phoneNumber: props.userEdit.phoneNumber,
        name: props.userEdit.name
    }),
    validationSchema: Yup.object().shape({
        email: Yup.string().trim("Email không được bỏ trống").required("Email không được bỏ trống").email("Email không hợp lệ"),
        passWord: Yup.string().trim("Password không được bỏ trống").required("Password không được bỏ trống").min(6, "Password tối thiểu 6 ký tự").max(15, "Password tối đa 15 ký tự"),
        phoneNumber: Yup.string().trim("Phone không được bỏ trống").required("Phone không được bỏ trống"),
        name: Yup.string().trim("Name không được bỏ trống").required("Name không được bỏ trống")
    }),
    handleSubmit: (values, { props, setSubmitting }) => {
        props.dispatch({
            type: EDIT_USER_SAGA,
            user: {
                id: values.id,
                email: values.email,
                passWord: values.passWord,
                phoneNumber: values.phoneNumber,
                name: values.name
            }
        })
    },

    displayName: "FormEditUserCyberBugs",
})(FormEditUser);

const mapStateToProps = (state) => ({
    userEdit: state.DrawerCyberBugsReducer.userEdit
})

export default connect(mapStateToProps)(formEditUserCyberBugs)