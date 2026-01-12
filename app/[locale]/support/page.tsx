'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import type { Locale } from '@/lib/i18n';

// This will be replaced with actual Keystatic data loading
const supportSections = [
  {
    id: 'about',
    title: 'About Vokabulo',
    articles: [
      {
        title: 'Why another language app?',
        slug: 'why-another-language-app',
        content: 'Most vocabulary apps focus on gamification, streaks, or rigid lesson plans. Vokabulo takes a different approach: it helps you build vocabulary around your actual life—the words you need for work, hobbies, travel, or everyday conversations.',
      },
    ],
  },
  {
    id: 'start',
    title: 'Start',
    articles: [
      {
        title: 'Basic navigation',
        slug: 'basic-navigation',
        content: 'Learn how to navigate through the app and access different features.',
      },
    ],
  },
];

export default function SupportPage() {
  const params = useParams();
  const locale = params?.locale as Locale || 'en';
  const [expandedSections, setExpandedSections] = useState<Set<string>>(new Set(['about']));

  const toggleSection = (sectionId: string) => {
    setExpandedSections((prev) => {
      const next = new Set(prev);
      if (next.has(sectionId)) {
        next.delete(sectionId);
      } else {
        next.add(sectionId);
      }
      return next;
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
          justify-center;
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
          <nav className="help-nav">
            {supportSections.map((section) => (
              <div key={section.id} className="help-nav-section">
                <div className="help-nav-section-header" onClick={() => toggleSection(section.id)}>
                  <span>{section.title}</span>
                  <button className={`help-nav-toggle ${expandedSections.has(section.id) ? 'expanded' : ''}`}>
                    <svg viewBox="0 0 16 16" fill="currentColor">
                      <path d="M6 4l4 4-4 4" stroke="currentColor" strokeWidth="2" fill="none" />
                    </svg>
                  </button>
                </div>
                {expandedSections.has(section.id) && (
                  <ul className="help-nav-items">
                    {section.articles.map((article) => (
                      <li key={article.slug}>
                        <Link href={`#${article.slug}`}>{article.title}</Link>
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            ))}
          </nav>

          <article className="help-article">
            {supportSections.map((section) =>
              section.articles.map((article) => (
                <section key={article.slug} id={article.slug}>
                  <h2>{article.title}</h2>
                  <p>{article.content}</p>
                </section>
              ))
            )}
          </article>
        </div>
      </div>
    </>
  );
}
