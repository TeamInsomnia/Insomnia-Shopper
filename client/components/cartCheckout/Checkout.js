import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  fetchSingleUnpurchasedOrderAsync,
  purchaseOrder,
  updateOrderConfirmation,
} from "../../features";
import { v4 as uuidv4 } from "uuid";

const Checkout = () => {
  const { id } = useSelector((state) => state.auth.me);
  const order = useSelector((state) => state.order);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(fetchSingleUnpurchasedOrderAsync(id));
    if (!order.products) navigate("/notFound"); // prevent user from manually navigating
  }, [dispatch]);

  const handleSubmit = async () => {
    const confirmationNumber = uuidv4().slice(0, 8);
    await dispatch(updateOrderConfirmation({ id, confirmationNumber }));
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
        <button
          type="button"
          className="btn btn-outline-danger"
          onClick={() => navigate("/cart")}
        >
          Cancel
        </button>
      </div>
    </>
  );
};

export default Checkout;
