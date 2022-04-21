import Head from 'next/head'
import Layout from '../components/Layout'
import { ReactElement } from 'react'
import { NextPageWithLayout } from './_app'
import { GetServerSideProps } from 'next'
import { supabaseClient } from '@supabase/supabase-auth-helpers/nextjs'
import Link from 'next/link'
import { Snippet } from '../types'

const Home: NextPageWithLayout<{ snippets: Snippet[] }> = ({ snippets }) => {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center py-2">
      <Head>
        <title>Create Next App</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <ul>
        {snippets.map((snippet: Snippet) => (
          <li key={snippet.id}>
            <Link href={`/${snippet.id}/${snippet.slug}`}>
              {snippet.content}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  )
}

Home.getLayout = function getLayout(page: ReactElement) {
  return <Layout>{page}</Layout>
}

export const getServerSideProps: GetServerSideProps = async ({ req }) => {
  const { user, token } = await supabaseClient.auth.api.getUserByCookie(req)
  if (token) {
    supabaseClient.auth.setAuth(token)
  }

  const { data: snippets, error } = await supabaseClient
    .from('snippets')
    .select()

  console.log({ snippets, error })

  return {
    props: {
      snippets,
    },
  }
}

export default Home
