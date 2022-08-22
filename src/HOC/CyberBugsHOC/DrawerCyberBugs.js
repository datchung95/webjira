import React from 'react'
import { Button, Drawer, Space } from 'antd';
import { useSelector, useDispatch } from 'react-redux'
import { CLOSE_DRAWER } from '../../redux/types/CyberBugsTypes/CyberBugsTypes';

export default function DrawerCyberBugs() {
    const { visible, componentDrawerContent, title, callBackSubmit } = useSelector(state => state.DrawerCyberBugsReducer);
    const dispatch = useDispatch();

    const onClose = () => {
        dispatch({
            type: CLOSE_DRAWER
        })
    };

    return (
        <>
            <Drawer
                title={title}
                width={720}
                onClose={onClose}
                visible={visible}
                bodyStyle={{
                    paddingBottom: 80,
                }}
                extra={
                    <Space>
                        <Button onClick={callBackSubmit} type="primary">
                            Submit
                        </Button>
                    </Space>
                }
            >
                {componentDrawerContent}
            </Drawer>
        </>
    );
};