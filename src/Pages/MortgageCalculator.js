import React, {useEffect, useState} from 'react';
import {useSelector} from "react-redux";
import ErrorAlert from "../Components/ErrorAlert";
import MonthlyPayment from "../Components/MonthlyPayment";
import BankStatistics from "../Components/BankStatistics";
import BankList from "../Components/BankList";

const MortgageCalculator = () => {

    const {banksData} = useSelector(({banks}) => ({banksData: banks.banksData}))

    const [monthlyPayment, setMonthlyPayment] = useState(0)

    const [initialLoan, setInitialLoan] = useState(100000)
    const [downPayment, setDownPayment] = useState(230)

    const [visibleList, setVisibleList] = useState(false)
    const [choseBank, setChoseBank] = useState([...banksData].reverse()[0])

    const [error, setError] = useState(false)
    const [errorMessage, setErrorMessage] = useState([])

    const onClickChoseBankHandler = (bank) => {
        setChoseBank(bank)
        setVisibleList(false)
    }

    const generateErrorMessage = () => {
        const
            incorrectData = 'Incorrect data entered',
            errorDangerInput = 'Input fields are empty',
            errorInitialLoan = 'The initial loan is more than the bank can lend you.',
            errorDownPayment = 'Down payment is less than required.'
        if (downPayment === 0 || initialLoan === 0) {
            setErrorMessage(prevState => [...prevState, errorDangerInput])
        } else if (isNaN(monthlyPayment) || initialLoan - downPayment < 0) {
            setErrorMessage(prevState => [...prevState, incorrectData])
        } else {
            initialLoan > choseBank.maxLoan && setErrorMessage(prevState => [...prevState, errorInitialLoan])
            downPayment / initialLoan * 100 <= choseBank.minDownPayment && setErrorMessage(prevState => [...prevState, errorDownPayment])
        }
    }

    const clearMonthlyPayment = () => setMonthlyPayment(0)

    const showListHandler = () => setVisibleList(prevState => !prevState)

    const submitFormHandler = (e) => {
        e.preventDefault(e)
        if (initialLoan - downPayment < 0) {
            setError(true)
            generateErrorMessage()
        } else {
            if (initialLoan <= choseBank.maxLoan && downPayment / initialLoan >= choseBank.minDownPayment / 100) {
                const interestRate = choseBank.minDownPayment / 100
                const monthlyPaymentResult =
                    ((initialLoan - downPayment) * (interestRate / 12) * (Math.pow((1 + (interestRate / 12)), choseBank.loanTerm))) / ((Math.pow((1 + (interestRate / 12)), choseBank.loanTerm)) - 1)
                setMonthlyPayment(Math.round(monthlyPaymentResult))
                setDownPayment(0)
                setInitialLoan(0)
            } else {
                setError(true)
                generateErrorMessage()
            }

        }
    }


    return (
        <>
            {error === true &&
                <ErrorAlert isError={error} setIsError={setError}
                            errorMessage={errorMessage}
                            setErrorMessage={setErrorMessage}
                />}
            <div className="mortgageCalcHeaderWrapper">
                <div className="mortgageCalcHeader">
                    <i className="large material-icons">help</i>
                    <h1 className="mortgageCalcHeader__title">Choose a bank, fill in the fields and calculate the
                        monthly
                        payment.</h1>
                </div>
            </div>
            <div className="mortgageCalcWrapper">

                <form className="form calcForm" onSubmit={(e) => submitFormHandler(e)}>
                    <input
                        className="calcForm__input"
                        id='InitialLoan'
                        type="number"
                        placeholder='Initial loan:'
                        value={initialLoan}
                        min={0}
                        onChange={event => setInitialLoan(Number(event.target.value))}
                    />
                    <label className="label" htmlFor="InitialLoan">Initial loan, $</label>

                    <input
                        className="calcForm__input"
                        id='DownPayment'
                        type="number"
                        placeholder='Down payment:'
                        value={downPayment}
                        min={0}
                        onChange={event => setDownPayment(Number(event.target.value))}
                    />
                    <label className="label" htmlFor="DownPayment">Down payment, $</label>

                    <button className="create-bank calcForm__btn">
                        Calculate
                    </button>
                </form>


                <BankList choseBank={choseBank}  onClickChoseBankHandler={onClickChoseBankHandler}
                          showListHandler={showListHandler} visibleList={visibleList}/>

                <BankStatistics choseBank={choseBank}/>

            </div>

            {monthlyPayment !== 0 &&
                <MonthlyPayment monthlyPayment={monthlyPayment} clearMonthlyPayment={clearMonthlyPayment}/>}
        </>
    );
};

export default MortgageCalculator;
