import type { Metadata } from "next";
import { Geist, Geist_Mono, Roboto } from "next/font/google";
import "./globals.css";
import TanStackProvider from "@/components/TanStackProvider/TanStackProvider";
import AuthProvider from "@/components/AuthProvider/AuthProvider";
import Header from "@/components/Header/Header";
import Footer from "@/components/Footer/Footer";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const roboto = Roboto({
  weight: ["300", "400", "500", "700"],
  variable: "--font-roboto",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "NoteHub - Manage Your Notes Efficiently",
  description: "NoteHub is a convenient application for creating, storing, and organizing your notes. Accessible from any device.",
   openGraph: {
    title: "NoteHub - Manage Your Notes",
    description: "NoteHub is a convenient application for creating, storing, and organizing your notes. Accessible from any device.",
    url: "https://your-app-url.com",
    images: [
      {
        url: "https://ac.goit.global/fullstack/react/notehub-og-meta.jpg",
        width: 1200,
        height: 630,
        alt: "NoteHub App Preview",
      },
    ],
    type: "website",
  },
};

export default function RootLayout({
  children,
  modal
}: Readonly<{
  children: React.ReactNode,
  modal: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable} ${roboto.variable}`}>
        <TanStackProvider>
          <AuthProvider>
            <Header />
            <main>
              {children}
              {modal}
            </main>
            <Footer />
          </AuthProvider>
        </TanStackProvider>
      </body>
    </html>
  );
}