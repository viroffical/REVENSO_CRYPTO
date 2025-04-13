import '../styles/globals.css'
import Head from 'next/head'

export default function App({ Component, pageProps }) {
  return (
    <>
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1" />
        <meta name="description" content="Bumble-like swipeable card interface" />
        <title>Bumble Clone</title>
      </Head>
      <Component {...pageProps} />
    </>
  )
}