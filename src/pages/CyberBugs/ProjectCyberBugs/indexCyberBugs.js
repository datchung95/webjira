import React, { useEffect } from 'react'
import ContentMain from '../../../components/CyberBugs/Main/ContentMain'
import HeaderMain from '../../../components/CyberBugs/Main/HeaderMain'
import InfoMain from '../../../components/CyberBugs/Main/InfoMain'
import { useSelector, useDispatch } from 'react-redux'
import { GET_PROJECT_DETAIL_SAGA } from '../../../redux/types/CyberBugsTypes/CyberBugsTypes'

export default function IndexCyberBugs(props) {


    let { projectDetail } = useSelector(state => state.GetProjectDetailReducer);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch({
            type: GET_PROJECT_DETAIL_SAGA,
            projectId: props.match.params.projectId
        })
    }, [])

    return (
        <div className="main">
            <HeaderMain projectName={projectDetail.projectName} />
            <h3>{projectDetail.projectName}</h3>
            <InfoMain members={projectDetail.members} />
            <ContentMain lstTask={projectDetail.lstTask} />
        </div>
    )
}
