import { GetServerSideProps } from 'next'
import { supabaseClient } from '@supabase/supabase-auth-helpers/nextjs'
import { unified } from 'unified'
import remarkParse from 'remark-parse'
import remarkRehype from 'remark-rehype'
import rehypeFormat from 'rehype-format'
import rehypeStringify from 'rehype-stringify'
import remarkGfm from 'remark-gfm'
import rehypeHighlight from 'rehype-highlight'
import crypto from 'crypto'
// import { visit } from 'unist-util-visit'

// /** @type {import('unified').Plugin<[], import('hast').Root>} */
// function myRehypePluginToIncreaseHeadings() {
//   return (tree: any) => {
//     visit(tree, 'element', (node) => {
//       if (node.tagName === 'code') {
//         console.log(node)
//       }
//     })
//   }
// }

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
    // .use(myRehypePluginToIncreaseHeadings)
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
