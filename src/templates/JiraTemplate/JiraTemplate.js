import React, { Fragment } from 'react'
import { Route } from 'react-router-dom';
import MenuCyberBugs from '../../components/CyberBugs/MenuCyberBugs';
import SidebarCyberBugs from '../../components/CyberBugs/SidebarCyberBugs';
import ModalCyberBugs from '../../components/ModalCyberBugs/ModalCyberBugs';

export const JiraTemplate = (props) => {
    const { Component, ...resParam } = props;
    return <Route {...resParam} render={(propsRoute) => {
        return <Fragment>
            <div className="jira">
                <SidebarCyberBugs />
                <MenuCyberBugs />
                <Component {...propsRoute} />
                <ModalCyberBugs />
            </div>
        </Fragment >
    }} />
}