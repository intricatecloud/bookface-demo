import React from 'react'
import {Link} from 'react-router-dom'

const LandingPage = () => {
    return (
        <div className="container">
            <h1>AWESOME-STARTUP</h1>
            <p>Disrupting awesomeness</p>
            <Link to="/dashboard">Sign in</Link>
        </div>
    )
}

export default LandingPage
