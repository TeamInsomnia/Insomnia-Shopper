import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { fetchAllProducts } from "../../features";

const AllProducts = (props) => {
  const allProducts = useSelector((state) => state.allProducts);
  const isAdmin = useSelector((state) => state.auth.me.isAdmin);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchAllProducts());
  }, [dispatch]);

  return (
    <>
      {!props.origin && <h1>All Products</h1>}
      <div className="row d-flex justify-content-center">
        {allProducts.map((product) => {
          return (
            <div
              key={product.id}
              id="all-products-card"
              className="card col-3 m-2"
            >
              <img
                src={product.imageUrl}
                className="card-img-top"
                alt="..."
                height={200}
                width={200}
              />
              <div className="card-body">
                <h5 className="card-title">{product.name}</h5>
                <p className="card-text">{product.description}</p>
                <Link to={`/products/${product.id}`}>View {product.name}</Link>
              </div>
            </div>
          );
        })}
        <div>
          {isAdmin && (
            <div className="m-3">
              <h4>Admin Mode!</h4>
              <Link to={`/products/add`}>Add a Product</Link>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default AllProducts;
