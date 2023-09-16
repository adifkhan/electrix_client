import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { Link, useLocation, useNavigate } from "react-router-dom";
import {
  useSignInWithEmailAndPassword,
  useSignInWithGoogle,
} from "react-firebase-hooks/auth";
import auth from "../../Firebase/firebase.init";
import Loading from "../../Shared/Components/Loading";
import loginBg from "../../images/login-bg.jpg";
import useToken from "../../Hooks/useToken";

const Login = () => {
  const navigate = useNavigate();
  const location = useLocation();

  let from = location.state?.from?.pathname || "/";

  const [signInWithGoogle, gUser, gLoading, gError] = useSignInWithGoogle(auth);
  const [signInWithEmailAndPassword, user, loading, error] =
    useSignInWithEmailAndPassword(auth);
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm();
  const [token] = useToken(user || gUser);

  useEffect(() => {
    if (token) {
      navigate(from, { replace: true });
    }
  }, [token, from, navigate]);
  const onSubmit = (data) => {
    signInWithEmailAndPassword(data.email, data.password);
  };
  let errorMessage;
  if (gLoading || loading) {
    return <Loading />;
  }
  if (gError || error) {
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
      <div className="card w-96 bg-base-100 shadow-xl my-14 p-6">
        <h2 className="text-center text-2xl font-medium">Login</h2>
        <form onSubmit={handleSubmit(onSubmit)}>
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
          {errorMessage}
          <small>
            <Link className="text-secondary font-semibold" to="/resetpassword">
              Forgot Password?
            </Link>
          </small>
          <input
            className="btn btn-secondary text-white w-full max-w-xs mt-2"
            type="submit"
            value="login"
          />
        </form>
        <p className="text-center font-semibold">
          <small>
            New to ElectriX? let's{" "}
            <Link className="text-secondary font-bold" to="/signup">
              Create new Account
            </Link>
          </small>
        </p>

        <div className="divider my-2">OR</div>
        <button
          onClick={() => signInWithGoogle()}
          className="btn btn-outline btn-secondary"
        >
          Continue With Google
        </button>
      </div>
    </div>
  );
};

export default Login;
