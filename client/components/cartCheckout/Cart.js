import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import {
  addExistingToCartAsync,
  fetchSingleUnpurchasedOrderAsync,
  removeFromCartAsync,
} from "../../features";

const Cart = () => {
  const [quantityToAdd, setQuantityToAdd] = useState("");
  const [showForm, setShowForm] = useState(0);

  const { id } = useSelector((state) => state.auth.me);
  const order = useSelector((state) => state.order);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchSingleUnpurchasedOrderAsync(id));
  }, [dispatch]);

  const handleSubmit = async (productId) => {
    let quantity = Number(quantityToAdd);
    await dispatch(
      addExistingToCartAsync({ orderId: order.id, productId, quantity })
    );
    setQuantityToAdd("");
    setShowForm(0);
    dispatch(fetchSingleUnpurchasedOrderAsync(id));
  };

  const handleDelete = async (productId) => {
    await dispatch(removeFromCartAsync(productId));
    dispatch(fetchSingleUnpurchasedOrderAsync(id));
  };

  return (
    <div>
      <h3>
        There are {order.products ? order.products.length : 0} items in your
        cart
      </h3>
      <ul className="list-group list-group-flush">
        {order.products &&
          order.products.map((product) => {
            return (
              <li key={product.id} className="list-group-item">
                <div>
                  <strong>Product:</strong> {product.name}
                </div>
                <div>
                  <strong>Quantity:</strong> {product.orderDetails.quantity}
                </div>
                <div>
                  <button
                    type="button"
                    className={
                      showForm === product.id
                        ? "visually-hidden"
                        : "btn btn-secondary m-1"
                    }
                    onClick={() => {
                      setShowForm(product.id);
                      setQuantityToAdd(product.orderDetails.quantity);
                    }}
                  >
                    Update Quantity
                  </button>
                </div>
                <form
                  onSubmit={(event) => {
                    event.preventDefault();
                    handleSubmit(product.id);
                  }}
                  className={showForm !== product.id ? "visually-hidden" : ""}
                >
                  <input
                    type="number"
                    min={1}
                    max={20}
                    name="quantityToAdd"
                    value={quantityToAdd}
                    onChange={(e) => setQuantityToAdd(e.target.value)}
                    className="m-1"
                  />
                  <button type="submit" className="btn btn-outline-primary m-1">
                    Update Quantity
                  </button>
                  <button
                    type="button"
                    className="btn btn-sm btn-danger"
                    onClick={() => setShowForm(0)}
                  >
                    X
                  </button>
                </form>
                <div>
                  <button
                    type="button"
                    onClick={(event) => {
                      event.preventDefault();
                      handleDelete(product.id);
                    }}
                    className="btn btn-outline-danger m-1"
                  >
                    Remove From Cart
                  </button>
                </div>
                <p>Price: ${product.orderDetails.quantityPrice / 100}</p>
              </li>
            );
          })}
      </ul>
      {order.products && (
        <div className="d-flex justify-content-end align-items-center">
          <div className="m-2">
            <strong>Subtotal:</strong> $
            {order.products ? order.totalPrice / 100 : 0}
          </div>
          {order.products.length > 0 && (
            <Link to="/checkout" className="m-2 btn btn-outline-primary">
              Proceed to Checkout
            </Link>
          )}
        </div>
      )}
    </div>
  );
};

export default Cart;
