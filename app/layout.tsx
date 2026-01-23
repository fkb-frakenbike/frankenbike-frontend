'use client';

import { Geist, Geist_Mono } from 'next/font/google';
import './globals.css';
import Header from './components/Header';
import { AuthProvider } from './context/AuthContext';
import { ProjectProvider } from './context/ProjectContext';

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr" suppressHydrationWarning className="light">
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        <AuthProvider>
          <ProjectProvider>
            <Header />
            <main className="m-0 p-0">{children}</main>
          </ProjectProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
