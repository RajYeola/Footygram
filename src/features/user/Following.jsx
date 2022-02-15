import { Link } from "react-router-dom";
import { IoCloseOutline } from "react-icons/io5";
import { userInitials } from "../../utils/userInitials";
import { unfollowUser } from "../auth/authSlice";
import { useDispatch } from "react-redux";

const Following = ({ currentUser, setIsFollowingModalOpen, loggedInUser }) => {
  const following = currentUser?.following;
  const name = currentUser?.name;
  const dispatch = useDispatch();

  return (
    <div className="w-full mx-auto">
      <div className="followers-container border-b-gray-400 border-b-2 mt-1 px-2">
        <h2 className="text-lg md:text-xl text-center">Following</h2>
        <IoCloseOutline
          onClick={() => setIsFollowingModalOpen(false)}
          className="text-xl md:text-2xl ml-auto cursor-pointer"
        />
      </div>
      {following.length === 0 ? (
        loggedInUser.username === currentUser.username ? (
          <div className="text-base md:text-lg font-bold p-2 md:p-4">
            <span className="color-secondary">You</span> are not following
            anyone
          </div>
        ) : (
          <div>
            <h2 className="text-base md:text-lg font-bold p-2 md:p-4">
              <span className="color-secondary">{name}</span> is not following
              anyone
            </h2>
          </div>
        )
      ) : (
        following.map(({ username, name, _id }) => (
          <div className="flex items-center justify-between text-sm" key={_id}>
            <div className="flex items-center my-1 md:my-2 mx-1">
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
              <div className="flex-col pl-2 mt-2 md:mt-0">
                <p className="font-bold">{username}</p>
                <p className="text-sm md:text-base mt-1 md:mt-0 secondary-border-color">
                  {name}
                </p>
              </div>
            </div>
            <button
              className="w-fit h-fit py-1 px-2 rounded mx-1"
              style={{
                border: "1px solid var(--secondary-border-color)",
              }}
              onClick={() => dispatch(unfollowUser(username))}
            >
              Unfollow
            </button>
          </div>
        ))
      )}
    </div>
  );
};

export default Following;
// {`/${username}`}
