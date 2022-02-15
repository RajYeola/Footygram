import PostCardDelete from "../posts/PostCardDelete";
import UserDetails from "./UserDetails";
import { signoutUser, followUser, unfollowUser } from "../auth/authSlice.js";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router";
import { useEffect } from "react";
import { fetchUserByUsername } from "./userSlice";

const Profile = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { username: usernameParam } = useParams();
  const { user: loggedInUser, status: currentUserStatus } = useSelector(
    (state) => state.auth
  );
  const { status, user: currentUser } = useSelector((state) => state.user);
  const posts = useSelector((state) => state.posts?.posts);

  const currentUserPosts = posts?.filter(
    ({ user }) => user?.username === currentUser?.username
  );

  const isLoggedInUserFollowingCurrentUser = currentUser?.followers.some(
    ({ _id: userID }) => userID === loggedInUser?._id
  );

  const LogoutOrFollowBtn = () => {
    if (loggedInUser.username === currentUser.username) {
      return (
        <button
          className="block ml-auto font-bold mt-2 md:mt-4 py-1 px-3 md:px-4 md:py-2 rounded-lg md:rounded-xl bg-red-600 hover:bg-red-700 text-white duration-300"
          onClick={() => dispatch(signoutUser())}
        >
          Logout
        </button>
      );
    } else if (!isLoggedInUserFollowingCurrentUser) {
      return (
        <button
          className="btn block ml-auto font-bold mt-2 md:mt-4 py-1 px-3 md:px-4 md:py-2 rounded-lg md:rounded-xl"
          style={{
            color: "var(--primary-background-color)",
          }}
          onClick={() => dispatch(followUser(usernameParam))}
        >
          Follow
        </button>
      );
    } else {
      return (
        <button
          className="btn block ml-auto font-bold mt-2 md:mt-4 py-1 px-3 md:px-4 md:py-2 rounded-lg md:rounded-xl"
          style={{
            color: "var(--primary-background-color)",
          }}
          onClick={() => dispatch(unfollowUser(usernameParam))}
        >
          Unfollow
        </button>
      );
    }
  };

  useEffect(
    () =>
      (async () => {
        dispatch(fetchUserByUsername(usernameParam));
      })(),
    [usernameParam, currentUserStatus, dispatch]
  );

  return (
    <div className="w-4/5 md:w-1/2 mx-auto">
      {status === "fulfilled" && (
        <div>
          <LogoutOrFollowBtn />
          <UserDetails currentUser={currentUser} loggedInUser={loggedInUser} />
          <h1 className="text-xl md:text-3xl font-bold">Posts</h1>
          {currentUserPosts.length === 0 ? (
            currentUser.username === loggedInUser.username ? (
              <div className="pt-5 md:pt-10">
                <h2 className="text-lg md:text-2xl font-bold">
                  You have no posts
                </h2>
                <button
                  onClick={() => navigate("/")}
                  className="btn font-bold py-1 px-3 md:py-2 md:px-4 rounded md:rounded-lg"
                  style={{ color: "var(--primary-background-color)" }}
                >
                  Upload a new post
                </button>
              </div>
            ) : (
              <div className="text-lg md:text-2xl font-bold pt-5 md:pt-10">
                No posts yet
              </div>
            )
          ) : (
            currentUserPosts.map((post) => <PostCardDelete post={post} />)
          )}
        </div>
      )}
    </div>
  );
};

export default Profile;
