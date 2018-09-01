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
        }
    }

    render() {
        return (
            <div className="Auth">
                <img src={logo} className="Auth__logo" alt="RegexWars" />

                <div className="Auth__container">
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