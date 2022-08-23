import React from 'react';
import PropTypes from "prop-types";
import './CurrencyInput.css';

function CurrencyInput({ key, amount, currency, currencies, onAmountChange, onCurrencyChange }) {

  return (
    <div key={key} className="group">
      <input
        type="text"
        maxLength={6}
        value={amount}
        onChange={(event) => onAmountChange(event.target.value)}
      />
      <select 
        value={currency}
        onChange={(event) => onCurrencyChange(event.target.value)}
      >
        {currencies.map((c) => (
          <option value={c}>{c}</option>
        ))}
      </select>
    </div>
  );
}

CurrencyInput.propTypes = {
  key: PropTypes.number.isRequired,
  amount: PropTypes.string.isRequired,
  currency: PropTypes.string.isRequired,
  currencies: PropTypes.array,
  onAmountChange: PropTypes.func,
  onCurrencyChange: PropTypes.func,
};

export default CurrencyInput;
