import React from 'react';

import './css/Button.scss';

export default ({children, ...props}) => (
    <button className="Button" {...props}>{children}</button>
)