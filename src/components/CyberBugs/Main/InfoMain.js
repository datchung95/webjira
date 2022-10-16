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
            <div className="avatar-group" style={{ display: 'flex' }}>
                {renderAvatar()}
            </div>
        </div>
    )
}
