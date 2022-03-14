import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import login from "../img/login.svg";
import SyncLoader from "react-spinners/SyncLoader";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
export default function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [emailerror, setEmailerror] = useState("");
  const [passworderror, setPassworderror] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await fetch("/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: email,
          password: password,
        }),
      });

      const data = await res.json();

      if (data.errors) {
        setEmailerror(data.errors.email);
        setPassworderror(data.errors.password);
        setLoading(false);
      } else {
        navigate("/dashboard");
      }
    } catch (err) {
      toast.error("Something went wrong, please try again after some time!");
      setLoading(false);
    }
  };

  return (
    <div className="h-screen w-screen font-raleway lg:flex lg:justify-center lg:items-center bg-opal">
      <div className="w-2/3 lg:h-full px-20 py-8 ">
        <h1 className="font-righteous font-bold text-3xl text-darkSlateGray">
          EventListeners
        </h1>
        <img src={login} alt="login" className="my-20 hidden lg:block" />
      </div>
      <div className="lg:w-1/3 flex  justify-center items-center">
        <div className="bg-white pt-6 pb-10 rounded-lg w-10/12 flex justify-center items-center">
          <div className="w-10/12">
            <h1 className="text-center text-3xl font-bold py-5">Login</h1>
            <form
              className="flex flex-col py-3 font-medium"
              onSubmit={handleSubmit}
            >
              <label htmlFor="email" className="pt-4 pb-2">
                Email
              </label>
              <input
                type="email"
                name="email"
                id="email"
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                }}
                className="py-2 px-4 bg-gray-100 rounded"
              />
              <span className="text-sm text-red-500 px-2 py-1">
                {emailerror}
              </span>
              <label htmlFor="password" className="py-2">
                Password
              </label>
              <input
                type="password"
                name="password"
                id="password"
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value);
                }}
                className="py-2 px-4 bg-gray-100 rounded"
              />
              <span className="text-sm text-red-500 px-2 py-1">
                {passworderror}
              </span>
              {loading ? (
                <div className="flex justify-center items-center my-4">
                  <SyncLoader size={10}></SyncLoader>
                </div>
              ) : (
                <button
                  type="submit"
                  className="mt-4 mb-4 bg-pacificBlue rounded py-2 font-bold shadow-md hover:shadow-none"
                >
                  Login
                </button>
              )}
              <h1 className="text-center">
                New User,&nbsp;<Link to="/signupuser">Signup here</Link>
              </h1>
            </form>
          </div>
        </div>
      </div>
      <ToastContainer />
    </div>
  );
}
