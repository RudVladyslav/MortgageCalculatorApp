import React, {useState} from 'react';
import BankItem from "../Components/BankItem";
import AddBankPopup from "../Components/AddBankPopup";
import {useSelector} from "react-redux";

const Banks = () => {
    const [visibleAddBankPopup, setVisibleAddBankPopup] = useState(false)

    const {banksData} = useSelector(({banks}) => ({banksData: banks.banksData}))
    return (
        <div className="banks-wrapper">
            <button
                className="add-button"
                onClick={() => setVisibleAddBankPopup(true)}
            >
                <i className="large material-icons">add</i>
            </button>
            {[...banksData].reverse().map(bank => <BankItem
                key={`${bank.id}`}
                setVisiblePopup={setVisibleAddBankPopup}
                bankData={bank}
            />)}

            <AddBankPopup
                visibleAddBankPopup={visibleAddBankPopup}
                setVisibleAddBankPopup={setVisibleAddBankPopup}/>
        </div>
    );
};

export default Banks;
