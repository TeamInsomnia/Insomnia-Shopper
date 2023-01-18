// WANG: TASK: CREATE SINGLEPRODUCT.JS, modeled on AllProducts.js

import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  addExistingToCartAsync,
  addNewToCartAsync,
  fetchSingleUnpurchasedOrderAsync,
  fetchSingleProduct,
  selectSingleProduct,
  deleteProduct,
} from "../../features";
import { useParams, Link, useNavigate } from "react-router-dom";

// SingleProduct Component begins here:
const SingleProduct = () => {
  const [quantityToAdd, setQuantityToAdd] = useState("1");
  const singleProduct = useSelector(selectSingleProduct);
  const isAdmin = useSelector((state) => state.auth.me.isAdmin);

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { productId } = useParams(); // this grabs the wildcard.
  const { id } = useSelector((state) => state.auth.me);

  const cart = useSelector((state) => state.order);
  /* Next: deconstruct the attributes out of singleProduct. 
 Product model lists attributes as name, desc, price, material, color. */
  const { name, description, price, material, color, imageUrl, orders } =
    singleProduct;

  useEffect(() => {
    dispatch(fetchSingleProduct(productId));
    dispatch(fetchSingleUnpurchasedOrderAsync(id));
  }, [dispatch]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (orders.length && orders[0].userId === id && !orders[0].purchased) {
      let { orderId, quantity } = orders[0].orderDetails;
      quantity += Number(quantityToAdd);
      await dispatch(addExistingToCartAsync({ orderId, productId, quantity }));
      dispatch(fetchSingleProduct(productId));
    } else {
      const orderId = cart.id;
      const productId = singleProduct.id;
      let quantity = Number(quantityToAdd);
      await dispatch(addNewToCartAsync({ orderId, productId, quantity }));
      dispatch(fetchSingleProduct(productId));
    }
    setQuantityToAdd("1");
  };

  const handleDelete = async () => {
    await dispatch(deleteProduct(productId));
    navigate("/products");
  };

  // We need a key=__ in this return statement, don't we?
  return (
    <div>
      <h1>{name}</h1>
      <div className="d-flex justify-content-center">
        <div className="card">
          <img src={imageUrl} className="card-img-top" alt={description} />
          <div className="card-body">
            <p className="card-text">{description}</p>
            <p className="card-text">
              <strong>Material:</strong> {material}. <strong>Color:</strong>{" "}
              {color}.
            </p>
            <div>
              <strong>Price:</strong> ${price / 100}
            </div>
            {id && (
              <form onSubmit={handleSubmit} className="row">
                <label htmlFor="quantityToAdd">Quantity</label>
                <input
                  type="number"
                  min={1}
                  max={20}
                  name="quantityToAdd"
                  value={quantityToAdd}
                  onChange={(e) => setQuantityToAdd(e.target.value)}
                  className="col-4"
                />
                <button type="submit" className="btn btn-outline-primary col-8">
                  ADD {name} TO CART.
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
      <div className="m-3">
        {isAdmin && (
          <>
            <h4>Admin Mode!</h4>
            <Link
              to={`/products/${productId}/update`}
              className="m-1 btn btn-outline-secondary"
            >
              Update Product
            </Link>
            <button
              type="button"
              onClick={handleDelete}
              className="m-1 btn btn-outline-danger"
            >
              Delete Product
            </button>
          </>
        )}
      </div>
    </div>
  );
};

export default SingleProduct;
