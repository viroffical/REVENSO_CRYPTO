import '../styles/globals.css'
import Head from 'next/head'
import { Inter } from 'next/font/google'

export default function App({ Component, pageProps }) {
  return (
    <>
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1" />
        <meta name="description" content="Bumble-like swipeable card interface" />
        <link href="https://cdn.jsdelivr.net/npm/tailwindcss@2.2.19/dist/tailwind.min.css" rel="stylesheet" />
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0-beta3/css/all.min.css" />
        <title>Bumble Clone</title>
      </Head>
      <Component {...pageProps} />
    </>
  )
}