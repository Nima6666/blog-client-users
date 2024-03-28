import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

export default function AllPosts() {
  const postData = useSelector((state) => state.postReducer.posts);

  return (
    <div className="flex flex-col justify-center items-center">
      <h1 className="text-xl font-semibold mb-2">All Posts</h1>
      <div id="posts" className="w-8/9 md:w-5/6 lg:w-3/4">
        {postData.posts.map((post, index) => {
          const formattedDateTime = new Date(post.date).toLocaleString(
            "en-US",
            {
              year: "numeric",
              month: "2-digit",
              day: "2-digit",
              hour: "2-digit",
              minute: "2-digit",
              weekday: "short",
            }
          );

          return (
            <Link to={`../${post._id}`} key={index}>
              <div className="p-4 mb-10 min-h-[200px] text-justify shadowOp rounded-md flex flex-col justify-between transition-all duration-200 hover:scale-[1.04] hover:cursor-pointer">
                <h3 className="text-xl mb-2">{post.title}</h3>
                <p>Published: {formattedDateTime}</p>
                <div className="flex w-1/2 justify-between self-center">
                  <div>{post.likes.length} likes</div>
                  <div>{post.comment.length} comments</div>
                </div>
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
