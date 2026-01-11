import Link from 'next/link';
import { getHomePage } from '@/lib/keystatic';
import type { Locale } from '@/lib/i18n';

export default async function Home({
  params,
}: {
  params: Promise<{ locale: Locale }>;
}) {
  const { locale } = await params;
  
  // Load content from Keystatic based on URL locale
  const homeContent = await getHomePage(locale);
  
  // Fallback to defaults if content not found
  const heroTitle = homeContent?.heroTitle || 'Every journey begins with the right words';
  const heroSubtitle = homeContent?.heroSubtitle || 'Language learning coming alive - AI-powered, community-inspired, pure magic';
  const heroCTA = homeContent?.heroCTA || 'Discover the Magic of Vokabulo';
  const philosophyTitle = homeContent?.philosophyTitle || 'No shortcuts. Just the right words.';
  const philosophyDescription = homeContent?.philosophyDescription || 'Language learning takes endurance, but momentum starts with the words you actually use.';
  const featuresTitle = homeContent?.featuresTitle || 'Built for real-time, focused learning.';
  const featuresDescription = homeContent?.featuresDescription || 'Four essentials that keep you moving faster - across devices, lists, and daily sessions.';
  const testimonialsTitle = homeContent?.testimonialsTitle || 'Learners love the focus.';
  const faqTitle = homeContent?.faqTitle || 'Answers to your questions.';

  return (
    <div className="page-home">
      <section
        id="hero"
        className="hero-animate relative w-full px-4 pt-32 pb-16 md:px-6 md:pt-40 md:pb-20 min-h-screen flex flex-col items-center justify-center"
      >
        <div className="relative z-10 mx-auto flex max-w-5xl flex-col items-center gap-6 text-center">
          <div className="space-y-4">
            <h1 className="text-5xl font-bold leading-[1.4] tracking-tight text-slate-900 sm:text-6xl sm:leading-[1.4]">
              {heroTitle}
            </h1>
            <p className="text-lg text-slate-700 sm:text-xl">
              {heroSubtitle}
            </p>
          </div>
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
            <Link className="btn-accent px-6 py-3 text-sm font-semibold shadow-soft" href="#features">
              {heroCTA}
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
              {philosophyTitle}
            </h2>
            <p className="text-lg leading-relaxed text-slate-700 sm:text-xl">
              {philosophyDescription}
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
            <h2 className="text-3xl font-semibold text-slate-900 sm:text-4xl">{featuresTitle}</h2>
            <p className="text-lg leading-relaxed text-slate-700 sm:text-xl">
              {featuresDescription}
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
            <h2 className="text-2xl font-semibold text-slate-900 sm:text-3xl">{testimonialsTitle}</h2>
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
            <h2 className="text-2xl font-semibold text-slate-900 sm:text-3xl">{faqTitle}</h2>
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
    </div>
  );
}
