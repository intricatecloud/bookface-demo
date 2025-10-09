import React from 'react'

export default (props) => {
        return (
            <nav>
                <a href="/" style={{color: 'white'}}>AWESOME-STARTUP</a>
                { props.email && <img className="push" alt="profile" src={props.imageUrl}/> }
                { props.email && <div>{props.email}</div> }
                { props.email && <a href="/" style={{marginLeft: '2em',color: 'white'}} onClick={props.signOut}>Sign out</a>}
            </nav>
        )

}