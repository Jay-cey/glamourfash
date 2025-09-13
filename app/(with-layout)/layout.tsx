import type { Metadata } from "next";
// import "../../app/globals.css";
import Footer from "../../components/layout/footer";
import Navbar from "../../components/layout/Navbar";

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
