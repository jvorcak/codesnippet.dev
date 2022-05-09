import { definitions } from './supabase'

export type Snippet = definitions['snippets'] & {
  renderedContent: string
  imageURL?: string
}
