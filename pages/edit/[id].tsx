import React from 'react'
import { ThemeContext, THEMES } from '../../components/Layout'
import SnippetForm from '../../components/SnippetForm'
import { NextPageWithLayout } from '../_app'
import { GetServerSideProps } from 'next'
import { Snippet } from '../../types'
import TopMenu from '../../components/TopMenu'
import { getServerSidePropsWithSnippet } from '../../helpers/common'

const EditPage: NextPageWithLayout<{
  snippet: Snippet
}> = ({ snippet }) => {
  const theme = THEMES['default']
  return (
    <ThemeContext.Provider value={theme}>
      <TopMenu theme={theme} />
      <div className="p-4 sm:p-6">
        <SnippetForm snippetId={snippet.id} defaultValues={snippet} />
      </div>
    </ThemeContext.Provider>
  )
}

export const getServerSideProps: GetServerSideProps =
  getServerSidePropsWithSnippet

export default EditPage
