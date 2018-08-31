import React from 'react';

import logo from '../../../res/img/logo.svg';
import challenges from '../../../res/img/list.svg';

import './css/Navigator.scss';

export default () => (
    <header className="Navigator">
        <div className="Navigator__logo">
            <img src={logo} alt="RegexWars" />
        </div>
        <ul className="Navigator__nav">
            <li>
                <img src={challenges} alt="challenges" />
            </li>
        </ul>
    </header>
)