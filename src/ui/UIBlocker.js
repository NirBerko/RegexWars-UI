import React from 'react';
import PropTypes from 'prop-types';

import './css/UIBlocker.scss';


const UIBlocker = ({visible, children}) => {
    return (
        <div className={`UIBlocker UIBlocker${visible ? '--visible' : '--hidden'}`}>
            {children}
        </div>
    )
};

UIBlocker.propTypes = {
    visible: PropTypes.bool,
};

UIBlocker.defaultProps = {
    visible: false,
};

export default UIBlocker;