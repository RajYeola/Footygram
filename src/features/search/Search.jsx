import { useState } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { IoSearchOutline, IoCloseOutline } from "react-icons/io5";
import { userInitials } from "../../utils/userInitials";

const Search = () => {
  const [isSearchUsersModalOpen, setIsSearchUsersModalOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");

  const usersList = useSelector((state) => state.search.users);

  return (
    <div className="w-3/5 md:w-1/3 relative">
      <IoSearchOutline
        className={`absolute text-xl md:text-2xl left-3 md:left-4 top-2 ${
          isSearchUsersModalOpen ? "hidden" : "block"
        }`}
        style={{ color: "var(--secondary-border-color)" }}
      />
      <input
        type="text"
        placeholder="Search User"
        className={`w-full py-1 md:py-2 ${
          isSearchUsersModalOpen ? "px-2 md:px-4" : "px-10 md:px-12"
        } pr-7 md:pr-10 mx-auto rounded-3xl bg-transparent primary-input`}
        onClick={() => setIsSearchUsersModalOpen(true)}
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
      <div
        className={`${
          isSearchUsersModalOpen ? "block" : "hidden"
        } mt-1 md:mt-2 absolute w-full rounded-lg px-1 md:px-2 z-20`}
        style={{
          backgroundColor: "var(--secondary-background-color",
          border: "2px solid var(--card-border-color)",
        }}
      >
        {usersList
          .filter((value) => {
            if (searchTerm === "") {
              return value;
            } else if (
              value.username.toLowerCase().includes(searchTerm.toLowerCase())
            ) {
              return value;
            }
            return null;
          })
          .map((user) => (
            <Link
              to={`/${user.username}`}
              className="flex items-center px-1 md:px-2 py-1 cursor-pointer"
              key={user._id}
            >
              <div
                className="text-sm md:text-base h-10 md:h-12 w-10 md:w-12 object-cover object-center text-center pt-2 font-bold uppercase"
                style={{
                  borderRadius: "50%",
                  backgroundColor: "var(--tertiary-background-color)",
                  border: "2px solid var(--secondary-text-color)",
                }}
              >
                {userInitials(user.name)}
              </div>
              <div className="flex-col pl-2 mt-2 md:mt-0">
                <p className="text-sm md:text-base font-bold">
                  {user.username}
                </p>
                <p className="text-xs md:text-base secondary-border-color">
                  {user.name}
                </p>
              </div>
            </Link>
          ))}
      </div>
      <IoCloseOutline
        className={`absolute text-xl md:text-2xl right-2 md:right-4 top-2 ${
          isSearchUsersModalOpen ? "block" : "hidden"
        } cursor-pointer`}
        style={{ color: "var(--secondary-border-color)" }}
        onClick={() => {
          setSearchTerm("");
          setIsSearchUsersModalOpen(false);
        }}
      />
    </div>
  );
};

export default Search;
