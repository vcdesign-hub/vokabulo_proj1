import { createReader } from '@keystatic/core/reader';
import keystaticConfig from '../keystatic.config';

export const reader = createReader(process.cwd(), keystaticConfig);

// Helper function to get home page content by locale
export async function getHomePage(locale: string = 'en') {
  try {
    const homePage = await reader.collections.homePages.read(locale);
    return homePage;
  } catch (error) {
    console.error(`Error reading home page for locale ${locale}:`, error);
    return null;
  }
}

// Helper function to get all home pages
export async function getAllHomePages() {
  try {
    const homePages = await reader.collections.homePages.all();
    return homePages;
  } catch (error) {
    console.error('Error reading home pages:', error);
    return [];
  }
}

// Helper function to get support articles by locale and section
export async function getSupportArticles(locale: string = 'en', section?: string) {
  try {
    const allArticles = await reader.collections.supportArticles.all();
    const filtered = allArticles
      .filter((article) => {
        const matchLocale = article.entry.locale === locale;
        const matchSection = section ? article.entry.section === section : true;
        return matchLocale && matchSection;
      })
      .sort((a, b) => (a.entry.order || 0) - (b.entry.order || 0));
    return filtered;
  } catch (error) {
    console.error(`Error reading support articles for locale ${locale}:`, error);
    return [];
  }
}

// Helper function to get support sections
export async function getSupportSections(locale: string = 'en') {
  try {
    const articles = await reader.collections.supportArticles.all();
    const sections = new Set(
      articles
        .filter((article) => article.entry.locale === locale)
        .map((article) => article.entry.section)
    );
    return Array.from(sections);
  } catch (error) {
    console.error(`Error reading support sections for locale ${locale}:`, error);
    return [];
  }
}

// Helper function to get legal notice by locale
export async function getLegalNotice(locale: string = 'en') {
  try {
    const legalNotice = await reader.collections.legalNotices.read(locale);
    return legalNotice;
  } catch (error) {
    console.error(`Error reading legal notice for locale ${locale}:`, error);
    return null;
  }
}

// Helper function to get privacy policy by locale
export async function getPrivacyPolicy(locale: string = 'en') {
  try {
    const privacyPolicy = await reader.collections.privacyPolicies.read(locale);
    return privacyPolicy;
  } catch (error) {
    console.error(`Error reading privacy policy for locale ${locale}:`, error);
    return null;
  }
}
