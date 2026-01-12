import Link from 'next/link';

export function Footer() {
  return (
    <footer className="border-t border-slate-200 bg-white/90 py-8">
      <div className="mx-auto flex max-w-5xl flex-col gap-4 px-4 text-sm text-slate-600 md:flex-row md:items-center md:justify-between md:px-6">
        <Link
          href="/"
          className="flex items-center gap-3 text-lg font-semibold tracking-tight text-slate-800"
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
        <div className="flex flex-wrap gap-4">
          <Link className="hover:text-slate-900" href="/#features">
            Features
          </Link>
          <Link className="hover:text-slate-900" href="/#faq">
            FAQ
          </Link>
          <Link className="hover:text-slate-900" href="/support">
            Support
          </Link>
          <Link className="hover:text-slate-900" href="/legal-notice">
            Legal Notice
          </Link>
          <Link className="hover:text-slate-900" href="/data-protection">
            Privacy Policy
          </Link>
        </div>
        <p className="text-slate-500">Speak a little more fluently every day.</p>
      </div>
    </footer>
  );
}
