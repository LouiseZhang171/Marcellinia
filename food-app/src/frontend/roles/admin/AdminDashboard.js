import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './AdminDashboard.css';

const AdminDashboard = () => {
  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  const [role, setRole] = useState('customer');

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get('http://localhost:5000/users');
        console.log('Fetched users:', response.data); // 日志记录获取的用户数据
        setUsers(response.data);
      } catch (error) {
        console.error('Error fetching users:', error); // 日志记录错误信息
      }
    };

    fetchUsers();
  }, []);

  const handleRoleChange = async () => {
    if (!selectedUser) {
      console.log('No user selected');
      return;
    }
    
    console.log('Sending role change for userId:', selectedUser._id, 'New role:', role);
  
    try {
      const response = await axios.post('http://localhost:5000/set-role', {
        userId: selectedUser._id,
        role: role
      });
      console.log('Set role response:', response.data);
      alert('Role updated successfully');
      setUsers(users.map(user => user._id === selectedUser._id ? { ...user, role } : user));
      setSelectedUser(null);
    } catch (error) {
      console.error('Failed to update role:', error);
      alert('Failed to update role: ' + (error.response?.data?.message || error.message));
    }
  };
  
  const confirmRoleChange = (user) => {
    setSelectedUser(user);
    setRole(user.role);
  };

  return (
    <div className="admin-dashboard-container">
      <h2>Admin Dashboard</h2>
      <table className="user-table">
        <thead>
          <tr>
            <th>Username</th>
            <th>Email</th>
            <th>Role</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.map(user => (
            <tr key={user._id}>
              <td>{user.username}</td>
              <td>{user.email}</td>
              <td>{user.role}</td>
              <td>
                <button onClick={() => confirmRoleChange(user)}>Change Role</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {selectedUser && (
        <div className="role-change-confirmation">
          <p>Are you sure you want to change the role of {selectedUser.username} to {role}?</p>
          <select value={role} onChange={(e) => setRole(e.target.value)}>
            <option value="customer">Customer</option>
            <option value="seller">Seller</option>
          </select>
          <button onClick={handleRoleChange}>Confirm</button>
          <button onClick={() => setSelectedUser(null)}>Cancel</button>
        </div>
      )}
    </div>
  );
};

export default AdminDashboard;


