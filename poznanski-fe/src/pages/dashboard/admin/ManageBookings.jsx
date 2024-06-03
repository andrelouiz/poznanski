import React, { useState } from "react";
import useMenu from "../../../hooks/useMenu";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { Link } from "react-router-dom";
import { FaArrowCircleRight, FaArrowLeft, FaArrowRight, FaEdit, FaUsers } from "react-icons/fa";
import { GiConfirmed } from "react-icons/gi";
import Swal from "sweetalert2";
import useAuth from "../../../hooks/useAuth";
import { useQuery } from "@tanstack/react-query";

const ManageBookings = () => {
  const { user, loading } = useAuth();
  const token = localStorage.getItem("access_token");
  const { refetch, data: orders = [] } = useQuery({
    queryKey: ["orders", user?.email],
    enabled: !loading,
    queryFn: async () => {
      const res = await fetch(
        `https://poznanski.onrender.com/payments/all`,
        {
          headers: {
            authorization: `Bearer ${token}`,
          },
        }
      );
      return res.json();
    },
  });

  const axiosSecure = useAxiosSecure();

  // pagination
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = orders.slice(indexOfFirstItem, indexOfLastItem);

  // confirm order
  const confirmOrder = async (item) => {
    try {
      await axiosSecure.patch(`https://poznanski.onrender.com/payments/${item._id}`);
      Swal.fire({
        position: "center",
        icon: "success",
        title: `Order Confirmed Now!`,
        showConfirmButton: false,
        timer: 1500
      });
      refetch();
    } catch (error) {
      console.error("Error confirming order:", error);
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Something went wrong while confirming the order!",
      });
    }
  };

  return (
    <div className="w-full md:w-[870px] mx-auto px-4 ">
      <h2 className="text-2xl font-semibold my-4">
        Manage All <span className="text-red">Bookings!</span>
      </h2>

      {/* items table  */}
      <div>
        <div className="overflow-x-auto lg:overflow-x-visible">
          <table className="table w-full">
            {/* head */}
            <thead>
              <tr>
                <th>#</th>
                <th>User</th>
                <th>Transition Id</th>
                <th>Price</th>
                <th>Status</th>
                <th>Confirm Order</th>
              </tr>
            </thead>
            <tbody>
              {currentItems.map((item, index) => (
                <tr key={index}>
                  <td>{index + 1}</td>
                  <td>{item.email}</td>
                  <td>{item.transitionId}</td>
                  <td>${item.price}</td>
                  <td>{item.status}</td>
                  <td className="text-center">
                    {item.status === "confirmed" ? "done" : (
                      <button
                        className="btn bg-red text-white btn-xs text-center"
                        onClick={() => confirmOrder(item)}
                      >
                        <GiConfirmed />
                      </button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Pagination */}
      <div className="flex justify-center my-4">
        <button
          onClick={() => setCurrentPage(currentPage - 1)}
          disabled={currentPage === 1}
          className="btn btn-sm mr-2 btn-warning"
        >
          <FaArrowLeft/> Previous 
        </button>
        <button
          onClick={() => setCurrentPage(currentPage + 1)}
          disabled={indexOfLastItem >= orders.length}
          className="btn btn-sm bg-red text-white"
        >
          Next  <FaArrowRight/>
        </button>
      </div>
    </div>
  );
};

export default ManageBookings;
