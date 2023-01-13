import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useParams, useNavigate } from "react-router-dom";
import { addProduct, updateProduct } from "../../features";

const ProductForm = (props) => {
  const { type } = props;
  const { productId } = useParams();

  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState(0);
  const [material, setMaterial] = useState("");
  const [color, setColor] = useState("");

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSubmit = (event) => {
    event.preventDefault();
    const formData = {
      name,
      description,
      // todo: price does not work,
      // it currently is sending nothing to backend ONLY on update
      price: price * 100,
      material,
      color,
    };
    if (type === "add") {
      dispatch(addProduct(formData));
    } else if (type === "update") {
      for (let prop in formData) {
        if (!formData[prop].length || formData[prop] === 0)
          delete formData[prop];
      }
      console.log(formData);
      dispatch(updateProduct({ id: productId, formData }));
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
          onChange={(e) => setPrice(e.target.value)}
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
