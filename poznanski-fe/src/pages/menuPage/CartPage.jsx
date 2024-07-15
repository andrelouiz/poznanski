import React, { useContext, useEffect, useState } from "react";
import { useNavigate, Link } from 'react-router-dom';
import useCart from "../../hooks/useCart";
import { AuthContext } from "../../contexts/AuthProvider";
import Swal from "sweetalert2";
import { FaTrash } from "react-icons/fa";
import axios from "axios";
import { useTheme } from "../../hooks/ThemeContext";

const CartPage = () => {
  const { isDarkMode } = useTheme();
  const { user, loading } = useContext(AuthContext);
  const [cart, refetch] = useCart();
  const [cartItems, setCartItems] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    if (!loading && !user) {
      navigate('/login');
    }
  }, [user, loading, navigate]);

  useEffect(() => {
    setCartItems(cart);
  }, [cart]);

  const validCart = Array.isArray(cartItems) ? cartItems : [];

  const calculateTotalPrice = (item) => {
    return item.price * item.quantity;
  };

  const handleIncrease = async (item) => {
    try {
      const response = await fetch(`https://poznanski.onrender.com/carts/${item._id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ quantity: item.quantity + 1 }),
      });

      if (response.ok) {
        const updatedCart = cartItems.map((cartItem) => {
          if (cartItem._id === item._id) {
            return {
              ...cartItem,
              quantity: cartItem.quantity + 1,
            };
          }
          return cartItem;
        });
        setCartItems(updatedCart);
        await refetch();
      } else {
        console.error("Failed to update quantity");
      }
    } catch (error) {
      console.error("Error updating quantity:", error);
    }
  };

  const handleDecrease = async (item) => {
    if (item.quantity > 1) {
      try {
        const response = await fetch(`https://poznanski.onrender.com/carts/${item._id}`, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ quantity: item.quantity - 1 }),
        });

        if (response.ok) {
          const updatedCart = cartItems.map((cartItem) => {
            if (cartItem._id === item._id) {
              return {
                ...cartItem,
                quantity: cartItem.quantity - 1,
              };
            }
            return cartItem;
          });
          setCartItems(updatedCart);
          await refetch();
        } else {
          console.error("Failed to update quantity");
        }
      } catch (error) {
        console.error("Error updating quantity:", error);
      }
    }
  };

  const cartSubtotal = validCart.reduce((total, item) => {
    return total + calculateTotalPrice(item);
  }, 0);

  const totalQuantity = validCart.reduce((total, item) => {
    return total + item.quantity;
  }, 0);

  const orderTotal = cartSubtotal;

  const handleDelete = (item) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        axios.delete(`https://poznanski.onrender.com/carts/${item._id}`).then(response => {
          if (response) {
            refetch();
            Swal.fire("Deleted!", "Your file has been deleted.", "success");
          }
        }).catch(error => {
          console.error(error);
        });
      }
    });
  };

  return (
    <div className="max-w-screen-2xl container mx-auto xl:px-24 px-4">
      <div className={`bg-gradient-to-r from-0% from-[#FAFAFA] to-[#FCFCFC] to-100% ${isDarkMode ? "dark" : ""}`}>
        <div className="py-28 flex flex-col items-center justify-center">
          <div className="text-center px-4 space-y-7">
            <h2 className="md:text-5xl text-4xl font-bold md:leading-snug leading-snug">
              Items Added to The <span className="text-red">Cart</span>
            </h2>
          </div>
        </div>
      </div>

      {validCart.length > 0 ? (
        <div>
          <div className="overflow-x-auto">
            <table className="table">
              <thead className="bg-red text-white rounded-sm">
                <tr>
                  <th>#</th>
                  <th>Devices</th>
                  <th>Item Name</th>
                  <th>Quantity</th>
                  <th>Price</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {validCart.map((item, index) => (
                  <tr key={index}>
                    <td>{index + 1}</td>
                    <td>
                      <div className="avatar">
                        <div className="mask mask-squircle w-12 h-12">
                          <img
                            src={item.image}
                            alt="Device"
                          />
                        </div>
                      </div>
                    </td>
                    <td className="font-medium">{item.name}</td>
                    <td className="flex">
                      <button
                        className="btn btn-xs"
                        onClick={() => handleDecrease(item)}
                      >
                        -
                      </button>
                      <input
                        type="number"
                        value={item.quantity}
                        readOnly
                        className={`w-10 mx-2 text-center overflow-hidden appearance-none ${isDarkMode ? "dark" : ""}`}
                      />
                      <button
                        className="btn btn-xs"
                        onClick={() => handleIncrease(item)}
                      >
                        +
                      </button>
                    </td>
                    <td>${calculateTotalPrice(item).toFixed(2)}</td>
                    <td>
                      <button
                        className="btn btn-sm border-none text-red bg-transparent"
                        onClick={() => handleDelete(item)}
                      >
                        <FaTrash />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <hr />
          <div className="flex flex-col md:flex-row justify-between items-start my-12 gap-8">
            <div className="md:w-1/2 space-y-3">
              <h3 className="text-lg font-semibold">Customer Details</h3>
              <p>Name: {user?.displayName || "None"}</p>
              <p>Email: {user?.email}</p>
              <p>
                User ID: <span className="text-sm">{user?.uid}</span>
              </p>
            </div>
            <div className="md:w-1/2 space-y-3">
              <h3 className="text-lg font-semibold">Shopping Details</h3>
              <p>Total Items: {totalQuantity}</p>
              <p>
                Total Price: <span id="total-price">${orderTotal.toFixed(2)}</span>
              </p>
              <Link to={{
                pathname: "/process-checkout",
                state: { cartItems, orderTotal }
              }} className="btn btn-md bg-red text-white px-8 py-1">
                Proceed to Checkout
              </Link>
            </div>
          </div>
        </div>
      ) : (
        <div className="text-center mt-20">
          <p>Cart is empty. Please add products.</p>
          <Link to="/menu">
            <button className="btn bg-red text-white mt-3">Back to Menu</button>
          </Link>
        </div>
      )}
    </div>
  );
};

export default CartPage;
