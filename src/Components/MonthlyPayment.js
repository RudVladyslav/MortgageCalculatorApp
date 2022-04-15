import React from 'react';

const MonthlyPayment = ({clearMonthlyPayment, monthlyPayment }) => {
    return (
        <div className="resultCalc">

            <div className="resultCalc__header">
                <span className="resultCalc__info">Info</span>
                <i
                    className="resultCalc__close large material-icons"
                    onClick={clearMonthlyPayment}
                >close</i>
            </div>

            <div className="resultCalc__content">
                <h3 className="resultCalc__title">Monthly payment: </h3>
                <span className="resultCalc__amount">${monthlyPayment.toLocaleString()}</span>
            </div>
        </div>
    );
};

export default MonthlyPayment;
