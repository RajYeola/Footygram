import { IoHomeOutline, IoPersonOutline } from "react-icons/io5";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

const NavbarMobile = () => {
  const { user } = useSelector((state) => state.auth);
  const username = user?.username;

  return (
    <div className="navbar-mobile flex justify-around py-1">
      <Link to="/" className="flex flex-col items-center">
        <IoHomeOutline className="text-2xl" />
        <p className="text-base">Home</p>
      </Link>
      <Link to={`/${username}`} className="flex flex-col items-center">
        <IoPersonOutline className="text-2xl" />
        <p className="text-base">Profile</p>
      </Link>
    </div>
  );
};

export default NavbarMobile;
