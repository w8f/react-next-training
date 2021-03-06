import type { NextPage } from "next";
import Head from "next/head";
import Link from "next/link";

const Home: NextPage = () => {
  return (
    <>
      <Head>
        <title>Create Next App</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="bg-stone-50 overflow-auto text-center min-h-screen">
        <h1 className="text-3xl font-bold mt-10">
          Next.js Training Repository
        </h1>
        <div className="mt-10">
          <Link href="http://localhost:3000/">Switch React Training Pages</Link>
        </div>
      </main>
    </>
  );
};

export default Home;
