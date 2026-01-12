import { readdirSync, readFileSync, existsSync } from 'fs';
import { join } from 'path';
import { marked } from 'marked';
import type { Language } from './i18n';

export interface BlogPost {
  slug: string;
  title: string;
  date: string;
  excerpt: string;
  tag?: string;
}

export interface BlogPostContent extends BlogPost {
  content: string;
}

/**
 * Get the blog directory for a language, falling back to English if not found.
 */
export function getBlogDir(lang: Language): string {
  const langDir = join(process.cwd(), 'content', 'blog', lang);
  if (existsSync(langDir)) {
    return langDir;
  }
  return join(process.cwd(), 'content', 'blog', 'en');
}

/**
 * Check if the blog content is using fallback English.
 */
export function isUsingFallback(lang: Language): boolean {
  const langDir = join(process.cwd(), 'content', 'blog', lang);
  return lang !== 'en' && !existsSync(langDir);
}

/**
 * Parse frontmatter from markdown content.
 */
function parseFrontmatter(content: string): { frontmatter: Record<string, string>; markdown: string } {
  const frontmatterMatch = content.match(/^---\n([\s\S]*?)\n---\n([\s\S]*)$/);
  
  if (!frontmatterMatch) {
    return { frontmatter: {}, markdown: content };
  }

  const frontmatterText = frontmatterMatch[1];
  const markdown = frontmatterMatch[2];
  const frontmatter: Record<string, string> = {};

  // Parse each line of frontmatter
  frontmatterText.split('\n').forEach(line => {
    const match = line.match(/^(\w+):\s*["']?(.*)["']?$/);
    if (match) {
      const key = match[1];
      const value = match[2].replace(/^["']|["']$/g, ''); // Remove quotes
      frontmatter[key] = value;
    }
  });

  return { frontmatter, markdown };
}

/**
 * Load all blog posts for a given language (with English fallback).
 */
export function loadBlogPosts(lang: Language): BlogPost[] {
  const blogDir = getBlogDir(lang);
  
  if (!existsSync(blogDir)) {
    return [];
  }

  const files = readdirSync(blogDir).filter(f => f.endsWith('.md'));
  
  const posts = files.map(file => {
    const slug = file.replace('.md', '');
    const filePath = join(blogDir, file);
    const content = readFileSync(filePath, 'utf-8');
    const { frontmatter, markdown } = parseFrontmatter(content);
    
    let title = frontmatter.title || slug;
    let date = frontmatter.date || '';
    let excerpt = frontmatter.excerpt || '';
    let tag = frontmatter.tag;
    
    // If no excerpt, use first paragraph
    if (!excerpt && markdown) {
      const firstPara = markdown.trim().split('\n\n')[0];
      excerpt = firstPara.substring(0, 200) + (firstPara.length > 200 ? '...' : '');
    }
    
    return { slug, title, date, excerpt, tag };
  });

  // Sort by date descending
  return posts.sort((a, b) => {
    if (!a.date || !b.date) return 0;
    return new Date(b.date).getTime() - new Date(a.date).getTime();
  });
}

/**
 * Load a single blog post by slug.
 */
export function loadBlogPost(lang: Language, slug: string): BlogPostContent | null {
  const blogDir = getBlogDir(lang);
  const filePath = join(blogDir, `${slug}.md`);
  
  if (!existsSync(filePath)) {
    return null;
  }
  
  const content = readFileSync(filePath, 'utf-8');
  const { frontmatter, markdown } = parseFrontmatter(content);
  
  const title = frontmatter.title || slug;
  const date = frontmatter.date || '';
  const excerpt = frontmatter.excerpt || '';
  const tag = frontmatter.tag;
  const htmlContent = marked.parse(markdown);
  
  return {
    slug,
    title,
    date,
    excerpt,
    tag,
    content: htmlContent as string,
  };
}

/**
 * Get all blog post slugs for static path generation.
 */
export function getAllBlogSlugs(lang: Language): string[] {
  const blogDir = getBlogDir(lang);
  
  if (!existsSync(blogDir)) {
    return [];
  }
  
  return readdirSync(blogDir)
    .filter(f => f.endsWith('.md'))
    .map(f => f.replace('.md', ''));
}
