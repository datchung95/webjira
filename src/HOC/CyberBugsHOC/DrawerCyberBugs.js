import React, { useEffect, useState } from 'react'
import { Button, Drawer, Space } from 'antd';
import { useSelector, useDispatch } from 'react-redux'
import { CLOSE_DRAWER } from '../../redux/types/CyberBugsTypes/CyberBugsTypes';
import useIsMobile from '../../components/Resize/ResizeMd/ResizeMd';

export default function DrawerCyberBugs() {
    const { visible, componentDrawerContent, title, callBackSubmit } = useSelector(state => state.DrawerCyberBugsReducer);
    const dispatch = useDispatch();

    const [widthDrawer, setWidthDrawer] = useState("720px")

    const resizeDrawer = useIsMobile()

    useEffect(() => {
        if (resizeDrawer) {
            setWidthDrawer("100%")
        } else {
            setWidthDrawer("720px")
        }
    }, [resizeDrawer])

    const onClose = () => {
        dispatch({
            type: CLOSE_DRAWER
        })
    };

    return (
        <>
            <Drawer
                title={title}
                width={widthDrawer}
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