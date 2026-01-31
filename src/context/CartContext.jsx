// import { createContext, useContext, useState } from "react";

// export const CartProvider = ({ children }) => {
//   const [cart, setCart] = useState([]);

//   const addItem = (product) => {
//     setCart(prev => {
//       const found = prev.find(p => p.id === product.id);
//       if (found) {
//         return prev.map(p =>
//           p.id === product.id ? { ...p, qty: p.qty + 1 } : p
//         );
//       }
//       return [...prev, { ...product, qty: 1 }];
//     });
//   };

//   const removeItem = (id) => {
//     setCart(prev =>
//       prev
//         .map(p => p.id === id ? { ...p, qty: p.qty - 1 } : p)
//         .filter(p => p.qty > 0)
//     );
//   };

//   return (
//     <CartContext.Provider value={{ cart, addItem, removeItem }}>
//       {children}
//     </CartContext.Provider>
//   );
// };

// export const useCart = () => useContext(CartContext);


import { createContext, useContext, useState, useEffect } from "react";

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState(() => {
    const saved = localStorage.getItem("cart");
    return saved ? JSON.parse(saved) : [];
  });

  /* ================= ADD ITEM ================= */
  const addItem = (product) => {
    setCart(prev => {
      const found = prev.find(p => p.id === product.id);
      if (found) {
        return prev.map(p =>
          p.id === product.id ? { ...p, qty: p.qty + 1 } : p
        );
      }
      return [...prev, { ...product, qty: 1 }];
    });
  };

  /* ================= REMOVE ONE QTY ================= */
  const removeItem = (id) => {
    setCart(prev =>
      prev
        .map(p => p.id === id ? { ...p, qty: p.qty - 1 } : p)
        .filter(p => p.qty > 0)
    );
  };

  /* ================= REMOVE PRODUCT ================= */
  const deleteItem = (id) => {
    setCart(prev => prev.filter(p => p.id !== id));
  };

  /* ================= CLEAR CART ================= */
  const clearCart = () => {
    setCart([]);
  };

  /* ================= TOTAL CALC ================= */
  const subtotal = cart.reduce(
    (sum, item) => sum + item.price * item.qty,
    0
  );

  /* ================= SAVE CART ================= */
  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart]);

  return (
    <CartContext.Provider
      value={{
        cart,
        addItem,
        removeItem,
        deleteItem,
        clearCart,
        subtotal
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => useContext(CartContext);
