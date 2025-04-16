import { Metadata } from 'next';
import { ReactNode } from 'react';

export const metadata: Metadata = {
  title: {
    template: '%s | REVENSO',
    default: 'Authentication | REVENSO',
  },
  description: 'Authenticate to access your REVENSO account',
};

export default function AuthLayout({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen flex flex-col">
      <header className="bg-white shadow-sm py-4">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center">
            <h1 className="text-2xl font-bold text-yellow-500">REVENSO</h1>
          </div>
        </div>
      </header>
      <main className="flex-grow bg-gray-50">{children}</main>
      <footer className="bg-white py-4 border-t border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="text-center text-sm text-gray-500">
            &copy; {new Date().getFullYear()} REVENSO. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
}