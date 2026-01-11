import Markdoc from '@markdoc/markdoc';
import React from 'react';

// Basic Markdoc configuration for rendering content
const markdocConfig: Markdoc.Config = {
  nodes: {
    paragraph: {
      render: 'p',
    },
    heading: {
      render: ({ level }: { level: number }) => {
        const Tag = `h${level}` as keyof JSX.IntrinsicElements;
        return React.createElement(Tag);
      },
      attributes: {
        level: { type: Number },
      },
    },
    list: {
      render: 'ul',
      attributes: {
        ordered: { type: Boolean },
      },
    },
    item: {
      render: 'li',
    },
    strong: {
      render: 'strong',
    },
    em: {
      render: 'em',
    },
    link: {
      render: 'a',
      attributes: {
        href: { type: String },
      },
    },
    code: {
      render: 'code',
    },
    fence: {
      render: 'pre',
      attributes: {
        language: { type: String },
      },
    },
  },
};

export function renderMarkdoc(content: any) {
  if (!content) return null;
  
  try {
    // If content is already an AST (from Keystatic), use it directly
    // Otherwise, parse it as markdown
    const ast = typeof content === 'string' ? Markdoc.parse(content) : content;
    const transformedContent = Markdoc.transform(ast, markdocConfig);
    return Markdoc.renderers.react(transformedContent, React);
  } catch (error) {
    console.error('Error rendering Markdoc:', error);
    // Fallback: if content is a string, render as HTML
    if (typeof content === 'string') {
      return <div dangerouslySetInnerHTML={{ __html: content }} />;
    }
    return null;
  }
}
