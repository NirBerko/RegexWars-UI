import React from 'react';

import './css/Input.scss';

export default ({error, ...props}) => (
    <div className={`Input ${error ? 'Input--error' : ''}`}>
        <input {...props} />
        <div className="Input__error">{error}</div>
    </div>
)