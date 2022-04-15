import React, {useState} from 'react';
import {Link} from "react-router-dom";

const Header = () => {
    const [activeLink, setActiveLink] = useState('banks')
    return (
        <header>
            <div className="header-title">
                <h1 className="header-title__text">MortgageCalculatorApp</h1>
            </div>
            <div className="header-links">
                <div className="header-links__item ">
                    <Link to={'/'}>
                        <h3 className={`header-links__text ${activeLink === 'banks' && 'active'}`}
                            onClick={() => setActiveLink('banks')}
                        >Banks</h3>
                    </Link>
                </div>
                <div className="header-links__item">
                    <Link to={'/calculate'}>
                        <h3 className={`header-links__text ${activeLink === 'calculate' && 'active'}`}
                            onClick={() => setActiveLink('calculate')}
                        >Calculator</h3>
                    </Link>
                </div>
            </div>
        </header>
    );
};

export default Header;
