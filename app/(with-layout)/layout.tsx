"use client";

import "../globals.css";
import Footer from "../../components/layout/footer";
import Navbar from "../../components/layout/Navbar";
import { Playfair_Display, Montserrat } from "next/font/google";
import { usePathname } from "next/navigation";

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-serif",
  display: "swap",
});

const montserrat = Montserrat({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const pathname = usePathname();
  const isHomePage = pathname === "/";

  return (
    <div className={`min-h-screen flex flex-col justify-between ${montserrat.className} ${playfair.variable} ${
      isHomePage ? "" : "pt-20"
    }`}>
      <Navbar/>
      {children}
      <Footer/>
    </div>
  );
}
