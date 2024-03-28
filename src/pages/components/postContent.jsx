import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import {
  commentHandle,
  getPost,
  like,
  postActions,
} from "../../store/slices/postSlice";
import { loadingActions } from "../../store/slices/locadingSlice";
import { Blocks } from "react-loader-spinner";

import { motion } from "framer-motion";
import { childAnim } from "../animations";

import { FaHeart } from "react-icons/fa";
import { FaComment } from "react-icons/fa";
import { formAction } from "../../store/slices/loginFormSlice";

import defaultProfImg from "/gangsta.jpg";

export default function PostContent() {
  const dispatch = useDispatch();
  const { id } = useParams();

  const post = useSelector((state) => state.postReducer.selPost);
  const postLoading = useSelector((state) => state.loadingReducer.postLoading);
  const user = useSelector((state) => state.userReducer.userIn);
  const userLike = useSelector((state) => state.postReducer.userLike);

  const [comment, setComment] = useState("");

  useEffect(() => {
    dispatch(loadingActions.setLoading(false));
    const postRetriever = async () => {
      dispatch(postActions.setSelPost(await getPost(id)));
      dispatch(loadingActions.setPostLoading(false));
    };
    postRetriever();
  }, [dispatch, id]);

  useEffect(() => {
    if (user && user._id && post && post.likes) {
      if (post.likes.includes(user._id) && !userLike) {
        dispatch(postActions.setLike(true));
      } else if (!post.likes.includes(user._id) && userLike) {
        dispatch(postActions.setLike(false));
      }
    }
  }, [user, userLike, dispatch, post]);

  function dateConverter(date) {
    const formattedDateTime = new Date(date).toLocaleString("en-US", {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
      hour: "2-digit",
      minute: "2-digit",
      weekday: "short",
    });
    return formattedDateTime;
  }

  async function likeHandler() {
    const res = await like(id);
    console.log(await res);
    if (res.message == "user is not authenticated") {
      dispatch(formAction.setForm(true));
    } else {
      dispatch(postActions.setSelPost(await res.updatedPost));
    }
  }

  async function commentHandler() {
    const res = await commentHandle(comment, id);
    console.log(res, "commentew");
    if (res.message == "user is not authenticated") {
      dispatch(formAction.setForm(true));
    } else {
      dispatch(postActions.setSelPost(await res.updatedPost));
    }
    setComment("");
    document.querySelector("#comment").value = "";
  }

  console.log(post);

  return (
    <div className="flex justify-center items-center mt-4 flex-col">
      {postLoading ? (
        <div className="absolute top-1/2 right-1/2 translate-x-1/2 -translate-y-1/2">
          <Blocks height={400} width={400} />
        </div>
      ) : (
        <>
          <div
            id="selectedPost"
            className="w-[90vw] md:w-5/6 lg:w-1/2 mt-4 shadowOp p-4"
          >
            <h2 className="text-right mb-3">
              Published Date: {dateConverter(post.date)}
            </h2>
            <div
              id="titleAnimated"
              className="flex flex-wrap text-xl font-semibold"
            >
              {post.title.split(" ").map((title, index) => {
                return (
                  <motion.div
                    key={index}
                    variants={childAnim}
                    initial="hidden"
                    animate="visible"
                    custom={index}
                    className="mr-2"
                  >
                    {title}
                  </motion.div>
                );
              })}
            </div>
            <div>{post.content}</div>
            <div
              id="likeAndComment"
              className="flex w-fit justify-between mt-3"
            >
              <div className="flex items-center mr-4">
                <FaHeart
                  size={30}
                  color={`${userLike ? "#000000" : "#fff1f1"}`}
                  className="hover:cursor-pointer"
                  onClick={likeHandler}
                />
                <p className="p-2">{post.likes.length}</p>
              </div>
              <div className="flex items-center">
                <FaComment
                  size={30}
                  color="#fff1f1"
                  className="hover:cursor-pointer"
                />
                <p className="p-2">{post.comment.length}</p>
              </div>
            </div>
          </div>
          <div id="comments" className="mt-4 w-[90vw] md:w-5/6 lg:w-1/2">
            {post.comment.map((comm, index) => {
              return (
                <div
                  key={index}
                  className="flex  bg-slate-200 p-4 rounded-md mb-4"
                >
                  <div className="flex flex-col mr-4 pr-2 border-r-[1px] border-black min-w-[250px]">
                    <img
                      src={comm.imageURL ? comm.imageURL : defaultProfImg}
                      className="max-h-[40px] max-w-[40px] rounded-full"
                      alt=""
                    />
                    <div className="text-sm">{comm.email}</div>
                  </div>
                  <div className="flex-1">
                    <div className="text-sm mb-2">
                      {dateConverter(comm.date)}
                    </div>
                    <p className="break-all">{comm.text}</p>
                  </div>
                </div>
              );
            })}
          </div>
          <div className="w-[90vw] md:w-5/6 lg:w-1/2 pb-28 ">
            <textarea
              name="comment"
              id="comment"
              maxLength={200}
              className="resize-none w-full h-[200px] mt-4 border-2 border-green-500 rounded-md p-1 pl-2 pr-2 transition focus:bg-slate-300 "
              placeholder="Write Something about this post"
              onChange={(e) => setComment(e.target.value)}
            ></textarea>
            <button
              onClick={commentHandler}
              className="text-nowrap border border-[#ffffff] p-2 rounded-md bg-black text-white font-bold transition-all duration-200 shadow-md hover:shadow-sm shadow-black self-center mt-2"
            >
              Leave a Comment
            </button>
          </div>
        </>
      )}
    </div>
  );
}
