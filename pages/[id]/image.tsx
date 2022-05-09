import React from 'react'
import { GetServerSideProps } from 'next'
import { NextPageWithLayout } from '../_app'
import { Snippet } from '../../types'
import { getServerSidePropsWithSnippet } from '../../helpers/getServerSidePropsWithSnippet'
import CodeEditor from '../../components/CodeEditor'
import styles from './image.module.css'
import classNames from 'classnames'

const Slug: NextPageWithLayout<{ snippet: Snippet }> = ({ snippet }) => {
  return (
    <div className={classNames('h-full w-full', styles.django)}>
      <h1 className="p-20 font-koulen font-sans text-6xl text-white">
        {snippet.title}
      </h1>
      <CodeEditor snippet={'Hello World'}></CodeEditor>
      {/*<div dangerouslySetInnerHTML={{ __html: snippet.renderedContent }} />*/}
    </div>
  )
}

export const getServerSideProps: GetServerSideProps =
  getServerSidePropsWithSnippet

export default Slug
