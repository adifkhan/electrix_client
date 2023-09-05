import React from "react";
import BreadCrumbs from "../../Shared/Components/BreadCrumbs";
import loginBg from "../../images/login-bg.jpg";
import { useSendPasswordResetEmail } from "react-firebase-hooks/auth";
import auth from "../../Firebase/firebase.init";
import { useForm } from "react-hook-form";
import Loading from "../../Shared/Components/Loading";
import { toast } from "react-toastify";

const ResetPass = () => {
  const [sendPasswordResetEmail, sending, error] =
    useSendPasswordResetEmail(auth);

  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm();
  const onSubmit = (data) => {
    sendPasswordResetEmail(data.email);
    if (sending) {
      return <Loading />;
    }
    if (error) {
      toast.error(error.message);
    } else {
      toast("A reset code sent to your email!");
    }
  };

  return (
    <div
      style={{
        backgroundImage: `url(${loginBg})`,
        backgroundRepeat: "no-repeat",
        backgroundSize: "cover",
        marginTop: "-35px",
      }}
    >
      <BreadCrumbs
        breadcrumb={{
          page: "Reset-Password",
          bread: [
            { name: "Home", address: "/" },
            { name: "Profile", address: "/profile" },
          ],
        }}
      ></BreadCrumbs>
      <div className="flex justify-center items-center">
        <div className="card w-96 bg-base-100 shadow-xl my-14">
          <div className="card-body">
            <h2 className="text-center text-xl font-medium">Reset Password</h2>

            <div className="flex flex-col items-center w-full">
              <form onSubmit={handleSubmit(onSubmit)}>
                <div className="form-control my-5">
                  <input
                    type="email"
                    placeholder="Your Email"
                    className="input input-bordered w-72"
                    {...register("email", {
                      required: {
                        value: true,
                        message: "email is required",
                      },
                      pattern: {
                        value: /[a-z0-9]+@[a-z]+\.[a-z]{2,3}/,
                        message: "Provide a valid Email",
                      },
                    })}
                  />
                  <label className="label">
                    {errors.email?.type === "required" && (
                      <span className="label-text-alt text-red-500">
                        {errors.email.message}
                      </span>
                    )}
                    {errors.email?.type === "pattern" && (
                      <span className="label-text-alt text-red-500">
                        {errors.email.message}
                      </span>
                    )}
                  </label>
                </div>
                <input
                  className="btn btn-secondary text-white"
                  type="submit"
                  value="Send Reset Code"
                />
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ResetPass;
