import React from 'react';
import {connect} from 'react-redux';
import {Redirect} from 'react-router-dom';

import {logoutUser} from '../../../services/user/action'

import {UAuthenticated} from '../../../utils';

const Logout = () => {
    UAuthenticated.removeAuthentication();
    return <Redirect to="/" />
};

const mapDispatchToProps = (dispatch) => ({
    logoutUser: dispatch(logoutUser())
});

export default connect(null, mapDispatchToProps)(Logout);