import Head from 'next/head';
import Header from './Header';
import './Header.module.css';

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Head>
        <title>Azure Cloud Final Project</title>
      </Head>
      <Header />
      <main>
        <div className="container">{children}</div>
      </main>
    </>
  );
}
