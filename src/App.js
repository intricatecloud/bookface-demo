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

    initializeGoogleSignIn() {
      window.gapi.load('auth2', () => {
        window.gapi.auth2.init({
          client_id: '1006632388683-etsvgnbqfmkrglkv2g9gsnmrluu5qdpn.apps.googleusercontent.com'
        }).then(() => {
          const authInstance =  window.gapi.auth2.getAuthInstance()
          const isSignedIn = authInstance.isSignedIn.get()
          this.setState({isSignedIn})

          authInstance.isSignedIn.listen(isSignedIn => {
            this.setState({isSignedIn})
          })
        })
      })
    }

    componentDidMount() {
      const script = document.createElement('script')
      script.src = 'https://apis.google.com/js/platform.js'
      script.onload = () => this.initializeGoogleSignIn()
      document.body.appendChild(script)
    }

    ifUserSignedIn(Component) {
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
