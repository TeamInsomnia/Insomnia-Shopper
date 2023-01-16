import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useParams, useNavigate } from "react-router-dom";
import { addProduct, updateProduct } from "../../features";

const ProductForm = (props) => {
  const { type } = props;
  const { productId } = useParams();

  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [material, setMaterial] = useState("");
  const [color, setColor] = useState("");

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();
    const formData = {
      name,
      description,
      price: parseFloat(price) * 100,
      material,
      color,
    };

    if (type === "add") {
      await dispatch(addProduct(formData));
    } else if (type === "update") {
      for (let prop in formData) {
        if (!formData[prop]) delete formData[prop];
      }
      await dispatch(updateProduct({ id: productId, formData }));
    }
    setName("");
    setDescription("");
    setPrice(0);
    setMaterial("");
    setColor("");

    navigate("/products");
  };

  return (
    <>
      <h3>PRODUCT FORM</h3>
      <form onSubmit={handleSubmit}>
        <label htmlFor="name">Name: </label>
        <input
          name="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required={type === "add" ? true : false}
        />
        <label htmlFor="description">Description: </label>
        <input
          name="description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
        <label htmlFor="price">Price: </label>
        <input
          type="number"
          min={0}
          // todo: decimals with more than 2 places is an issue
          step={0.01}
          name="price"
          value={price}
          onChange={(e) => {
            const decimalIndex = e.target.value.indexOf(".");
            if (
              decimalIndex != -1 &&
              e.target.value.length - decimalIndex >= 3
            ) {
              e.target.value = e.target.value.slice(0, decimalIndex + 3);
            }
            return setPrice(e.target.value);
          }}
          required={type === "add" ? true : false}
        />
        <label htmlFor="material">Material: </label>
        <input
          name="material"
          value={material}
          onChange={(e) => setMaterial(e.target.value)}
        />
        <label htmlFor="color">Color: </label>
        <input
          name="color"
          value={color}
          onChange={(e) => setColor(e.target.value)}
        />
        <button type="submit">Submit</button>
      </form>
    </>
  );
};

export default ProductForm;
