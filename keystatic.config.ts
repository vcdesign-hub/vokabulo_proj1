import { config, fields, collection } from '@keystatic/core';

export default config({
  storage: {
    kind: 'local',
  },
  collections: {
    // Home page content - one entry per language
    homePages: collection({
      label: 'Home Pages',
      slugField: 'locale',
      path: 'content/home/*',
      format: { contentField: 'content' },
      schema: {
        locale: fields.slug({
          name: {
            label: 'Language Code',
            description: 'ISO language code (e.g., en, de, fr, es, it)',
          },
        }),
        heroTitle: fields.text({
          label: 'Hero Title',
          description: 'Main headline on the hero section',
        }),
        heroSubtitle: fields.text({
          label: 'Hero Subtitle',
          description: 'Subheading text below the hero title',
          multiline: true,
        }),
        heroCTA: fields.text({
          label: 'Hero CTA Button Text',
          description: 'Text for the main call-to-action button',
        }),
        philosophyTitle: fields.text({
          label: 'Philosophy Section Title',
        }),
        philosophyDescription: fields.text({
          label: 'Philosophy Description',
          multiline: true,
        }),
        featuresTitle: fields.text({
          label: 'Features Section Title',
        }),
        featuresDescription: fields.text({
          label: 'Features Description',
          multiline: true,
        }),
        testimonialsTitle: fields.text({
          label: 'Testimonials Section Title',
        }),
        faqTitle: fields.text({
          label: 'FAQ Section Title',
        }),
        content: fields.markdoc({
          label: 'Additional Content',
          description: 'Use Markdoc for rich content if needed',
        }),
      },
    }),

    // Support articles - organized by language and section
    supportArticles: collection({
      label: 'Support Articles',
      slugField: 'title',
      path: 'content/support/**/*',
      format: { contentField: 'content' },
      schema: {
        locale: fields.select({
          label: 'Language',
          options: [
            { label: 'English', value: 'en' },
            { label: 'German', value: 'de' },
            { label: 'French', value: 'fr' },
            { label: 'Spanish', value: 'es' },
            { label: 'Italian', value: 'it' },
            { label: 'Portuguese', value: 'pt' },
          ],
          defaultValue: 'en',
        }),
        section: fields.select({
          label: 'Section',
          options: [
            { label: 'About Vokabulo', value: 'about' },
            { label: 'Getting Started', value: 'start' },
            { label: 'Words', value: 'words' },
            { label: 'Study', value: 'study' },
            { label: 'Situations', value: 'situations' },
            { label: 'Community', value: 'community' },
          ],
          defaultValue: 'about',
        }),
        title: fields.text({
          label: 'Article Title',
        }),
        description: fields.text({
          label: 'Description',
          multiline: true,
        }),
        order: fields.integer({
          label: 'Display Order',
          description: 'Order within the section (lower numbers appear first)',
        }),
        content: fields.markdoc({
          label: 'Content',
        }),
      },
    }),

    // Legal notice - one per language
    legalNotices: collection({
      label: 'Legal Notices',
      slugField: 'locale',
      path: 'content/legal-notice/*',
      format: { contentField: 'content' },
      schema: {
        locale: fields.slug({
          name: {
            label: 'Language Code',
          },
        }),
        companyName: fields.text({
          label: 'Company Name',
        }),
        address: fields.text({
          label: 'Address',
          multiline: true,
        }),
        email: fields.text({
          label: 'Contact Email',
        }),
        registrationNumber: fields.text({
          label: 'Registration Number',
          description: 'Company registration number if applicable',
        }),
        content: fields.markdoc({
          label: 'Legal Notice Content',
        }),
      },
    }),

    // Privacy policy - one per language
    privacyPolicies: collection({
      label: 'Privacy Policies',
      slugField: 'locale',
      path: 'content/privacy-policy/*',
      format: { contentField: 'content' },
      schema: {
        locale: fields.slug({
          name: {
            label: 'Language Code',
          },
        }),
        lastUpdated: fields.date({
          label: 'Last Updated',
        }),
        content: fields.markdoc({
          label: 'Privacy Policy Content',
        }),
      },
    }),
  },
});
