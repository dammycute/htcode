import Link from 'next/link';
import Header from '@/components/Header';

export const metadata = { title: 'Page not found' };

export default function NotFound() {
  return (
    <>
      <Header />
      <main id="main" className="mx-auto max-w-6xl px-5 sm:px-8 min-h-[100dvh] flex flex-col justify-center">
        <p className="tabular text-sm text-ink-3">404</p>
        <h1 className="display mt-4 text-6xl sm:text-8xl">This page doesn’t exist.</h1>
        <Link href="/" className="mt-10 link-line w-fit">Back to the portfolio</Link>
      </main>
    </>
  );
}
