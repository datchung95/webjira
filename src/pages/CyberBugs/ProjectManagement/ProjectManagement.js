import React, { useState, useEffect, useRef } from 'react'
import { Space, Table, Tag, Popconfirm, Avatar, Popover, AutoComplete } from 'antd';
import { EditOutlined, DeleteOutlined } from '@ant-design/icons'
import { useSelector, useDispatch } from 'react-redux'
import { ADD_MEMBER_SAGA, DELETE_PROJECT_SAGA, GET_ALL_PROJECT_MANAGEMENT_SAGA, GET_PROJECT_EDIT, GET_SEARCH_USER_SAGA, OPEN_DRAWER_EDIT_PROJECT, REMOVE_MEMBER_SAGA } from '../../../redux/types/CyberBugsTypes/CyberBugsTypes';
import FormEditProject from '../../../components/CyberBugs/Form/FormEditProject/FormEditProject';
import { NavLink } from 'react-router-dom'

export default function ProjectManagement() {

    const projectList = useSelector(state => state.GetAllProjectReducer.projectList);
    const dispatch = useDispatch();
    const { userSearch } = useSelector(state => state.UserCyberBugsReducer);

    const [sortedInfo, setSortedInfo] = useState({});
    const [valueSearch, setValueSearch] = useState("");

    const searchRef = useRef(null);

    const handleChange = (pagination, filters, sorter) => {
        setSortedInfo(sorter);
    };

    useEffect(() => {
        dispatch({
            type: GET_ALL_PROJECT_MANAGEMENT_SAGA
        })
    }, [])

    const columns = [
        {
            title: 'id',
            dataIndex: 'id',
            key: 'id',
            sorter: (a, b) => a.id - b.id,
            sortOrder: sortedInfo.columnKey === 'id' ? sortedInfo.order : null,
            sortDirections: ['descend'],
        },
        {
            title: 'Project Name',
            dataIndex: 'projectName',
            key: 'projectName',
            sorter: (a, b) => (a.projectName?.trim().toLowerCase()).localeCompare(b.projectName?.trim().toLowerCase()),
            sortOrder: sortedInfo.columnKey === 'projectName' ? sortedInfo.order : null,
            render: (text, record, index) => {
                return <NavLink key={index} to={`/projectdetail/${record.id}`}>{record.projectName}</NavLink>
            }
        },
        {
            title: 'Creator',
            key: 'creator',
            sorter: (a, b) => (a.creator.name?.trim().toLowerCase()).localeCompare(b.creator.name?.trim().toLowerCase()),
            sortOrder: sortedInfo.columnKey === 'creator' ? sortedInfo.order : null,
            render: (text, record, index) => {
                return <Tag key={index} color="gold">{record.creator.name}</Tag>
            }
        },
        {
            title: 'Category',
            dataIndex: 'categoryName',
            key: 'categoryName',
        },
        {
            title: 'Members',
            dataIndex: 'members',
            key: 'members',
            render: (text, record, index) => {
                return <div>
                    {text?.slice(0, 3).map((item, index) => {
                        return <Popover key={index} placement="left" title="Members" content={() => {
                            return <table className="table">
                                <thead>
                                    <tr>
                                        <th>id</th>
                                        <th>avatar</th>
                                        <th>name</th>
                                        <th></th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {text?.map((item, index) => {
                                        return <tr key={index}>
                                            <td>{item.userId}</td>
                                            <td><img src={item.avatar} alt="img" style={{ width: "40px", height: "40px" }} /></td>
                                            <td>{item.name}</td>
                                            <td><button className="btn btn-danger" onClick={() => {
                                                dispatch({
                                                    type: REMOVE_MEMBER_SAGA,
                                                    userProject: {
                                                        projectId: record.id,
                                                        userId: item.userId
                                                    }
                                                })
                                            }}>X</button></td>
                                        </tr>
                                    })}
                                </tbody>
                            </table>
                        }}>
                            <Avatar src={item.avatar} />
                        </Popover>
                    })}
                    {text?.length > 3 ? <Avatar>...</Avatar> : ""}
                    <Popover placement="rightTop" title={"Add member"} content={() => {
                        return <AutoComplete
                            style={{
                                width: 200,
                            }}
                            options={userSearch?.map((item, index) => {
                                return { label: item.name, value: item.userId.toString() }
                            })}
                            value={valueSearch}
                            onChange={(value) => {
                                setValueSearch(value)
                            }}
                            onSelect={(valueSelect, option) => {
                                setValueSearch(option.label)
                                if (searchRef.current) {
                                    clearTimeout(searchRef.current);
                                }
                                setTimeout(() => {
                                    dispatch({
                                        type: ADD_MEMBER_SAGA,
                                        userProject: {
                                            "projectId": record.id,
                                            "userId": valueSelect
                                        }
                                    })
                                }, 300)
                            }}
                            onSearch={(value) => {
                                dispatch({
                                    type: GET_SEARCH_USER_SAGA,
                                    keyWord: value
                                })
                            }}
                        />
                    }} trigger="click">
                        <button className="btn btn-outline-dark" style={{ borderRadius: "50%" }}>+</button>
                    </Popover>
                </div>
            }
        },
        {
            title: 'Action',
            key: 'action',
            render: (text, record, index) => {
                return <Space size="middle" key={index}>
                    <button onClick={() => {
                        dispatch({
                            type: OPEN_DRAWER_EDIT_PROJECT,
                            component: <FormEditProject />,
                            title: "Edit Project"
                        })
                        dispatch({
                            type: GET_PROJECT_EDIT,
                            project: record
                        })
                    }} className="btn btn-primary"><EditOutlined /></button>
                    <Popconfirm
                        title="Are you sure to delete this task?"
                        onConfirm={() => {
                            dispatch({
                                type: DELETE_PROJECT_SAGA,
                                project: text
                            })
                        }}
                        okText="Yes"
                        cancelText="No"
                    >
                        <button className="btn btn-danger"><DeleteOutlined /></button>
                    </Popconfirm>
                </Space>
            },
        },
    ];
    return (
        <div className="container mt-5">
            <h3 className="text-center">Project Management</h3>
            <Space
                style={{
                    marginBottom: 16,
                }}
            >
            </Space>
            <Table scroll={{
                x: 900,
                y: 500,
            }} columns={columns} rowKey="id" dataSource={projectList} onChange={handleChange} />
        </div>
    );
}
