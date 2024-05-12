import type { Metadata } from "next";
import { Montserrat_Alternates } from "next/font/google";
import "./globals.css";
import Navbar from "./_components/Navbar";
const montse = Montserrat_Alternates({
  weight: ["100", "400", "700"],
  subsets: ["latin-ext"],
});

export const metadata: Metadata = {
  title: "Pokédex",
  description: "Pokédex de la primera generación!",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={montse.className}>
        <Navbar />
        {children}
      </body>
    </html>
  );
}
