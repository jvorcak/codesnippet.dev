import { GetServerSideProps } from 'next'
import { supabaseClient } from '@supabase/supabase-auth-helpers/nextjs'
import { unified } from 'unified'
import remarkParse from 'remark-parse'
import remarkRehype from 'remark-rehype'
import rehypeFormat from 'rehype-format'
import rehypeStringify from 'rehype-stringify'
import remarkGfm from 'remark-gfm'
import rehypeHighlight from 'rehype-highlight'
import { visit } from 'unist-util-visit'
import { toText } from 'hast-util-to-text'
import { Root } from 'hast'
import { Plugin } from 'unified'
import remarkFrontmatter from 'remark-frontmatter'
import { CodeSnippet } from '../types'

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

  let codeSnippets: CodeSnippet[] = []

  const extractCodeSnippetsPlugin: Plugin<[], Root> = () => {
    return (tree: any) => {
      visit(tree, 'element', (node) => {
        if (node.tagName === 'code') {
          const [lang] = node?.properties?.className ?? []
          codeSnippets.push({
            lang: lang ?? null,
            content: toText(node, { whitespace: 'pre' }),
          })
        }
        return node
      })
    }
  }

  const text = await unified()
    .use(remarkParse)
    .use(remarkRehype)
    .use(remarkGfm)
    .use(rehypeFormat)
    .use(extractCodeSnippetsPlugin)
    .use(rehypeStringify)
    .use(remarkFrontmatter, { type: 'yaml', marker: '-' })
    .use(rehypeHighlight)
    .process(snippet.content)

  console.log({ codeSnippets })

  snippet.imageURL =
    (await supabaseClient.storage.from('images').getPublicUrl(snippet.imagePath)
      .publicURL) + `?lastUpdated=${snippet.updated_at}`

  snippet.renderedContent = text.value

  return {
    props: {
      snippet,
      codeSnippets,
    },
  }
}
