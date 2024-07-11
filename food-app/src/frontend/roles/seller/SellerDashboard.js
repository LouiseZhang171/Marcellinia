import React, { useEffect, useState } from 'react';
import './SellerDashboard.css'; // 确保有适当的样式

const SellerDashboard = () => {
  const [orders, setOrders] = useState([]);
  const [showPending, setShowPending] = useState(true);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await fetch('http://localhost:5000/api/orders');
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        console.log('Fetched orders:', data); // 添加这行以查看返回的数据
        setOrders(data);
      } catch (error) {
        console.error('Error fetching orders:', error);
      }
    };

    fetchOrders();
  }, []);

  const updateOrderStatus = async (orderId, newStatus) => {
    try {
      const response = await fetch(`http://localhost:5000/api/orders/${orderId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ status: newStatus }),
      });

      if (response.ok) {
        setOrders(prevOrders => 
          prevOrders.map(order => 
            order._id === orderId ? { ...order, status: newStatus } : order
          )
        );
      } else {
        console.error('Failed to update order status');
      }
    } catch (error) {
      console.error('Error updating order status:', error);
    }
  };

  // 打印调试信息
  console.log('Rendering orders:', orders);

  return (
    <div className="seller-dashboard">
      <div className="sidebar">
        <h2>Orders</h2>
        <button onClick={() => setShowPending(true)}>Pending Orders</button>
        <button onClick={() => setShowPending(false)}>Completed Orders</button>
      </div>
      <div className="main-content">
        <h1>Seller Dashboard</h1>
        <div className="orders-section">
          <h2>{showPending ? 'Pending Orders' : 'Completed Orders'}</h2>
          {orders.length === 0 ? (
            <p>No orders available.</p>
          ) : (
            <table className="orders-table">
              <thead>
                <tr>
                  <th>Order ID</th>
                  <th>Name</th>
                  <th>Address</th>
                  <th>Phone</th>
                  <th>Total</th>
                  <th>Cart</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                {orders
                  .filter(order => showPending ? order.status === 'pending' : order.status === 'completed')
                  .map(order => (
                    <tr key={order._id}>
                      <td>{order._id}</td>
                      <td>{order.name}</td>
                      <td>{order.address}</td>
                      <td>{order.phone}</td>
                      <td>${order.total}</td>
                      <td>
                        {order.cart.map(item => (
                          <span key={item.id}>{item.name} (x{item.quantity}) </span>
                        ))}
                      </td>
                      <td>
                        <button onClick={() => updateOrderStatus(order._id, showPending ? 'completed' : 'pending')}>
                          Mark as {showPending ? 'Completed' : 'Pending'}
                        </button>
                      </td>
                    </tr>
                  ))
                }
              </tbody>
            </table>
          )}
        </div>
      </div>
    </div>
  );
};

export default SellerDashboard;

