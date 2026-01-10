'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Metadata } from 'next';

const supportSections = [
  {
    id: 'about',
    title: 'About Vokabulo',
    articles: [
      { id: 'why-another-language-app', title: 'Why another language app?' },
      { id: 'favorite-use-cases', title: 'My favorite use cases' },
      { id: 'why-i-developed', title: 'Why I chose to develop Vokabulo' },
      { id: 'who-benefits', title: 'Who benefits from using Vokabulo?' },
      { id: 'why-ai', title: 'Why AI is a game changer' },
      { id: 'platforms', title: 'Platforms' },
      { id: 'limits-of-ai', title: 'Limits of AI' },
    ],
  },
  {
    id: 'start',
    title: 'Start',
    articles: [
      { id: 'basic-navigation', title: 'Basic navigation' },
      { id: 'date-slider', title: 'Date slider (streak and progress)' },
      { id: 'language-pair-containers', title: 'Language Pair containers' },
    ],
  },
  {
    id: 'words',
    title: 'Words',
    articles: [
      { id: 'about-words', title: 'About Words' },
      { id: 'language-pairs', title: 'Language pairs (and why order matters)' },
      { id: 'why-context-matters', title: 'Why context matters' },
      { id: 'enter-new-word', title: 'Enter a new word (Magic Wand)' },
      { id: 'edit-words', title: 'Edit words' },
      { id: 'pronunciation', title: 'Pronunciation' },
    ],
  },
  {
    id: 'study',
    title: 'Study',
    articles: [
      { id: 'about-study', title: 'About Study' },
      { id: 'srs-system', title: 'The SRS system (and why it\'s not a quiz)' },
      { id: 'five-levels', title: 'The 5 levels' },
      { id: 'philosophy', title: 'Philosophy' },
      { id: 'reviewing-cards', title: 'Reviewing cards: "Got it" and "Not yet"' },
      { id: 'streaks', title: 'Streaks: what they are and why they matter' },
    ],
  },
  {
    id: 'situations',
    title: 'Situations',
    articles: [
      { id: 'about-situations', title: 'About Situations' },
      { id: 'what-is-a-situation', title: 'What is a Situation?' },
      { id: 'how-to-enter-a-situation', title: 'How to enter a Situation' },
      { id: 'proficiency-level', title: 'Proficiency level' },
    ],
  },
  {
    id: 'community',
    title: 'Community',
    articles: [
      { id: 'about-community-sets', title: 'About Community Sets' },
      { id: 'why-community-sets-are-different', title: 'Why Community Sets are different' },
      { id: 'role-of-curator', title: 'The role of the Curator' },
      { id: 'follow-and-auto-download', title: 'Follow and auto-download' },
    ],
  },
];

export default function SupportPage() {
  const [expandedSections, setExpandedSections] = useState<Set<string>>(
    new Set(supportSections.map(s => s.id))
  );

  const toggleSection = (sectionId: string) => {
    setExpandedSections(prev => {
      const newSet = new Set(prev);
      if (newSet.has(sectionId)) {
        newSet.delete(sectionId);
      } else {
        newSet.add(sectionId);
      }
      return newSet;
    });
  };

  return (
    <>
      <style jsx global>{`
        /* Support page-specific styles */
        :root {
          --accent: #0ea5e9;
        }

        .page {
          max-width: 1100px;
          margin: 0 auto;
          padding: 16px 16px 48px;
        }

        main {
          padding: 48px 40px;
        }

        h1 {
          margin: 0 0 24px;
          font-size: 40px;
          font-weight: 700;
          line-height: 1.2;
          letter-spacing: -0.02em;
        }

        h2 {
          margin: 28px 0 12px;
          font-size: 20px;
        }

        h3 {
          margin: 20px 0 10px;
          font-size: 16px;
          color: var(--ink);
        }

        p {
          margin: 0 0 12px;
          color: var(--muted);
          line-height: 1.6;
        }

        .help-container {
          display: grid;
          grid-template-columns: 280px 1fr;
          gap: 48px;
          margin-top: 120px;
        }

        @media (max-width: 768px) {
          .help-container {
            grid-template-columns: 1fr;
            gap: 24px;
          }
        }

        .help-nav {
          position: sticky;
          top: 120px;
          height: fit-content;
          max-height: calc(100vh - 140px);
          overflow-y: auto;
        }

        .help-nav-section {
          margin-bottom: 16px;
        }

        .help-nav-section-header {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 8px 0;
          cursor: pointer;
          font-weight: 600;
          color: var(--ink);
        }

        .help-nav-section-header:hover {
          color: var(--accent);
        }

        .help-nav-toggle {
          background: none;
          border: none;
          cursor: pointer;
          padding: 4px;
          display: flex;
          align-items: center;
          justify-content: center;
          color: var(--muted);
          transition: transform 0.2s ease;
        }

        .help-nav-toggle svg {
          width: 16px;
          height: 16px;
        }

        .help-nav-toggle.expanded {
          transform: rotate(90deg);
        }

        .help-nav-items {
          list-style: none;
          padding: 0;
          margin: 0;
          padding-left: 12px;
        }

        .help-nav-items li {
          margin: 4px 0;
        }

        .help-nav-items a {
          display: block;
          padding: 6px 8px;
          font-size: 14px;
          color: var(--muted);
          text-decoration: none;
          border-radius: 6px;
          transition: all 0.15s ease;
        }

        .help-nav-items a:hover {
          color: var(--accent);
          background: rgba(14, 165, 233, 0.08);
        }

        .help-article {
          max-width: 720px;
        }

        .help-article section {
          margin-bottom: 48px;
        }

        .help-article h2 {
          font-size: 28px;
          font-weight: 700;
          margin-bottom: 16px;
          color: var(--ink);
        }

        .help-article h3 {
          font-size: 20px;
          font-weight: 600;
          margin-top: 32px;
          margin-bottom: 12px;
          color: var(--ink);
        }

        .help-article p {
          font-size: 16px;
          line-height: 1.7;
          margin: 0 0 20px;
          color: var(--muted);
        }

        .help-article ul {
          font-size: 16px;
          line-height: 1.7;
          margin: 0 0 20px;
          color: var(--muted);
          padding-left: 24px;
        }

        .help-article ul li {
          margin: 0 0 12px;
        }

        .help-article ul li strong {
          color: var(--ink);
          font-weight: 600;
        }

        .theme-dark .help-nav-section-header {
          color: #e5e7eb;
        }

        .theme-dark .help-nav-items a {
          color: #cbd5e1;
        }

        .theme-dark .help-nav-items a:hover {
          color: #38bdf8;
          background: rgba(56, 189, 248, 0.12);
        }

        .theme-dark .help-article h2,
        .theme-dark .help-article h3 {
          color: #e5e7eb;
        }

        .theme-dark .help-article p,
        .theme-dark .help-article ul {
          color: #cbd5e1;
        }

        .theme-dark .help-article ul li strong {
          color: #e5e7eb;
        }
      `}</style>

      <div className="page">
        <div className="help-container">
          <aside className="help-nav">
            {supportSections.map((section) => (
              <div key={section.id} className="help-nav-section">
                <div
                  className="help-nav-section-header"
                  onClick={() => toggleSection(section.id)}
                >
                  <Link href={`#${section.id}`}>{section.title}</Link>
                  <button
                    className={`help-nav-toggle ${expandedSections.has(section.id) ? 'expanded' : ''}`}
                    aria-label="Toggle section"
                    aria-expanded={expandedSections.has(section.id)}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth="2"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M9 5l7 7-7 7"
                      />
                    </svg>
                  </button>
                </div>
                {expandedSections.has(section.id) && (
                  <ul className="help-nav-items">
                    {section.articles.map((article) => (
                      <li key={article.id}>
                        <Link href={`#${article.id}`}>{article.title}</Link>
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            ))}
          </aside>

          <article className="help-article">
            <section id="about-vokabulo">
              <h2>About Vokabulo</h2>
              <p>Why Vokabulo exists, who it helps, and how AI fits into the workflow.</p>

              <h3 id="why-another-language-app">Why another language app?</h3>
              <p>
                Most vocabulary apps focus on gamification, streaks, or rigid lesson plans. Vokabulo takes a different approach: it helps you build vocabulary around your actual life—the words you need for work, hobbies, travel, or everyday conversations.
              </p>
              <p>
                Instead of generic word lists, you create personalized collections that matter to you. The app uses spaced repetition to help you remember, but it never forces you into a one-size-fits-all curriculum.
              </p>

              <h3 id="favorite-use-cases">My favorite use cases</h3>
              <ul>
                <li><strong>Reading books or watching videos:</strong> Save new words as you encounter them, with full context.</li>
                <li><strong>Preparing for specific situations:</strong> Generate vocabulary for upcoming meetings, trips, or presentations.</li>
                <li><strong>Building domain expertise:</strong> Create specialized word lists for your profession or field of study.</li>
                <li><strong>Learning with others:</strong> Share vocabulary sets with study partners or language exchange friends.</li>
              </ul>

              <h3 id="who-benefits">Who benefits from using Vokabulo?</h3>
              <p>
                Vokabulo is designed for intermediate to advanced learners who already have a foundation in their target language. It&apos;s perfect for:
              </p>
              <ul>
                <li>Professionals working in multilingual environments</li>
                <li>Students preparing for language exams</li>
                <li>Avid readers and media consumers</li>
                <li>Anyone who wants to expand vocabulary in specific domains</li>
              </ul>

              <h3 id="why-ai">Why AI is a game changer</h3>
              <p>
                AI helps you generate context-rich vocabulary on demand. Instead of searching through dictionaries or generic word lists, you can describe a situation and get relevant vocabulary instantly. The AI understands nuance, provides usage examples, and adapts to your proficiency level.
              </p>
            </section>

            <section id="start">
              <h2>Start</h2>
              <p>Getting started with Vokabulo is straightforward. Here&apos;s what you need to know.</p>

              <h3 id="basic-navigation">Basic navigation</h3>
              <p>
                The app has four main sections: Words, Study, Situations, and Community. Use the bottom navigation bar to switch between them. Your progress and streak are always visible at the top.
              </p>

              <h3 id="date-slider">Date slider (streak and progress)</h3>
              <p>
                The date slider shows your daily activity and helps you maintain your learning streak. Swipe left or right to view past days and see your progress over time.
              </p>
            </section>

            <section id="words">
              <h2>Words</h2>
              <p>The Words section is where you manage your vocabulary collection.</p>

              <h3 id="about-words">About Words</h3>
              <p>
                Each word entry includes the term, translation, context, pronunciation, and tags. Context is crucial—it helps you remember how the word is actually used.
              </p>

              <h3 id="why-context-matters">Why context matters</h3>
              <p>
                Words without context are harder to remember and use correctly. Always include a sentence or phrase that shows how the word appears in real situations. This makes review sessions more effective and helps you internalize proper usage.
              </p>

              <h3 id="enter-new-word">Enter a new word (Magic Wand)</h3>
              <p>
                Tap the Magic Wand button to add a new word. The AI assistant can help generate translations, example sentences, and pronunciation guides. You can also enter words manually if you prefer.
              </p>
            </section>

            <section id="study">
              <h2>Study</h2>
              <p>The Study section uses spaced repetition to help you retain vocabulary long-term.</p>

              <h3 id="about-study">About Study</h3>
              <p>
                Study sessions are designed to be quick and focused. Review words when they&apos;re due, and the app will automatically adjust the timing based on your performance.
              </p>

              <h3 id="srs-system">The SRS system (and why it&apos;s not a quiz)</h3>
              <p>
                Spaced Repetition System (SRS) is a learning technique that shows you words at increasing intervals. It&apos;s not about testing yourself—it&apos;s about reinforcing memory at the optimal moment.
              </p>

              <h3 id="reviewing-cards">Reviewing cards: &quot;Got it&quot; and &quot;Not yet&quot;</h3>
              <p>
                During review, you&apos;ll see a word and decide if you remember it. &quot;Got it&quot; means you recalled the word correctly; &quot;Not yet&quot; means you need more practice. The app adjusts future reviews based on your responses.
              </p>
            </section>

            <section id="situations">
              <h2>Situations</h2>
              <p>Situations help you prepare for specific scenarios by generating relevant vocabulary.</p>

              <h3 id="what-is-a-situation">What is a Situation?</h3>
              <p>
                A Situation is a description of a context where you&apos;ll need specific vocabulary. For example: &quot;ordering food at a restaurant,&quot; &quot;discussing project deadlines with colleagues,&quot; or &quot;asking for directions in a foreign city.&quot;
              </p>

              <h3 id="how-to-enter-a-situation">How to enter a Situation</h3>
              <p>
                Describe the scenario in natural language. The AI will generate a list of relevant words and phrases, complete with translations and usage examples. You can then save the ones you want to learn.
              </p>
            </section>

            <section id="community">
              <h2>Community</h2>
              <p>Community Sets are curated vocabulary collections shared by other users.</p>

              <h3 id="about-community-sets">About Community Sets</h3>
              <p>
                Browse sets created by other learners and educators. These collections cover topics like business vocabulary, travel phrases, academic terms, and more.
              </p>

              <h3 id="why-community-sets-are-different">Why Community Sets are different</h3>
              <p>
                Unlike generic word lists, Community Sets are created by real learners who understand what vocabulary is actually useful. They include context, usage notes, and practical examples.
              </p>

              <h3 id="follow-and-auto-download">Follow and auto-download</h3>
              <p>
                When you follow a Community Set, new words added by the curator are automatically downloaded to your collection. This keeps your vocabulary fresh and up-to-date.
              </p>
            </section>
          </article>
        </div>
      </div>
    </>
  );
}
