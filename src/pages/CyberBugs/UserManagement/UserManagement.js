import React, { useEffect, useState } from 'react'
import { Table, Popconfirm } from 'antd';
import { useDispatch, useSelector } from 'react-redux'
import { DELETE_USER_SAGA, GET_ALL_USER_SAGA, OPEN_FORM_EDIT_USER, SEARCH_USER_SAGA } from '../../../redux/types/CyberBugsTypes/CyberBugsTypes';
import { NavLink } from 'react-router-dom'
import FormEditUser from '../../../components/CyberBugs/Form/FormEditUser/FormEditUser';
import { EditOutlined, DeleteOutlined, SearchOutlined } from '@ant-design/icons'

export default function UserManagement(props) {

    const dispatch = useDispatch();
    const { allUser } = useSelector(state => state.UserManagementReducer);
    const { userLogin } = useSelector(state => state.UserCyberBugsReducer);

    useEffect(() => {
        dispatch({
            type: GET_ALL_USER_SAGA,
        })
    }, [])

    const [stateValueSearch, setStateValueSearch] = useState({ valueSearch: "" });

    const columns = [
        {
            title: 'ID',
            dataIndex: 'userId',
            defaultSortOrder: 'descend',
            sorter: (a, b) => a.userId - b.userId,
            sortDirections: ['descend'],
        },
        {
            title: 'Email',
            dataIndex: 'email',
        },
        {
            title: 'Name',
            dataIndex: 'name',
            sorter: (a, b) => (a.name?.trim().toLowerCase()).localeCompare(b.name?.trim().toLowerCase()),
        },
        {
            title: 'Phone',
            dataIndex: 'phoneNumber',
        },
        {
            title: 'Action',
            render: (text, record, index) => {
                return <div key={index}>
                    <button className="btn btn-primary mr-3" onClick={() => {
                        dispatch({
                            type: OPEN_FORM_EDIT_USER,
                            componentDrawerContent: <FormEditUser />,
                            title: "Edit User",
                            user: text
                        })
                    }}><EditOutlined /></button>
                    <Popconfirm title="Are you sure delete this user?" okText="Yes" cancelText="No" onConfirm={() => {
                        dispatch({
                            type: DELETE_USER_SAGA,
                            userId: text.userId,
                        })
                    }}>
                        <button className="btn btn-danger"><DeleteOutlined /></button>
                    </Popconfirm>
                </div>
            }
        },
    ];

    const handleChange = (e) => {
        const { value } = e.target;
        setStateValueSearch({
            ...stateValueSearch,
            valueSearch: value
        })
    }

    return (
        <div className="container mt-5">
            <div className="text-right mr-5">
                <p>Chào! <span className="text-danger">{userLogin.name}</span> <img style={{ borderRadius: "50%" }} src={userLogin.avatar} alt="img" /></p>
            </div>
            <div className="mb-3">
                <NavLink to="/signupcyberbugs">Create User</NavLink>
            </div>
            <div className="form-group w-100">
                <input placeholder="search" style={{ width: "85%", padding: "6px" }} name="searchName" onChange={handleChange} />
                <button className="btn btn-success ml-4" onClick={() => {
                    dispatch({
                        type: SEARCH_USER_SAGA,
                        keyword: stateValueSearch.valueSearch
                    })
                }}><SearchOutlined /></button>
            </div>
            <Table columns={columns} dataSource={allUser} rowKey="userId" />
        </div>
    )
}
