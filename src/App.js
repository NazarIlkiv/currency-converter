import { useState, useEffect } from "react";
import Header from "./components/Header/Header";
import CurrencyInput from "./components/CurrencyInput/CurrencyInput";
import axios from "axios";
import Icon from "./money.png";
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
        "https://v6.exchangerate-api.com/v6/2698922fcd9fceb151131b30/latest/USD"
      )
      .then((response) => setRates(response.data.conversion_rates));
  }, []);

  useEffect(() => {
    axios
      .get(
        "https://v6.exchangerate-api.com/v6/2698922fcd9fceb151131b30/latest/EUR"
      )
      .then((response) => setEurRate(response.data.conversion_rates));
  }, []);

  useEffect(() => {
    if (!!rates) setAmount1(1);
    getCalculatedAmount(amount1, setAmount1, setAmount2, currency1, currency2);
  }, [rates]);

  const format = (number) => number.toFixed(2);

  const getCalculatedAmount = (value, setValue1, setValue2, curr1, curr2) => {
    setValue2(format((value * rates[curr2]) / rates[curr1]));
    setValue1(value);
  };

  return (
    <>
      <Header USDRate={rates["UAH"]} EURRate={eurRate["UAH"]} />
      <div className="wrapper">
        <img src={Icon} alt="money icon"></img>
        <CurrencyInput
          key={1}
          onAmountChange={(e) =>
            getCalculatedAmount(e, setAmount1, setAmount2, currency1, currency2)
          }
          onCurrencyChange={(e) => {
            setCurrency1(e);
            getCalculatedAmount(amount1, setAmount1, setAmount2, e, currency2);
          }}
          currencies={Object.keys(rates)}
          amount={amount1}
          currency={currency1}
        />
        <CurrencyInput
          key={2}
          onAmountChange={(e) =>
            getCalculatedAmount(e, setAmount2, setAmount1, currency2, currency1)
          }
          onCurrencyChange={(e) => {
            setCurrency2(e);
            getCalculatedAmount(amount2, setAmount2, setAmount1, e, currency1);
          }}
          currencies={Object.keys(rates)}
          amount={amount2}
          currency={currency2}
        />
      </div>
    </>
  );
}

export default App;
