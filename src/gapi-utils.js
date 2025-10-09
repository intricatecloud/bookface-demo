const clientId = 'REPLACEME'
const getGapi = () => {
    return new Promise((res, rej) => {
        window.gapi.load('auth2', () => {
            res()
        })
    })
}
const initialize = (onSignedInListener) => {
    return getGapi().then(() => {
        return window.gapi.auth2.init({
            client_id: clientId
        }).then(() => {
            // set signed in status on first load
            const authInstance =  window.gapi.auth2.getAuthInstance()
            const isSignedIn = authInstance.isSignedIn.get()
            const profile = isSignedIn ? authInstance.currentUser.get().getBasicProfile() : null;

            authInstance.isSignedIn.listen(isSignedIn => {
                const profile = isSignedIn ? authInstance.currentUser.get().getBasicProfile() : null;
                onSignedInListener(profile)
            })
            return profile
        })
    })
}

const signOut = () => {
    const authInstance =  window.gapi.auth2.getAuthInstance()
    return authInstance.signOut()
}

const load = () => {
    return new Promise((res, rej) => {
        const script = document.createElement('script')
        script.src = 'https://apis.google.com/js/platform.js'
        script.onload = res
        script.onerror = rej
        document.body.appendChild(script)
    })
}

export default {
    load,
    signOut,
    initialize
}