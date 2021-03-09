import React, { useEffect, useState } from "react";
import "./ProductPage.css";
const ProductPage = ({ match }) => {
  const [product, setProduct] = useState({});
  useEffect(() => {
    async function fetchData() {
      const response = await fetch(`http://127.0.0.1:8000/products/${match.params.id}`);
      const product = await response.json();
      console.log(product);
      setProduct(product);
    }
   fetchData();
  }, [match.params.id]);

  return (
    <section className="product">
      <div className="product__photo">
        <div className="photo-container">
          <div className="photo-main">
            <img src={product.image} alt="" />
          </div>
        </div>
      </div>
      <div className="product_info">
        <div className="title">
          <h1>{product.title}</h1>
        </div>
        <div className="price">
          <span>{product.price}$</span>
        </div>
        <button className="buy--btn">ADD TO CART</button>
      </div>
    </section>
  );
};

export default ProductPage;
