import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Switch, Route} from 'react-router-dom';
import {UAuthenticated} from './utils';

import {getUserDetails} from './services/user/action';

import interceptor from './components/layout/interceptor';

import Template from './components/template'

import Loader from './components/routes/loader';
import Login from './components/routes/auth/login';
import Challenge from './components/routes/challenge';

import './App.scss';

const Home = () => (
    <div>home</div>
);

class App extends Component {
    constructor(props) {
        super(props);

        interceptor();

        this.authenticated = null;

        this.checkUserAuth = this.checkUserAuth.bind(this);
    }

    checkUserAuth(props) {
        const token = UAuthenticated.getAuthenticationToken();

        if (token && props.userDetails.data === null && !props.userDetails.isPending && !props.userDetails.error) {
            props.getUserDetails();
        } else if (props.userDetails.data !== null && !props.userDetails.isPending && !props.userDetails.error) {
            this.authenticated = true;
        } else if (props.userDetails.error || !token) {
            this.authenticated = false;
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
        if (this.authenticated === null) {
            return <Loader />
        } else {
            return (
                <div className="App">
                    {this.authenticated ? <Template>
                        <Switch>
                            <Route path="/" exact component={Home}/>
                            <Route path="/challenge/:id" exact component={Challenge}/>
                        </Switch>
                    </Template> :
                        <Switch>
                            <Route path="/" exact component={Login}/>
                        </Switch>}
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

export default connect(mapStateToProps, mapDispatchToProps)(App);