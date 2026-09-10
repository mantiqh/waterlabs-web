import type { StructureResolver } from 'sanity/structure';

export const structure: StructureResolver = (S) =>
  S.list()
    .title('Website Content')
    .items([
      S.listItem()
        .title('Case Studies')
        .schemaType('caseStudy')
        .child(
          S.documentTypeList('caseStudy')
            .title('Case Studies')
        ),
      S.divider(),
      S.listItem()
        .title('About Us – Leadership')
        .schemaType('aboutUsPage')
        .child(
          S.document()
            .title('Leadership Section')
            .schemaType('aboutUsPage')
            .documentId('aboutUsPage')
        ),
      S.divider(),
      S.listItem()
        .title('Careers Page')
        .schemaType('careersPage')
        .child(
          S.document()
            .title('Careers Page')
            .schemaType('careersPage')
            .documentId('careersPage')
        ),
      S.divider(),
      S.listItem()
        .title('Blog Articles')
        .schemaType('blogPost')
        .child(
          S.documentTypeList('blogPost')
            .title('Blog Articles')
        ),
      S.divider(),
      S.listItem()
        .title('Blogs Page Settings')
        .schemaType('blogsPage')
        .child(
          S.document()
            .title('Blogs Page Settings')
            .schemaType('blogsPage')
            .documentId('blogsPage')
        ),
      S.divider(),
      ...S.documentTypeListItems().filter(
        (listItem) => !['aboutUsPage', 'careersPage', 'caseStudy', 'blogPost', 'blogsPage'].includes(listItem.getId() || '')
      ),
    ]);

