import React, { useContext, useEffect, useState } from "react";
import PropTypes from "prop-types";
import { Slider } from "antd";
import "./Filter.css";
import { MinMaxPricesContext } from "../../contexts/context";

const Filter = ({ setSelectedPrices, setCategory, categories }) => {
  const [min, max] = useContext(MinMaxPricesContext);
  const [minPrice, setMinPrice] = useState(Math.floor(Number(min)));
  const [maxPrice, setMaxPrice] = useState(Math.ceil(Number(max)));
  const [currentPrices, setCurrentPrices] = useState([minPrice, maxPrice]);

  useEffect(() => {
    const newMin = Math.floor(Number(min));
    const newMax = Math.ceil(Number(max));
    setMinPrice(newMin);
    setMaxPrice(newMax);
    setCurrentPrices([newMin, newMax]);
  }, [max, min]);

  useEffect(() => {
    setSelectedPrices(currentPrices);
  }, [currentPrices, setSelectedPrices]);

  const marks = {
    [minPrice]: `${minPrice}$`,
    [maxPrice]: `${maxPrice}$`,
  };

  return (
    <>
      <div className="collection-sort">
        <label>Filter by:</label>
        <select
          onChange={(e) => {
            setCategory(e.target.value);
          }}
        >
          <option value="all">All Products</option>
          {categories.map((option, index) => (
            <option key={index} value={option}>
              {option}
            </option>
          ))}
        </select>
      </div>
      <div className="slider">
        {minPrice !== 0 && maxPrice !== 0 && (
          <Slider
            range
            marks={marks}
            value={currentPrices}
            min={minPrice}
            max={maxPrice}
            onChange={(value) => {
              setCurrentPrices(value);
            }}
          />
        )}
      </div>
    </>
  );
};

Filter.propTypes = {
  products: PropTypes.array,
  setCategory: PropTypes.func,
};
export default Filter;
