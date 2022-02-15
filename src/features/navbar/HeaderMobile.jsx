import { IoFootball, IoMoonOutline, IoSunnyOutline } from "react-icons/io5";
import { Link } from "react-router-dom";
import { toggleTheme } from "../posts/toggleTheme";
import Search from "../search/Search";
import { useSelector } from "react-redux";

const HeaderMobile = ({ theme, setTheme }) => {
  const { token } = useSelector((state) => state.auth);

  return (
    <div className="header-mobile flex justify-between items-center p-2 z-10">
      <Link to="/" className="color-secondary">
        <IoFootball className="text-3xl spin-icon" />
      </Link>
      {token && <Search />}
      {theme === "light" ? (
        <IoSunnyOutline
          className="text-2xl color-secondary"
          onClick={() => toggleTheme({ theme, setTheme })}
        />
      ) : (
        <IoMoonOutline
          className="text-2xl color-secondary"
          onClick={() => toggleTheme({ theme, setTheme })}
        />
      )}
    </div>
  );
};

export default HeaderMobile;
