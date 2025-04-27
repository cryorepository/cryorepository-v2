import "./globals.css"
import Navbar from "@/components/layoutComponents/navbar"
import Footer from "@/components/layoutComponents/footer"
import { ThemeProvider } from "@/lib/theme-provider"
import { geistSans, geistMono } from "@/lib/fonts";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
          <Navbar />
          <main className="max-w-[1600px] mx-auto my-[64px] px-6">
            {children}
          </main>
          <Footer />
        </ThemeProvider>
      </body>
    </html>
  );
}