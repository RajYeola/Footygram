import { IoFootball, IoMoonOutline, IoSunnyOutline } from "react-icons/io5";
import { Link } from "react-router-dom";
import { toggleTheme } from "../posts/toggleTheme";
import Search from "../search/Search";
import { useSelector } from "react-redux";
import { userInitials } from "../../utils/userInitials";

const NavbarDesktop = ({ theme, setTheme }) => {
  const { token, user } = useSelector((state) => state.auth);
  const name = user?.name;
  const username = user?.username;

  return (
    <div className="navbar-desktop">
      <nav className="flex justify-between p-3 px-12">
        <Link to="/" className="flex items-center color-secondary">
          <IoFootball className="text-4xl spin-icon" />
          <h1 className="font-sofia text-3xl pl-3">Footygram</h1>
        </Link>
        {token && <Search />}
        <div className="flex justify-between items-center">
          {theme === "light" ? (
            <IoSunnyOutline
              className="text-3xl cursor-pointer color-secondary mr-3"
              onClick={() => toggleTheme({ theme, setTheme })}
            />
          ) : (
            <IoMoonOutline
              className="text-3xl cursor-pointer color-secondary mr-3"
              onClick={() => toggleTheme({ theme, setTheme })}
            />
          )}
          {user && (
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
          )}
        </div>
      </nav>
    </div>
  );
};

export default NavbarDesktop;
