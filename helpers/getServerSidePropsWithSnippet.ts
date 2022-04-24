import { GetServerSideProps } from 'next'
import { supabaseClient } from '@supabase/supabase-auth-helpers/nextjs'
import { unified } from 'unified'
import remarkParse from 'remark-parse'
import remarkRehype from 'remark-rehype'
import rehypeFormat from 'rehype-format'
import rehypeStringify from 'rehype-stringify'
import remarkGfm from 'remark-gfm'
import rehypeHighlight from 'rehype-highlight'

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
    .use(remarkRehype)
    .use(remarkGfm)
    .use(rehypeFormat)
    .use(rehypeStringify)
    .use(rehypeHighlight)
    .process(snippet.content)

  snippet.renderedContent = text.value

  return {
    props: {
      snippet,
    },
  }
}
