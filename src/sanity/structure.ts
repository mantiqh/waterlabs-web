import type { StructureResolver } from 'sanity/structure';

export const structure: StructureResolver = (S) =>
  S.list()
    .title('Content')
    .items([
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
        (listItem) => listItem.getId() !== 'careersPage'
      ),
    ]);
