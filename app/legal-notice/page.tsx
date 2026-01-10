'use client';

export default function LegalNoticePage() {
  return (
    <>
      <style jsx global>{`
        /* Legal Notice page-specific styles */
        .page {
          max-width: 750px;
          margin: 0 auto;
          padding: 140px 24px 48px;
        }

        main {
          margin-top: 0;
          background: transparent;
          border: none;
          border-radius: 0;
          padding: 0;
          box-shadow: none;
        }

        h1 {
          margin: 0 0 12px;
          font-size: 32px;
          line-height: 1.2;
        }

        h2 {
          margin: 32px 0 12px;
          font-size: 20px;
        }

        p,
        li {
          margin: 0 0 12px;
          color: var(--muted);
          line-height: 1.6;
        }

        ul {
          padding-left: 20px;
        }

        .theme-dark main {
          background: transparent;
        }
      `}</style>

      <div className="page">
        <main>
          <h1>Legal Notice</h1>

          <h2>Vokabulo</h2>
          <p>
            Vokabulo<br />
            (Add address line 1)<br />
            (Add address line 2)<br />
            (Add city and postal code)<br />
            (Add country)<br />
            Email: (Add contact email)<br />
            (Add company registration number if applicable)
          </p>

          <h2>Legal notice</h2>
          <p>
            All rights reserved. Downloading, printing and saving files from this website is permitted for private use only. Any other use, in particular the creation of a hyperlink or framing on or with regard to parts of this website requires the prior written consent. Any content of the website and its parts has been created and monitored with the greatest possible care. Any liability with regard to links to other websites and the correctness and up-to-dateness of the information contained therein, as well as for data loss or other technical impairments that may occur when viewing or downloading data from this website, is excluded.
          </p>

          <h2>Copyright</h2>
          <p>
            Designs, graphics, texts, pictures, sound, animations and videos as well as their arrangement on the webpage of Vokabulo are subject to copyright protection and other protective laws. The content of this website may not be copied, distributed, modified or made available to third parties for commercial purposes. No part of the site may be reproduced in any form or processed, duplicated or otherwise distributed using electronic systems without written permission.
          </p>
          <p>
            We would like to point out that some of the images contained on the website are subject to the copyright of third parties.
          </p>
          <p>
            All information on these pages is provided without guarantee for its correctness. In no event will we be liable for any damages resulting from the use of the retrieved information.
          </p>
        </main>
      </div>
    </>
  );
}
