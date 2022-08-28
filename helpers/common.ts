import { GetServerSideProps } from 'next'
import { supabaseClient } from '@supabase/supabase-auth-helpers/nextjs'
import { unified } from 'unified'
import remarkParse from 'remark-parse'
import remarkRehype from 'remark-rehype'
import rehypeFormat from 'rehype-format'
import rehypeStringify from 'rehype-stringify'
import remarkGfm from 'remark-gfm'
import keyBy from 'lodash/keyBy'
import { codeImport } from './remark-code-blocks-import'
import { Code } from '../types'

export const contentToHTML = async (
  content: string,
  codes: Code[]
): Promise<string> => {
  const parsed = await unified()
    .use(remarkParse)
    .use(codeImport, {
      codeMap: keyBy(codes, 'i'),
    })
    .use(remarkRehype)
    .use(remarkGfm)
    .use(rehypeFormat)
    .use(rehypeStringify)
    // .use(remarkFrontmatter, { type: 'yaml', marker: '-' })
    // .use(rehypeHighlight)
    .process(content)
  return parsed.value as string
}

export const getServerSidePropsWithSnippet: GetServerSideProps = async (
  context
) => {
  const id = context.query.id as string

  const { data: snippet, error } = await supabaseClient
    .from('snippets')
    .select()
    .eq('id', id)
    .single()

  if (snippet === null) {
    return {
      notFound: true,
    }
  }

  snippet.imageURL =
    (await supabaseClient.storage.from('images').getPublicUrl(snippet.imagePath)
      .publicURL) + `?lastUpdated=${snippet.updated_at}`

  return {
    props: {
      snippet,
    },
  }
}
