import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useLoaderData, useNavigate } from "react-router-dom";
import useAxiosPublic from "../../../hooks/useAxiosPublic";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import Swal from "sweetalert2";

const UpdateMenu = () => {
  const item = useLoaderData();
  console.log(item);

  const { register, handleSubmit, reset, setValue } = useForm();
  const axiosPublic = useAxiosPublic();
  const axiosSecure = useAxiosSecure();
  const navigate = useNavigate();

  // Set default values for the form
  useEffect(() => {
    setValue("name", item.name);
    setValue("category", item.category);
    setValue("price", item.price);
    setValue("deviceDescription", item.deviceDescription);
  }, [item, setValue]);

  // image hosting keys
  const image_hosting_key = import.meta.env.VITE_IMAGE_HOSTING_KEY;
  const image_hosting_api = `https://api.imgbb.com/1/upload?key=${image_hosting_key}`;

  // on submit form
  const onSubmit = async (data) => {
    try {
      let imageUrl = item.image; // Default to existing image URL

      if (data.image && data.image.length > 0) {
        // If a new image is uploaded
        const formData = new FormData();
        formData.append("image", data.image[0]);

        const hostingImg = await axiosPublic.post(image_hosting_api, formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        });

        if (hostingImg.data.success) {
          imageUrl = hostingImg.data.data.display_url;
        } else {
          throw new Error("Image upload failed");
        }
      }

      const menuItem = {
        name: data.name || item.name,
        category: data.category || item.category,
        price: parseFloat(data.price) || item.price,
        deviceDescription: data.deviceDescription || item.deviceDescription,
        image: imageUrl,
      };

      const menuRes = await axiosSecure.patch(`https://poznanski.onrender.com/menu/${item._id}`, menuItem);
      if (menuRes.status === 200) {
        reset();
        Swal.fire({
          position: "center",
          icon: "success",
          title: "Item updated successfully!",
          showConfirmButton: false,
          timer: 1500,
        });
        navigate("/dashboard/manage-items");
      }
    } catch (error) {
      console.error("Error submitting the form: ", error.response ? error.response.data : error.message);
      Swal.fire({
        position: "center",
        icon: "error",
        title: "Failed to update item",
        text: error.response ? error.response.data.message : error.message,
        showConfirmButton: true,
      });
    }
  };

  return (
    <div className="w-full md:w-[870px] mx-auto px-4">
      <h2 className="text-2xl font-semibold my-4">
        Update <span className="text-red">Menu Item</span>
      </h2>
      <div>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="form-control w-full my-6">
            <label className="label">
              <span className="label-text">Device Name*</span>
            </label>
            <input
              type="text"
              placeholder="Device Name"
              {...register("name", { required: true })}
              className="input input-bordered w-full"
            />
          </div>
          <div className="flex gap-6">
            {/* category */}
            <div className="form-control w-full my-6">
              <label className="label">
                <span className="label-text">Category*</span>
              </label>
              <select
                {...register("category", { required: true })}
                className="select select-bordered w-full"
              >
                <option disabled value="default">
                  Select a category
                </option>
                <option value="router">Routers</option>
                <option value="switch">Switches</option>
                <option value="firewall">Firewalls</option>
                <option value="popular">Popular</option>
                <option value="used">Used Part</option>
              </select>
            </div>

            {/* price */}
            <div className="form-control w-full my-6">
              <label className="label">
                <span className="label-text">Price*</span>
              </label>
              <input
                type="number"
                placeholder="Price"
                {...register("price", { required: true })}
                className="input input-bordered w-full"
              />
            </div>
          </div>
          {/* device details */}
          <div className="form-control">
            <label className="label">
              <span className="label-text">Details</span>
            </label>
            <textarea
              {...register("deviceDescription")}
              className="textarea textarea-bordered h-24"
              placeholder="Device details"
            ></textarea>
          </div>

          {/* Display existing image */}
          <div className="form-control w-full my-6">
            <label className="label">
              <span className="label-text">Current Image</span>
            </label>
            <img src={item.image} alt="Current device" className="w-48 h-48" />
          </div>

          {/* Image upload */}
          <div className="form-control w-full my-6">
            <input
              {...register("image")}
              type="file"
              className="file-input w-full max-w-xs"
            />
          </div>

          <button className="btn bg-red text-white px-6">
            Update Item
          </button>
        </form>
      </div>
    </div>
  );
};

export default UpdateMenu;
