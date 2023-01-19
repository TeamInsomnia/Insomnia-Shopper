import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  fetchSingleUnpurchasedOrderAsync,
  purchaseOrder,
} from "../../features";

const Checkout = () => {
  const { id } = useSelector((state) => state.auth.me);
  const order = useSelector((state) => state.order);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(fetchSingleUnpurchasedOrderAsync(id));
  }, [dispatch]);

  const handleSubmit = () => {
    dispatch(purchaseOrder(id));
    navigate("/confirmation");
  };

  return (
    <>
      <h1>Please review your order below:</h1>
      <ul className="list-group list-group-flush">
        {order.products &&
          order.products.map((product) => {
            return (
              <li key={product.id} className="list-group-item">
                {product.name}
                <div>
                  <strong>Quantity:</strong> {product.orderDetails.quantity}
                </div>
                <div>
                  <strong>Price:</strong> $
                  {product.orderDetails.quantityPrice / 100}
                </div>
              </li>
            );
          })}
      </ul>
      <div className="d-flex justify-content-end align-items-center">
        <div className="m-2">Total: ${order.totalPrice / 100}</div>
        {order.products && (
          <button
            type="submit"
            onClick={handleSubmit}
            className="m-2 btn btn-outline-primary"
          >
            Place Order
          </button>
        )}
      </div>
    </>
  );
};

export default Checkout;
