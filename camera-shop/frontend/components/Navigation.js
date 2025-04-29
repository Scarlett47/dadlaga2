'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function Navigation() {
  const pathname = usePathname();

  return (
    <nav className="bg-white shadow-md py-4 px-6 flex items-center justify-between">
      <Link href="/" className="text-2xl font-bold text-blue-600">🎥 Камер дэлгүүр</Link>

      <div className="space-x-6">
        <Link href="/" className={pathname === '/' ? 'text-blue-500 font-semibold' : 'text-gray-700 hover:text-blue-500'}>
          Нүүр
        </Link>
        <Link href="/orders" className={pathname === '/orders' ? 'text-blue-500 font-semibold' : 'text-gray-700 hover:text-blue-500'}>
          Захиалгууд
        </Link>
        <Link href="/cart" className={pathname === '/cart' ? 'text-blue-500 font-semibold' : 'text-gray-700 hover:text-blue-500'}>
          Сагс
        </Link>
        <Link href="/profile" className={pathname === '/profile' ? 'text-blue-500 font-semibold' : 'text-gray-700 hover:text-blue-500'}>
          Профайл
        </Link>
      </div>
    </nav>
  );
}
