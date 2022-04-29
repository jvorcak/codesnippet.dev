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
    <main>
      <Head>
        <title>Create Next App</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <ul className="grid w-full grid-cols-2">
        {snippets?.map((snippet: Snippet) => (
          <li
            key={snippet.id}
            className="m-2 h-72 border border-2 border-dashed p-2"
          >
            <Link href={`/${snippet.id}/${snippet.slug}`}>
              <a className="block h-full w-full">{snippet.title}</a>
            </Link>
          </li>
        ))}
      </ul>
    </main>
  )
}

Home.getLayout = function getLayout(page: ReactElement) {
  return <Layout>{page}</Layout>
}

export const getServerSideProps: GetServerSideProps = async ({ req }) => {
  const { token } = await supabaseClient.auth.api.getUserByCookie(req)
  if (token) {
    supabaseClient.auth.setAuth(token)
  }

  const { data: snippets, error } = await supabaseClient
    .from('snippets')
    .select()
    .order('created_at', { ascending: false })

  return {
    props: {
      snippets,
    },
  }
}

export default Home
