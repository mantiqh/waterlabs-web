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
        .title('Careers Page')
        .schemaType('careersPage')
        .child(
          S.document()
            .title('Careers Page')
            .schemaType('careersPage')
            .documentId('careersPage')
        ),
      S.divider(),
      ...S.documentTypeListItems().filter(
        (listItem) => !['careersPage', 'caseStudy'].includes(listItem.getId() || '')
      ),
    ]);

