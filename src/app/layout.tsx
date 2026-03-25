import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import Header from "@/components/header";
import { headers } from "next/headers";
import { auth } from "@/lib/auth";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "StripeShop — Hello World",
  description: "Page d'accueil de l'application StripeShop",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  let isConnected = false;

  try {
    const session = await auth.api.getSession({
      headers: await headers(),
    });
    isConnected = Boolean(session?.user);
  } catch {
    isConnected = false;
  }

  return (
    <html
      lang="fr"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col font-sans">
        <Header isConnected={isConnected} />
        {children}
      </body>
    </html>
  );
}
