import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { fetchAllProducts } from "../../features";

// AllProducts Component begins here:
const AllProducts = () => {
  const allProducts = useSelector((state) => state.allProducts);
  const isAdmin = useSelector((state) => state.auth.me.isAdmin);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchAllProducts());
  }, [dispatch]);

  return (
    <div>
      <h3>ALL PRODUCTS</h3>
      {allProducts.map((product) => {
        return (
          <h4 key={product.id}>
            {/* {product.name}: Click this LINK to visit the single-product view!
            Product ID = {product.id} */}
            <Link to={`/products/${product.id}`}>{product.name}</Link>
          </h4>
        );
      })}
      <div>{isAdmin && <Link to={`/products/add`}>Add a Product</Link>}</div>
    </div>
  );
};

export default AllProducts;
