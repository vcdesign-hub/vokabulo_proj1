'use client';

import { useState } from 'react';
import Link from 'next/link';

export function MobileMenu() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <button
        className="ml-3 inline-flex h-10 w-10 items-center justify-center rounded-full border border-white/60 bg-white/70 text-slate-700 shadow-sm transition hover:-translate-y-0.5 hover:shadow-soft md:hidden"
        aria-label="Open menu"
        onClick={() => setIsOpen(!isOpen)}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-5 w-5"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="1.5"
            d="M4 7h16M4 12h16M4 17h16"
          />
        </svg>
      </button>

      <div
        id="mobile-menu"
        className={`mx-auto max-w-5xl px-4 pb-4 md:hidden ${isOpen ? '' : 'hidden'}`}
      >
        <div className="flex flex-col gap-3 rounded-2xl border border-slate-200 bg-white p-4 shadow-soft">
          <Link
            className="py-1 text-sm font-medium text-slate-800"
            href="/#features"
            onClick={() => setIsOpen(false)}
          >
            Features
          </Link>
          <Link
            className="py-1 text-sm font-medium text-slate-800"
            href="/#faq"
            onClick={() => setIsOpen(false)}
          >
            FAQ
          </Link>
          <Link
            className="py-1 text-sm font-medium text-slate-800"
            href="/support"
            onClick={() => setIsOpen(false)}
          >
            Support
          </Link>
          <div className="flex gap-2 pt-2">
            <Link
              href="/#hero"
              className="btn-accent flex-1 px-4 py-2 text-center text-sm font-semibold shadow-soft"
              onClick={() => setIsOpen(false)}
            >
              Sign up
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}
