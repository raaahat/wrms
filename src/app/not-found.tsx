// app/not-found.tsx or pages/404.tsx
import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <h1 className="text-4xl font-bold">404 - Page Not Found</h1>
      <p className="mt-4">Sorry, the page you're looking for doesn't exist.</p>
      <Link href="/">
        <div className="mt-6 px-4 py-2 bg-blue-500 text-white rounded-md">
          Go Home
        </div>
      </Link>
    </div>
  );
}
