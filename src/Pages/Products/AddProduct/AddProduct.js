import React from "react";
import { Link } from "react-router-dom";
import useProductCatagories from "../../../Hooks/useProductCatagories";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";

const AddProduct = () => {
  const [categories] = useProductCatagories();

  const {
    register,
    formState: { errors },
    handleSubmit,
    reset,
  } = useForm();

  // imgbb API key for file uploading //
  const imgStorageKey = "ec615fc495698531172416f9505b41b3";

  const onSubmit = (data) => {
    const image = data.image[0];
    const formData = new FormData();
    formData.append("image", image);
    const url = `https://api.imgbb.com/1/upload?key=${imgStorageKey}`;

    fetch(url, {
      method: "POST",
      body: formData,
    })
      .then((res) => res.json())
      .then((result) => {
        if (result.success) {
          const image = result.data.url;
          const customColor = categories.find(
            (category) => category.name === data.category
          ).customColor;

          // define the product //
          const product = {
            name: data.name,
            category: data.category,
            price: data.price,
            seller: data.seller,
            description: data.description,
            shipping: data.shipping,
            stock: data.stock,
            ratings: [],
            customColor: customColor,
            img: image,
          };

          // put product info in server //
          fetch("http://localhost:5000/product", {
            method: "PUT",
            headers: {
              "content-type": "application/json",
            },
            body: JSON.stringify(product),
          })
            .then((res) => res.json())
            .then((inserted) => {
              console.log(inserted);
              if (inserted.insertedId) {
                toast.success("Doctor added successfully!");
                reset();
              } else {
                toast.error("Failed to add the doctor!");
              }
            });
        }
      });
  };

  return (
    <div>
      <div className="breadCrumbs text-accent flex flex-col items-center pt-16 pb-10 mt-[-30px]">
        <p className="text-3xl font-semibold uppercase">Add Product</p>
        <div className="text-sm font-medium  breadcrumbs">
          <ul>
            <li>
              <Link>Home</Link>
            </li>
            <li>
              <Link>Products</Link>
            </li>
            <li>Add Product</li>
          </ul>
        </div>
      </div>
      <section className="flex flex-col items-center my-10">
        <h2 className="text-xl font-semibold mb-3">Add a New Product</h2>
        <div className="border-2 px-5 sm:px-12 py-5">
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="form-control">
              <label className="label">
                <span className="label-text">Product Name</span>
              </label>
              <label className="input-group">
                <input
                  type="text"
                  placeholder="Product Name"
                  className="input input-bordered w-full"
                  {...register("name", {
                    required: true,
                    minLength: {
                      value: 12,
                      message: "Must be 6 characters or longer",
                    },
                    maxLength: {
                      value: 20,
                      message: "Maximum Characters 16",
                    },
                  })}
                />
              </label>
              <label className="label">
                {errors.name?.type === "minLength" && (
                  <span className="label-text-alt text-red-500">
                    {errors.name.message}
                  </span>
                )}
                {errors.name?.type === "maxLength" && (
                  <span className="label-text-alt text-red-500">
                    {errors.name.message}
                  </span>
                )}
              </label>
            </div>
            <div>
              <label className="label">
                <span className="label-text">Select Category</span>
              </label>
              <select
                className="select select-bordered w-full max-w-xs"
                {...register("category", { required: true })}
              >
                {/* <option disabled selected>
                  Select a Product Category
                </option> */}
                {categories.map((category) => (
                  <option key={category._id}>{category.name}</option>
                ))}
              </select>
            </div>
            <div className="form-control">
              <label className="label">
                <span className="label-text">Price</span>
              </label>
              <label className="input-group">
                <input
                  type="number"
                  placeholder="Price"
                  className="input input-bordered w-full"
                  {...register("price", { required: true })}
                />
              </label>
            </div>
            <div className="form-control">
              <label className="label">
                <span className="label-text">Seller</span>
              </label>
              <label className="input-group">
                <input
                  type="text"
                  placeholder="Seller"
                  className="input input-bordered w-full"
                  {...register("seller", { required: true })}
                />
              </label>
            </div>
            <div className="form-control">
              <label className="label">
                <span className="label-text">Product Description</span>
              </label>
              <textarea
                className="textarea textarea-bordered h-24"
                placeholder="Product Description"
                {...register("description", {
                  required: true,
                  minLength: {
                    value: 50,
                    message: "Must be 6 characters or longer",
                  },
                  maxLength: {
                    value: 80,
                    message: "Maximum Characters 16",
                  },
                })}
              ></textarea>
              <label className="label">
                {errors.description?.type === "minLength" && (
                  <span className="label-text-alt text-red-500">
                    {errors.description.message}
                  </span>
                )}
                {errors.description?.type === "maxLength" && (
                  <span className="label-text-alt text-red-500">
                    {errors.description.message}
                  </span>
                )}
              </label>
            </div>
            <div className="form-control">
              <label className="label">
                <span className="label-text">Shipping Cost</span>
              </label>
              <label className="input-group">
                <input
                  type="number"
                  placeholder="Shipping Cost"
                  className="input input-bordered w-full"
                  {...register("shipping", { required: true })}
                />
              </label>
            </div>
            <div className="form-control">
              <label className="label">
                <span className="label-text">Stock</span>
              </label>
              <label className="input-group">
                <input
                  type="number"
                  placeholder="Stock"
                  className="input input-bordered w-full"
                  {...register("stock", { required: true })}
                />
              </label>
            </div>
            <input
              type="file"
              className="file-input file-input-bordered w-full my-3"
              {...register("image", { required: true })}
            />
            <input
              type="submit"
              value="Add Product"
              className="btn btn-secondary w-full my-3"
            />
          </form>
        </div>
      </section>
    </div>
  );
};

export default AddProduct;
