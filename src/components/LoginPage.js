import React from 'react'

class LoginPage extends React.Component {
    componentDidMount() {
        window.gapi.load('signin2', () => {
            window.gapi.signin2.render('login-button')
        })
    }

    render() {
        return (
            <div className="container">
                <div className="login-panel">
                    <h3>Sign into AWESOME-STARTUP</h3>
                    <div id="login-button"></div>
                </div>
            </div>
        )
    }
}
export default LoginPage