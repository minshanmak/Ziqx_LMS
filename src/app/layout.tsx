import type { Metadata } from 'next';
import '../index.css';
import { Providers } from './providers';

export const metadata: Metadata = {
  title: 'Ziqx Skills — Admin Dashboard & Course Studio',
  description: 'Ziqx Skills Academy - Modern Learning Management System and Course Studio',
  icons: {
    icon: [
      { url: '/favicon.svg', type: 'image/svg+xml' },
      { url: '/favicon.png', type: 'image/png' },
    ],
    apple: '/favicon.png',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" type="image/svg+xml" href="/favicon.svg" />
        <link rel="alternate icon" type="image/png" href="/favicon.png" />
        <link rel="apple-touch-icon" href="/favicon.png" />
      </head>
      <body>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
