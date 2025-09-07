import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import Script from "next/script";
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
  title: "Rishikesh Bharat | Complete Travel Guide to Rishikesh",
  description:
    "Plan your trip to Rishikesh with Bharat's complete guide — rafting, yoga retreats, Ganga Aarti, treks, cafes, and stays. Authentic travel tips and experiences.",
  metadataBase: new URL("https://www.rishikeshbharat.com"),
  openGraph: {
    title: "Rishikesh Bharat | Complete Travel Guide to Rishikesh",
    description:
      "Explore Rishikesh like never before — rafting adventures, yoga schools, ashrams, treks, local cafes, and spiritual Ganga Aarti. Your trusted Rishikesh travel guide.",
    url: "https://www.rishikeshbharat.com",
    siteName: "Rishikesh Bharat",
    images: [
      {
        url: "/rishikeshbharat.png", 
        width: 1200,
        height: 630,
        alt: "Rishikesh Bharat Travel Guide",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Rishikesh Bharat | Complete Travel Guide to Rishikesh",
    description:
      "Rishikesh Bharat helps you plan rafting, yoga retreats, Ganga Aarti, treks, and stays with verified travel tips and guides.",
    images: ["/rishikeshbharat.png"],
  },
  alternates: {
    canonical: "https://www.rishikeshbharat.com",
  },
};


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <Script strategy="afterInteractive" async src="https://www.googletagmanager.com/gtag/js?id=G-53X66N15GG"></Script>
      <Script id="google-analytics"
        strategy="afterInteractive" >{`
      window.dataLayer = window.dataLayer || [];
      function gtag(){dataLayer.push(arguments);}
      gtag('js', new Date());

      gtag('config', 'G-53X66N15GG');`}
      </Script>
      <Script type="text/javascript" id="clarity">{`
    (function(c,l,a,r,i,t,y){
        c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};
        t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;
        y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);
    })(window, document, "clarity", "script", "t74m1ciqsf");`}
      </Script>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
