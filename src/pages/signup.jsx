import axios from "axios";
import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";

export default function Signup() {
  const [username, setUsername] = useState("");
  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState(null);

  const pageAnim = {
    hidden: {
      x: "100vw",
      opacity: 0,
      transition: { ease: "easeInOut", duration: 0.5 },
    },
    visible: {
      x: 0,
      opacity: 1,
      transition: { ease: "easeInOut", duration: 0.5 },
    },
    exit: {
      x: "100vw", // Exit to the right
      opacity: 0,
      transition: { ease: "easeInOut", duration: 0.5 },
    },
  };

  async function handleSignUp(event) {
    event.preventDefault();

    if (password !== confirmPassword) {
      setErrorMessage("passwords doesnt match");
      return;
    }

    try {
      const formData = {
        name: `${firstname} ${lastname}`,
        username: username,
        email: email,
        password: password,
      };
      const response = await axios.post(
        `${import.meta.env.VITE_SERVERAPI}/register`,
        formData
      );
      console.log(response);
    } catch (err) {
      console.log(err);
    }
  }

  return (
    <AnimatePresence>
      <motion.form
        method="post"
        variants={pageAnim}
        initial="hidden"
        animate="visible"
        exit="exit"
        onSubmit={handleSignUp}
        className="flex flex-col m-16 justify-center items-center"
      >
        <h1 className="text-center text-xl font-bold">SIGNUP FORM</h1>
        <div className="grid lg:grid-cols-2 place-content-center w-fit justify-center gap-[10px] p-4 mt-2 bg-slate-100 rounded-md">
          <label htmlFor="firstname">
            Firstname
            <input
              className="border-2 border-green-500 rounded-md mt-2 p-1 pl-2 pr-2 transition focus:bg-slate-300 block"
              type="text"
              name="firstname"
              id="firstname"
              placeholder="jon"
              onChange={(e) => setFirstname(e.target.value)}
              required
            />
          </label>
          <label htmlFor="lastname">
            Lastname
            <input
              className="border-2 border-green-500 rounded-md mt-2 p-1 pl-2 pr-2 transition focus:bg-slate-300 block"
              type="text"
              name="lastname"
              id="lastname"
              placeholder="doe"
              onChange={(e) => setLastname(e.target.value)}
              required
            />
          </label>
          <label htmlFor="email" className="lg:col-span-2">
            Email
            <input
              className="w-[100%] border-2 border-green-500 rounded-md mt-2 p-1 pl-2 pr-2 transition focus:bg-slate-300 block"
              type="email"
              id="email"
              name="email"
              placeholder="Your Email Address"
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </label>
          <label htmlFor="password">
            Password
            <input
              className="border-2 border-green-500 rounded-md mt-2 p-1 pl-2 pr-2 transition focus:bg-slate-300 block"
              type="password"
              id="password"
              name="password"
              placeholder="Enter a password"
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </label>
          <label htmlFor="confirmPassword">
            Confirm Password
            <input
              className="border-2 border-green-500 rounded-md mt-2 p-1 pl-2 pr-2 transition focus:bg-slate-300 block"
              type="password"
              id="confirmPassword"
              name="comfirmPassword"
              placeholder="Confirm your password"
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
            />
          </label>
        </div>
        <button
          type="submit"
          className="border border-[#ffffff] p-2 rounded-md bg-black text-white font-bold transition-all duration-200 shadow-md hover:shadow-sm shadow-black self-center mt-2"
        >
          submit
        </button>
      </motion.form>
      {errorMessage && (
        <div className="font-semibold flex text-white items-center justify-center">
          <p className="bg-red-500 p-2 rounded-md shadow-sm shadow-red-800">
            {errorMessage}
          </p>
        </div>
      )}
    </AnimatePresence>
  );
}
