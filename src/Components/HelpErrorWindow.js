import React from 'react';

const HelpErrorWindow = ({children}) => {
    return (
            <div className="errorHelp">
                <i className="large material-icons">help</i>
                <span className='errorHelp__text'>
                    {children}
                </span>
            </div>
    );
};

export default HelpErrorWindow;
