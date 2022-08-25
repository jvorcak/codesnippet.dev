import React from 'react'
import { GetServerSideProps } from 'next'
import { NextPageWithLayout } from '../_app'
import { Snippet } from '../../types'
import { getServerSidePropsWithSnippet } from '../../helpers/common'
import CodeEditor from '../../components/CodeEditor'
import styles from './image.module.css'
import GridLayout from 'react-grid-layout'

const Slug: NextPageWithLayout<{
  snippet: Snippet
}> = ({ snippet }) => {
  return (
    <div className={styles.django}>
      <GridLayout
        isDraggable={false}
        isResizable={false}
        layout={snippet.imageLayout}
        cols={100}
        rowHeight={27}
        maxRows={25}
        width={1200}
        style={{ height: 675, maxHeight: 675 }}
        compactType={null}
        isBounded={true}
      >
        <div
          key="title"
          className="flex items-center font-koulen text-6xl uppercase text-white"
        >
          {snippet.title}
        </div>
        {snippet.codes?.map(({ lang, content, i }) => (
          <div key={i}>
            <CodeEditor snippet={content} />
          </div>
        ))}
      </GridLayout>
    </div>
  )
}

export const getServerSideProps: GetServerSideProps =
  getServerSidePropsWithSnippet

export default Slug
