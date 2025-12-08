import { createContext, useState } from "react";

export const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cartData, setCartData] = useState(
    JSON.parse(localStorage.getItem("cart")) || []
  );

  const addToCart = (product, size = null) => {
    
    let updatedCart = [...cartData];

    // If cart is empty
    if (cartData.length == 0) {
      updatedCart.push({
        id: `${product.id}-${Math.floor(Math.random() * 10000000)}`,
        product_id: product.id,
        size: size,
        title: product.title,
        price: product.price,
        qty: 1,
        image_url: product.image_url,
      });
    } else {
      // If size is not empty
      if (size != null) {
        const isProductExist = updatedCart.find(
          (item) => item.product_id == product.id && item.size == size
        );

        // If product & size combination exist then increase qty
        if (isProductExist) {
          updatedCart = updatedCart.map((item) =>
            item.product_id == product.id && item.size == size
              ? { ...item, qty: item.qty + 1 }
              : item
          );
        } else {
          // I product & size combination not exit then add new item
          updatedCart.push({
            id: `${product.id}-${Math.floor(Math.random() * 10000000)}`,
            product_id: product.id,
            size: size,
            title: product.title,
            price: product.price,
            qty: 1,
            image_url: product.image_url,
          });
        }
      } else {
        // When size is null
        const isProductExist = updatedCart.find(
          (item) => item.product_id == product.id
        );
        if (isProductExist) {
          updatedCart = updatedCart.map((item) =>
            item.product_id == product.id
              ? { ...item, qty: item.qty + 1 }
              : item
          );
        } else {
          // If product not exit then add new item
          updatedCart.push({
            id: `${product.id}-${Math.floor(Math.random() * 10000000)}`,
            product_id: product.id,
            size: size,
            title: product.title,
            price: product.price,
            qty: 1,
            image_url: product.image_url,
          });
        }
      }
    }

    setCartData(updatedCart);
    localStorage.setItem(`cart`, JSON.stringify(updatedCart));
  };

  const shipping = () => {
    return 0;
  };

  const subTotal = () => {
    let subtotal = 0;
    cartData.map((item) => {
      subtotal += item.qty * item.price;
    });

    return subtotal;
  };

  const grandTotal = () => {
    return subTotal() + shipping();
  };

  const updateCartItem = (itemId, newQty) => {
    let updateCart = [...cartData];
    updateCart = updateCart.map((item) =>
      item.id == itemId ? { ...item, qty: newQty } : item
    );
    setCartData(updateCart);
    localStorage.setItem(`cart`, JSON.stringify(updateCart));
  };

  const deleteCartItem = (itemId) => {
    const newCartData = cartData.filter((item) => item.id != itemId);
    setCartData(newCartData);
    localStorage.setItem('cart', JSON.stringify(newCartData));
  };

  const getQty = () => {
    let qty = 0;
    cartData.map(item => {
        qty += parseInt(item.qty)
    })
    return qty;
  }

  const clearCart = () => {
  setCartData([]);
  localStorage.removeItem("cart");
};

  return (
    <CartContext.Provider
      value={{
        addToCart,
        cartData,
        shipping,
        subTotal,
        grandTotal,
        updateCartItem,
        deleteCartItem,
        getQty,
        clearCart
      }}
    >
      {children}
    </CartContext.Provider>
  );
};
