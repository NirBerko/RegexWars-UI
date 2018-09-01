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

        this.state = {
            tab: tabs.LOGIN,
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
                <img src={logo} className="Auth__logo" alt="RegexWars"/>

                <div className="Auth__container">
                    <div className="Auth__container__tabs">
                        <Link to="/login" className={`Auth__container__tabs__tab${tab === tabs.LOGIN ? '--active' : ''}`}>Log In</Link>
                        <Link to="/signup" className={`Auth__container__tabs__tab${tab === tabs.SIGNUP ? '--active' : ''}`}>Sign Up</Link>
                    </div>

                    <Switch>
                        <Route path="/login" exact render={(props) => <Login {...props} changeTab={() => this.onTabClick(tabs.LOGIN)} />} />
                        <Route path="/signup" exact render={(props) => <Signup {...props} changeTab={() => this.onTabClick(tabs.SIGNUP)} />} />
                        <Redirect to="/login"/>
                    </Switch>
                </div>
            </div>
        )
    }
}

export default Auth;