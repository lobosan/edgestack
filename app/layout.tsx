import { Navbar } from "./components/Navbar";
import { Footer } from "./components/Footer";
import { Providers } from "./Providers";
import "./globals.css";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="flex flex-col min-h-screen bg-white dark:bg-gray-900 text-gray-900 dark:text-white">
        <Providers>
          <Navbar />
          <main className="flex-grow container mx-auto px-4 py-8 mt-16">
            {children}
          </main>
          <Footer />
        </Providers>
      </body>
    </html>
  );
}
