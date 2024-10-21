"use client";
import "./globals.css";
import { Nunito } from "next/font/google";
import { useState } from "react";
import { FaRegLightbulb } from "react-icons/fa6";
import { FaLightbulb } from "react-icons/fa6";
import { Provider } from "react-redux";
import { store } from "../store/store";
import { AiOutlineLogout } from "react-icons/ai";
import Cookies from "js-cookie";
import { useRouter } from "next/navigation";

const nunito = Nunito({
  subsets: ["latin"],
});
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const [isDarkMode, setIsDarkMode] = useState(true);
  const router = useRouter();
  return (
    <html lang="en" className={isDarkMode ? "dark" : ""}>
      <head>
        <title>Expenzo</title>
        <meta name="description" content="Track your expenses efficiently." />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </head>
      <body className={nunito.className}>
        <Provider store={store}>
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
              </div>
            </div>
          </header>
          <main className="mt-[71px]">{children}</main>
        </Provider>
      </body>
    </html>
  );
}
