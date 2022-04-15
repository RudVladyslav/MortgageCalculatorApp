import React, {useEffect, useState} from 'react';
import Popup from "./Popup";
import {useDispatch, useSelector} from "react-redux";
import {setAddBank, setEditedBank} from "../store/reducers/banks-reducer";
import ErrorAlert from "./ErrorAlert";
import HelpErrorWindow from "./HelpErrorWindow";

const AddBankPopup = ({visibleAddBankPopup, setVisibleAddBankPopup}) => {

    const {choseEditBank, editMode} = useSelector(({banks}) => ({
        choseEditBank: banks.choseEditBank,
        editMode: banks.editMode
    }))
    const dispatch = useDispatch()

    const [name, setName] = useState('')
    const [rate, setRate] = useState(0)
    const [maxLoan, setMaxLoan] = useState(0)
    const [minDownPayment, setMinDownPayment] = useState(0)
    const [loanTerm, setLoanTerm] = useState(0)

    const [error, setError] = useState(false)
    const createLocalState = () => {
        if (editMode) {
            setName(choseEditBank.name)
            setRate(choseEditBank.rate)
            setMaxLoan(choseEditBank.maxLoan)
            setMinDownPayment(choseEditBank.minDownPayment)
            setLoanTerm(choseEditBank.loanTerm)
        }
    }

    useEffect(() => createLocalState(), [editMode])

    const clearInputs = () => {
        setName('')
        setRate(0)
        setMaxLoan(0)
        setMinDownPayment(0)
        setLoanTerm(0)
    }


    const submitFormHandler = (e) => {
        e.preventDefault()
        if (maxLoan === 0 || minDownPayment === 0 || loanTerm === 0) {
            setError(true)
        } else {
            setVisibleAddBankPopup(false)
            clearInputs()
            editMode
                ? dispatch(setEditedBank(choseEditBank.id, {name, rate, maxLoan, minDownPayment, loanTerm}))
                : dispatch(setAddBank({name, rate, maxLoan, minDownPayment, loanTerm}))
        }
    }

    return (
        <Popup
            visiblePopup={visibleAddBankPopup}
            setVisiblePopup={(e) => {
                setVisibleAddBankPopup(e)
                setError(false)
            }}
            editMode={editMode}
            clearInputs={clearInputs}
        >

            <h4 className="popup-title">
                {editMode ? 'Edit bank' : 'Add bank'}
            </h4>

            <form className="form" onSubmit={submitFormHandler}>
                <input
                    type="text"
                    placeholder='Bank name:'
                    value={name}
                    onChange={event => setName(event.target.value)}
                    id='bankName'
                />
                <label className="labelBankPopup" htmlFor="bankName">Bank name</label>

                <input
                    type="number"
                    placeholder='Interest rate:'
                    value={rate}
                    max={100}
                    min={0}

                    onChange={event => {
                        if (Number(event.target.value) <= 100) {
                            setRate(Number(event.target.value))
                        }
                    }}
                    id='InterestRate'
                />
                <label className="labelBankPopup" htmlFor="InterestRate">Minimum down payment, %</label>

                <input
                    type="number"
                    placeholder='Maximum loan:'
                    min={0}
                    value={maxLoan}
                    onChange={event => setMaxLoan(Number(event.target.value))}
                    id='MaximumLoan'
                />
                <label className="labelBankPopup" htmlFor="MaximumLoan">Minimum down payment, $</label>

                <input
                    type="number"
                    placeholder='Minimum down payment:'
                    min={0}
                    max={100}
                    value={minDownPayment}
                    onChange={event => {
                        if (Number(event.target.value) <= 100) {
                            setMinDownPayment(Number(event.target.value))
                        }
                    }}
                    id='MinimumDownPayment:'
                />
                <label className="labelBankPopup" htmlFor="MinimumDownPayment">Minimum down payment, %</label>

                <input
                    type="number"
                    placeholder='Loan term:'
                    min={0}
                    value={loanTerm}
                    onChange={event => setLoanTerm(Number(event.target.value))}
                    id="LoanTerm"
                />
                <label className="labelBankPopup" htmlFor="LoanTerm">Loan term (monthly payments)</label>

                {!editMode
                    ? <button className="create-bank">Add bank</button>
                    : <button className="edit-bank">Save change</button>
                }
            </form>
            {error && <HelpErrorWindow>Check all input fields</HelpErrorWindow>}
        </Popup>
    );
};

export default AddBankPopup;
