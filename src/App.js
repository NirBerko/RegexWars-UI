import React, {Component} from 'react';
import {connect} from 'react-redux';
import {withRouter} from 'react-router'
import {Redirect, Switch, Route} from 'react-router-dom';
import Favicon from 'react-favicon';

import {UAuthenticated} from './utils';

import {getUserDetails} from './services/user/action';

import interceptor from './components/layout/interceptor';

import Template from './components/template'

import Loader from './components/routes/loader';
import Auth from './components/routes/auth';
import Logout from './components/routes/auth/logout';

import Challenges from './components/routes/challenges';
import Challenge from './components/routes/challenge';

import favicon from './res/img/favicon.png';

import './App.scss';
import './stylesheets/presets.scss';

class App extends Component {
    constructor(props) {
        super(props);

        interceptor();

        this.state = {
            authenticated: null,
        };

        this.checkUserAuth = this.checkUserAuth.bind(this);
    }

    checkUserAuth(props) {
        const token = UAuthenticated.getAuthenticationToken();

        if (token && props.userDetails.data === null && !props.userDetails.isPending && !props.userDetails.error) {
            props.getUserDetails();
        } else if (props.userDetails.data !== null && !props.userDetails.isPending && !props.userDetails.error) {
            this.setState({
                authenticated: true,
            })
        } else if (props.userDetails.error || !token) {
            this.setState({
                authenticated: false,
            });
            UAuthenticated.removeAuthentication();
        }
    }

    componentDidMount() {
        this.checkUserAuth(this.props);
    }

    componentWillReceiveProps(nextProps) {
        this.checkUserAuth(nextProps);
    }

    //noinspection JSMethodCanBeStatic
    render() {
        if (this.state.authenticated === null) {
            return <Loader />
        } else {
            return (
                <div className="App">
                    <Favicon url={favicon}/>

                    {this.state.authenticated ? <Template>
                        <Switch>
                            <Route path="/challenges" exact component={Challenges}/>
                            <Route path="/challenge/:id" exact component={Challenge}/>

                            <Route path="/logout" exact component={Logout}/>

                            <Redirect to="/challenges"/>
                        </Switch>
                    </Template> : <Auth />}
                </div>
            );
        }
    }
}

const mapStateToProps = ({userReducer}) => ({
    userDetails: userReducer.userDetails,
    userLogin: userReducer.userLogin,
});

const mapDispatchToProps = (dispatch) => ({
    getUserDetails: () => dispatch(getUserDetails()),
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(App));