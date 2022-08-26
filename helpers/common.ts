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

  const text = await unified()
    .use(remarkParse)
    .use(codeImport, {
      codeMap: keyBy(snippet.codes, 'i'),
    })
    .use(remarkRehype)
    .use(remarkGfm)
    .use(rehypeFormat)
    .use(rehypeStringify)
    // .use(remarkFrontmatter, { type: 'yaml', marker: '-' })
    // .use(rehypeHighlight)
    .process(snippet.content)

  snippet.imageURL =
    (await supabaseClient.storage.from('images').getPublicUrl(snippet.imagePath)
      .publicURL) + `?lastUpdated=${snippet.updated_at}`

  snippet.renderedContent = text.value

  return {
    props: {
      snippet,
    },
  }
}
