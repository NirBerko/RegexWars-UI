import React, {Component} from 'react';
import {Switch, Redirect, Route, Link} from 'react-router-dom';

import Login from './login';
import Signup from './signup';

import logo from '../../../res/img/logo.svg';

import './index.scss'

const tabs = {
    LOGIN: 'LOGIN',
    SIGNUP: 'SIGNUP'
};

class Auth extends Component {
    constructor(props) {
        super(props);

        console.log(props);

        this.state = {
            tab: tabs.SIGNIN,
        };

        this.onTabClick = this.onTabClick.bind(this);
    }

    onTabClick(tab) {
        this.setState({
            tab
        })
    }

    render() {
        const {tab} = this.state;

        return (
            <div className="Auth">
                <img src={logo} className="Auth__logo" alt="RegexWars" />

                <div className="Auth__container">
                    <div className="Auth__container__tabs">
                        <Link to="/login" className={`Auth__container__tabs__tab${tab === tabs.LOGIN ? '--active' : ''}`}>Log In</Link>
                        <Link to="/signup" className={`Auth__container__tabs__tab${tab === tabs.SIGNUP ? '--active' : ''}`}>Sign Up</Link>
                    </div>

                    <Switch>
                        <Route path="/login" exact render={(props) => {
                            if (this.state.tab !== tabs.LOGIN) {
                                this.setState({
                                    tab: tabs.LOGIN
                                });
                            }
                            return <Login {...props} />
                        }}/>
                        <Route path="/signup" exact component={(props) => {
                            if (this.state.tab !== tabs.SIGNUP) {
                                this.setState({
                                    tab: tabs.SIGNUP
                                });
                            }
                            return <Signup {...props} />
                        }}/>
                        <Redirect to="/login"/>
                    </Switch>
                </div>
            </div>
        )
    }
}

export default Auth;