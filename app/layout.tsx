import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import AppProviders from "@/contexts";
import NextTopLoader from "nextjs-toploader";
import 'rc-rate/assets/index.css';
import 'react-calendar/dist/Calendar.css';
import "react-multi-carousel/lib/styles.css";
import "react-datepicker/dist/react-datepicker.css";

import { Toaster } from "sonner";

const mako = localFont({
  src: "./fonts/Mako/Mako-Regular.ttf",
  variable: "--mako-font",
  weight: "500 600 700 800 900",
});

const poppins = localFont({
  src: [
    {
      path: "./fonts/Poppins/Poppins-Thin.ttf",
      style: "normal",
      weight: "100",
    },
    {
      path: "./fonts/Poppins/Poppins-Light.ttf",
      style: "normal",
      weight: "300",
    },
    {
      path: "./fonts/Poppins/Poppins-Regular.ttf",
      style: "normal",
      weight: "400",
    },
  ],
  variable: "--poppins-font",
});

export const metadata: Metadata = {
  title: "Martial Arts Guru: Explore Top Martial Arts Schools and Book Your Class Now!",
  description: "Explore Top Martial Arts Schools and Book Your Class",
  authors: [
    { 
      name: 'Ayoola Oloyede', 
      url: 'https://github.com/Josh-Ay', 
    },
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${mako.variable} ${poppins.variable}`}>
        <AppProviders>
          <NextTopLoader color={'var(--primary-app-color)'} showSpinner={false} />
          <Toaster />
          {children}
        </AppProviders>
      </body>
    </html>
  );
}
