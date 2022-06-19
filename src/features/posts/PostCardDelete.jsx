import { Link } from "react-router-dom";
import { IoTrashBinOutline } from "react-icons/io5";
import { userInitials } from "../../utils/userInitials";
import { useSelector, useDispatch } from "react-redux";
import {
  addReactionToPost,
  deletePost,
  removeReactionFromPost,
} from "./postsSlice";
import { formatDistanceToNow, parseISO } from "date-fns";

const PostCardDelete = ({ post }) => {
  const name = post.user?.name;
  const username = post.user?.username;
  const postUserID = post.user?._id;
  const {
    content: postContent,
    _id: postID,
    reactions,
    createdAt,
    imageURL,
  } = post;
  const { like, love, laugh, celebrate, wow } = reactions;
  const { user: loggedInUser } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  const time = parseISO(createdAt);
  const timeAgo = formatDistanceToNow(time);

  const hasCurrentUserReacted = (reaction) => {
    return reaction?.some(({ _id: userID }) => userID === postUserID);
  };

  const Reactions = () => {
    return (
      <div className="flex">
        <p
          className="md:text-lg flex items-center mx-1 md:mx-4 cursor-pointer rounded md:px-1 reaction-bg"
          style={{
            backgroundColor: `${
              hasCurrentUserReacted(like)
                ? "var(--reaction-background-color)"
                : ""
            }`,
            color: `${
              hasCurrentUserReacted(like) ? "var(--secondary-text-color)" : ""
            }`,
          }}
          onClick={() =>
            hasCurrentUserReacted(like)
              ? dispatch(removeReactionFromPost({ postID, reaction: "like" }))
              : dispatch(addReactionToPost({ postID, reaction: "like" }))
          }
        >
          👍 <span className="text-base px-1 md:px-2">{like.length}</span>
        </p>
        <p
          className="md:text-lg flex items-center mx-1 md:mx-4 cursor-pointer rounded md:px-1 reaction-bg"
          style={{
            backgroundColor: `${
              hasCurrentUserReacted(love)
                ? "var(--reaction-background-color)"
                : ""
            }`,
            color: `${
              hasCurrentUserReacted(love) ? "var(--secondary-text-color)" : ""
            }`,
          }}
          onClick={() =>
            hasCurrentUserReacted(love)
              ? dispatch(removeReactionFromPost({ postID, reaction: "love" }))
              : dispatch(addReactionToPost({ postID, reaction: "love" }))
          }
        >
          ❤️ <span className="text-base px-1 md:px-2">{love.length}</span>
        </p>
        <p
          className="md:text-lg flex items-center mx-1 md:mx-4 cursor-pointer rounded md:px-1 reaction-bg"
          style={{
            backgroundColor: `${
              hasCurrentUserReacted(laugh)
                ? "var(--reaction-background-color)"
                : ""
            }`,
            color: `${
              hasCurrentUserReacted(laugh) ? "var(--secondary-text-color)" : ""
            }`,
          }}
          onClick={() =>
            hasCurrentUserReacted(laugh)
              ? dispatch(removeReactionFromPost({ postID, reaction: "laugh" }))
              : dispatch(addReactionToPost({ postID, reaction: "laugh" }))
          }
        >
          😂 <span className="text-base px-1 md:px-2">{laugh.length}</span>
        </p>
        <p
          className="md:text-lg flex items-center mx-1 md:mx-4 cursor-pointer rounded md:px-1 reaction-bg"
          style={{
            backgroundColor: `${
              hasCurrentUserReacted(celebrate)
                ? "var(--reaction-background-color)"
                : ""
            }`,
            color: `${
              hasCurrentUserReacted(celebrate)
                ? "var(--secondary-text-color)"
                : ""
            }`,
          }}
          onClick={() =>
            hasCurrentUserReacted(celebrate)
              ? dispatch(
                  removeReactionFromPost({ postID, reaction: "celebrate" })
                )
              : dispatch(addReactionToPost({ postID, reaction: "celebrate" }))
          }
        >
          🥳 <span className="text-base px-1 md:px-2">{celebrate.length}</span>
        </p>
        <p
          className="md:text-lg flex items-center mx-1 md:mx-4 cursor-pointer rounded md:px-1 reaction-bg"
          style={{
            backgroundColor: `${
              hasCurrentUserReacted(wow)
                ? "var(--reaction-background-color)"
                : ""
            }`,
            color: `${
              hasCurrentUserReacted(wow) ? "var(--secondary-text-color)" : ""
            }`,
          }}
          onClick={() =>
            hasCurrentUserReacted(wow)
              ? dispatch(removeReactionFromPost({ postID, reaction: "wow" }))
              : dispatch(addReactionToPost({ postID, reaction: "wow" }))
          }
        >
          😮 <span className="text-base px-1 md:px-2">{wow.length}</span>
        </p>
      </div>
    );
  };

  const DeleteBtnOrNoBtn = () => {
    if (username === loggedInUser.username) {
      return (
        <IoTrashBinOutline
          className="text-xl md:text-2xl cursor-pointer mt-2 md:mt-0 hover:text-red-600"
          onClick={() => dispatch(deletePost(postID))}
        />
      );
    } else {
      return "";
    }
  };

  return (
    <div
      key={postID}
      className="post-card-container my-4 md:my-8 p-2 md:p-4 rounded-xl"
    >
      <div className="flex justify-between">
        <div className="flex items-center">
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
          <div className="ml-2">
            <div className="flex mt-2 md:mt-0">
              <p className="font-bold">{username}</p>
              <p className="text-sm md:text-base mt-1 md:mt-0 pl-2 secondary-border-color truncate">
                {name}
              </p>
            </div>
            <p className="text-xs md:text-sm secondary-border-color font-bold">
              {timeAgo} ago
            </p>
          </div>
        </div>
        <DeleteBtnOrNoBtn />
      </div>
      {imageURL && (
        <img
          className="post-img my-3 md:m-4"
          src={imageURL}
          alt={postContent}
        />
      )}
      <div className="md:pl-4 mb-3 mt-4 mx-2 md:mt-6 md:mb-2 md:text-lg overflow-hidden">
        {postContent}
      </div>
      <Reactions />
    </div>
  );
};

export default PostCardDelete;
