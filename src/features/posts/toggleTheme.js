export const toggleTheme = ({ theme, setTheme }) => {
  if (theme === "light") {
    document.documentElement.setAttribute("data-theme", "dark");
    localStorage.setItem("theme", "dark");
    setTheme("dark");
  } else {
    document.documentElement.setAttribute("data-theme", "light");
    localStorage.setItem("theme", "light");
    setTheme("light");
  }
};
