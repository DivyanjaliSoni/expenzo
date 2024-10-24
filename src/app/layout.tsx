"use client";
import "./globals.css";
import { Nunito } from "next/font/google";
import { useEffect, useState } from "react";
import { FaRegLightbulb } from "react-icons/fa6";
import { FaLightbulb } from "react-icons/fa6";
import { AiOutlineLogout } from "react-icons/ai";
import Cookies from "js-cookie";
import { usePathname, useRouter } from "next/navigation";

const nunito = Nunito({
  subsets: ["latin"],
});
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

  const pathname = usePathname();
  const router = useRouter();

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

  return (
    <html lang="en" className={isDarkMode ? "dark" : ""}>
      <head>
        <title>Expenzo</title>
        <meta name="description" content="Track your expenses efficiently." />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </head>
      <body className={nunito.className}>
        <header className="fixed top-0 w-full p-5 dark:bg-gray-700 dark:text-white bg-white border-b text-gray-800">
          <div className="flex justify-between items-center">
            <div className="text-2xl [text-shadow:1px_1px_2px_#565656]">
              EXPENZO
            </div>
            <div className="flex gap-4 justify-center items-center">
              <div
                className="text-2xl cursor-pointer"
                onClick={() => setIsDarkMode(!isDarkMode)}
              >
                {isDarkMode ? <FaRegLightbulb /> : <FaLightbulb />}
              </div>
              {isAuthenticated && (
                <div
                  className="text-2xl cursor-pointer"
                  onClick={() => {
                    Cookies.remove("authToken");
                    Cookies.remove("authUserId");
                    router.push("/login");
                  }}
                >
                  <AiOutlineLogout />
                </div>
              )}
            </div>
          </div>
        </header>
        <main className="mt-[71px]">{children}</main>
      </body>
    </html>
  );
}
