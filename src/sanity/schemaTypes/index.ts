import { type SchemaTypeDefinition } from 'sanity';

import { careersPageSchema } from './careersPage';

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [careersPageSchema],
};
