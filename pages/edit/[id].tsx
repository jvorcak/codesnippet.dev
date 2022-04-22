import React, { ReactElement, useCallback } from 'react'
import Layout from '../../components/Layout'
import SnippetForm from '../../components/SnippetForm'
import { NextPageWithLayout } from '../_app'
import { GetServerSideProps } from 'next'
import { Snippet } from '../../types'
import { getServerSidePropsWithSnippet } from '../../helpers/getServerSidePropsWithSnippet'
import Button from '../../components/Button'
import { useUser } from '@supabase/supabase-auth-helpers/react'
import { useRouter } from 'next/router'
import { supabaseClient } from '@supabase/supabase-auth-helpers/nextjs'

const EditPage: NextPageWithLayout<{
  snippet: Snippet
}> = ({ snippet }) => {
  const { user } = useUser()
  const router = useRouter()

  const deleteSnippet = useCallback(async () => {
    await supabaseClient
      .from('snippets')
      .delete()
      .match({ id: snippet.id })
      .then(() => {
        router.push('/')
      })
  }, [router, snippet])

  return (
    <div>
      <SnippetForm snippetId={snippet.id} defaultValues={snippet} />
      {user?.id === snippet.author && (
        <Button type="button" onClick={deleteSnippet}>
          Delete
        </Button>
      )}
    </div>
  )
}

EditPage.getLayout = function getLayout(page: ReactElement) {
  return <Layout>{page}</Layout>
}

export const getServerSideProps: GetServerSideProps =
  getServerSidePropsWithSnippet

export default EditPage
