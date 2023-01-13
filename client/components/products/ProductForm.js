import React, { useState } from "react";

const ProductForm = () => {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState(0);
  const [material, setMaterial] = useState("");
  const [color, setColor] = useState("");

  const handleSubmit = () => {};

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
          step={0.01}
          name="price"
          value={price}
          onChange={(e) => setPrice(e.target.value * 100)}
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
      </form>
    </>
  );
};

export default ProductForm;
