import React, {useEffect, useRef} from 'react';

const AddBank = ({visiblePopup, setVisiblePopup, children}) => {


    return (
        <div
            className={visiblePopup ? 'popup active' : 'popup'}
            onClick={() => setVisiblePopup(false)}>
            <div
                className={visiblePopup ? 'popup__content active' : 'popup__content'}
                onClick={e => e.stopPropagation()}>
                {children}
            </div>
        </div>
    )
};

export default AddBank
