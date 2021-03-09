import React, { useEffect, useState } from "react";
import Product from "../Product/Product.js";
import SaleCountDown from "../SaleCountDown/SaleCountDown.js";
import PropTypes from "prop-types";
import "./Products.css";

const Products = ({ products, currentCategory,minPrice,maxPrice }) => {
  
  const [isSale, setIsSale] = useState(true);
  const [filterProduts, setFilterProduts] = useState(products);
  useEffect(() => {
    currentCategory === "all"
      ? setFilterProduts(products.filter(({ price }) => price <= maxPrice&&price>=minPrice))
      : setFilterProduts(products.filter(({ category,price }) => category === currentCategory&&price <= maxPrice&&price>=minPrice));
  }, [currentCategory, maxPrice, minPrice, products]);


  return (
    <section className="products">
      <SaleCountDown onFinish={setIsSale} />
      {filterProduts.map(({ _id, image, title, price }) => (
        <Product key={_id} _id={_id} srcImg={image} title={title} price={price} isSale={isSale && price < 100} />
      ))}
    </section>
  );
};

Products.propTypes = {
  products: PropTypes.array,
  category: PropTypes.string,
};
export default Products;
