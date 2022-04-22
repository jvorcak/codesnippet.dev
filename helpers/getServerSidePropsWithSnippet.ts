import { GetServerSideProps } from 'next'
import { supabaseClient } from '@supabase/supabase-auth-helpers/nextjs'
import {unified} from "unified";
import remarkParse from "remark-parse";
import remarkRehype from "remark-rehype";
import rehypeFormat from 'rehype-format'
import rehypeStringify from 'rehype-stringify'

export const getServerSidePropsWithSnippet: GetServerSideProps = async (
  context
) => {
  const id = context.query.id as string

  const { data: snippet, error } = await supabaseClient
    .from('snippets')
    .select()
    .eq('id', id)
    .single()

  // snippet.content
  const text = await unified()
      .use(remarkParse)
      .use(remarkRehype)
      .use(rehypeFormat)
      .use(rehypeStringify)
      .process(snippet.content)

  // console.log({text})
  snippet.content = text.value

  if (snippet === null) {
    return {
      notFound: true,
    }
  }

  return {
    props: {
      snippet,
    },
  }
}
