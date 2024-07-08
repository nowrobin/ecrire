import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Analytics } from "@vercel/analytics/react";
import Header from "./component/header/page";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Ecrire",
  description: "Type quote of the day",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Header></Header>
        {children}
        <Analytics />
      </body>
    </html>
  );
}

//  <AuthContext>

//   {children}
// </AuthContext>
