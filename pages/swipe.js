import React from 'react';
import Head from 'next/head';
import SwipeableCardStack from '../components/SwipeableCardStack';
import BottomNavigation from '../components/BottomNavigation';

export default function SwipePage() {
  return (
    <div className="min-h-screen flex flex-col">
      <Head>
        <title>REVENSO - Swipe</title>
        <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no" />
        <meta name="description" content="Swipe and connect with people and events" />
      </Head>
      
      <header className="bg-yellow-400 py-4 px-4 text-white shadow-md">
        <h1 className="text-2xl font-bold text-center">REVENSO</h1>
      </header>
      
      <main className="flex-1 overflow-hidden">
        <SwipeableCardStack />
      </main>
      
      <BottomNavigation />
    </div>
  );
}