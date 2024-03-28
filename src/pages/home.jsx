import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";

import { getPosts, postActions } from "../store/slices/postSlice";
// import { userActions } from "../store/slices/userSlice";
import { loadingActions } from "../store/slices/locadingSlice";
import { DNA } from "react-loader-spinner";
import AllPosts from "./components/allPosts";

export default function Home() {
  const dispatch = useDispatch();

  const postData = useSelector((state) => state.postReducer.posts);

  const loading = useSelector((state) => state.loadingReducer.loading);

  useEffect(() => {
    dispatch(loadingActions.setLoading(true));
    const post = async () => {
      dispatch(postActions.setPosts(await getPosts()));
      dispatch(loadingActions.setLoading(false));
      dispatch(loadingActions.setPostLoading(true));
    };
    post();
  }, [dispatch]);

  return (
    <div className="flex mt-6 mx-5 justify-center" id="restOfTheThings">
      {loading ? (
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 flex flex-col justify-center items-center">
          <DNA height={500} width={500} />
        </div>
      ) : (
        <>
          {postData.length === 0 ? (
            <h1 className="text-xl">No posts Found</h1>
          ) : (
            <AllPosts />
          )}
        </>
      )}
    </div>
  );
}
