/**
 * @file layout.tsx
 * @description Root layout for Cadence. Host Grotesk for UI / labels / RSVP word,
 *              JetBrains Mono for all metering numerics (WPM, countdown, speed ratio, delays).
 */

import type { Metadata } from "next";
import { Host_Grotesk, JetBrains_Mono } from "next/font/google";
import "./globals.css";

const hostGrotesk = Host_Grotesk({
  variable: "--font-sans",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

const jetBrainsMono = JetBrains_Mono({
  variable: "--font-mono",
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Cadence — AI Teleprompter",
  description:
    "An AI-powered teleprompter that tracks your speech in real time using Deepgram, adapting scroll speed to your natural reading pace.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${hostGrotesk.variable} ${jetBrainsMono.variable} h-full antialiased`}
    >
      <body
        className="min-h-full flex flex-col font-sans"
        style={{ backgroundColor: '#0d0f0c' }}
      >
        {children}
      </body>
    </html>
  );
}
