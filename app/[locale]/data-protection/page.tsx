import { getPrivacyPolicy } from '@/lib/keystatic';
import { renderMarkdoc } from '@/lib/markdoc';
import type { Locale } from '@/lib/i18n';

export default async function DataProtectionPage({
  params,
}: {
  params: Promise<{ locale: Locale }>;
}) {
  const { locale } = await params;
  const privacyPolicy = await getPrivacyPolicy(locale);

  return (
    <div className="page-privacy-policy">
      <div className="page">
        {privacyPolicy ? (
          <>
            {privacyPolicy.lastUpdated && (
              <p className="privacy-content">Last updated: {privacyPolicy.lastUpdated}</p>
            )}
            {renderMarkdoc(privacyPolicy.content)}
          </>
        ) : (
          <>
            <h1>Privacy policy</h1>
            <p>Content not available in this language.</p>
          </>
        )}
      </div>
    </div>
  );
}
