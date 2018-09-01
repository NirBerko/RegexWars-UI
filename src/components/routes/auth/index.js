import React, {Component} from 'react';
import {Switch, Redirect, Route} from 'react-router-dom';

import Login from './login';

import logo from '../../../res/img/logo.svg';

import './index.scss'

const tabs = {
    SIGNIN: 'SIGNIN',
    SIGNUP: 'SIGNUP'
};

class Auth extends Component {
    constructor(props) {
        super(props);

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
                    <ul className="Auth__container__tabs">
                        <li onClick={() => this.onTabClick(tabs.SIGNIN)}
                            className={`Auth__container__tabs__tab${tab === tabs.SIGNIN ? '--active' : ''}`}>Log In</li>
                        <li onClick={() => this.onTabClick(tabs.SIGNUP)}
                            className={`Auth__container__tabs__tab${tab === tabs.SIGNUP ? '--active' : ''}`}>Sign Up</li>
                    </ul>
                    <Switch>
                        <Route path="/login" exact component={Login}/>
                        <Redirect to="/login"/>
                    </Switch>
                </div>
            </div>
        )
    }
}

export default Auth;