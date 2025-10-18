'use client';

import React from 'react';
import { Geist, Geist_Mono } from 'next/font/google';
import './globals.css';
import Header from './components/Header';
import { usePathname } from 'next/navigation';
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
  const pathname = usePathname();
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        <ProjectProvider>
          {pathname !== '/' && <Header />}
          <main className="m-0 p-0">{children}</main>
        </ProjectProvider>
      </body>
    </html>
  );
}
