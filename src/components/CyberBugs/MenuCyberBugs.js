import React from 'react'
import { NavLink } from 'react-router-dom'

export default function MenuCyberBugs() {
    return (
        <div className="menu">
            <div className="account">
                <div className="avatar">
                    <img src={require("../../assets/img/download.jfif")} alt="img" />
                </div>
                <div className="account-info">
                    <p>CyberLearn.vn</p>
                    <p>Report bugs</p>
                </div>
            </div>
            <div className="control">
                <div>
                    <i className="fa fa-cog mr-2" />
                    <NavLink className="text-dark" activeClassName="font-weight-bold" to="/projectmanagement">Project Management</NavLink>
                </div>
                <div>
                    <i className="fa fa-cog mr-2" />
                    <NavLink className="text-dark" activeClassName="font-weight-bold" to="/createproject">Create Project</NavLink>
                </div>
                <div>
                    <i className="fa fa-cog mr-2" />
                    <NavLink className="text-dark" activeClassName="font-weight-bold" to="/usermanagement">User Management</NavLink>
                </div>
            </div>
        </div>
    )
}
