import React, { useEffect, useState } from "react";
import {
  useCreateUserWithEmailAndPassword,
  useSendEmailVerification,
  useSignInWithGoogle,
  useUpdateProfile,
} from "react-firebase-hooks/auth";
import auth from "../../Firebase/firebase.init";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { signOut } from "firebase/auth";
import Loading from "../../Shared/Components/Loading";
import loginBg from "../../images/login-bg.jpg";
import useToken from "../../Hooks/useToken";

const SignUp = () => {
  const [checkPass, setCheckPass] = useState("");
  const [checkConfirmPass, setCheckConfirmPass] = useState("");
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

  let errorMessage;

  const onSubmit = async (data) => {
    await createUserWithEmailAndPassword(data.email, data.password);
    await updateProfile({ displayName: data.name });
    await sendEmailVerification();
  };

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
      <div className="card w-[90%] md:w-[700px] bg-base-100 shadow-xl my-14 p-6">
        <h2 className="text-center text-2xl font-medium">Sign Up</h2>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="flex flex-col sm:flex-row sm:justify-between w-full mt-4">
            <div className="sm:w-[48%]">
              <div className="form-control w-full">
                <label className="label">
                  <span className="label-text">Email</span>
                </label>
                <input
                  type="email"
                  placeholder="Your Email"
                  className="input input-bordered w-full h-10"
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
                <label className="label pt-0">
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
              <div className="form-control w-full">
                <label className="label">
                  <span className="label-text">Password</span>
                </label>
                <input
                  type="password"
                  placeholder="Password"
                  className="input input-bordered w-full h-10"
                  onKeyUp={(e) => setCheckPass(e.target.value)}
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
                <label className="label pt-0">
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
              <div className="form-control w-full">
                <label className="label">
                  <span className="label-text">Confirm Password</span>
                </label>
                <input
                  type="password"
                  placeholder="Confirm Password"
                  className="input input-bordered w-full h-10"
                  onKeyUp={(e) => setCheckConfirmPass(e.target.value)}
                  {...register("confirmpass", {
                    required: {
                      value: true,
                      message: "Confirm Password",
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
                <label className="label pt-0">
                  {errors.confirmpass?.type === "required" && (
                    <span className="label-text-alt text-red-500">
                      {errors.confirmpass.message}
                    </span>
                  )}
                  {errors.confirmpass?.type === "minLength" && (
                    <span className="label-text-alt text-red-500">
                      {errors.confirmpass.message}
                    </span>
                  )}
                  {errors.confirmpass?.type === "maxLength" && (
                    <span className="label-text-alt text-red-500">
                      {errors.confirmpass.message}
                    </span>
                  )}
                </label>
              </div>
            </div>
            <div className="sm:w-[48%]">
              <div className="form-control w-full">
                <label className="label">
                  <span className="label-text">Name</span>
                </label>
                <input
                  type="text"
                  placeholder="Your Name"
                  className="input input-bordered w-full h-10"
                  {...register("name", {
                    required: {
                      value: true,
                      message: "name is required",
                    },
                    minLength: {
                      value: 8,
                      message: "Must be longer than 8 characters",
                    },
                    maxLength: {
                      value: 20,
                      message: "Must be shorter than 20 characters",
                    },
                  })}
                />
                <label className="label pt-0">
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
              <div>
                <p>
                  As a
                  <label className="flex items-center my-2 border-[1px] rounded-md p-2 cursor-pointer">
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
                  <label className="flex items-center my-2 border-[1px] rounded-md p-2 cursor-pointer">
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
              {errorMessage}
              <input
                className="btn btn-secondary text-white w-full"
                type="submit"
                disabled={checkPass !== checkConfirmPass}
                value="sign up"
              />
            </div>
          </div>
        </form>
        <p className="text-center text-lg font-semibold">
          <small>
            Already have an Account? let's{" "}
            <Link className="text-secondary font-bold" to="/login">
              Login
            </Link>
          </small>
        </p>

        <div className="divider my-2">OR</div>
        <button
          onClick={() => signInWithGoogle()}
          className="btn btn-outline btn-secondary sm:w-[300px] sm:mx-auto"
        >
          Continue With Google
        </button>
      </div>
    </div>
  );
};

export default SignUp;
