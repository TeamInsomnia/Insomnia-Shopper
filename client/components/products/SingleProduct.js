import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, Link, useNavigate } from "react-router-dom";
import {
  addExistingToCartAsync,
  addNewToCartAsync,
  fetchSingleUnpurchasedOrderAsync,
  fetchSingleProduct,
  selectSingleProduct,
  deleteProduct,
  createOrder,
} from "../../features";

const SingleProduct = () => {
  const [quantityToAdd, setQuantityToAdd] = useState("1");

  const singleProduct = useSelector(selectSingleProduct);
  const { id, isAdmin } = useSelector((state) => state.auth.me);
  let cart = useSelector((state) => state.order);

  const { productId } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { name, description, price, material, color, imageUrl, orders } =
    singleProduct;

  const findOrder = (orders) => {
    for (const order of orders) {
      if (order.userId === id && order.purchased === false) return order;
    }
  };

  const checkCartForProduct = (cart) => {
    if (!cart.products) return false;
    for (const cartItem of cart.products) {
      if (cartItem.id === Number(productId)) return true;
    }
    return false;
  };

  useEffect(() => {
    dispatch(fetchSingleProduct(productId));
    id && dispatch(fetchSingleUnpurchasedOrderAsync(id));
  }, [dispatch]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!cart) {
      const newOrder = await dispatch(
        createOrder({ userId: id, totalPrice: 0 })
      );
      await dispatch(fetchSingleProduct(productId));
      cart = newOrder.payload;
    }

    const orderId = cart.id;
    const cartHasItem = checkCartForProduct(cart);

    if (!orders.orderDetails && !cartHasItem) {
      const quantity = Number(quantityToAdd);
      await dispatch(addNewToCartAsync({ orderId, productId, quantity }));
      await dispatch(fetchSingleProduct(productId));
    } else {
      const orderToUpdate = findOrder(orders);
      const quantity =
        orderToUpdate.orderDetails.quantity + Number(quantityToAdd);
      await dispatch(addExistingToCartAsync({ orderId, productId, quantity }));
      await dispatch(fetchSingleProduct(productId));
    }

    await dispatch(fetchSingleUnpurchasedOrderAsync(id));

    setQuantityToAdd("1");
  };

  const handleDelete = async () => {
    await dispatch(deleteProduct(productId));
    navigate("/products");
  };

  return (
    <div>
      <div
        className="modal fade"
        id="exampleModal"
        tabindex="-1"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h1 className="modal-title fs-5" id="exampleModalLabel">
                Added to cart!
              </h1>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
          </div>
        </div>
      </div>

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
                <button
                  type="submit"
                  className="btn btn-outline-primary col-8"
                  data-bs-toggle="modal"
                  data-bs-target="#exampleModal"
                >
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
              className="m-1 btn btn-secondary"
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
