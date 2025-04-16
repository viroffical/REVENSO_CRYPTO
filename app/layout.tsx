import { Inter } from 'next/font/google';
import './globals.css';
import type { Metadata } from 'next';
import AuthStatus from './components/AuthStatus';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'REVENSO',
  description: 'Connect with professionals at crypto events',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <div className="min-h-screen flex flex-col">
          <header className="bg-white shadow-sm py-4">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="flex justify-between items-center">
                <h1 className="text-2xl font-bold text-yellow-500">REVENSO</h1>
                <AuthStatus />
              </div>
            </div>
          </header>
          <main className="flex-grow">{children}</main>
          <footer className="bg-white py-4 border-t border-gray-200">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <p className="text-center text-sm text-gray-500">
                &copy; {new Date().getFullYear()} REVENSO. All rights reserved.
              </p>
            </div>
          </footer>
        </div>
      </body>
    </html>
  );
}