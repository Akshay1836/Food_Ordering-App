import React, { useEffect, useState } from "react";
import "./list.css";
import axios from "axios";
import toast from "react-hot-toast";

const List = ({url}) => {
  
  const [list, setList] = useState([]);
  const fetchItems = async () => {
    const response = await axios.get(`${url}/api/food/list`);
    if (response) {
      setList(response.data.message);
      console.log(response);
      console.log(list);
      console.log("success");
    } else {
      toast.error(response.data.message);
    }
  };

  const removeFood = async (foodId) => {
    const response = await axios.post(`${url}/api/food/remove`, { id: foodId });
    await fetchItems();
    if (response.data.success) {
      console.log("success");
      toast.success("item removed");
    } else {
      toast.error(response.data.message);
    }
  };
  useEffect(() => {
    fetchItems();
  }, []);

  return (
    <div>
      <div className="list add flex-col">
        <p>All Food List</p>
        <div className="list-table">
          <div className="list-table-format title">
            <b>Image</b>
            <b>Name</b>
            <b>Category</b>
            <b>Price</b>
            <b>Action</b>
          </div>
          {list.map((item, index) => {
            return (
              <div key={index} className="list-table-format">
                <img src={`${url}/images/` + item.image} alt="" />
                <p>{item.name}</p>
                <p>{item.category}</p>
                <p>${item.price}</p>
                <p className="cursor" onClick={() => removeFood(item._id)}>
                  X
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default List;
