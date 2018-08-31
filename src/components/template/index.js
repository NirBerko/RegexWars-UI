import React from 'react';

import Header from './components/Header';
import Navigator from './components/Navigator';

import './index.scss';

export default ({children}) => (
    <main className="Main">
        <Navigator />
        <div className="Main__container">
            <Header />
            <div className="Main__container__application">
                {children}
            </div>
        </div>
    </main>
)