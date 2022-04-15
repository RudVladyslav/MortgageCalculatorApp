import React, {useEffect} from 'react';
import {setEditBank} from "../store/reducers/banks-reducer";
import {useDispatch} from "react-redux";

const Popup = ({editMode, visiblePopup, setVisiblePopup, clearInputs, children}) => {
    const dispatch = useDispatch()
    const closePopupHandler = () => {
        setVisiblePopup(false)
        if (editMode) {
            clearInputs()
            dispatch(setEditBank(null, false))
        }
    }

    return (
        <div
            className={visiblePopup ? 'popup active' : 'popup'}
            onClick={closePopupHandler}>
            <div
                className={visiblePopup ? 'popup__content active' : 'popup__content'}
                onClick={e => e.stopPropagation()}
            >
                {children}
            </div>
        </div>
    )
};

export default Popup
