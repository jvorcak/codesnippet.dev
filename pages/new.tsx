import React, { ReactElement, useCallback } from 'react'
import Layout from '../components/Layout'
import SnippetForm from '../components/SnippetForm'
import { NextPageWithLayout } from './_app'

const New: NextPageWithLayout = () => <SnippetForm />

New.getLayout = function getLayout(page: ReactElement) {
  return <Layout>{page}</Layout>
}

export default New
