import type { Metadata } from "next";
import { Inter_Tight, Kanit } from "next/font/google";
import "./globals.css";

const interTight = Inter_Tight({
  variable: "--font-inter-tight",
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
});

const kanit = Kanit({
  variable: "--font-kanit",
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://jermayads.nl"),
  title: "Freelance SEA specialist | Focus op e-commerce",
  description:
    "Freelance Google Ads specialist en passie voor Automation, dashboarding en data. Om jullie bedrijfsdoelstellingen te behalen en online groei te realiseren.",
  icons: { icon: "/seo/favicon.png" },
  openGraph: {
    url: "https://jermayads.nl",
    type: "website",
    title: "Freelance SEA specialist | Focus op e-commerce",
    description:
      "Freelance Google Ads specialist en passie voor Automation, dashboarding en data. Om jullie bedrijfsdoelstellingen te behalen en online groei te realiseren.",
    images: ["/seo/og-cover.png"],
  },
  twitter: {
    card: "summary_large_image",
    title: "Freelance SEA specialist | Focus op e-commerce",
    description:
      "Freelance Google Ads specialist en passie voor Automation, dashboarding en data. Om jullie bedrijfsdoelstellingen te behalen en online groei te realiseren.",
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
      lang="nl"
      className={`${interTight.variable} ${kanit.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-body text-white">
        {children}
      </body>
    </html>
  );
}
