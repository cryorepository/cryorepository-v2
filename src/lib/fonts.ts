import { Geist } from "next/font/google"; // or wherever you are importing from
import { Geist_Mono } from "next/font/google"; // same here

export const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

export const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});