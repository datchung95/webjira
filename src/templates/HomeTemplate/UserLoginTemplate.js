import React from 'react'
import { Route } from 'react-router-dom';
import { Layout } from 'antd'

const { Content } = Layout;

export const UserLoginTemplate = (props) => {
    const { Component, ...resParam } = props;
    return <Route {...resParam} render={(propsPoute) => {
        return <Layout>
            <Content>
                <Component {...propsPoute} />
            </Content>
        </Layout>
    }} />
}
