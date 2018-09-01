import React from 'react';

import './css/Button.scss';

export default ({children, disabled}) => (
    <button className="Button" disabled={disabled}>{children}</button>
)