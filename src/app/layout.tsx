import type { Metadata } from "next";
import { Caveat, Fraunces, Inter, Pixelify_Sans, VT323 } from "next/font/google";
import "./globals.css";

const fraunces = Fraunces({
  variable: "--font-display",
  subsets: ["latin"],
  axes: ["SOFT", "opsz"],
  display: "swap",
});

const inter = Inter({
  variable: "--font-sans",
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  display: "swap",
});

const caveat = Caveat({
  variable: "--font-hand",
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  display: "swap",
});

const pixelify = Pixelify_Sans({
  variable: "--font-pixel",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

const vt323 = VT323({
  variable: "--font-bitmap",
  subsets: ["latin"],
  weight: "400",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://jermayads.nl"),
  title: "Jermaya Leijen — Honest Google Ads. Useful AI. Code that ships.",
  description:
    "Freelance SEA specialist, AI engineer and developer. Ten-plus years running Google Ads and automation for agencies and e-commerce. Based in Tilburg.",
  icons: { icon: "/seo/favicon.png" },
  openGraph: {
    url: "https://jermayads.nl",
    type: "website",
    title: "Jermaya Leijen — Honest Google Ads. Useful AI. Code that ships.",
    description:
      "Freelance SEA, AI engineering, and development. Ten-plus years for agencies and e-commerce.",
    images: ["/seo/og-cover.png"],
  },
  twitter: {
    card: "summary_large_image",
    title: "Jermaya Leijen — Honest Google Ads. Useful AI. Code that ships.",
    description:
      "Freelance SEA, AI engineering, and development. Ten-plus years for agencies and e-commerce.",
    images: ["/seo/og-cover.png"],
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
      className={`${fraunces.variable} ${inter.variable} ${caveat.variable} ${pixelify.variable} ${vt323.variable} h-full`}
    >
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
