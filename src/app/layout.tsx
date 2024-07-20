import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Analytics } from "@vercel/analytics/react";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Ecrire",
  description: "Type quote of the day",
};

import { Poppins, Hahmlet, Merriweather } from "next/font/google";
const poppinFont = Poppins({
  preload: false,
  weight: ["400"],
  style: "normal",
  variable: "--font-poppins",
});
const hahmletFont = Hahmlet({
  preload: false,
  weight: ["400"],
  style: "normal",
  variable: "--font-hahmlet",
});

const merriweather = Merriweather({
  preload: false,
  weight: ["400"],
  style: "normal",
  variable: "--font-merriweather",
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${hahmletFont.variable} ${poppinFont.variable} ${merriweather.variable}`}
    >
      <body className={inter.className}>
        {children}
        <Analytics />
      </body>
    </html>
  );
}

//  <AuthContext>

//   {children}
// </AuthContext>
