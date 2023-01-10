import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchAllProducts } from "../../features";

const AllProducts = () => {
  const dispatch = useDispatch();
  let allProducts = useSelector((state) => state.allProducts);

  useEffect(() => {
    dispatch(fetchAllProducts());
  }, [dispatch]);

  return (
    <div>
      <h3>ALL PRODUCTS</h3>
      {allProducts.map((product) => {
        return <h4 key={product.id}>{product.name}</h4>;
      })}
    </div>
  );
};

export default AllProducts;
