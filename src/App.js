import "./App.css";
import Select from "./components/Select";
import React, { useEffect, useState } from "react";
import { MyContext } from "./context";

function App() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [amount, setAmount] = useState(1);
  const [fromCurrency, setFromCurrency] = useState("USD");
  const [toCurrency, setToCurrency] = useState("EUR");
  const [result, setResult] = useState(null);



  let base = {};

  const convert = (event) => {
    event.preventDefault(); // Prevent form submission
    if (fromCurrency === toCurrency) {
      setResult(amount);
    } else {
      const rate = base[toCurrency] / base[fromCurrency];
      setResult((amount * rate).toFixed(2));
    }
  };

  useEffect(() => {
    const url =
      "https://v6.exchangerate-api.com/v6/2e04f19b0517f7c1ee9943a7/latest/USD";

    const fetchData = async () => {
      try {
        const response = await fetch(url);
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const result = await response.json();
        setData(result);
      } catch (error) {
        setError(error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  const object = data.conversion_rates;

  for (const property in object) {
    base[property] = object[property];
  }

  


  return (
    <div className="App">
    
      <MyContext.Provider value={{ base: base }}>

        <form className='form' onSubmit={convert}>
          <h2>
            CURRENCY <br /> CALCULATOR
          </h2>
          <div className="inputs">
            <label>Amount</label>
            <input
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              type="number"
            />
            <Select val="From" selectedCurrency={fromCurrency} onChangeCurrency={setFromCurrency} />
            <Select val="To" selectedCurrency={toCurrency} onChangeCurrency={setToCurrency} />
            <button type="submit">Convert</button>
          </div>
        </form>
        {result && (
          <center>
          <div className="result">
            {amount} {fromCurrency} = {result} {toCurrency}
          </div>
          </center>
        )}
      </MyContext.Provider>
    </div>
  );
}

export default App;
