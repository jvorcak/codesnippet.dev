import React, { FC, ReactElement } from 'react'
import Layout from '../../components/Layout'
import { GetServerSideProps } from 'next'
import { supabaseClient } from '@supabase/supabase-auth-helpers/nextjs'
import { NextPageWithLayout } from '../_app'
import { Snippet } from '../../types'
import { useUser } from '@supabase/supabase-auth-helpers/react'
import Link from 'next/link'

const Slug: NextPageWithLayout<{ snippet: Snippet }> = ({ snippet }) => {
  const { user } = useUser()
  return (
    <div>
      {JSON.stringify(snippet)}
      {user?.id === snippet?.author && (
        <Link href={`/edit/${snippet.id}`}>Edit</Link>
      )}
    </div>
  )
}

Slug.getLayout = function getLayout(page: ReactElement) {
  return <Layout>{page}</Layout>
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  const id = context.query.id as string

  const { data: snippet, error } = await supabaseClient
    .from('snippets')
    .select()
    .eq('id', id)
    .single()

  return {
    props: {
      snippet,
    },
  }
}

export default Slug
