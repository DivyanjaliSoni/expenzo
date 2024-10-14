"use client";
import "./globals.css";
import { Nunito } from "next/font/google";
import { useState } from "react";
import { FaRegLightbulb } from "react-icons/fa6";
import { FaLightbulb } from "react-icons/fa6";
import { Provider } from "react-redux";
import { store } from '../store/store';

const nunito = Nunito({
  subsets: ["latin"],
});
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const [isDarkMode, setIsDarkMode] = useState(true);
  return (
    <html lang="en" className={isDarkMode ? "dark" : ""}>
      <body className={nunito.className}>
      <Provider store={store}>
        <header className="fixed top-0 w-full p-5 dark:bg-gray-700 dark:text-white bg-white border-b text-gray-800">
          <div className="flex justify-between items-center">
            <div className="text-2xl [text-shadow:1px_1px_2px_#565656]">
              EXPENZO
            </div>
            <div
              className="text-2xl cursor-pointer"
              onClick={() => setIsDarkMode(!isDarkMode)}
            >
              {isDarkMode ? <FaRegLightbulb /> : <FaLightbulb />}
            </div>
          </div>
        </header>
        <main className="mt-[71px]">
        {children}
        </main>
        </Provider>
      </body>
    </html>
  );
}
