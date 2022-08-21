import { useState, useEffect } from "react";
import Header from "./components/Header/Header";
import CurrencyInput from "./components/CurrencyInput/CurrencyInput";
import axios from "axios";
import Icon from './money.png';
import "./App.css";

function App() {
  const [amount1, setAmount1] = useState(1);
  const [amount2, setAmount2] = useState(1);
  const [currency1, setCurrency1] = useState("USD");
  const [currency2, setCurrency2] = useState("UAH");
  const [rates, setRates] = useState([]);
  const [eurRate, setEurRate] = useState(1);

  useEffect(() => {
    axios
        .get(
          "https://v6.exchangerate-api.com/v6/ddc00136a0ad70eb8e7974cb/latest/USD"
      )
      .then((response) => setRates(response.data.conversion_rates));
  }, []);

  useEffect(() => {
    axios
        .get(
          "https://v6.exchangerate-api.com/v6/ddc00136a0ad70eb8e7974cb/latest/EUR"
      )
      .then((response) => setEurRate(response.data.conversion_rates));
  }, []);

  useEffect(() => {
    if (!!rates) handleAmount1Change(1);
  }, [rates]);

  const format = (number) => number.toFixed(2);

  function handleAmount1Change(amount1) {
    console.log(typeof(amount1, '1'));
    setAmount2(format(amount1 * rates[currency2] / rates[currency1]));
    setAmount1(amount1);
  }

  function handleCurrency1Change(currency1) {
    console.log(typeof(amount1, '1'));
    setAmount2(format(amount1 * rates[currency2] / rates[currency1]));
    setCurrency1(currency1);
    console.log(typeof(amount1, '1'));
  }

  function handleAmount2Change(amount2) {
    setAmount1(format(amount2 * rates[currency1] / rates[currency2]));
    setAmount2(amount2);
  }

  function handleCurrency2Change(currency2) {
    setAmount1(format(amount2 * rates[currency1] / rates[currency2]));
    setCurrency2(currency2);
  }

  return (
    <>
      <Header USDRate={rates['UAH']} EURRate={eurRate['UAH']} />
      <div className="wrapper">
        <img src={Icon} alt='money icon'></img>
        <CurrencyInput
           key={1}
           onAmountChange={handleAmount1Change}
           onCurrencyChange={handleCurrency1Change}
           currencies={Object.keys(rates)}
           amount={amount1}
           currency={currency1} />
        <CurrencyInput
           key={2}
           onAmountChange={handleAmount2Change}
           onCurrencyChange={handleCurrency2Change}
           currencies={Object.keys(rates)}
           amount={amount2}
           currency={currency2} />
       </div>
    </>
  );
}

export default App;
