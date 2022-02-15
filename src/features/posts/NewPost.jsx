import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { userInitials } from "../../utils/userInitials";
import { useState, useRef, useEffect } from "react";
import { useDispatch } from "react-redux";
import { createNewPost } from "./postsSlice";

const NewPost = () => {
  const { user } = useSelector((state) => state.auth);
  const { status: postStatus } = useSelector((state) => state.posts);
  const { name, username } = user;
  const [postContent, setPostContent] = useState("");
  const dispatch = useDispatch();
  const inputRef = useRef(null);

  useEffect(() => inputRef.current.focus(), []);

  return (
    <div>
      <div className="new-post-container w-4/5 md:w-1/2 mx-auto my-4 md:my-8 p-2 md:p-4 rounded-xl">
        <div className="flex ">
          <Link
            to={`/${username}`}
            className="text-sm md:text-base h-10 md:h-12 w-10 md:w-12 object-cover object-center text-center pt-2 font-bold uppercase"
            style={{
              borderRadius: "50%",
              backgroundColor: "var(--tertiary-background-color)",
              border: "2px solid var(--secondary-text-color)",
            }}
          >
            {userInitials(name)}
          </Link>
          <div className="ml-2 flex-col">
            <p className="font-bold">{username}</p>
            <p className="text-sm md:text-base secondary-border-color">
              {name}
            </p>
          </div>
        </div>
        <textarea
          className="bg-transparent w-full mt-2 md:mt-4 h-20 p-1"
          placeholder="What's happening?"
          value={postContent}
          onChange={(e) => setPostContent(e.target.value)}
          ref={inputRef}
        />
        <button
          className={`btn block ml-auto font-bold mt-2 md:mt-4 py-1 px-3 md:px-4 md:py-2 rounded-lg md:rounded-xl z-0 ${
            postContent ? "cursor-pointer" : "opacity-50 cursor-not-allowed"
          }`}
          style={{
            color: "var(--primary-background-color)",
          }}
          onClick={() => {
            setPostContent("");
            dispatch(createNewPost(postContent));
          }}
          disabled={!postContent}
        >
          {postStatus === "loading" ? "Posting" : "Post"}
        </button>
      </div>
    </div>
  );
};

export default NewPost;
