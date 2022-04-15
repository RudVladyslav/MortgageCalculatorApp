import React from 'react';
import {setDeleteBank, setEditBank} from "../store/reducers/banks-reducer";
import {useDispatch} from "react-redux";

const BankItem = ({setVisiblePopup, bankData}) => {

    const dispatch = useDispatch()

    const deleteBankHandler = (id) => dispatch(setDeleteBank(id))


    const editBankHandler = (id, editMode) => {
        setVisiblePopup(true)
        dispatch(setEditBank(id, editMode))
    }

    return (
        <div className="bank-item">
            <div className="bank-item__name">
                <h3>{bankData.name}</h3>
            </div>
            <div className="bank-item__info">
                <p><span>Interest rate:</span> {bankData.rate}%</p>
                <p><span>Maximum loan:</span> {bankData.maxLoan.toLocaleString()}$</p>
                <p><span>Minimum down payment:</span> {bankData.minDownPayment}%</p>
                <p><span>Loan term:</span> {bankData.loanTerm} monthly payments</p>
            </div>
            <div className="bank-item__wrapper">
                <button className="btn btn-delete">
                    <i className="material-icons" onClick={() => deleteBankHandler(bankData.id)}>delete</i>
                </button>
                <button className="btn btn-edit" onClick={() => editBankHandler(bankData.id, true)}>
                    <i className="material-icons">edit</i>
                </button>
            </div>
        </div>
    );
};

export default BankItem;
