import { useForm } from "react-hook-form";
import useAxiosPublic from "../../../hooks/useAxiosPublic";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import Swal from "sweetalert2";

const AddMenu = () => {
  const { register, handleSubmit, reset } = useForm();
  const axiosPublic = useAxiosPublic();
  const axiosSecure = useAxiosSecure();

  // image hosting keys
  const image_hosting_key = import.meta.env.VITE_IMAGE_HOSTING_KEY;
  const image_hosting_api = `https://api.imgbb.com/1/upload?key=${image_hosting_key}`;

  // on submit form
  const onSubmit = async (data) => {
    // console.log(data);
    // image upload to imgbb and then get an url
    const imageFile = { image: data.image[0] };
    const hostingImg = await axiosPublic.post(image_hosting_api, imageFile, {
      headers: {
        "content-type": "multipart/form-data",
      },
    });

    // console.log(hostingImg.data);

    if (hostingImg.data.success) {
      // now send the menu item data to the server with the image url
      const menuItem = {
          name: data.name,
          category: data.category,
          price: parseFloat(data.price),
          deviceDescription: data.deviceDescription,
          image: hostingImg.data.data.display_url
      }
      // 
      const menuRes = await axiosSecure.post('https://poznanski.onrender.com/menu', menuItem);
      console.log(menuRes)
      if(menuRes.status === 200){
          // show success popup
          reset();
          Swal.fire({
              position: "center",
              icon: "success",
              title: `${data.name} is added to the menu.`,
              showConfirmButton: false,
              timer: 1500
            });
      }
  }
  };

  return (
    <div className="w-full md:w-[870px] mx-auto px-4">
      <h2 className="text-2xl font-semibold my-4">
        Upload A New <span className="text-green">Menu Item</span>
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
              required
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
                defaultValue="default"
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
                <option value="used">Used Parts</option>
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
              <span className="label-text">Device Details</span>
            </label>
            <textarea
              {...register("deviceDescription")}
              className="textarea textarea-bordered h-24"
              placeholder="Description"
            ></textarea>
          </div>

          <div className="form-control w-full my-6">
            <input
              {...register("image", { required: true })}
              type="file"
              className="file-input w-full max-w-xs"
            />
          </div>

          <button className="btn bg-red text-white px-6">
            Add Item 
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddMenu;