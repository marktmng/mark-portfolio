import Header from "@/components/Header";
import PageTransition from "@/components/PageTransition";
import ParticlesComponent from "@/components/ParticlesComponent";
import StairTransition from "@/components/StairTransition";
import { JetBrains_Mono } from "next/font/google";
import "./globals.css";

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700", "800"],
  variable: "--font-jetbrainsMono",
});

export const metadata = {
  title: "Mark Tmng",
  description: "Portfolio of software development highlights",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/mark.ico" type="image/x-icon" />
        <title>{metadata.title}</title>
        <meta name="description" content={metadata.description} />
      </head>
      <body className={jetbrainsMono.className}>
        <Header />
        <StairTransition />
        <PageTransition>{children}</PageTransition>
        <ParticlesComponent id="particles" />
      </body>
    </html>
  );
}
