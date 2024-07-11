const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
  name: { type: String, required: true },
  address: { type: String, required: true },
  phone: { type: String, required: true },
  cart: { type: Array, required: true },
  total: { type: Number, required: true },
  status: { type: String, default: 'pending' } // 添加默认状态为 pending
});

const Order = mongoose.model('Order', orderSchema);

module.exports = Order;
