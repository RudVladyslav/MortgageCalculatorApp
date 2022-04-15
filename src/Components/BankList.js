import React from 'react';
import {useSelector} from "react-redux";

const BankList = ({choseBank, showListHandler, visibleList, onClickChoseBankHandler}) => {
    const {banksData} = useSelector(({banks}) => ({banksData: banks.banksData}))


    return (
        <div className="chooseBankWrapper">
            <div className="chooseBankTitle">
                <h3>Selected bank:</h3>
            </div>
            <div className="chooseBank">
                <div
                    className="chooseBank__choseBank"
                    onClick={showListHandler}
                >
                    <h3>{choseBank.name}</h3>
                    {!visibleList
                        ? <i className="large material-icons">arrow_drop_down</i>
                        : <i className="large material-icons">arrow_drop_up</i>}
                </div>
                {visibleList &&
                    <ul className="chooseBank__listWrapper">
                        {[...banksData].reverse().map(bank =>
                            <li
                                key={bank.id.toString()}
                                onClick={() => onClickChoseBankHandler(bank)}
                                className="chooseBank__listWrapper__item"
                            >
                                {bank.name}
                            </li>)}
                    </ul>
                }
            </div>
        </div>
    );
};

export default BankList;
