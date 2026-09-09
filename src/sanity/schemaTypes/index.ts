import { type SchemaTypeDefinition } from 'sanity';

import { aboutUsPageSchema } from './aboutUsPage';
import { careersPageSchema } from './careersPage';
import { caseStudySchema } from './caseStudy';

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [aboutUsPageSchema, careersPageSchema, caseStudySchema],
};

