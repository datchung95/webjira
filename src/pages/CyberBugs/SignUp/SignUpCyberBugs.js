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
                        <NavLink to="/" className="text-dark">Quay v??? ????ng nh???p</NavLink>
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
        email: Yup.string().trim("Email kh??ng ???????c b??? tr???ng").required("Email kh??ng ???????c b??? tr???ng").email("Email kh??ng h???p l???"),
        passWord: Yup.string().trim("Password kh??ng ???????c b??? tr???ng").required("Password kh??ng ???????c b??? tr???ng").min(6, "Password t???i thi???u 6 k?? t???").max(15, "Password t???i ??a 15 k?? t???"),
        phoneNumber: Yup.string().trim("Phone kh??ng ???????c b??? tr???ng").required("Phone kh??ng ???????c b??? tr???ng"),
        name: Yup.string().trim("Name kh??ng ???????c b??? tr???ng").required("Name kh??ng ???????c b??? tr???ng")
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