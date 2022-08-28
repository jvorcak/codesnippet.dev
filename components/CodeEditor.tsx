import React from 'react'
import styles from './CodeEditor.module.css'

import 'highlight.js/styles/github-dark.css'

// @ts-ignore
import Lowlight from 'react-lowlight'

// @ts-ignore
import javascript from 'highlight.js/lib/languages/xml'
import { Code } from '../types'
import classNames from 'classnames'
Lowlight.registerLanguage('js', javascript)

const CodeEditor = ({ code }: Code) => {
  return (
    <div className={classNames(styles.editor, 'rotate-3')}>
      {/*<div className="text-center row-start-1 col-start-1">aaa</div>*/}
      <div className="grid grid-cols-2 items-center overflow-hidden text-ellipsis whitespace-nowrap">
        <div className="col-span-1 col-start-1 row-start-1 flex">
          <div className="mr-1 h-3 w-3 rounded-full bg-red-400" />
          <div className="mr-1 h-3 w-3 rounded-full bg-orange-400" />
          <div className="mr-1 h-3 w-3 rounded-full bg-green-400" />
        </div>
        <div className="col-span-2 col-start-1 row-start-1 pl-12 text-center">
          {code.title}
        </div>
      </div>
      <div className="col-start-1 row-start-2 overflow-auto">
        <Lowlight language="html" value={code.content} />
      </div>
    </div>
  )
}

export default CodeEditor
