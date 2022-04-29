import React, { ReactElement, useCallback } from 'react'
import Layout from '../../components/Layout'
import SnippetForm from '../../components/SnippetForm'
import { NextPageWithLayout } from '../_app'
import { GetServerSideProps } from 'next'
import { Snippet } from '../../types'
import { getServerSidePropsWithSnippet } from '../../helpers/getServerSidePropsWithSnippet'

const EditPage: NextPageWithLayout<{
  snippet: Snippet
}> = ({ snippet }) => {
  return (
    <Layout theme="django">
      <SnippetForm snippetId={snippet.id} defaultValues={snippet} />
    </Layout>
  )
}

export const getServerSideProps: GetServerSideProps =
  getServerSidePropsWithSnippet

export default EditPage
