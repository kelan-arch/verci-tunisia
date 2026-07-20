import type { Metadata } from "next";
import { Playfair_Display, Inter } from "next/font/google";
import "./globals.css";

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
  display: "swap",
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Verci x WanderQuest — Tunisia, October 2026",
  description:
    "A 7-day private quest across Tunisia. From the medinas of Tunis to the Sahara Desert. October 19–26, 2026.",
  openGraph: {
    title: "Verci x WanderQuest — Tunisia",
    description:
      "A slow immersion into a country that few travellers know in full. October 19–26, 2026.",
    images: ["/images/tunisia-002.jpg"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${playfair.variable} ${inter.variable} antialiased`}
    >
      <body className="bg-black text-white">{children}</body>
    </html>
  );
}
