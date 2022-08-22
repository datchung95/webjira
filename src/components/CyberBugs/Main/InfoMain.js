import React from 'react'

export default function InfoMain(props) {

    const renderAvatar = () => {
        return props.members?.map((item, index) => {
            return <div className="avatar" key={index}>
                <img src={item.avatar} alt={item.userId} />
            </div>
        })
    }

    return (
        <div className="info" style={{ display: 'flex' }}>
            <div className="search-block">
                <input className="search" />
                <i className="fa fa-search" />
            </div>
            <div className="avatar-group" style={{ display: 'flex' }}>
                {renderAvatar()}
            </div>
            <div style={{ marginLeft: 20 }} className="text">Only My Issues</div>
            <div style={{ marginLeft: 20 }} className="text">Recently Updated</div>
        </div>
    )
}
