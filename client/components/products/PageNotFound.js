// PAGE NOT FOUND attempt, modeled after AllProducts.js

import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchAllProducts } from "../../features";
import { NavLink } from "react-router-dom";

// AllProducts Component begins here:
const PageNotFound = () => {
  const dispatch = useDispatch();
  let allProducts = useSelector((state) => state.allProducts);

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
            <NavLink to={`/products/${product.id}`}>{product.name}</NavLink>
          </h4>
        );
      })}
    </div>
  );
};

//   return (
//     <div>
//       <h3>Page not found! Apologies.</h3>
//     </div>
//   );

export default PageNotFound;
