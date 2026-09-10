import { type SchemaTypeDefinition } from 'sanity';

import { aboutUsPageSchema } from './aboutUsPage';
import { blogPostSchema } from './blogPost';
import { blogsPageSchema } from './blogsPage';
import { careersPageSchema } from './careersPage';
import { caseStudySchema } from './caseStudy';

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [aboutUsPageSchema, careersPageSchema, caseStudySchema, blogPostSchema, blogsPageSchema],
};

