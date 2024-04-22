import React, { useState, useEffect } from "react";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { Link } from "react-router-dom";
import { FaArrowCircleRight, FaArrowLeft, FaArrowRight, FaEdit, FaTrashAlt } from "react-icons/fa";
import Swal from "sweetalert2";

const ManageItems = () => {
  const [menu, setMenu] = useState([]); // State to store menu items
  const axiosSecure = useAxiosSecure();

  // Fetch menu items from the server
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("https://poznanski-server.onrender.com/menu");
        const data = await response.json();
        setMenu(data); // Set the fetched data into state
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  // Pagination logic
  const [currentPage, setCurrentPage] = useState(1);
  const items_Per_Page = 10;
  const indexOfLastItem = currentPage * items_Per_Page;
  const indexOfFirstItem = indexOfLastItem - items_Per_Page;
  const currentItems = menu.slice(indexOfFirstItem, indexOfLastItem);

  // Function to handle item deletion
  const handleDeleteItem = async (item) => {
    const result = await Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!"
    });

    if (result.isConfirmed) {
      await axiosSecure.delete(`https://poznanski-server.onrender.com/menu/${item._id}`);
      const newMenu = menu.filter(m => m._id !== item._id);
      setMenu(newMenu);
      Swal.fire({
        position: "top-end",
        icon: "success",
        title: `${item.name} has been deleted`,
        showConfirmButton: false,
        timer: 1500
      });
    }
  };

  return (
    <div className="w-full md:w-[870px] mx-auto px-4">
      <h2 className="text-2xl font-semibold my-4">
        Manage All <span className="text-green">Menu Items!</span>
      </h2>

      <div className="overflow-x-auto">
        <table className="table w-full">
          <thead>
            <tr>
              <th>#</th>
              <th>Image</th>
              <th>Item Name</th>
              <th>Price</th>
              <th>Update</th>
              <th>Delete</th>
            </tr>
          </thead>
          <tbody>
            {currentItems.map((item, index) => (
              <tr key={index}>
                <td>{index + 1 + indexOfFirstItem}</td>
                <td>
                  <div className="avatar">
                    <div className="mask mask-squircle w-12 h-12">
                      <img src={item.image} alt={item.name} />
                    </div>
                  </div>
                </td>
                <td>{item.name}</td>
                <td>${item.price}</td>
                <td>
                  <Link to={`/dashboard/update-menu/${item._id}`}>
                    <button className="btn btn-ghost btn-xs bg-orange-500">
                      <FaEdit className="text-white"></FaEdit>
                    </button>
                  </Link>
                </td>
                <td>
                  <button onClick={() => handleDeleteItem(item)} className="btn btn-ghost btn-xs">
                    <FaTrashAlt className="text-red"></FaTrashAlt>
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="flex justify-center my-4">
        <button
          onClick={() => setCurrentPage(currentPage - 1)}
          disabled={currentPage === 1}
          className="btn btn-sm mr-2 btn-warning"
        >
          <FaArrowLeft /> Previous
        </button>
        <button
          onClick={() => setCurrentPage(currentPage + 1)}
          disabled={indexOfLastItem >= menu.length}
          className="btn btn-sm bg-green text-white"
        >
          Next <FaArrowRight />
        </button>
      </div>
    </div>
  );
};

export default ManageItems;
