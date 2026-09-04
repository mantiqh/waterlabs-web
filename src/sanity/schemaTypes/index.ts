import { type SchemaTypeDefinition } from 'sanity';

import { careersPageSchema } from './careersPage';
import { caseStudySchema } from './caseStudy';

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [careersPageSchema, caseStudySchema],
};

