import React from 'react';
import {connect} from 'react-redux';

import './css/Header.scss';

const Header = ({globalVars}) => (
    <header className="Header">
        <h3>{globalVars.title}</h3>
    </header>
);

const mapStateToProps = ({globalVars}) => ({
    globalVars
});

export default connect(mapStateToProps)(Header);