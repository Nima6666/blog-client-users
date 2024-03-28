import { useEffect, useState } from "react";
import Model from "./model/model";
import { AnimatePresence, motion } from "framer-motion";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { userActions } from "../../store/slices/userSlice";
import gangstaImg from "/gangsta.jpg";
import { formAction } from "../../store/slices/loginFormSlice";
import { Link } from "react-router-dom";

export default function Header() {
  // const [isForm, setIsForm] = useState(false);
  const isForm = useSelector((state) => state.loginFormReducer.isForm);

  const [toggleLogout, setToggleLogout] = useState(false);

  const dispatch = useDispatch();

  // const [imageLoaded, setImageLoaded] = useState(false);

  const user = useSelector((state) => state.userReducer.userIn);
  const loading = useSelector((state) => state.loadingReducer.loading);

  useEffect(() => {
    async function getCurrentUser() {
      const response = await axios.get(
        `${import.meta.env.VITE_SERVERAPI}/session`,
        { withCredentials: true }
      );
      dispatch(userActions.setUser(await response.data));
    }
    getCurrentUser();

    // document.querySelector("#restOfTheThings").addEventListener("click", () => {
    //   setToggleLogout(false);
    // });
  }, []);

  console.log("loggedIn usr: ", user);

  function handleClose() {
    dispatch(formAction.setForm(false));
  }

  const buttonAnim = {
    hidden: {
      opacity: 0,
      y: -50,
      transition: {
        type: "spring",
        damping: 10,
        stiffness: 300,
        duration: 0.2,
      },
    },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: "spring",
        damping: 10,
        stiffness: 300,
        duration: 0.2,
      },
    },
  };

  const headTitleAnim = {
    hidden: {
      y: -100,
      opacity: 0,
      filter: "blur(10px)",
      transition: {
        type: "easeInOut",
        duration: 0.2,
      },
    },
    visible: {
      y: 0,
      opacity: 1,
      filter: "blur(0px)",
      transition: {
        type: "easeInOut",
        duration: 0.2,
      },
    },
  };

  async function logout() {
    const response = await axios.post(
      `${import.meta.env.VITE_SERVERAPI}/logout`,
      null,
      { withCredentials: true }
    );
    window.location.reload();
  }

  return (
    <>
      <header className="z-20 sticky top-0 backdrop-blur-sm shadow-md shadow-[#585858] px-16 py-4 bg-[#e8e8e894]  flex justify-between items-center">
        <motion.div
          className="text-amber-800 text-lg font-extrabold py-2"
          variants={headTitleAnim}
          initial="hidden"
          animate="visible"
        >
          BLOG <span className="text-[#423bbf]">POST</span>
        </motion.div>
        {!loading && (
          <motion.div
            variants={buttonAnim}
            initial="hidden"
            animate="visible"
            className="flex-[0.2] flex justify-between items-center"
          >
            <Link to="/" className="px-4 font-semibold text-nowrap">
              ALL POSTS
            </Link>
            {user && user.name && !loading ? (
              <div className="flex items-center">
                <div className="relative h-fit w-fit">
                  <img
                    src={user.profileImg ? user.profileImg : gangstaImg}
                    className="h-10 w-10 rounded-full object-cover max-h-[40px] max-w-[40px]"
                    onClick={() =>
                      toggleLogout
                        ? setToggleLogout(false)
                        : setToggleLogout(true)
                    }
                  />

                  {toggleLogout && (
                    <motion.div
                      id="logoutBtn"
                      className="absolute top-[120%] right-[0px] bg-red-600 text-white rounded-md shadow-md shadow-red-700"
                    >
                      <button onClick={logout} className="p-2">
                        logout
                      </button>
                    </motion.div>
                  )}
                </div>
                <div className="text-lg p-2">{user.name.split(" ")[0]}</div>
              </div>
            ) : (
              <button
                className="border border-[#ffffff] p-2 rounded-md bg-black text-white font-bold shadow-md shadow-black text-nowrap"
                onClick={() => dispatch(formAction.setForm(true))}
                disabled={loading}
              >
                Be Our Guest
              </button>
            )}
          </motion.div>
        )}
        {/* {!loading && loggedInUser.name && (
          <>
            <motion.div
              className="flex items-center relative"
              variants={buttonAnim}
              initial="hidden"
              animate="visible"
              disabled={loading}
            >
              <div className="text-lg p-2">
                {loggedInUser.name.split(" ")[0]}
              </div>
              <img
                src={
                  loggedInUser.profileImg ? loggedInUser.profileImg : gangstaImg
                }
                onLoad={handleImageLoad}
                className="h-10 rounded-full"
                onClick={() =>
                  toggleLogout ? setToggleLogout(false) : setToggleLogout(true)
                }
              />
              {toggleLogout && (
                <motion.div
                  id="logoutBtn"
                  className="absolute top-[120%] right-[0px] bg-red-600 text-white rounded-md shadow-md shadow-red-700"
                >
                  <button onClick={logout} className="p-2">
                    logout
                  </button>
                </motion.div>
              )}
            </motion.div>
          </>
        )} */}
      </header>
      <AnimatePresence initial={false} mode="wait" onExitComplete={() => null}>
        {isForm && <Model modelOpen={isForm} handleClose={handleClose} />}
      </AnimatePresence>
    </>
  );
}
