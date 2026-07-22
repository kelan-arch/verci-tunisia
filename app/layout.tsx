import type { Metadata } from "next";
import { Cormorant_Garamond, Inter, Amiri } from "next/font/google";
import "./globals.css";

const cormorant = Cormorant_Garamond({
  variable: "--font-cormorant",
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  style: ["normal", "italic"],
  display: "swap",
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

const amiri = Amiri({
  variable: "--font-amiri",
  subsets: ["arabic"],
  weight: ["400"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Verci in Tunisia — wanderquest × VERCI NYC, October 2026",
  description:
    "A 7-day private quest across Tunisia. From the medinas of Tunis to the Sahara Desert. October 19–26, 2026.",
  openGraph: {
    title: "Verci in Tunisia",
    description:
      "A slow immersion into a country that few travellers know in full. October 19–26, 2026.",
    images: ["/images/brand/poster.jpg"],
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
      className={`${cormorant.variable} ${inter.variable} ${amiri.variable} antialiased`}
    >
      <body className="bg-paper text-ink">{children}</body>
    </html>
  );
}
