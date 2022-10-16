import { Layout, Menu } from 'antd';
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import {OPEN_FORM_CREATE_TASK} from '../../redux/types/CyberBugsTypes/CyberBugsTypes'
import {
    MenuFoldOutlined,
    MenuUnfoldOutlined,
    SearchOutlined,
    PlusOutlined,
} from '@ant-design/icons';
import FormCreateTask from './Form/FormCreateTask/FormCreateTask';

const { Sider } = Layout;

export default function SidebarCyberBugs() {

    const [collapsed, setCollapsed] = useState(true);

    const dispatch = useDispatch();

    return (
        <Layout style={{ height: "900px" }}>
            <Sider trigger={null} collapsible collapsed={collapsed}>
                <div className="text-right text-light" style={{ height: "50px", width: "50px", marginLeft: "20px" }}>
                    {React.createElement(collapsed ? MenuUnfoldOutlined : MenuFoldOutlined, {
                        className: 'trigger',
                        onClick: () => setCollapsed(!collapsed),
                    })}
                </div>
                <div className="logo" />
                <Menu
                    theme="dark"
                    mode="inline"
                    defaultSelectedKeys={['1']}
                    items={[
                        {
                            key: '1',
                            icon: <PlusOutlined />,
                            label: 'Create task',
                            onClick: () => {
                                dispatch({
                                    type: OPEN_FORM_CREATE_TASK,
                                    title: "Create Task",
                                    component: <FormCreateTask />
                                })
                            }
                        },
                    ]}
                />
            </Sider>
        </Layout>
    )
}
