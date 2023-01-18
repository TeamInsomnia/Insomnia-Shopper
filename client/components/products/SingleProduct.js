import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  addExistingToCartAsync,
  addNewToCartAsync,
  fetchSingleUnpurchasedOrderAsync,
  fetchSingleProduct,
  selectSingleProduct,
  deleteProduct,
  createOrder,
} from "../../features";
import { useParams, Link, useNavigate } from "react-router-dom";

const SingleProduct = () => {
  const [quantityToAdd, setQuantityToAdd] = useState("1");
  const singleProduct = useSelector(selectSingleProduct);
  const user = useSelector((state) => state.auth.me);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { productId } = useParams();

  let cart = useSelector((state) => state.order);


  const cart = useSelector((state) => state.order);
  const { name, description, price, material, color, imageUrl, orders } =
    singleProduct;

  const findOrder = (orders) => {
    for (const order of orders) {
      if (order.userId === user.id && order.purchased === false) return order;
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
    dispatch(fetchSingleUnpurchasedOrderAsync(user.id));
  }, [dispatch]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!cart) {
      const newOrder = await dispatch(createOrder({userId: user.id, totalPrice: 0}));
      await dispatch(fetchSingleProduct(productId));
      cart = newOrder.payload;
    }

    await dispatch(fetchSingleUnpurchasedOrderAsync(user.id));

    const orderId = cart.id;
    const cartHasItem = checkCartForProduct(cart);
    
    if (!orders.orderDetails && !cartHasItem) {
      const quantity = Number(quantityToAdd);
      await dispatch(addNewToCartAsync({ orderId, productId, quantity }));
      await dispatch(fetchSingleProduct(productId));
    } 
    else {
      const orderToUpdate = findOrder(orders);
      const quantity =
        orderToUpdate.orderDetails.quantity + Number(quantityToAdd);
      await dispatch(addExistingToCartAsync({ orderId, productId, quantity }));
      await dispatch(fetchSingleProduct(productId));
    }
    setQuantityToAdd("1");
  };

  const handleDelete = async () => {
    await dispatch(deleteProduct(productId));
    navigate("/products");
  };

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
