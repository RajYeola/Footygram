import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import MediaQuery from "react-responsive";
import HeaderMobile from "./HeaderMobile";
import NavbarDesktop from "./NavbarDesktop";
import NavbarMobile from "./NavbarMobile";

const Navbar = () => {
  const { token } = useSelector((state) => state.auth);
  const [theme, setTheme] = useState("light");

  const initializeTheme = () => {
    const currentTheme = localStorage?.getItem("theme");

    if (currentTheme) {
      document.documentElement.setAttribute("data-theme", currentTheme);
      setTheme(currentTheme);
    } else {
      document.documentElement.setAttribute("data-theme", theme);
    }
  };

  useEffect(() => initializeTheme(), []);

  return (
    <div>
      <MediaQuery minWidth={769}>
        <NavbarDesktop theme={theme} setTheme={setTheme} />
      </MediaQuery>
      <MediaQuery maxWidth={768}>
        <HeaderMobile theme={theme} setTheme={setTheme} />
        {token && <NavbarMobile />}{" "}
      </MediaQuery>
    </div>
  );
};

export default Navbar;
