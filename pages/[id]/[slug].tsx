import React, { ReactElement } from 'react'
import Layout from '../../components/Layout'
import { GetServerSideProps } from 'next'
import { NextPageWithLayout } from '../_app'
import { Snippet } from '../../types'
import { useUser } from '@supabase/supabase-auth-helpers/react'
import { getServerSidePropsWithSnippet } from '../../helpers/getServerSidePropsWithSnippet'
import { PencilAltIcon } from '@heroicons/react/solid'
import Button from '../../components/Button'


const Slug: NextPageWithLayout<{ snippet: Snippet }> = ({ snippet }) => {
  const { user } = useUser()
  return (
    <div className="prose">
      <div dangerouslySetInnerHTML={{ __html: snippet.content as string }}/>
      {user && snippet && user.id === snippet.author && (
        <Button
          as="a"
          href={`/edit/${snippet.id}`}
          nextLink
          icon={PencilAltIcon}
        >
          Edit
        </Button>
      )}
    </div>
  )
}

Slug.getLayout = function getLayout(page: ReactElement) {
  return <Layout>{page}</Layout>
}

export const getServerSideProps: GetServerSideProps =
  getServerSidePropsWithSnippet

export default Slug
