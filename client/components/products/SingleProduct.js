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

  const { name, description, price, material, color, orders } = singleProduct;

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
      const newOrder = await dispatch(createOrder(user.id));
      dispatch(fetchSingleProduct(productId));
      cart = newOrder.payload;
    }

    await dispatch(fetchSingleUnpurchasedOrderAsync(user.id));

    const orderId = cart.id;
    const cartHasItem = checkCartForProduct(cart);
    if (
      !orders.orderDetails &&
      !cartHasItem
      // && cart.userId === user.id &&
      // cart.purchased === false
    ) {
      const quantity = Number(quantityToAdd);
      await dispatch(addNewToCartAsync({ orderId, productId, quantity }));
      dispatch(fetchSingleProduct(productId));
    } else {
      const orderToUpdate = findOrder(orders);
      const quantity =
        orderToUpdate.orderDetails.quantity + Number(quantityToAdd);
      await dispatch(addExistingToCartAsync({ orderId, productId, quantity }));
      dispatch(fetchSingleProduct(productId));
    }
    setQuantityToAdd("1");
  };

  const handleDelete = async () => {
    await dispatch(deleteProduct(productId));
    navigate("/products");
  };

  return (
    <div>
      <h3>{name}</h3>
      <p> Description: {description}.</p>
      <p>
        {" "}
        Material: {material}. Color: {color}. Price: ${price / 100}.
      </p>
      {user.id && (
        <form onSubmit={handleSubmit}>
          <label htmlFor="quantityToAdd">Quantity</label>
          <input
            type="number"
            min={1}
            max={20}
            name="quantityToAdd"
            value={quantityToAdd}
            onChange={(e) => setQuantityToAdd(e.target.value)}
          />
          <button type="submit">ADD {name} TO CART.</button>
        </form>
      )}
      <div>
        {user.isAdmin && (
          <>
            <h4>Admin Mode!</h4>
            <Link to={`/products/${productId}/update`}>Update Product</Link>
            <button type="button" onClick={handleDelete}>
              Delete Product
            </button>
          </>
        )}
      </div>
    </div>
  );
};

export default SingleProduct;
