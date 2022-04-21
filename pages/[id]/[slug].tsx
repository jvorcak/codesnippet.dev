import React, { FC, ReactElement } from 'react'
import Layout from '../../components/Layout'
import { GetServerSideProps } from 'next'
import { supabaseClient } from '@supabase/supabase-auth-helpers/nextjs'
import { NextPageWithLayout } from '../_app'
import { Snippet } from '../../types'
import { useUser } from '@supabase/supabase-auth-helpers/react'
import Link from 'next/link'
import { getServerSidePropsWithSnippet } from '../../helpers/getServerSidePropsWithSnippet'

const Slug: NextPageWithLayout<{ snippet: Snippet }> = ({ snippet }) => {
  const { user } = useUser()
  return (
    <div>
      {JSON.stringify(snippet)}
      {user && snippet && user.id === snippet.author && (
        <Link href={`/edit/${snippet.id}`}>Edit</Link>
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