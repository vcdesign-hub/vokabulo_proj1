'use client';

import { useTheme } from '@/lib/theme';

export function ThemeToggle() {
  const { theme, toggleTheme } = useTheme();
  const isDark = theme === 'dark';

  return (
    <button
      id="theme-toggle"
      className="theme-toggle"
      type="button"
      aria-label="Toggle theme"
      onClick={toggleTheme}
    >
      <svg
        id="icon-sun"
        className={isDark ? 'hidden' : ''}
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="1.5"
          d="M12 4.5v-2m0 19v-2m7.5-7.5h2m-19 0h2M17.303 6.697l1.414-1.414M5.283 18.717l1.414-1.414m0-10.606L5.283 5.283m13.434 13.434-1.414-1.414M12 8.25A3.75 3.75 0 1 0 12 15.75 3.75 3.75 0 0 0 12 8.25Z"
        />
      </svg>
      <svg
        id="icon-moon"
        className={isDark ? '' : 'hidden'}
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="1.5"
          d="M21 12.79A9 9 0 0 1 11.21 3 7.5 7.5 0 1 0 21 12.79Z"
        />
      </svg>
      <span id="theme-label">{isDark ? 'Dark' : 'Light'}</span>
    </button>
  );
}
