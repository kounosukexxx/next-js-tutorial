import Link from 'next/link';
import Head from 'next/head';
import Script from 'next/script';
import Layout from '../../components/layout';

export default function FirstPost() {
  return (
    <Layout>
      <Head>
        <title>First Post</title>
      </Head>
      <Script
        src="https://connect.facebook.net/en_US/sdk.js"
        // A value of lazyOnload tells Next.js to load this particular script lazily during browser idle time
        strategy="lazyOnLoad"
        // onLoad is used to run any JavaScript code immediately after the script has finished loading
        onLoad={() =>
          console.log(`script loaded`)
        }
      />
      <h1>First Post</h1>
      <h2>
        <Link href="/">Back to home</Link>
      </h2>
    </Layout>
  );
}