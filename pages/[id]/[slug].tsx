import React from 'react'
import Layout from '../../components/Layout'
import { GetServerSideProps } from 'next'
import { NextPageWithLayout } from '../_app'
import { Snippet } from '../../types'
import { useUser } from '@supabase/supabase-auth-helpers/react'
import { PencilAltIcon, ShareIcon } from '@heroicons/react/solid'
import Button from '../../components/Button'
import { getServerSidePropsWithSnippet } from '../../helpers/common'

const Slug: NextPageWithLayout<{ snippet: Snippet }> = ({ snippet }) => {
  const { user } = useUser()

  const navButtons = []

  if (user && snippet && user.id === snippet.author) {
    navButtons.push(
      <Button as="a" href={`/edit/${snippet.id}`} nextLink icon={PencilAltIcon}>
        Edit
      </Button>
    )
  }

  navButtons.push(
    <Button icon={ShareIcon} onClick={() => {}} type="button">
      Share
    </Button>
  )

  return (
    <Layout theme="django" actions={navButtons}>
      <img src={snippet.imageURL} className="shadow-2xl" />
      <article className="prose prose-slate mx-auto pt-10">
        <h1 className="py-10 text-center">{snippet.title}</h1>
        <div dangerouslySetInnerHTML={{ __html: snippet.renderedContent }} />
      </article>
    </Layout>
  )
}

export const getServerSideProps: GetServerSideProps =
  getServerSidePropsWithSnippet

export default Slug
