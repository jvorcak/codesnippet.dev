import { definitions } from './supabase'
import { Layout } from 'react-grid-layout'

export interface Code {
  i: string
  lang: string
  content: string
}

export type Snippet = Omit<definitions['snippets'], 'imageLayout'> & {
  renderedContent: string
  imageURL?: string
  imageLayout?: Layout[]
  codes?: Code[]
}
