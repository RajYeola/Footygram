import { Link } from "react-router-dom";
import { userInitials } from "../../utils/userInitials";
import { useDispatch } from "react-redux";
import { addReactionToPost, removeReactionFromPost } from "./postsSlice";
import { formatDistanceToNow, parseISO } from "date-fns";
import { useSelector } from "react-redux";

const PostCard = ({ post }) => {
  const { user, content, _id: postID, reactions, createdAt } = post;
  const { username, name } = user;
  const {
    user: { _id: currentUserID },
  } = useSelector((state) => state.auth);
  const { like, love, laugh, celebrate, wow } = reactions;
  const dispatch = useDispatch();

  const time = parseISO(createdAt);
  const timeAgo = formatDistanceToNow(time);

  const hasCurrentUserReacted = (reaction) => {
    return reaction?.some(({ _id: userID }) => userID === currentUserID);
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

  return (
    <div key={postID}>
      <div className="grid post-card-container w-4/5 md:w-1/2 mx-auto my-4 md:my-8 p-2 md:p-4 rounded-xl">
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
              <p className="text-sm md:text-base mt-1 md:mt-0 pl-2 secondary-border-color">
                {name}
              </p>
            </div>
            <p className="text-xs md:text-sm secondary-border-color font-bold">
              {timeAgo} ago
            </p>
          </div>
        </div>
        <div className="pl-2 md:pl-4 my-2 overflow-hidden">{content}</div>
        <Reactions />
      </div>
    </div>
  );
};

export default PostCard;
