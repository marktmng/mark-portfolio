import Header from "@/components/Header";
import PageTransition from "@/components/PageTransition";
import ParticlesComponent from "@/components/ParticlesComponent";
// import StairTransition from "@/components/StairTransition";
import LoadingTransition from "@/components/LoadingTransition";
import { JetBrains_Mono } from "next/font/google";
import { ConvexClientProvider } from "./ConvexClientProvider";
import "./globals.css";

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700", "800"],
  variable: "--font-jetbrainsMono",
});

export const metadata = {
  title: "Mark Tamang",
  description: "Portfolio of software development highlights",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={jetbrainsMono.className}>
        <Header />
        {/* <StairTransition /> */}
        <LoadingTransition />
        <ConvexClientProvider>
          <PageTransition>{children}</PageTransition>
        </ConvexClientProvider>
        <ParticlesComponent id="particles" />
      </body>
    </html>
  );
}
