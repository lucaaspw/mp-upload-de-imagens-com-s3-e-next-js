import type { Metadata } from "next";
import { Roboto } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/toaster";

const roboto = Roboto({
  weight: ['400','700'],
  subsets: ['latin'],
});

export const metadata: Metadata = {
  title: "Foto Upload",
  description: "Galeria de fotos no S3 da AWS",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={roboto.className}>
        <main className="bg-[#EAEFF8] h-full">
        {children}
        </main>
        <Toaster />
      </body>
    </html>
  );
}
