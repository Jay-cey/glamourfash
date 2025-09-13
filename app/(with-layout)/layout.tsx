import type { Metadata } from "next";
// import { Geist, Geist_Mono } from "next/font/google";
import "../../app/globals.css";
import Footer from "../../components/layout/footer";
import Navbar from "../../components/layout/Navbar";

// const geistSans = Geist({
//   variable: "--font-geist-sans",
//   subsets: ["latin"],
// });

// const geistMono = Geist_Mono({
//   variable: "--font-geist-mono",
//   subsets: ["latin"],
// });

export const metadata: Metadata = {
  title: "GlamourFash",
  description: "Where Elegance Meets Confidence",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <Navbar/>
      {children}
      <Footer/>
    </>
  );
}
