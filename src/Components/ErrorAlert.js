import React from 'react';
import Popup from "./Popup";
import HelpErrorWindow from "./HelpErrorWindow";

const ErrorAlert = ({isError, setIsError, errorMessage, setErrorMessage}) => {
    return (
        <Popup
            visiblePopup={isError}
            setVisiblePopup={(e) => {
                setIsError(e)
                setErrorMessage([])
            }}
        >
            <div className="errorWrapper">
                <div className="errorHeader">
                    <h3 className="errorTitle">Error!</h3>
                </div>
                <div className="errorInfo">
                    <ul>
                        {errorMessage.map((message, index) => <li
                            key={message[0] + `${index}`}
                            className="errorMessageItem"
                        >
                    <span className="errorMessageItem__text">
                        {message}
                    </span>
                        </li>)}
                    </ul>
                </div>
                <HelpErrorWindow>
                    Choose another bank or check the entered data
                </HelpErrorWindow>
            </div>
        </Popup>
    );
};

export default ErrorAlert;
