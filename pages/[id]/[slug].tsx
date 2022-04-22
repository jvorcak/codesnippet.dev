import React, { FC, ReactElement } from 'react'
import Layout from '../../components/Layout'
import { GetServerSideProps } from 'next'
import ReactMarkdown from 'react-markdown'
import { NextPageWithLayout } from '../_app'
import { Snippet } from '../../types'
import remarkGfm from 'remark-gfm'
import rehypeHighlight from 'rehype-highlight'
import { useUser } from '@supabase/supabase-auth-helpers/react'
import { getServerSidePropsWithSnippet } from '../../helpers/getServerSidePropsWithSnippet'
import { PencilAltIcon } from '@heroicons/react/solid'
import Button from '../../components/Button'

const Slug: NextPageWithLayout<{ snippet: Snippet }> = ({ snippet }) => {
  const { user } = useUser()
  return (
    <div className="prose">
      <ReactMarkdown remarkPlugins={[remarkGfm, rehypeHighlight]}>
        {snippet.content as string}
      </ReactMarkdown>
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
