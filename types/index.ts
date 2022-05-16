import { definitions } from './supabase'
import { Layout } from 'react-grid-layout'

export type Snippet = Omit<definitions['snippets'], 'imageLayout'> & {
  renderedContent: string
  imageURL?: string
  imageLayout?: Layout[]
}

export type CodeSnippet = {
  lang: string
  content: string
}
