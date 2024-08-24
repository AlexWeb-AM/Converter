import { useContext } from "react";
import { MyContext } from "../context";

export default function Select({ selectedCurrency, onChangeCurrency,val }) {
  const { base } = useContext(MyContext);

  return (
    <div className="select_div">
      <label className="from">{val}</label>
      <select
        id="select"
        className="select"
        value={selectedCurrency}
        onChange={(e) => onChangeCurrency(e.target.value)}
      >
        
        {Object.keys(base).map((currency) => (
          <option key={currency} value={currency}>
            {currency}
          </option>
        ))}
      </select>
    </div>
  );
}
