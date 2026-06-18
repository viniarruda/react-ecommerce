import type { Metadata } from "next";
import { Syne, DM_Sans, Space_Mono } from "next/font/google";
import { SdkProvider } from "@react-shop/sdk";
import "@react-shop/design-system/src/styles/global.css";
import "./brand.css";
import { ThemeProvider } from "./providers/ThemeProvider";
import { GuestCartProvider } from "./providers/GuestCartProvider";
import { branding } from "@/config/branding";

const syne = Syne({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  variable: "--font-syne",
  display: "swap",
});

const dmSans = DM_Sans({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
  variable: "--font-dm-sans",
  display: "swap",
});

const spaceMono = Space_Mono({
  subsets: ["latin"],
  weight: ["400", "700"],
  variable: "--font-space-mono",
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: `${branding.store.name} - ${branding.store.tagline}`,
    template: `%s | ${branding.store.name}`,
  },
  description: branding.store.description,
};

function resolveApiUrl(url: string | undefined): string {
  const base = url || "http://localhost:5001";
  // Ensure the URL has a protocol so Axios treats it as absolute
  if (/^https?:\/\//.test(base)) return base;
  return `https://${base}`;
}

const apiConfig = {
  baseURL: resolveApiUrl(process.env.NEXT_PUBLIC_API_URL),
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang={branding.locale.language}
      className={`${syne.variable} ${dmSans.variable} ${spaceMono.variable}`}
      suppressHydrationWarning
    >
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `(function(){var t=localStorage.getItem('theme');if(t==='dark'||(!t&&window.matchMedia('(prefers-color-scheme: dark)').matches)){document.documentElement.classList.add('dark')}})()`,
          }}
        />
      </head>
      <body>
        <ThemeProvider>
          <GuestCartProvider>
            <SdkProvider apiConfig={apiConfig}>{children}</SdkProvider>
          </GuestCartProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
