import React, { ReactElement } from 'react'
import Layout from '../../components/Layout'
import SnippetForm from '../../components/SnippetForm'
import { NextPageWithLayout } from '../_app'

const EditPage: NextPageWithLayout = () => <SnippetForm />

EditPage.getLayout = function getLayout(page: ReactElement) {
  return <Layout>{page}</Layout>
}

export default EditPage
