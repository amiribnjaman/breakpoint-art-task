import { Inter } from "next/font/google";
import "./globals.css";
import { Toaster } from "react-hot-toast";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Breakpoint Recipe",
  description: "You must like it.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <Toaster position="bottom-center" />
      <body className={inter.className}>
        <main className="pt-20 mb-10">
          <h1 className="text-4xl font-bold text-center">Recipe app</h1>
          {children}
        </main>
      </body>
    </html>
  );
}
