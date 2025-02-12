import React from "react";
import { useTheme } from "./ThemeContext";
import { MdSunny } from "react-icons/md";
import { FaMoon } from "react-icons/fa";

const ThemeButton = () => {
  const { theme, toggleTheme } = useTheme();
  console.log(theme);
  return (
    <div className="ml-3">
      <label className="swap swap-rotate">
        <input
          type="checkbox"
          className="theme-controller"
          onChange={toggleTheme}
          checked={theme === "dark"}
        />

        <p className="swap-off h-10 w-10 fill-current flex items-center justify-center text-black">
          <MdSunny size={28} />
        </p>
        <p className="swap-on h-10 w-10 fill-current flex items-center justify-center text-white">
          <FaMoon size={25} />
        </p>
      </label>
    </div>
  );
};

export default ThemeButton;
