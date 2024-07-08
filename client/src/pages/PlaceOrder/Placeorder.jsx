import React, { useContext } from "react";
import "./Placeorder.css";
import { storeContext } from "../../Context/storeContext";
const Placeorder = () => {
  const {getTotalAmount}=useContext(storeContext)
  return (
    <form action="" className="place-order">
      <div className="placeorder-left">
        <p className="title">Delivery information</p>
        <div className="multi-fields">
          <input type="text" placeholder="First Name" />
          <input type="text" placeholder="last name" />
        </div>
        <input type="email" placeholder="Email" />
        <input type="text" placeholder="Street" />
        <div className="multi-fields">
          <input type="text" placeholder="City" />
          <input type="text" placeholder="State" />
        </div>
        <div className="multi-fields">
          <input type="text" placeholder="Zip-Code" />
          <input type="text" placeholder="Country" />
        </div>
        <input type="text" placeholder="phone"/>
      </div>
      <div className="placeorder-right">
      <div className="cart-total">
          <h2 className="font-bold">Cart Totals</h2>
          <div>
            <div className="cart-total-details">
              <p>Subtotal</p>
              <p>${getTotalAmount()}</p>
            </div>
            <hr/>
            <div className="cart-total-details">
              <p>Delivery Fee</p>
              <p>{getTotalAmount()===0?0:2}</p>
            </div>
            <hr/>
            <div className="cart-total-details">
              <b>Total</b>
              <b>${getTotalAmount()===0?0:getTotalAmount()+2}</ b>
            </div>
          </div>
          <button onClick={()=>navigate('/order')}>PROCEED TO PAYMENT</button>
        </div>
      </div>
    </form>
  );
};

export default Placeorder;
