import { type SchemaTypeDefinition } from 'sanity'
import { homepageSchema } from './homepage'

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [homepageSchema],
}
