import "./globals.css";
import { Nunito } from "next/font/google";
import type { Metadata, Viewport } from "next";
import Header from "./Components/header/page";

const nunito = Nunito({
  subsets: ["latin"],
});
export const metadata: Metadata = {
  manifest: "/manifest.json",
  title: "Expenso",
  description: "Track your expenses efficiently.",
};
export const viewport: Viewport = {
  themeColor: "#FFFFFF",
};


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
      <link rel="icon" href="/favicon.ico" />
      </head>
      <body className={nunito.className}>
        <Header />
        <main className="mt-[71px]">{children}</main>
      </body>
    </html>
  );
}
