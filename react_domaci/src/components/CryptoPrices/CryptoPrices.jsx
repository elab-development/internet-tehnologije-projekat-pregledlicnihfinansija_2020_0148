import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import * as d3 from "d3";
import "./CryptoPrices.css";

const CryptoPrices = () => {
  const [cryptos, setCryptos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const svgRef = useRef(null);

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

  useEffect(() => {
    if (!loading && cryptos.length > 0) {
      drawChart();
    }
  }, [cryptos]);

  const drawChart = () => {
    const data = cryptos.slice(0, 10).map((crypto) => ({
      name: crypto.name,
      priceChange: crypto.price_change_percentage_24h,
    }));

    const svg = d3.select(svgRef.current);

    const margin = { top: 20, right: 30, bottom: 30, left: 40 };
    const width = 600 - margin.left - margin.right;
    const height = 400 - margin.top - margin.bottom;

    svg.selectAll("*").remove();

    const x = d3
      .scaleBand()
      .domain(data.map((d) => d.name))
      .range([margin.left, width - margin.right])
      .padding(0.1);

    const y = d3
      .scaleLinear()
      .domain([
        d3.min(data, (d) => d.priceChange),
        d3.max(data, (d) => d.priceChange),
      ])
      .nice()
      .range([height - margin.bottom, margin.top]);

    svg
      .append("g")
      .attr("fill", "steelblue")
      .selectAll("rect")
      .data(data)
      .join("rect")
      .attr("x", (d) => x(d.name))
      .attr("y", (d) => y(d.priceChange))
      .attr("height", (d) => y(0) - y(d.priceChange))
      .attr("width", x.bandwidth());

    svg
      .append("g")
      .attr("transform", `translate(0,${height - margin.bottom})`)
      .call(d3.axisBottom(x))
      .selectAll("text")
      .style("text-anchor", "end")
      .attr("transform", "rotate(-45)");

    svg
      .append("g")
      .attr("transform", `translate(${margin.left},0)`)
      .call(d3.axisLeft(y).ticks(null, "s"))
      .append("text")
      .attr("x", 2)
      .attr("y", y(y.ticks().pop()) + 0.5)
      .attr("dy", "0.32em")
      .attr("fill", "#000")
      .attr("font-weight", "bold")
      .attr("text-anchor", "start")
      .text("Price Change (%)");

    svg.node();
  };

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
        {cryptos.slice(0, 10).map((crypto, index) => (
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
      <svg ref={svgRef} width={600} height={400}></svg>
    </div>
  );
};

export default CryptoPrices;
