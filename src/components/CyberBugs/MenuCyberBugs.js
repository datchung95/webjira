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
                    <i className="fa fa-credit-card mr-2" />
                    <span className="text-dark mb-0">Cyber Board</span>
                </div>
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
            <div className="feature">
                <div>
                    <i className="fa fa-truck mr-2" />
                    <span>Releases</span>
                </div>
                <div>
                    <i className="fa fa-equals mr-2" />
                    <span>Issues and filters</span>
                </div>
                <div>
                    <i className="fa fa-paste mr-2" />
                    <span>Pages</span>
                </div>
                <div>
                    <i className="fa fa-location-arrow mr-2" />
                    <span>Reports</span>
                </div>
                <div>
                    <i className="fa fa-box mr-2" />
                    <span>Components</span>
                </div>
            </div>
        </div>
    )
}
