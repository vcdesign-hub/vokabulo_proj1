'use client';

import Link from 'next/link';
import Image from 'next/image';
import { ThemeToggle } from './ThemeToggle';
import { MobileMenu } from './MobileMenu';

export function Header() {
  return (
    <div className="fixed top-0 left-0 right-0 z-50">
      <div className="px-3 py-3 md:px-6">
        <header className="nav-shell mx-auto flex max-w-5xl items-center justify-between gap-4 px-4 py-3 md:px-6">
          <Link
            href="/"
            className="flex items-center gap-3 text-lg font-semibold tracking-tight text-slate-900"
          >
            <img
              src="/logo on white.svg"
              alt="Vokabulo logo"
              className="logo-light"
            />
            <img
              src="/logo on dark.svg"
              alt="Vokabulo logo"
              className="logo-dark"
            />
          </Link>
          <nav className="hidden items-center gap-8 text-sm font-semibold text-slate-700 md:flex">
            <Link className="transition hover:text-slate-900" href="/#features">
              Features
            </Link>
            <Link className="transition hover:text-slate-900" href="/#faq">
              FAQ
            </Link>
            <Link className="transition hover:text-slate-900" href="/support">
              Support
            </Link>
          </nav>
          <div className="hidden md:flex items-center gap-3 text-sm font-semibold">
            <ThemeToggle />
            <Link href="/#hero" className="btn-accent px-4 py-2 shadow-soft">
              Sign up
            </Link>
          </div>
          <MobileMenu />
        </header>
      </div>
    </div>
  );
}
