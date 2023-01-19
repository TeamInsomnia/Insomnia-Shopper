import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchOrderHistory } from "../../features";

const OrderHistory = () => {
  const { id } = useSelector((state) => state.auth.me);
  const dispatch = useDispatch();

  const { orders } = useSelector((state) => state.singleUser);

  useEffect(() => {
    dispatch(fetchOrderHistory(id));
  }, [dispatch, id]);

  return (
    <>
      <h1>Order History</h1>
      <ul className="list-group list-group-flush">
        {orders &&
          orders.map((order) => {
            return (
              <li className="list-group-item" key={order.id}>
                <div>
                  <strong>Order Confirmation #:</strong>{" "}
                  {order.confirmationNumber}
                </div>
                <p>
                  <strong>Total:</strong> ${order.totalPrice / 100}
                </p>
              </li>
            );
          })}
      </ul>
    </>
  );
};

export default OrderHistory;
