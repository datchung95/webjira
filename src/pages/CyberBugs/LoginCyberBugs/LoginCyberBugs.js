import React from 'react'
import { UserOutlined, LockOutlined, FacebookOutlined, TwitterOutlined } from '@ant-design/icons';
import { Button, Input } from 'antd';
import { withFormik } from 'formik'
import * as Yup from 'yup';
import { connect } from 'react-redux'
import { signInCyberBugsAction } from '../../../redux/actions/CyberBugsActions/CyberBugsAction';
import { NavLink } from 'react-router-dom'

function LoginCyberBugs(props) {

    const {
        values,
        touched,
        errors,
        handleChange,
        handleBlur,
        handleSubmit,
    } = props;

    return (
        <form onSubmit={handleSubmit} className="container" style={{ height: window.innerHeight }}>
            <div className="d-flex justify-content-center align-items-center" style={{ height: window.innerHeight }}>
                <div>
                    <h3 className="text-center" style={{ fontSize: "35px" }}>Login CyberBugs</h3>
                    <Input onChange={handleChange} className="mt-3" name="email" type="email" size="large" placeholder="Email" prefix={<UserOutlined />} />
                    {touched.email && <p className="text-danger">{errors.email}</p>}
                    <Input onChange={handleChange} className="mt-3" name="password" type="password" size="large" placeholder="Password" prefix={<LockOutlined />} />
                    {touched.password && <p className="text-danger">{errors.password}</p>}
                    <div className="text-center">
                        <Button htmlType="submit" style={{ backgroundColor: "rgb(102, 117, 233)", width: "100%" }} size="large" className="mt-5">Login</Button>
                    </div>
                    <div className="text-center mt-2">
                        <NavLink to="/signupcyberbugs">Đăng ký</NavLink>
                    </div>
                    <div className="social mt-3 text-center">
                        <Button style={{ backgroundColor: "rgb(59, 89, 152)" }} className="mr-3" shape="circle" size="large" icon={<FacebookOutlined style={{ color: "white" }} />}></Button>
                        <Button type="primary" shape="circle" size="large" icon={<TwitterOutlined />}></Button>
                    </div>
                </div>
            </div>
        </form>
    )
}

const LoginCyberBugsWithFormik = withFormik({
    mapPropsToValues: () => ({
        email: "",
        password: ""
    }),
    validationSchema: Yup.object().shape({
        email: Yup.string().required("Email không được bỏ trống").email("Email không hợp lệ"),
        password: Yup.string().required("Password không được bỏ trống").min(6, "Password tối thiểu 6 ký tự").max(15, "Password tối đa 15 ký tự")
    }),
    handleSubmit: (values, { props, setSubmitting }) => {
        props.dispatch(signInCyberBugsAction(values.email, values.password));
    },

    displayName: "LoginCyberBugs",
})(LoginCyberBugs);

export default connect()(LoginCyberBugsWithFormik);