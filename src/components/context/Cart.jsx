import { createContext, useEffect, useState } from "react";
import { apiUrl, userToken } from "../common/http";
import { toast } from "react-toastify";

export const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cartData, setCartData] = useState(
    JSON.parse(localStorage.getItem("cart")) || []
  );
  const [shippingCost, setShippingCost] = useState(0);

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
    shippingCost;
    let shippingAmount = 0;
    cartData.map((item) => {
      shippingAmount += item.qty * shippingCost;
    });

    return shippingAmount;
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
    localStorage.setItem("cart", JSON.stringify(newCartData));
  };

  const getQty = () => {
    let qty = 0;
    cartData.map((item) => {
      qty += parseInt(item.qty);
    });
    return qty;
  };

  const clearCart = () => {
    setCartData([]);
    localStorage.removeItem("cart");
  };

  useEffect(() => {
    const fetchShipping = async () => {
      try {
        const res = await fetch(`${apiUrl}/get-shipping-front`, {
          method: "GET",
          headers: {
            "Content-type": "application/json",
            Accept: "application/json",
            Authorization: `Bearer ${userToken()}`,
          },
        });

        const result = await res.json();

        if (result.status === 200 && result.data) {
          setShippingCost(result.data.shipping_charge);
        } else {
          setShippingCost(0);
          console.log("Something went wrong.", result);
        }
      } catch (error) {
        console.error("Network error:", error);
        toast.error("Network error occurred");
      }
    };

    fetchShipping();
  }, []);

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
        clearCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};
