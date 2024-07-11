const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const session = require('express-session');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const User = require('./src/backend/user');
const Order = require('./src/backend/models/order'); // 确保路径正确
require('dotenv').config();

const app = express();
const port = process.env.PORT || 5000;
const JWT_SECRET = process.env.JWT_SECRET || 'your_generated_secret_key';

app.use(cors());
app.use(express.json());
app.use(session({
  secret: JWT_SECRET,
  resave: false,
  saveUninitialized: false
}));

// 连接到MongoDB
const dbUri = 'mongodb://localhost:27017/foodAppDB';
mongoose.connect(dbUri)
  .then(() => {
    console.log('Connected to MongoDB');
    // 启动服务器
    app.listen(port, () => {
      console.log(`Server running on port ${port}`);
    });
  })
  .catch(err => {
    console.error('Failed to connect to MongoDB', err);
  });

// 注册路由
app.post('/register', async (req, res) => {
  const { username, email, password } = req.body;
  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new User({
      username,
      email,
      password: hashedPassword,
      role: 'customer'
    });
    const savedUser = await newUser.save();
    res.status(201).json(savedUser);
  } catch (error) {
    console.error('Registration error:', error);
    res.status(500).json({ message: 'Registration failed', error: error.message });
  }
});

// 登录路由
app.post('/login', async (req, res) => {
  const { emailOrUsername, password } = req.body;
  try {
    const user = await User.findOne({ $or: [{ email: emailOrUsername }, { username: emailOrUsername }] });
    if (!user) throw new Error('User does not exist');

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) throw new Error('Invalid password');

    const token = jwt.sign({ id: user._id, role: user.role }, JWT_SECRET);
    res.json({ token, user });
  } catch (error) {
    console.error('Login error:', error);
    res.status(400).json({ message: error.message });
  }
});

// 获取所有用户的路由
app.get('/users', async (req, res) => {
  try {
    const users = await User.find();
    console.log('Users fetched successfully:', users);
    res.json(users);
  } catch (error) {
    console.error('Error fetching users:', error);
    res.status(500).json({ message: 'Error fetching users', error: error.message });
  }
});

// 设置用户角色的路由
app.post('/set-role', async (req, res) => {
  console.log('Received set-role request:', req.body);

  try {
    const user = await User.findById(req.body.userId);
    if (!user) {
      console.log('No user found with ID:', req.body.userId);
      return res.status(404).json({ message: 'User not found' });
    }

    user.role = req.body.role;
    await user.save();
    console.log('Role updated successfully for user:', user);
    res.json({ message: 'Role updated successfully' });
  } catch (error) {
    console.error('Error updating user role:', error);
    res.status(500).json({ message: 'Error updating user role', error: error.message });
  }
});

// 保存订单的路由
app.post('/api/orders', async (req, res) => {
  const { name, address, phone, cart, total } = req.body;
  try {
    const newOrder = new Order({
      name,
      address,
      phone,
      cart,
      total,
      status: 'pending' // 初始化为 pending 状态
    });
    const savedOrder = await newOrder.save();
    res.status(201).json(savedOrder);
  } catch (error) {
    console.error('Error saving order:', error);
    res.status(500).json({ message: 'Error saving order', error: error.message });
  }
});

// 获取所有订单的路由
app.get('/api/orders', async (req, res) => {
  console.log('Received request to fetch orders');
  try {
    const orders = await Order.find();
    console.log('Fetched orders:', orders); // 确保在这里也有日志输出
    res.json(orders); // 确保返回的是JSON
  } catch (error) {
    console.error('Error fetching orders:', error);
    res.status(500).json({ message: 'Error fetching orders', error: error.message }); // 确保错误信息也返回JSON格式
  }
});

// 更新订单状态的路由
app.put('/api/orders/:id', async (req, res) => {
  try {
    const { status } = req.body;
    const order = await Order.findByIdAndUpdate(req.params.id, { status }, { new: true });
    if (!order) {
      return res.status(404).json({ message: 'Order not found' });
    }
    res.json(order);
  } catch (error) {
    console.error('Error updating order status:', error);
    res.status(500).json({ message: 'Error updating order status', error: error.message });
  }
});
