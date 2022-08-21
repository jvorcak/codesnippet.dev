import { definitions } from './supabase'
import { Layout } from 'react-grid-layout'

export interface Code extends Layout {
  lang: string
  content: string
}

export type Snippet = Omit<definitions['snippets'], 'imageLayout'> & {
  renderedContent: string
  imageURL?: string
  imageLayout?: Code[]
}

export type CodeSnippet = {
  lang: string
  content: string
  key: string
}
