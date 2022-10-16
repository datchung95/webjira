import React from 'react'
import { withFormik } from 'formik'
import * as Yup from 'yup';
import { connect } from 'react-redux'
import { SIGN_UP_SAGA } from '../../../redux/types/CyberBugsTypes/CyberBugsTypes';
import { NavLink } from 'react-router-dom';

function SignUpCyberBugs(props) {

    const {
        values,
        touched,
        errors,
        handleChange,
        handleBlur,
        handleSubmit,
    } = props;

    return (
        <form className="container" onSubmit={handleSubmit}>
            <div className="d-flex justify-content-center align-items-center" style={{ height: window.innerHeight }}>
                <div>
                    <h3 className="text-center mb-5">Sign Up</h3>
                    <div className="form-group">
                        <input onChange={handleChange} type="email" className="form-control" name="email" placeholder="email" />
                        {touched.email && <p className="text-danger">{errors.email}</p>}
                    </div>
                    <div className="form-group">
                        <input onChange={handleChange} type="password" className="form-control" name="passWord" placeholder="password" />
                        {touched.passWord && <p className="text-danger">{errors.passWord}</p>}
                    </div>
                    <div className="form-group">
                        <input onChange={handleChange} type="number" className="form-control" name="phoneNumber" placeholder="phoneNumber" />
                        {touched.phoneNumber && <p className="text-danger">{errors.phoneNumber}</p>}
                    </div>
                    <div className="form-group">
                        <input onChange={handleChange} type="text" className="form-control" name="name" placeholder="name" />
                        {touched.name && <p className="text-danger">{errors.name}</p>}
                    </div>
                    <div className="text-center mt-4">
                        <button className="btn btn-primary">Sign Up</button>
                    </div>
                    <div className="mt-3 text-center">
                        <NavLink to="/" className="text-dark">Quay về đăng nhập</NavLink>
                    </div>
                </div>
            </div>
        </form>
    )
}

const signUpCyberBugs = withFormik({
    mapPropsToValues: () => ({
        email: "",
        passWord: "",
        phoneNumber: "",
        name: ""
    }),
    validationSchema: Yup.object().shape({
        email: Yup.string().trim("Email không được bỏ trống").required("Email không được bỏ trống").email("Email không hợp lệ"),
        passWord: Yup.string().trim("Password không được bỏ trống").required("Password không được bỏ trống").min(6, "Password tối thiểu 6 ký tự").max(15, "Password tối đa 15 ký tự"),
        phoneNumber: Yup.string().trim("Phone không được bỏ trống").required("Phone không được bỏ trống"),
        name: Yup.string().trim("Name không được bỏ trống").required("Name không được bỏ trống")
    }),
    handleSubmit: (values, { props, setSubmitting }) => {
        props.dispatch({
            type: SIGN_UP_SAGA,
            user: {
                email: values.email,
                passWord: values.passWord,
                phoneNumber: values.phoneNumber,
                name: values.name
            }
        });
    },

    displayName: "SignUpCyberBugs",
})(SignUpCyberBugs);

export default connect()(signUpCyberBugs)