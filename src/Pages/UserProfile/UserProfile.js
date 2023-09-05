import React, { useState } from "react";
import useUser from "../../Hooks/useUser";
import BreadCrumbs from "../../Shared/Components/BreadCrumbs";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";
import Loading from "../../Shared/Components/Loading";
import { getToken } from "../../Shared/Components/utilities";

const UserProfile = () => {
  const token = getToken();
  const [userInfo, isLoading, refetch] = useUser();
  const [formToggle, setFormToggle] = useState(false);
  const [userRole, setUserRole] = useState("buyer");
  const { register, handleSubmit } = useForm();

  // generating unique id for user //
  const randomId = function (length = 6) {
    const rndm = Math.random()
      .toString(36)
      .substring(2, length + 2);
    const hours = new Date().getHours();
    const mins = new Date().getMinutes();
    const id = hours + mins + rndm;
    return id;
  };
  if (isLoading) {
    return <Loading />;
  }
  // imgbb API key for file uploading //
  const imgStorageKey = "ec615fc495698531172416f9505b41b3";

  const onSubmit = (data) => {
    const image = data?.image[0];
    const formData = new FormData();
    formData.append("image", image);
    const url = `https://api.imgbb.com/1/upload?key=${imgStorageKey}`;

    let imageUrl;
    fetch(url, {
      method: "POST",
      body: formData,
    })
      .then((res) => res.json())
      .then((result) => {
        if (result.success) {
          imageUrl = result.data.url;

          // define user Profile //
          const userProfile = {
            email: userInfo?.email,
            displayName: data?.name || userInfo?.displayName,
            role: userRole,
            userId: userInfo.userId || randomId(10),
            address: data?.address || userInfo?.address,
            phone: data?.phone || userInfo?.phone,
            img: imageUrl,
          };

          // put user data to database //
          fetch(`https://electrix-server.vercel.app/user`, {
            method: "PUT",
            headers: {
              "content-type": "application/json",
              authorization: `Bearer ${token}`,
            },
            body: JSON.stringify(userProfile),
          })
            .then((res) => res.json())
            .then((data) => {
              if (data.acknowledged === true) {
                toast.success("Profile updated!");
                setFormToggle(false);
              } else {
                toast.error("somethign went wrong, try again!");
              }
            });
        }
      });
  };
  refetch();

  return (
    <div>
      <BreadCrumbs
        breadcrumb={{
          page: "Profile",
          bread: [{ name: "Home", address: "/" }],
        }}
      ></BreadCrumbs>
      <section className="flex flex-col items-center py-8 px-5 sm:px-28 md:px-48">
        {formToggle ? (
          <form
            className=" flex flex-col items-center mt-12 w-full"
            onSubmit={handleSubmit(onSubmit)}
          >
            <div className="flex items-center">
              <p>User Type :</p>
              <label className="flex items-center mx-2 my-2 border-2 p-2 cursor-pointer max-w-xs">
                <input
                  type="radio"
                  name="usertype"
                  value="buyer"
                  checked
                  className="radio radio-secondary radio-xs sm:radio-sm"
                  onChange={(e) => setUserRole(e.target.value)}
                />
                <span className="text-sm font-medium ml-3">Buyer</span>
              </label>
              <label className="flex items-center my-2 border-2 p-2 cursor-pointer max-w-xs">
                <input
                  type="radio"
                  name="usertype"
                  value="seller"
                  className="radio radio-secondary radio-xs sm:radio-sm"
                  onChange={(e) => setUserRole(e.target.value)}
                />
                <span className="text-sm font-medium ml-3">Seller</span>
              </label>
            </div>
            <div className="form-control w-full max-w-xs">
              <label className="label">
                <span className="label-text">Name</span>
              </label>
              <input
                type="text"
                placeholder={userInfo?.displayName}
                className="input input-bordered w-full max-w-xs"
                {...register("name")}
              />
            </div>
            <div className="form-control w-full max-w-xs">
              <label className="label">
                <span className="label-text">Email</span>
              </label>
              <input
                type="email"
                placeholder={userInfo?.email}
                readOnly
                className="input w-full max-w-xs"
                {...register("email")}
              />
            </div>
            <div className="form-control w-full max-w-xs">
              <label className="label">
                <span className="label-text">Address</span>
              </label>
              <input
                type="text"
                placeholder={userInfo?.address}
                className="input input-bordered w-full max-w-xs"
                {...register("address")}
              />
            </div>
            <div className="form-control w-full max-w-xs">
              <label className="label">
                <span className="label-text">Phone No</span>
              </label>
              <input
                type="number"
                placeholder={userInfo?.phone}
                className="input input-bordered w-full max-w-xs"
                {...register("phone")}
              />
            </div>
            <div>
              <label className="label">
                <span className="label-text">Image</span>
              </label>
              <input
                type="file"
                className="file-input file-input-bordered w-full mb-3"
                {...register("image")}
              />
            </div>
            <div>
              <input
                className="btn btn-secondary text-white w-28 mr-2"
                type="submit"
                value="Save"
              />
              <button
                className="btn btn-outline w-28 ml-2"
                onClick={() => setFormToggle(false)}
              >
                Cancle
              </button>
            </div>
          </form>
        ) : (
          <div className="font-medium leading-8">
            <div className="avatar">
              <div className="w-24 rounded-full ring ring-secondary ring-offset-base-100 ring-offset-2">
                <img src={userInfo.img} alt="" />
              </div>
            </div>
            <p>User Type : {userInfo?.role}</p>
            <p>Name : {userInfo?.displayName}</p>
            <p>Email : {userInfo?.email}</p>
            <p>User Id : {userInfo?.userId}</p>
            <p>Address : {userInfo?.address}</p>
            <p>phone No : {userInfo?.phone}</p>
            <div>
              <button
                className="btn btn-secondary mt-5 mr-2"
                onClick={() => setFormToggle(true)}
              >
                Edit Profile
              </button>
              <Link to="/resetpassword">
                <button className="btn btn-outline mt-5">Reset Password</button>
              </Link>
            </div>
          </div>
        )}
      </section>
    </div>
  );
};

export default UserProfile;
