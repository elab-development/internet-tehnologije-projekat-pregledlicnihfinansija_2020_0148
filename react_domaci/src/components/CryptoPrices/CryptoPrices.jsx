import React, { useState, useEffect } from "react";
import axios from "axios";
import "./CryptoPrices.css";

const CryptoPrices = () => {
  const [cryptos, setCryptos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCryptos = async () => {
      try {
        const response = await axios.get(
          "https://api.coingecko.com/api/v3/coins/markets",
          {
            params: {
              vs_currency: "usd",
              order: "market_cap_desc",
              per_page: 10,
              page: 1,
              sparkline: false,
            },
          }
        );
        setCryptos(response.data);
        setLoading(false);
      } catch (error) {
        setError(error.message);
        setLoading(false);
      }
    };

    fetchCryptos();
  }, []);

  if (loading) {
    return <div className="loading">Loading...</div>;
  }

  if (error) {
    return <div className="error">Error: {error}</div>;
  }

  return (
    <div className="crypto-prices-container">
      <h1>Top 10 Cryptocurrencies</h1>
      <ul className="cryptos-list">
        {cryptos.map((crypto, index) => (
          <li key={index} className="crypto-item">
            <img src={crypto.image} alt={crypto.name} />
            <div>
              <h2>
                {crypto.name} ({crypto.symbol.toUpperCase()})
              </h2>
              <p>Current Price: ${crypto.current_price}</p>
              <p>Market Cap: ${crypto.market_cap}</p>
              <p>24h Change: {crypto.price_change_percentage_24h}%</p>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default CryptoPrices;
