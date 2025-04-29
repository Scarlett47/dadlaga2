'use client'; // ✨ Энэ файл client талд ажиллана!

import { usePathname } from 'next/navigation';
import Navigation from './Navigation';

export default function NavigationWrapper() {
  const pathname = usePathname();
  const showNavigation = !pathname.startsWith('/login') && !pathname.startsWith('/register');

  return showNavigation ? <Navigation /> : null;
}
