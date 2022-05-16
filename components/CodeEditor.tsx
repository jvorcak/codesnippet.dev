import React from 'react'
import styles from './CodeEditor.module.css'

import 'highlight.js/styles/github-dark.css'

// @ts-ignore
import Lowlight from 'react-lowlight'

// @ts-ignore
import javascript from 'highlight.js/lib/languages/xml'
Lowlight.registerLanguage('js', javascript)

const CodeEditor = ({ snippet }: { snippet: string }) => {
  return (
    <div className={styles.editor}>
      {/*<div className="text-center row-start-1 col-start-1">aaa</div>*/}
      <div className="col-start-1 row-start-1 flex items-center text-left">
        <div className="mr-1 h-3 w-3 rounded-full bg-red-400" />
        <div className="mr-1 h-3 w-3 rounded-full bg-orange-400" />
        <div className="mr-1 h-3 w-3 rounded-full bg-green-400" />
      </div>
      <div className="col-start-1 row-start-2 overflow-auto">
        <Lowlight language="html" value={snippet} />
      </div>
    </div>
  )
}

export default CodeEditor
