import React, { useEffect } from 'react';
import Head from 'next/head';
import { useRouter } from 'next/router';
import CaseNavigator from './case-navigator';

export default function Home() {
  const router = useRouter();

  return (
    <div className="min-h-screen bg-gray-50">
      <Head>
        <title>REVENSO Form Examples</title>
        <meta name="description" content="Form examples for REVENSO" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="py-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <CaseNavigator />
          
          <div className="mt-10 text-center">
            <h1 className="text-4xl font-extrabold text-gray-900 sm:text-5xl sm:tracking-tight lg:text-6xl">
              REVENSO Form Examples
            </h1>
            <p className="mt-5 max-w-xl mx-auto text-xl text-gray-500">
              Choose a form example from the navigation above
            </p>

            <div className="mt-10 space-y-6">
              <div className="bg-white shadow overflow-hidden rounded-lg">
                <div className="px-4 py-5 sm:p-6">
                  <h3 className="text-lg leading-6 font-medium text-gray-900">Case 1: Onboarding Form</h3>
                  <div className="mt-2 max-w-xl text-sm text-gray-500">
                    <p>A multi-step onboarding form with validation and form state management</p>
                  </div>
                  <div className="mt-5">
                    <button
                      type="button"
                      onClick={() => router.push('/onboarding')}
                      className="inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-yellow-500 hover:bg-yellow-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-yellow-500"
                    >
                      View Example
                    </button>
                  </div>
                </div>
              </div>

              <div className="bg-white shadow overflow-hidden rounded-lg">
                <div className="px-4 py-5 sm:p-6">
                  <h3 className="text-lg leading-6 font-medium text-gray-900">Case 2: Professional Details Form</h3>
                  <div className="mt-2 max-w-xl text-sm text-gray-500">
                    <p>A form with Occupation, Bio, and Event dropdown fields with custom image integration</p>
                  </div>
                  <div className="mt-5">
                    <button
                      type="button"
                      onClick={() => router.push('/professional-form')}
                      className="inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-yellow-500 hover:bg-yellow-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-yellow-500"
                    >
                      View Example
                    </button>
                  </div>
                </div>
              </div>

              <div className="bg-white shadow overflow-hidden rounded-lg">
                <div className="px-4 py-5 sm:p-6">
                  <h3 className="text-lg leading-6 font-medium text-gray-900">Case 3: Original Form</h3>
                  <div className="mt-2 max-w-xl text-sm text-gray-500">
                    <p>A simple contact form with validation and form submission</p>
                  </div>
                  <div className="mt-5">
                    <button
                      type="button"
                      onClick={() => router.push('/original-form')}
                      className="inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-yellow-500 hover:bg-yellow-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-yellow-500"
                    >
                      View Example
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}