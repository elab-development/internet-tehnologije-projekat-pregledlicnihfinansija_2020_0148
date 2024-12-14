import React, { useState, useEffect } from "react";
import axios from "axios";
import "./CurrencyConverter.css";

const CurrencyConverter = () => {
  const [rates, setRates] = useState({});
  const [amount, setAmount] = useState("");
  const [fromCurrency, setFromCurrency] = useState("EUR");
  const [toCurrency, setToCurrency] = useState("RSD");
  const [convertedAmount, setConvertedAmount] = useState(null);

  useEffect(() => {
    axios
      .get("https://api.exchangerate-api.com/v4/latest/USD")
      .then((response) => {
        setRates(response.data.rates);
      })
      .catch((error) => {
        console.error("Error fetching exchange rates", error);
      });
  }, []);

  const convertCurrency = () => {
    if (rates[fromCurrency] && rates[toCurrency]) {
      const result = (amount * rates[toCurrency]) / rates[fromCurrency];
      setConvertedAmount(result.toFixed(2));
    }
  };

  return (
    <div className="currency-container">
      <h1 className="currency-title">Konvertor Valuta</h1>
      <div className="currency-input-group">
        <label htmlFor="amount" className="currency-label">
          Unesite iznos:
        </label>
        <input
          type="number"
          id="amount"
          className="currency-input"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
        />
      </div>
      <div className="currency-input-group">
        <label htmlFor="from-currency" className="currency-label">
          Iz valute:
        </label>
        <select
          id="from-currency"
          className="currency-select"
          value={fromCurrency}
          onChange={(e) => setFromCurrency(e.target.value)}
        >
          {Object.keys(rates).map((currency) => (
            <option key={currency} value={currency}>
              {currency}
            </option>
          ))}
        </select>
      </div>
      <div className="currency-input-group">
        <label htmlFor="to-currency" className="currency-label">
          U valutu:
        </label>
        <select
          id="to-currency"
          className="currency-select"
          value={toCurrency}
          onChange={(e) => setToCurrency(e.target.value)}
        >
          {Object.keys(rates).map((currency) => (
            <option key={currency} value={currency}>
              {currency}
            </option>
          ))}
        </select>
      </div>
      <button onClick={convertCurrency} className="currency-button">
        Konvertuj
      </button>
      {convertedAmount !== null && (
        <p className="currency-result">
          Konvertovani iznos: {convertedAmount} {toCurrency}
        </p>
      )}
    </div>
  );
};

export default CurrencyConverter;
