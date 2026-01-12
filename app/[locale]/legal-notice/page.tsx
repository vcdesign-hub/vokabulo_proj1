import { getLegalNotice } from '@/lib/keystatic';
import { renderMarkdoc } from '@/lib/markdoc';
import type { Locale } from '@/lib/i18n';

export default async function LegalNoticePage({
  params,
}: {
  params: Promise<{ locale: Locale }>;
}) {
  const { locale } = await params;
  const legalNotice = await getLegalNotice(locale);

  return (
    <div className="page-legal-notice">
      <div className="page">
        {legalNotice ? (
          renderMarkdoc(legalNotice.content)
        ) : (
          <>
            <h1>Legal notice</h1>
            <p>Content not available in this language.</p>
          </>
        )}
      </div>
    </div>
  );
}
