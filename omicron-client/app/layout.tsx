import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Analytics } from '@vercel/analytics/next';

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Talksy - Lets meet some strangers",
  description: "Meetings strangers around the word made easy through Talksy. A random person video conferrensing application.",
  keywords: [
    "Next.js", "React", "Ramanshu", "Ramanshu Sharan Mishra", "Sharan", "Mishra",
    "Ramanshu Mishra", "Ramanshu Sharan", "Ram", "Indophoenix", "phoenix", "ramspace", "Ramspace", "Space",
    "Talksy", "Omegle", "Ome.tv", "Random", "Random people", "Strangers", "Video conferencing", "video", "google meet"
  ],
  authors: [{ name: "Ramanshu Sharan Mishra", url: "https://talksy.fun" }],
  creator: "Ramanshu Sharan Mishra",
  metadataBase: new URL("https://www.talksy.fun"),
  alternates: {
    canonical: "https://www.talksy.fun/",
    languages: {
      "en-US": "https://www.talksy.fun/en-US",
    },
  },
  openGraph: {
    title: "Talksy - Lets meet some strangers",
    description: "Meetings strangers around the word made easy through Talksy. A random person video conferrensing application.",
    url: "https://www.talksy.fun",
    siteName: "talksy",
    locale: "en_US",
    type: "website",
    images: [
      {
        url: "https://www.talksy.fun/og.png",
        width: 1200,
        height: 630,
        alt: "Talksy",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Talksy - Lets meet some strangers",
    description: "Meetings strangers around the word made easy through Talksy. A random person video conferrensing application.",
    site: "@RamanshuSharan",
    creator: "@RamanshuSharan",
    images: ["https://www.talksy.fun/og.png"],
  },
  icons: {
    icon: "/favicon.ico",
    apple: "/favicon.ico",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
        <Analytics></Analytics>
      </body>
    </html>
  );
}
