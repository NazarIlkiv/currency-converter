import React from 'react';
import PropTypes from "prop-types";
import './Header.css';

const Header = ({  USDRate, EURRate }) => {

    return (
        <div className='header'>
            <h1> Currency Conventer: check live foreign currency exchange rates </h1>
            <span>
                1 USD = {USDRate?.toFixed(2)} UAH / 1 EUR = {EURRate?.toFixed(2)}
            </span>
        </div>
    )
}

Header.propTypes = {
    USDRate: PropTypes.number.isRequired,
    EURRate: PropTypes.number.isRequired,
};
  
export default Header;