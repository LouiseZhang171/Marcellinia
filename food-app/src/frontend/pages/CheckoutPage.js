import React from 'react';

const CheckoutPage = () => {
  return (
    <div>
      <h1>Checkout</h1>
      <form>
        <div>
          <label>Name:</label>
          <input type="text" name="name" />
        </div>
        <div>
          <label>Address:</label>
          <input type="text" name="address" />
        </div>
        <div>
          <label>Payment:</label>
          <input type="text" name="payment" />
        </div>
        <button type="submit">Place Order</button>
      </form>
    </div>
  );
};

export default CheckoutPage;
