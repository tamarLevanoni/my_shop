import "./Home.css";
import React, { useState, useEffect } from "react";
import Header from "../../components/Header/Header";
import Products from "../../components/Products/Products";
import { MinMaxPricesContext, SetQueryValueContext } from "../../contexts/context";

const Home = () => {
  const [products, setProducts] = useState([]);
  const [currentCategory, setCurrentCategory] = useState("all");
  const [queryValue, setQueryValue] = useState("");
  const [selectedPrices, setSelectedPrices] = useState([]);
  const [minMaxPrices, setMinMaxPrices] = useState([0, 1000]);
  const setCategory = (currentCategory) => {
    setCurrentCategory(currentCategory);
  };
  useEffect(() => {
    fetchData();
  }, []);

  async function fetchData() {
    const response = await fetch("http://127.0.0.1:8000/products/");
    const products = await response.json();
    setProducts(products);
    console.log("sucsess");
  }
  async function fetchDataWithQuery(value) {
    const response = await fetch(`http://127.0.0.1:8000/products?q=${value}`);
    const products = await response.json();
    setProducts(products);
  }
  useEffect(() => {
    queryValue === "" ? fetchData() : fetchDataWithQuery(queryValue);
  }, [queryValue]);
  const [categories, setCAtegories] = useState([]);
  const groupBy = (xs, key) =>
    xs.reduce((rv, x) => {
      rv[x[key]] = true || [];
      return rv;
    }, {});
  useEffect(() => {
    setCAtegories(Object.keys(groupBy(products, "category")));
    const prices = Object.keys(groupBy(products, "price"));
    if (products.length > 0) {
      setMinMaxPrices([Math.min(...prices), Math.max(...prices)]);
    }
    else{
      setMinMaxPrices([0,0]);
    }
  }, [products]);

  useEffect(() => {
    setSelectedPrices(minMaxPrices);
  }, [minMaxPrices]);
  return (
    <>
      <MinMaxPricesContext.Provider value={minMaxPrices}>
        <SetQueryValueContext.Provider value={setQueryValue}>
          <Header categories={categories} setCategory={setCategory} setSelectedPrices={setSelectedPrices} />
        </SetQueryValueContext.Provider>
      </MinMaxPricesContext.Provider>
      <Products
        products={products}
        currentCategory={currentCategory}
        minPrice={selectedPrices[0]}
        maxPrice={selectedPrices[1]}
      />
    </>
  );
};
export default Home;
