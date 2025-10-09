import React from 'react'

const Dashboard = (props) => {
    return (
        <div className="container">
            <h2>Welcome, {props.profile.getName()}</h2>
            <p>Disrupt awesomeness</p>
        </div>
    )
}

export default Dashboard;