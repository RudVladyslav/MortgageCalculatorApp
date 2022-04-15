import React from 'react';

const BankStatistics = ({choseBank}) => {
    return (
        <div className="selectedBankStatistics">
            <div className="selectedBankStatistics__innerWrapper">

                <div className="selectedBankStatistics__title">
                    <i className="large material-icons">help</i>
                    <h3>Info selected bank.</h3>
                </div>
                <div className="selectedBankStatistics__content">
                    <h4>{choseBank.name}</h4>
                    <p><span>Interest rate: </span>{choseBank.rate}%</p>
                    <p><span>Max. loan: </span>{choseBank.maxLoan.toLocaleString()}$</p>
                    <p><span>Min. down payment: </span>{choseBank.minDownPayment}%</p>
                    <p><span>Loan term:  </span>{choseBank.loanTerm} monthly payments</p>
                </div>
            </div>
        </div>
    );
};

export default BankStatistics;
