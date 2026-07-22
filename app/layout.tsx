import ColourPicker from "@/components/ColourPicker";
import { ThemeProvider } from "@/components/ThemeProvider";
import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Betty Kronemeijer",
  description: "Hi, this is me and I like to build things.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="nl">
      <body>
        <ThemeProvider>
          {children}
          <ColourPicker />
        </ThemeProvider>
      </body>
    </html>
  );
}
