import React, { createContext, useContext, useReducer, useEffect } from 'react';

// 初始化购物车状态
const initialState = {
  items: [],
  total: 0,
};

// 定义购物车 reducer
const cartReducer = (state, action) => {
  switch (action.type) {
    case 'ADD_TO_CART':
      const existingItemIndex = state.items.findIndex(item => item.id === action.payload.id);
      if (existingItemIndex >= 0) {
        const updatedItems = state.items.map((item, index) =>
          index === existingItemIndex
            ? { ...item, quantity: item.quantity + action.payload.quantity }
            : item
        );
        return { ...state, items: updatedItems };
      } else {
        return { ...state, items: [...state.items, action.payload] };
      }
    case 'REMOVE_FROM_CART':
      const updatedCartItems = state.items.filter(item => item.id !== action.payload.id);
      return { ...state, items: updatedCartItems };
    case 'UPDATE_CART_ITEM':
      const updatedItemsList = state.items
        .map(item =>
          item.id === action.payload.id
            ? { ...item, quantity: action.payload.quantity }
            : item
        )
        .filter(item => item.quantity > 0);
      return { ...state, items: updatedItemsList };
    case 'UPDATE_CART_TOTAL':
      const newTotal = state.items.reduce((acc, item) => acc + item.price * item.quantity, 0);
      return {
        ...state,
        total: newTotal,
      };
    default:
      return state;
  }
};

// 创建购物车上下文
const CartContext = createContext();

// 定义购物车上下文提供者组件
export const CartProvider = ({ children }) => {
  const [state, dispatch] = useReducer(cartReducer, initialState);

  useEffect(() => {
    calculateCartTotal();
  }, [state.items]);

  const addToCart = (item, quantity) => {
    dispatch({ type: 'ADD_TO_CART', payload: { ...item, quantity } });
  };

  const removeFromCart = (item) => {
    dispatch({ type: 'REMOVE_FROM_CART', payload: item });
  };

  const updateCartItem = (item, quantity) => {
    dispatch({ type: 'UPDATE_CART_ITEM', payload: { ...item, quantity } });
  };

  const calculateCartTotal = () => {
    dispatch({ type: 'UPDATE_CART_TOTAL' });
  };

  return (
    <CartContext.Provider
      value={{
        cart: state.items,
        total: state.total,
        addToCart,
        removeFromCart,
        updateCartItem,
        calculateCartTotal,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

// 自定义 hook，用于使用购物车上下文
export const useCart = () => {
  return useContext(CartContext);
};
