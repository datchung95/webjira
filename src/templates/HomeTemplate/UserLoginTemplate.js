import React, { useState, useEffect } from 'react'
import { Route } from 'react-router-dom';
import { Layout } from 'antd'

const { Sider, Content } = Layout;

export const UserLoginTemplate = (props) => {
    const [{width, height}, setSize] = useState({width: window.innerWidth, height: window.innerHeight});
    useEffect(() => {
        window.onresize = () => {
            setSize({
                width: window.innerWidth,
                height: window.innerHeight
            })
        }
    })
    const { Component, ...resParam } = props;
    return <Route {...resParam} render={(propsPoute) => {
        return <Layout>
            <Sider width={width / 2} style={{ backgroundColor: "red", height: height, backgroundImage: "url(https://photo-cms-kienthuc.zadn.vn/zoom/800/uploaded/buimanhhung/2014_07_18/5/ve-dep-cua-nhung-hotgirl-viet-noi-danh-tren-dat-thai.jpg)", backgroundRepeat: "no-repeat", backgroundSize: "cover" }}></Sider>
            <Content>
                <Component {...propsPoute} />
            </Content>
        </Layout>
    }} />
}
