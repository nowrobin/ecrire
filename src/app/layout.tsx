import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Header from "./component/header/page";

// import AuthContext from "./api/auth/providers";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Ecrire",
  description: "Type your Quote of the day",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="kor">
      <body className={inter.className}>
        <Header></Header>
        {children}
      </body>
    </html>
  );
}

//  <AuthContext>

//   {children}
// </AuthContext>
