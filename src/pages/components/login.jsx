import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import { FaGoogle } from "react-icons/fa";
import axios from "axios";
import { useDispatch } from "react-redux";
import { formAction } from "../../store/slices/loginFormSlice";

export default function LoginForm({ loading }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const dispatch = useDispatch();

  async function handleLogin(event) {
    event.preventDefault();
    try {
      console.log("fetching login");
      const response = await axios.post(
        `${import.meta.env.VITE_SERVERAPI}/login`,
        {
          email: email,
          password: password,
        },
        {
          withCredentials: true,
        }
      );
      console.log(response.data);
      window.location.href = "/";
    } catch (err) {
      console.log(err);
    }
  }

  async function googleLogin() {
    window.location.href = `${import.meta.env.VITE_SERVERAPI}/google`;
  }

  return (
    <>
      <form
        method="post"
        id="adminLoginForm"
        className="min-h-60 min-w-[25vw] flex flex-col rounded-lg bg-slate-100 justify-around align-middle p-5 border shadow-2xl border-gray-500  absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"
      >
        <h2 className="text-lg self-center mb-2">Login</h2>
        <label htmlFor="email" className="flex flex-col">
          Email
          <input
            type="email"
            name="email"
            id="email"
            className="border-2 border-green-500 rounded-md mt-2 p-1 pl-2 pr-2 transition focus:bg-slate-300"
            onChange={(e) => setEmail(e.target.value)}
          />
        </label>
        <label htmlFor="password" className="flex flex-col">
          password
          <input
            type="password"
            name="password"
            id="password"
            className="border-2 border-green-500 rounded-md mt-2 p-1 pl-2 pr-2 transition focus:bg-slate-300"
            onChange={(e) => setPassword(e.target.value)}
          />
        </label>
        <button
          className="border border-[#ffffff] p-2 rounded-md bg-black text-white font-bold transition-all duration-200 shadow-md hover:shadow-sm shadow-black w-[50%] self-center mt-2"
          onClick={handleLogin}
          disabled={loading}
          type="submit"
        >
          login
        </button>
        <button
          type="button"
          className="flex border text-nowrap border-black m-2 p-2 rounded-md items-center justify-center transition-all duration-200 hover:text-white hover:bg-black mw-[50%] self-center"
          onClick={googleLogin}
        >
          <FaGoogle size={20} className="mr-2" /> Login with google
        </button>
        <p className="mt-2 self-center">
          Don't have an account{" "}
          <Link
            to="/signup"
            onClick={() => dispatch(formAction.setForm(false))}
            className="text-blue-700"
          >
            signup
          </Link>
        </p>
      </form>
    </>
  );
}
