import { type SchemaTypeDefinition } from 'sanity';

import { aboutUsPageSchema } from './aboutUsPage';
import { blogPostSchema } from './blogPost';
import { blogsPageSchema } from './blogsPage';
import { careersPageSchema } from './careersPage';
import { caseStudiesPageSchema } from './caseStudiesPage';
import { caseStudySchema } from './caseStudy';
import { solutionPageSchema } from './solutionPage';

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [
    aboutUsPageSchema,
    careersPageSchema,
    caseStudySchema,
    caseStudiesPageSchema,
    blogPostSchema,
    blogsPageSchema,
    solutionPageSchema,
  ],
};

