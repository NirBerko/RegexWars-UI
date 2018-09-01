import React from 'react';
import {Link} from 'react-router-dom';

import logo from '../../../res/img/icon.svg';
import challenges from '../../../res/img/list.svg';

import './css/Navigator.scss';

export default () => (
    <header className="Navigator">
        <Link to="/" className="Navigator__logo">
            <img src={logo} alt="RegexWars"/>
        </Link>
        <ul className="Navigator__nav">
            <li>
                <Link to="/challenges">
                    <img src={challenges} alt="challenges"/>
                </Link>
            </li>
        </ul>
    </header>
)