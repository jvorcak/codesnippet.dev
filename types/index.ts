import { definitions } from './supabase'

export type Snippet = definitions['snippets'] & {
  renderedContent: string
  imageURL?: string
}

export type CodeSnippet = {
  lang: string
  content: string
}
