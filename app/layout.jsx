import Header from "@/components/Header";
import PageTransition from "@/components/PageTransition";
import ParticlesComponent from "@/components/ParticlesComponent";
// import StairTransition from "@/components/StairTransition";
import LoadingTransition from "@/components/LoadingTransition";
import { JetBrains_Mono, Inter } from "next/font/google";
import { ConvexClientProvider } from "./ConvexClientProvider";
import "./globals.css";

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700", "800"],
  variable: "--font-jetbrainsMono",
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

export const metadata = {
  title: "Mark Tamang",
  description: "Portfolio of software development highlights",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${jetbrainsMono.className} ${inter.variable} flex flex-col min-h-screen`}>
        <Header />
        {/* <StairTransition /> */}
        <LoadingTransition />
        <ConvexClientProvider>
          <PageTransition>
            <main className="flex-grow pt-[100px] xl:pt-[120px]">
              {children}
            </main>
          </PageTransition>
        </ConvexClientProvider>
        <ParticlesComponent id="particles" />
      </body>
    </html>
  );
}
