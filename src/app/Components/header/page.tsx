"use client";
import React from "react";
import { useEffect, useState } from "react";
import { FaRegLightbulb } from "react-icons/fa6";
import { FaLightbulb } from "react-icons/fa6";
import { AiOutlineLogout } from "react-icons/ai";
import Cookies from "js-cookie";
import { usePathname, useRouter } from "next/navigation";
import useDarkMode from '../usedarkmode/page';

const Header = () => {
  const pathname = usePathname();
  const router = useRouter();
  const isDefaultDarkMode = useDarkMode();

  useEffect(()=>{
    if(isDefaultDarkMode){    
      document.documentElement.classList.add("dark")
    }
  },[isDefaultDarkMode])

  const [isDarkMode, setIsDarkMode] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const checkAuth = () => {
    const token = Cookies.get("authToken");
    setIsAuthenticated(!!token);
  };

  useEffect(() => {
    checkAuth();
  }, [pathname]);

  const handleLogout = () => {
    Cookies.remove("authToken");
    Cookies.remove("authUserId");
    setIsAuthenticated(false);
    router.push("/login");
  };

  const setTheme = () => {
    const htmlElement = document.documentElement
    htmlElement.classList.toggle("dark");
  };
  

  return (
    <header className="fixed top-0 w-full p-5 dark:bg-gray-700 dark:text-white bg-white border-b text-gray-800 z-50">
      <div className="flex justify-between items-center">
        <div className="text-2xl [text-shadow:1px_1px_2px_#565656]">
          EXPENSO
        </div>
        <div className="flex gap-4 justify-center items-center">
          <div
            className="text-2xl cursor-pointer"
            onClick={() => {
                setTheme()
                setIsDarkMode(!isDarkMode)
            }}
          >
            {isDarkMode ? <FaRegLightbulb /> : <FaLightbulb />}
          </div>
          {isAuthenticated && (
            <div
              className="text-2xl cursor-pointer"
              onClick={() => handleLogout()}
            >
              <AiOutlineLogout />
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
