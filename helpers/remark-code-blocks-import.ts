import { visit } from 'unist-util-visit'
import type { Root } from 'mdast'
import { Code } from '../types'

type CodeImportOptions = {
  codeMap: Record<string, Code>
}

function codeImport(options: CodeImportOptions) {
  return function transformer(tree: Root) {
    visit(tree, 'code', (node, index, parent) => {
      if (node.lang === 'include') {
        const newContent = options.codeMap[node.meta]?.content
        if (newContent) {
          node.value = newContent
        }
      }
      return node
    })

    return tree
  }
}

export { codeImport }
