import './globals.css';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Dockly - Organize Your Digital Life in One Place',
  description: 'Connect and manage everything that matters - from calendars and finances to family planning and personal projects. Dockly brings it all together in one beautiful, intelligent workspace.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1" />
        <meta property="og:title" content="Dockly - Organize Your Digital Life in One Place" />
        <meta property="og:description" content="Connect and manage everything that matters - from calendars and finances to family planning and personal projects. Dockly brings it all together in one beautiful, intelligent workspace." />
        <meta property="og:type" content="website" />
        <link rel="icon" type="image/png" href="/dockly-logo-header.png" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800;900&display=swap" rel="stylesheet" />
      </head>
      <body className={inter.className}>{children}</body>
    </html>
  );
}
