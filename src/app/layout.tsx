"use client";
import "./globals.css";
import { Nunito } from "next/font/google";
import { useState } from "react";
import { FaRegLightbulb } from "react-icons/fa6";
import { FaLightbulb } from "react-icons/fa6";

// const geistSans = localFont({
//   src: "./fonts/GeistVF.woff",
//   variable: "--font-geist-sans",
//   weight: "100 900",
// });
// const geistMono = localFont({
//   src: "./fonts/GeistMonoVF.woff",
//   variable: "--font-geist-mono",
//   weight: "100 900",
// });


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
    <html lang="en" className={isDarkMode?'dark':''}>
      <body className={nunito.className}>
        <header className="p-5 dark:bg-gray-800 dark:text-white bg-white border-b text-gray-800">
          <div className="flex justify-between items-center">
            <div className="text-2xl [text-shadow:1px_1px_2px_#565656]">EXPENZO</div>
            <div
              className="text-2xl cursor-pointer"
              onClick={() => setIsDarkMode(!isDarkMode)}
            >
              {isDarkMode ? <FaRegLightbulb /> : <FaLightbulb />}
            </div>
          </div>
        </header>
        {children}
      </body>
    </html>
  );
}
