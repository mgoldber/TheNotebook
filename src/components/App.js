import React, { Component } from 'react';
import ShowNotes from './ShowNotes';
import CreateUser from './CreateUser';
import LoginUser from './LoginUser';
import './App.css';

class App extends Component {
    constructor() {
        super();
        this.state = {
            loggedIn: false,
            user: null
        };
    }
    setUser = (user) => {
        this.setState({
            user: user
        })
    }

    login = (loggedIn) => {
        this.setState({
            loggedIn: loggedIn
        })
    }

    logout = (loggedIn) => {
        fetch('/api/logout', {
            method: 'GET',
            credentials: 'include'
        })
        .then(() => {
            this.setState({
                loggedIn: loggedIn,
                user: null
            });
        });
    }

    render() {
        return (
            <div className="wrapper">
                <header>
                    <h1>The Real Notebook</h1>
                    { this.state.loggedIn && <button onClick={() => this.logout(false)}>Logout</button> }
                </header>
                <main>
                    { this.state.loggedIn  ?
                        <div>
                            <ShowNotes user={this.state.user}/>
                        </div>
                    :
                        <div className="landingBox">
                            <CreateUser login={this.login} setUser={this.setUser}/>
                            <LoginUser login={this.login} setUser={this.setUser}/>
                        </div>
                    }
                </main>
            </div>
        )
    }
}

export default App;
