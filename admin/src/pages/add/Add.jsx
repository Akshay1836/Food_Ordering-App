import React, { useState } from "react";
import "./add.css";
import { assets } from "../../assets/assets";
import { useEffect } from "react";
import axios from "axios";
import toast from "react-hot-toast";

const Add = ({url}) => {
  
  const [image, setImage] = useState(false);
  const [data, setData] = useState({
    name: "",
    description: "",
    price: "",
    category: "salad",
  });

  const onChangeHandler = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setData((data) => ({ ...data, [name]: value }));
  };

  const onsubmitHandler = async (e) => {
    e.preventDefault();
    const newForm = new FormData();
    newForm.append("image", image);
    newForm.append("name", data.name);
    newForm.append("description", data.description);
    newForm.append("price", data.price);
    newForm.append("category", data.category);
    const response = await axios.post(`${url}/api/food/add`, newForm);
    if (response.data.success) {
      setData({
        name: "",
        description: "",
        price: "",
        category: "salad",
      });
      setImage(false);
      console.log("success");
      toast.success("item added");
    } else {
      toast.error(response.data.message);
    }
  };

  return (
    <div className="add">
      <form action="" onSubmit={onsubmitHandler} className="flex-col">
        <div className="add-image-upload flex-col">
          <p>Upload Image</p>
          <label htmlFor="image">
            <img
              src={image ? URL.createObjectURL(image) : assets.upload_area}
              alt=""
            />
          </label>
          <input
            onChange={(e) => setImage(e.target.files[0])}
            type="file"
            id="image"
            hidden
            required
          />
        </div>
        <div className="add-product-name flex-col">
          <p>product name</p>
          <input
            onChange={onChangeHandler}
            value={data.name}
            type="text"
            name="name"
            placeholder="type here"
          />
        </div>
        <div className="add-product-description flex-col">
          <p>product description</p>
          <textarea
            onChange={onChangeHandler}
            value={data.description}
            name="description"
            rows="6"
            placeholder="write content here"
            required
          />
        </div>
        <div className="category-price">
          <div className="add-category flex-col">
            <p>Product Category</p>
            <select name="category" onChange={onChangeHandler}>
              <option value="Salad">Salad</option>
              <option value="Rolls">Rolls</option>
              <option value="deserts">deserts</option>
              <option value="sandwich">sandwich</option>
              <option value="Cake">Cake</option>
              <option value="Pure veg">Pure veg</option>
              <option value="Pasta">Pasta</option>
              <option value="Noodles">Noodles</option>
            </select>
          </div>
          <div className="add-price flex-col">
            <p>Product Price</p>
            <input
              onChange={onChangeHandler}
              value={data.price}
              type="number"
              name="price"
              placeholder="$20"
            />
          </div>
        </div>
        <button type="submit" className="add-button">
          {" "}
          ADD
        </button>
      </form>
    </div>
  );
};

export default Add;
