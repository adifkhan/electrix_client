import React, { useEffect, useState } from "react";
import {
  useCreateUserWithEmailAndPassword,
  useSendEmailVerification,
  useSignInWithGoogle,
  useUpdateProfile,
} from "react-firebase-hooks/auth";
import auth from "../../firebase.init";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { signOut } from "firebase/auth";
import Loading from "../../Shared/Components/Loading";
import loginBg from "../../images/login-bg.jpg";
import useToken from "./useToken";

const SignUp = () => {
  const [signInWithGoogle, gUser, gLoading, gError] = useSignInWithGoogle(auth);
  const [sendEmailVerification, sending] = useSendEmailVerification(auth);
  const navigate = useNavigate();

  const [createUserWithEmailAndPassword, user, loading, error] =
    useCreateUserWithEmailAndPassword(auth);

  const [updateProfile, updating, updateError] = useUpdateProfile(auth);
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm();

  const [userRole, setUserRole] = useState("buyer");
  const [token] = useToken(user || gUser, userRole);

  useEffect(() => {
    if (token) {
      signOut(auth);
      localStorage.removeItem("accessToken");
      navigate("/login");
    }
  }, [token, navigate]);

  const onSubmit = async (data) => {
    await createUserWithEmailAndPassword(data.email, data.password);
    await updateProfile({ displayName: data.name });
    await sendEmailVerification();
  };
  let errorMessage;
  if (gLoading || loading || updating || sending) {
    return <Loading />;
  }
  if (gError || error || updateError) {
    errorMessage = (
      <p className="text-red-500">
        <small>{gError?.message || error?.message}</small>
      </p>
    );
  }
  return (
    <div
      className="flex justify-center items-center"
      style={{
        backgroundImage: `url(${loginBg})`,
        backgroundRepeat: "no-repeat",
        backgroundSize: "cover",
        marginTop: "-35px",
      }}
    >
      <div className="card w-96 bg-base-100 shadow-xl my-14">
        <div className="card-body">
          <h2 className="text-center text-xl font-medium">Sign Up</h2>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="form-control w-full max-w-xs">
              <label className="label">
                <span className="label-text">Name</span>
              </label>
              <input
                type="text"
                placeholder="Your Name"
                className="input input-bordered w-full max-w-xs"
                {...register("name", {
                  required: {
                    value: true,
                    message: "name is required",
                  },
                  minLength: {
                    value: 4,
                    message: "Must be longer than 4 characters",
                  },
                  maxLength: {
                    value: 20,
                    message: "Must be shorter than 20 characters",
                  },
                })}
              />
              <label className="label">
                {errors.name?.type === "required" && (
                  <span className="label-text-alt text-red-500">
                    {errors.name.message}
                  </span>
                )}
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

            <div className="form-control w-full max-w-xs">
              <label className="label">
                <span className="label-text">Email</span>
              </label>
              <input
                type="email"
                placeholder="Your Email"
                className="input input-bordered w-full max-w-xs"
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
            <div>
              <p>
                As a{" "}
                <label className="flex items-center my-2 border-2 p-2 cursor-pointer">
                  <input
                    type="radio"
                    name="usertype"
                    value="buyer"
                    checked
                    className="radio radio-secondary radio-sm"
                    onChange={(e) => setUserRole(e.target.value)}
                  />
                  <span className="text-sm font-medium ml-3">Buyer</span>
                </label>
                <label className="flex items-center my-2 border-2 p-2 cursor-pointer">
                  <input
                    type="radio"
                    name="usertype"
                    value="seller"
                    className="radio radio-secondary radio-sm"
                    onChange={(e) => setUserRole(e.target.value)}
                  />
                  <span className="text-sm font-medium ml-3">Seller</span>
                </label>
              </p>
            </div>
            <div className="form-control w-full max-w-xs">
              <label className="label">
                <span className="label-text">Password</span>
              </label>
              <input
                type="password"
                placeholder="Password"
                className="input input-bordered w-full max-w-xs"
                {...register("password", {
                  required: {
                    value: true,
                    message: "Password is required",
                  },
                  minLength: {
                    value: 6,
                    message: "Must be 6 characters or longer",
                  },
                  maxLength: {
                    value: 16,
                    message: "Maximum Characters 16",
                  },
                })}
              />
              <label className="label">
                {errors.password?.type === "required" && (
                  <span className="label-text-alt text-red-500">
                    {errors.password.message}
                  </span>
                )}
                {errors.password?.type === "minLength" && (
                  <span className="label-text-alt text-red-500">
                    {errors.password.message}
                  </span>
                )}
                {errors.password?.type === "maxLength" && (
                  <span className="label-text-alt text-red-500">
                    {errors.password.message}
                  </span>
                )}
              </label>
            </div>
            {errorMessage}
            <input
              className="btn btn-secondary text-white w-full max-w-xs"
              type="submit"
              value="sign up"
            />
          </form>
          <p className="text-center font-semibold">
            <small>
              Already have an Account?{" "}
              <Link className="text-accent" to="/login">
                Login
              </Link>
            </small>
          </p>

          <div className="divider">OR</div>
          <button
            onClick={() => signInWithGoogle()}
            className="btn btn-outline btn-accent"
          >
            Continue With Google
          </button>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
