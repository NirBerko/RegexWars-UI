import React from 'react';

import './css/Expression.scss';

export default ({onChange}) => (
    <div className="Expression">
        <span>/</span>
        <input onChange={(e) => onChange(e.target.value)} placeholder="Insert your regular expression here"/>
        <span>/g</span>
    </div>
);