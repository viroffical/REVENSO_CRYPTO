import '../styles/globals.css'
import '../styles/swipe.css'
import Head from 'next/head'

export default function App({ Component, pageProps }) {
  return (
    <>
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no" />
        <meta name="theme-color" content="#FFFFFF" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="description" content="Bumble-like swipeable card interface" />
        <title>Revenso | Crypto Networking App</title>
      </Head>
      <Component {...pageProps} />
    </>
  )
}