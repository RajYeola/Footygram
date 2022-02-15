import { useState } from "react";
import ReactModal from "react-modal";
import { Link } from "react-router-dom";
import Followers from "./Followers";
import Following from "./Following";
import { userInitials } from "../../utils/userInitials";

ReactModal.setAppElement("#root");
const UserDetails = ({ currentUser, loggedInUser }) => {
  const [isFollowersModalOpen, setIsFollowersModalOpen] = useState(false);
  const [isFollowingModalOpen, setIsFollowingModalOpen] = useState(false);

  const name = currentUser?.name;
  const username = currentUser?.username;
  const following = currentUser?.following;
  const followers = currentUser?.followers;

  return (
    <div className="post-card-container my-4 md:my-8 mx-auto p-2 md:p-4 rounded-xl">
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
        <div className="flex-col mt-2 md:mt-0 ml-2">
          <p className="font-bold">{username}</p>
          <p className="text-sm md:text-base mt-1 md:mt-0 secondary-border-color">
            {name}
          </p>
        </div>
      </div>
      <div className="flex items-center mt-2 md:mt-4">
        <div
          className="cursor-pointer"
          onClick={() => setIsFollowersModalOpen(true)}
        >
          {followers.length} Followers
        </div>
        <span className="px-2">•</span>
        <div
          className="cursor-pointer"
          onClick={() => setIsFollowingModalOpen(true)}
        >
          {following.length} Following
        </div>
      </div>
      <ReactModal
        isOpen={isFollowersModalOpen}
        onRequestClose={() => setIsFollowersModalOpen(false)}
        style={{
          content: {
            margin: "10em auto",
            border: "1px solid var(--secondary-border-color)",
            borderRadius: "0.5em",
            background: "var(--secondary-background-color)",
          },
          overlay: {
            backgroundColor: "var(--modal-overlay-color)",
            zIndex: "30",
          },
        }}
        className="w-3/4 md:w-1/4 mx-auto"
      >
        <Followers
          currentUser={currentUser}
          setIsFollowersModalOpen={setIsFollowersModalOpen}
          loggedInUser={loggedInUser}
        />
      </ReactModal>
      <ReactModal
        isOpen={isFollowingModalOpen}
        onRequestClose={() => setIsFollowingModalOpen(false)}
        style={{
          content: {
            margin: "10em auto",
            border: "1px solid var(--secondary-border-color)",
            borderRadius: "0.5em",
            background: "var(--secondary-background-color)",
          },
          overlay: {
            backgroundColor: "var(--modal-overlay-color)",
            zIndex: "30",
          },
        }}
        className="w-3/4 md:w-1/4 mx-auto"
      >
        <Following
          currentUser={currentUser}
          setIsFollowingModalOpen={setIsFollowingModalOpen}
          loggedInUser={loggedInUser}
        />
      </ReactModal>
    </div>
  );
};

export default UserDetails;
