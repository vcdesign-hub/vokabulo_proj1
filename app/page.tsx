'use client';

import Link from 'next/link';

export default function Home() {
  return (
    <>
      <style jsx global>{`
        /* Index page-specific styles */
        body {
          background: radial-gradient(circle at 10% 20%, #f0f4ff 0, rgba(240, 244, 255, 0) 26%),
            radial-gradient(circle at 80% 0%, #eef6ff 0, rgba(238, 246, 255, 0) 20%),
            var(--bg);
          color: var(--ink);
        }

        .card {
          border: 1px solid var(--border);
          background: #ffffff;
          border-radius: calc(var(--radius) * 1.1);
          box-shadow: var(--shadow, 0 18px 48px rgba(15, 23, 42, 0.05));
        }

        .btn-primary {
          background: linear-gradient(135deg, #0f172a, #111827 60%, #0b1224);
          color: #ffffff;
          border-radius: 9999px;
          transition: transform 150ms ease, box-shadow 150ms ease, background 150ms ease, filter 150ms ease;
        }

        .btn-primary:hover {
          transform: translateY(-1px);
          box-shadow: 0 14px 28px rgba(15, 23, 42, 0.18);
          filter: brightness(1.02);
        }

        .hero-panel {
          position: relative;
          border-radius: 28px;
          border: 1px solid var(--border);
          background: linear-gradient(135deg, #ffffff 0%, #f8fbff 60%, #f6f9ff 100%);
          box-shadow: 0 24px 60px rgba(15, 23, 42, 0.07);
          overflow: hidden;
        }

        .hero-panel::after {
          content: '';
          position: absolute;
          inset: 0;
          background: radial-gradient(circle at 20% 20%, rgba(14, 165, 233, 0.08), transparent 45%),
            radial-gradient(circle at 80% 10%, rgba(14, 165, 233, 0.06), transparent 35%);
          pointer-events: none;
        }

        .hero-card {
          border-radius: 22px;
          border: 1px solid rgba(255, 255, 255, 0.7);
          background: #ffffff;
          box-shadow: 0 18px 40px rgba(15, 23, 42, 0.12);
        }

        .feature-visual {
          border-radius: 24px;
          border: 1px solid rgba(255, 255, 255, 0.6);
          background: radial-gradient(120% 140% at 75% 25%, rgba(247, 94, 43, 0.35), rgba(247, 94, 43, 0) 55%),
            radial-gradient(120% 140% at 20% 30%, rgba(144, 167, 192, 0.45), rgba(144, 167, 192, 0) 65%),
            #f8fafc;
          box-shadow: 0 22px 55px rgba(15, 23, 42, 0.12);
        }

        .hero-animate {
          position: relative;
          overflow: hidden;
          isolation: isolate;
        }

        .hero-animate::before,
        .hero-animate::after {
          content: '';
          position: absolute;
          inset: -30%;
          background: radial-gradient(circle at 30% 30%, rgba(247, 126, 90, 0.35), transparent 45%),
            radial-gradient(circle at 70% 20%, rgba(147, 180, 210, 0.35), transparent 40%),
            radial-gradient(circle at 40% 70%, rgba(255, 205, 178, 0.28), transparent 50%);
          filter: blur(8px);
          animation: heroFloat 18s ease-in-out infinite;
          z-index: -1;
        }

        .hero-animate::after {
          animation-direction: reverse;
          animation-duration: 24s;
          opacity: 0.7;
        }

        @keyframes heroFloat {
          0% {
            transform: translate3d(-6%, -4%, 0) scale(1);
          }
          50% {
            transform: translate3d(6%, 6%, 0) scale(1.05);
          }
          100% {
            transform: translate3d(-6%, -4%, 0) scale(1);
          }
        }

        .theme-dark body {
          background: radial-gradient(circle at 10% 20%, rgba(34, 211, 238, 0.08) 0, rgba(34, 211, 238, 0) 26%),
            radial-gradient(circle at 80% 0%, rgba(248, 113, 113, 0.12) 0, rgba(248, 113, 113, 0) 22%),
            #0b1220;
          color: var(--ink);
        }

        .theme-dark .card,
        .theme-dark .hero-card,
        .theme-dark .feature-visual {
          background: #0f1628;
          border-color: #1f2937;
          box-shadow: 0 24px 60px rgba(0, 0, 0, 0.28);
        }

        .theme-dark .btn-primary {
          background: linear-gradient(135deg, #1f2937, #0f172a 60%, #0b1224);
        }

        .theme-dark .hero-animate::before,
        .theme-dark .hero-animate::after {
          background: radial-gradient(circle at 30% 30%, rgba(248, 113, 113, 0.28), transparent 45%),
            radial-gradient(circle at 70% 20%, rgba(56, 189, 248, 0.25), transparent 40%),
            radial-gradient(circle at 40% 70%, rgba(147, 197, 253, 0.18), transparent 50%);
        }

        .theme-dark .text-slate-900,
        .theme-dark .text-slate-800,
        .theme-dark .text-slate-700 {
          color: #e5e7eb !important;
        }

        .theme-dark .text-slate-600,
        .theme-dark .text-slate-500 {
          color: #cbd5e1 !important;
        }

        .theme-dark .bg-white {
          background-color: #0f1628 !important;
        }

        .theme-dark .bg-slate-50 {
          background-color: #111827 !important;
        }

        .theme-dark .border-slate-200,
        .theme-dark .border-slate-100 {
          border-color: #1f2937 !important;
        }

        .theme-dark .shadow-soft {
          box-shadow: 0 22px 55px rgba(0, 0, 0, 0.32);
        }
      `}</style>

      <section
        id="hero"
        className="hero-animate relative w-full px-4 pt-32 pb-16 md:px-6 md:pt-40 md:pb-20 min-h-screen flex flex-col items-center justify-center"
      >
        <div className="relative z-10 mx-auto flex max-w-5xl flex-col items-center gap-6 text-center">
          <div className="space-y-4">
            <h1 className="text-5xl font-bold leading-[1.4] tracking-tight text-slate-900 sm:text-6xl sm:leading-[1.4]">
              Every journey begins<br />with the right words
            </h1>
            <p className="text-lg text-slate-700 sm:text-xl">
              Language learning coming alive - AI-powered, community-inspired, pure magic
            </p>
          </div>
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
            <Link className="btn-accent px-6 py-3 text-sm font-semibold shadow-soft" href="#features">
              Discover the Magic of Vokabulo
            </Link>
          </div>
          <div className="relative z-10 mx-auto mt-10 max-w-lg">
            <div className="hero-card p-5 sm:p-6">
              <div className="flex items-center justify-between text-sm text-slate-500">
                <span>Your week</span>
                <span className="rounded-full bg-slate-900 px-3 py-1 text-xs font-semibold text-white">Focus mode</span>
              </div>
              <div className="mt-4 space-y-2">
                <p className="text-3xl font-semibold text-slate-900">+184 new words</p>
                <p className="text-sm text-slate-600">Targets met across all lists.</p>
              </div>
              <div className="mt-6 space-y-3">
                <div className="flex items-center justify-between rounded-2xl border border-slate-100 bg-slate-50 px-4 py-3">
                  <div>
                    <p className="text-sm font-semibold text-slate-900">Spanish A2</p>
                    <p className="text-xs text-slate-500">12/20 today ✓</p>
                  </div>
                  <div className="text-sm font-semibold text-emerald-600">+8</div>
                </div>
                <div className="flex items-center justify-between rounded-2xl border border-slate-100 bg-white px-4 py-3 shadow-sm">
                  <div>
                    <p className="text-sm font-semibold text-slate-900">French B1</p>
                    <p className="text-xs text-slate-500">Review in 3 hrs</p>
                  </div>
                  <div className="text-sm font-semibold text-sky-600">Scheduled</div>
                </div>
                <div className="flex items-center justify-between rounded-2xl border border-slate-100 bg-white px-4 py-3 shadow-sm">
                  <div>
                    <p className="text-sm font-semibold text-slate-900">Italian basics</p>
                    <p className="text-xs text-slate-500">Next session tomorrow</p>
                  </div>
                  <div className="text-sm font-semibold text-slate-500">Queued</div>
                </div>
              </div>
              <div className="mt-6 rounded-2xl border border-slate-100 bg-slate-50 px-4 py-3">
                <div className="flex items-center justify-between text-sm text-slate-600">
                  <span>Streak</span>
                  <span>14 days</span>
                </div>
                <div className="mt-2 h-2 rounded-full bg-white shadow-inner">
                  <div className="h-2 w-3/4 rounded-full bg-slate-900"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <main className="mx-auto max-w-5xl space-y-16 px-4 pb-16 pt-12 md:space-y-24 md:px-6 md:pt-16">
        <section id="philosophy" className="space-y-10 px-4 pt-8 md:pt-12">
          <div className="mx-auto max-w-4xl space-y-3 text-center">
            <p className="text-sm font-semibold uppercase tracking-[0.16em] text-slate-500">Our philosophy</p>
            <h2 className="text-3xl font-semibold tracking-tight text-slate-900 sm:text-4xl">
              No shortcuts. Just the right words.
            </h2>
            <p className="text-lg leading-relaxed text-slate-700 sm:text-xl">
              Language learning takes endurance, but momentum starts with the words you actually use.
            </p>
          </div>
          <div className="mx-auto grid max-w-5xl gap-4 md:grid-cols-3">
            <article className="card flex h-full flex-col gap-3 rounded-2xl p-6 shadow-soft">
              <div className="inline-flex h-10 w-10 items-center justify-center rounded-2xl bg-slate-900 text-white shadow-soft">⌁</div>
              <h3 className="text-xl font-semibold text-slate-900">Context first</h3>
              <p className="text-lg leading-relaxed text-slate-700">
                Words matter most when they&apos;re tied to real moments and emotions.
              </p>
            </article>
            <article className="card flex h-full flex-col gap-3 rounded-2xl p-6 shadow-soft">
              <div className="inline-flex h-10 w-10 items-center justify-center rounded-2xl bg-slate-900 text-white shadow-soft">✓</div>
              <h3 className="text-xl font-semibold text-slate-900">Built around your life</h3>
              <p className="text-lg leading-relaxed text-slate-700">
                Work, hobbies, everyday situations. No one-size-fits-all lists.
              </p>
            </article>
            <article className="card flex h-full flex-col gap-3 rounded-2xl p-6 shadow-soft">
              <div className="inline-flex h-10 w-10 items-center justify-center rounded-2xl bg-slate-900 text-white shadow-soft">⚡</div>
              <h3 className="text-xl font-semibold text-slate-900">Learn together</h3>
              <p className="text-lg leading-relaxed text-slate-700">
                Community Sets let you share and grow vocabulary with others.
              </p>
            </article>
          </div>
        </section>

        <section id="feature-blocks" className="space-y-12 pt-4 md:space-y-16">
          <div className="space-y-3 text-center">
            <p className="text-sm font-semibold uppercase tracking-[0.12em] text-slate-500">The magic of Vokabulo</p>
            <h2 className="text-3xl font-semibold text-slate-900 sm:text-4xl">Built for real-time, focused learning.</h2>
            <p className="text-lg leading-relaxed text-slate-700 sm:text-xl">
              Four essentials that keep you moving faster - across devices, lists, and daily sessions.
            </p>
          </div>

          <div className="space-y-10 md:space-y-14">
            <div className="grid items-center gap-8 md:grid-cols-2">
              <div className="order-1 space-y-4 md:order-1 md:pr-6">
                <div className="inline-flex items-center gap-2 rounded-full bg-white px-3 py-1 text-xs font-semibold text-slate-700 shadow-sm">
                  Words
                </div>
                <h3 className="text-2xl font-semibold text-slate-900">A garden of vocabulary</h3>
                <p className="text-base text-slate-600">
                  A space where learning becomes lasting, and every word becomes yours.
                </p>
                <div className="flex flex-wrap gap-2 text-sm text-slate-700">
                  <span className="rounded-full bg-slate-900 px-3 py-1 text-white">Full context</span>
                  <span className="rounded-full border border-slate-200 bg-white px-3 py-1">Pronunciation</span>
                  <span className="rounded-full border border-slate-200 bg-white px-3 py-1">Live sync</span>
                </div>
              </div>
              <div className="order-2 feature-visual h-64 w-full md:order-2"></div>
            </div>

            <div className="grid items-center gap-8 md:grid-cols-2">
              <div className="order-2 feature-visual h-64 w-full md:order-1"></div>
              <div className="order-1 space-y-4 md:order-2 md:pl-6">
                <div className="inline-flex items-center gap-2 rounded-full bg-white px-3 py-1 text-xs font-semibold text-slate-700 shadow-sm">
                  Quiz
                </div>
                <h3 className="text-2xl font-semibold text-slate-900">Turn practice into power</h3>
                <p className="text-base text-slate-600">
                  Where persistence becomes progress, and progress becomes mastery.
                </p>
                <div className="flex flex-wrap gap-2 text-sm text-slate-700">
                  <span className="rounded-full bg-slate-900 px-3 py-1 text-white">Swiping</span>
                  <span className="rounded-full border border-slate-200 bg-white px-3 py-1">Keyword-focused</span>
                  <span className="rounded-full border border-slate-200 bg-white px-3 py-1">Memory optimized</span>
                </div>
              </div>
            </div>

            <div className="grid items-center gap-8 md:grid-cols-2">
              <div className="order-1 space-y-4 md:order-1 md:pr-6">
                <div className="inline-flex items-center gap-2 rounded-full bg-white px-3 py-1 text-xs font-semibold text-slate-700 shadow-sm">
                  Situations
                </div>
                <h3 className="text-2xl font-semibold text-slate-900">The right words. Right on time</h3>
                <p className="text-base text-slate-600">
                  Set the scene, and the right vocabulary will appear to help you.
                </p>
                <div className="flex flex-wrap gap-2 text-sm text-slate-700">
                  <span className="rounded-full bg-slate-900 px-3 py-1 text-white">Personal</span>
                  <span className="rounded-full border border-slate-200 bg-white px-3 py-1">Made to be used</span>
                  <span className="rounded-full border border-slate-200 bg-white px-3 py-1">Proficiency-adjusted</span>
                </div>
              </div>
              <div className="order-2 feature-visual h-64 w-full md:order-2"></div>
            </div>

            <div className="grid items-center gap-8 md:grid-cols-2">
              <div className="order-2 feature-visual h-64 w-full md:order-1"></div>
              <div className="order-1 space-y-4 md:order-2 md:pl-6">
                <div className="inline-flex items-center gap-2 rounded-full bg-white px-3 py-1 text-xs font-semibold text-slate-700 shadow-sm">
                  Community Sets
                </div>
                <h3 className="text-2xl font-semibold text-slate-900">Words we share</h3>
                <p className="text-base text-slate-600">
                  A living library of vocabulary, curated by the community and waiting to be explored.
                </p>
                <div className="flex flex-wrap gap-2 text-sm text-slate-700">
                  <span className="rounded-full bg-slate-900 px-3 py-1 text-white">Curated</span>
                  <span className="rounded-full border border-slate-200 bg-white px-3 py-1">Share your own</span>
                  <span className="rounded-full border border-slate-200 bg-white px-3 py-1">Collaborate with others</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section id="features" className="space-y-8">
          <div className="flex flex-col gap-3">
            <p className="text-sm font-semibold uppercase tracking-[0.12em] text-slate-500">Why Vokabulo</p>
            <h2 className="text-2xl font-semibold text-slate-900 sm:text-3xl">
              Smart features that keep you on track.
            </h2>
            <p className="max-w-3xl text-base text-slate-600">
              Every detail is built for clear progress. Spend less time, remember more, and always know where you stand.
            </p>
          </div>
          <div className="grid gap-6 md:grid-cols-3">
            <article className="card flex flex-col gap-4 p-6 transition hover:-translate-y-1 hover:shadow-soft">
              <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-slate-900 text-white">↻</div>
              <h3 className="text-lg font-semibold text-slate-900">Spaced Repetition</h3>
              <p className="text-sm text-slate-600">
                Adaptive intervals surface each word exactly when your memory needs it.
              </p>
            </article>
            <article className="card flex flex-col gap-4 p-6 transition hover:-translate-y-1 hover:shadow-soft">
              <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-slate-900 text-white">✔</div>
              <h3 className="text-lg font-semibold text-slate-900">Adjustable pronunciation</h3>
              <p className="text-sm text-slate-600">
                Select your voices, set the speed. Made to understand.
              </p>
            </article>
            <article className="card flex flex-col gap-4 p-6 transition hover:-translate-y-1 hover:shadow-soft">
              <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-slate-900 text-white">⚡</div>
              <h3 className="text-lg font-semibold text-slate-900">Built with magic</h3>
              <p className="text-sm text-slate-600">
                Uses the best AI tools to help you become a little better every day.
              </p>
            </article>
          </div>
        </section>

        <section id="testimonials" className="space-y-8">
          <div className="flex flex-col gap-3">
            <p className="text-sm font-semibold uppercase tracking-[0.12em] text-slate-500">Testimonials</p>
            <h2 className="text-2xl font-semibold text-slate-900 sm:text-3xl">Learners love the focus.</h2>
            <p className="max-w-3xl text-base text-slate-600">
              Vokabulo blends science and design—so you stay consistent and retain more.
            </p>
          </div>
          <div className="grid gap-6 md:grid-cols-3">
            <article className="card flex flex-col gap-4 p-6 shadow-soft transition hover:-translate-y-1 hover:shadow-soft">
              <p className="text-sm text-slate-700">
                &quot;I hit my daily goals in 15 minutes. Everything is structured, nothing distracts me.&quot;
              </p>
              <div className="text-sm font-semibold text-slate-900">Sophie, medical student</div>
            </article>
            <article className="card flex flex-col gap-4 p-6 shadow-soft transition hover:-translate-y-1 hover:shadow-soft">
              <p className="text-sm text-slate-700">
                &quot;Reviews are perfectly timed. My vocabulary grows without stress.&quot;
              </p>
              <div className="text-sm font-semibold text-slate-900">Jonas, product manager</div>
            </article>
            <article className="card flex flex-col gap-4 p-6 shadow-soft transition hover:-translate-y-1 hover:shadow-soft">
              <p className="text-sm text-slate-700">
                &quot;Minimal yet powerful. Exactly the mix of design and pace I wanted.&quot;
              </p>
              <div className="text-sm font-semibold text-slate-900">Mara, language coach</div>
            </article>
          </div>
        </section>

        <section id="faq" className="space-y-6">
          <div className="flex flex-col gap-3">
            <p className="text-sm font-semibold uppercase tracking-[0.12em] text-slate-500">FAQ</p>
            <h2 className="text-2xl font-semibold text-slate-900 sm:text-3xl">Answers to your questions.</h2>
            <p className="max-w-3xl text-base text-slate-600">
              If anything&apos;s missing, reach out anytime—we reply quickly and personally.
            </p>
          </div>
          <div className="space-y-3">
            <details className="card group space-y-2 p-4">
              <summary className="flex cursor-pointer items-center justify-between gap-4 text-base font-semibold text-slate-900">
                How does the review system work?
                <span className="text-slate-400 transition group-open:rotate-45">+</span>
              </summary>
              <p className="pl-1 text-sm text-slate-600">
                Vokabulo calculates intervals based on your answers. Confident words appear less often; tricky ones show up more until they stick.
              </p>
            </details>
            <details className="card group space-y-2 p-4">
              <summary className="flex cursor-pointer items-center justify-between gap-4 text-base font-semibold text-slate-900">
                Does it work offline?
                <span className="text-slate-400 transition group-open:rotate-45">+</span>
              </summary>
              <p className="pl-1 text-sm text-slate-600">
                Yes. Your progress is cached and syncs automatically once you&apos;re back online.
              </p>
            </details>
            <details className="card group space-y-2 p-4">
              <summary className="flex cursor-pointer items-center justify-between gap-4 text-base font-semibold text-slate-900">
                Can I import my own lists?
                <span className="text-slate-400 transition group-open:rotate-45">+</span>
              </summary>
              <p className="pl-1 text-sm text-slate-600">
                Import CSV files or share existing lists with your team. Vokabulo handles duplicates and structure.
              </p>
            </details>
          </div>
        </section>

        <section className="card flex flex-col items-center gap-4 p-8 text-center shadow-soft">
          <div className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white px-3 py-1 text-xs font-semibold uppercase tracking-[0.14em] text-slate-700 shadow-sm">
            Ready?
          </div>
          <h2 className="text-2xl font-semibold text-slate-900 sm:text-3xl">
            Start today and stay on track every day.
          </h2>
          <p className="max-w-2xl text-base text-slate-600">
            Secure your learning edge with clear sessions, smart reviews, and an interface that supports you rather than distracts you.
          </p>
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
            <Link className="btn-primary px-5 py-3 text-sm font-semibold shadow-soft" href="#hero">Start free</Link>
            <Link className="btn-ghost border border-slate-200 px-5 py-3 text-sm font-semibold text-slate-800" href="#faq">
              Get answers
            </Link>
          </div>
        </section>
      </main>
    </>
  );
}
