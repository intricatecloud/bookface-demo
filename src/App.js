import React from 'react'
import {BrowserRouter, Switch, Route} from 'react-router-dom'
import Dashboard from './components/Dashboard'
import LoginPage from './components/LoginPage'
import LandingPage from './components/LandingPage'
import NavBar from './components/NavBar'
import gapiUtils from './gapi-utils'
import './App.css'

class App extends React.Component {
    state = {
        isSignedIn: null,
        gapiError: null,
    }

    signOut() {
        gapiUtils.signOut()
    }

    async componentDidMount() {
        await gapiUtils.load()
        const onSignedIn = (profile) => {
            this.setState({isSignedIn: !!profile, profile})
        }
        await gapiUtils.initialize(onSignedIn)
            .then(onSignedIn)
            .catch((err) => {
                this.setState({gapiError: err})
            })
    }

    ifUserSignedIn(Component, props) {
        if (this.state.isSignedIn === null) {
            if (this.state.gapiError) {
                return (
                    <div class="container">
                        <p>Couldn't initialize Google Sign-In</p>
                        <p>Error: {this.state.gapiError.error}</p>
                        <p>Details: {this.state.gapiError.details}</p>
                    </div>
                )
            } else {
                return (
                    <div class="container">Checking if you're signed in...</div>
                )
            }

        }
        return this.state.isSignedIn ? <Component {...props} /> : <LoginPage/>
    }

    render() {
        const email = this.state.isSignedIn ? this.state.profile.getEmail() : ''
        const imageUrl = this.state.isSignedIn ? this.state.profile.getImageUrl(): ''
        return (
            <div>
                <NavBar email={email} imageUrl={imageUrl} signOut={() => this.signOut()}/>
                <BrowserRouter>
                    <Switch>
                        <Route exact path="/">
                            <LandingPage />
                        </Route>
                        <Route path="/dashboard" render={() => this.ifUserSignedIn(Dashboard, {profile: this.state.profile})}/>
                    </Switch>
                </BrowserRouter>
            </div>
        )
    }
}

export default App