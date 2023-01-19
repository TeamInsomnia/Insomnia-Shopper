import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useParams, useNavigate } from "react-router-dom";
import { addProduct, updateProduct } from "../../features";

const ProductForm = (props) => {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [material, setMaterial] = useState("");
  const [color, setColor] = useState("");
  const [imageUrl, setImageUrl] = useState("");

  const { type } = props;
  const { productId } = useParams();
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
      imageUrl,
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
    setImageUrl("");

    navigate("/products");
  };

  return (
    <>
      <h3>PRODUCT FORM</h3>
      <form onSubmit={handleSubmit}>
        <label htmlFor="name" className="form-label">
          Name:{" "}
        </label>
        <input
          name="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required={type === "add" ? true : false}
          className="form-control"
        />
        <label htmlFor="description" className="form-label">
          Description:{" "}
        </label>
        <input
          name="description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="form-control"
        />
        <label htmlFor="price" className="form-label">
          Price:{" "}
        </label>
        <input
          type="number"
          min={0}
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
          className="form-control"
        />
        <label htmlFor="material" className="form-label">
          Material:{" "}
        </label>
        <input
          name="material"
          value={material}
          onChange={(e) => setMaterial(e.target.value)}
          className="form-control"
        />
        <label htmlFor="color" className="form-label">
          Color:{" "}
        </label>
        <input
          name="color"
          value={color}
          onChange={(e) => setColor(e.target.value)}
          className="form-control"
        />
        <label htmlFor="imageUrl" className="form-label">
          Image URL:
        </label>
        <input
          name="imageUrl"
          value={imageUrl}
          onChange={(e) => setImageUrl(e.target.value)}
          className="form-control"
        />
        <button type="submit" className="btn btn-primary m-3">
          Submit
        </button>
      </form>
    </>
  );
};

export default ProductForm;
