import React from 'react'
import GridLayout, { Layout } from 'react-grid-layout'
import CodeEditor from './CodeEditor'
import { Snippet } from '../types'
import styles from '../pages/[id]/image.module.css'

const ImageGridLayout = ({
  snippet,
  onLayoutChange,
}: {
  snippet: Snippet
  onLayoutChange?: (layout: Layout) => void
}) => {
  return (
    <div className={styles[snippet.themeName]}>
      <GridLayout
        isDraggable={!!onLayoutChange}
        isResizable={!!onLayoutChange}
        layout={snippet.imageLayout}
        cols={100}
        rowHeight={27}
        maxRows={25}
        width={1200}
        style={{ height: 675, maxHeight: 675 }}
        compactType={null}
        isBounded={true}
        allowOverlap={true}
        onLayoutChange={onLayoutChange}
      >
        <div
          key="title"
          className="flex items-center font-koulen text-6xl uppercase text-white"
        >
          {snippet.title}
        </div>
        {snippet.codes?.map((code) => (
          <div key={code.i}>
            <CodeEditor code={code} />
          </div>
        ))}
      </GridLayout>
    </div>
  )
}

export default ImageGridLayout
