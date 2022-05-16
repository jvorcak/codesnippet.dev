import type { AppProps } from 'next/app'
import { UserProvider } from '@supabase/supabase-auth-helpers/react'
import { supabaseClient } from '@supabase/supabase-auth-helpers/nextjs'
import { NextPage } from 'next'
import React, { ReactElement, ReactNode } from 'react'
import { useRouter } from 'next/router'

import 'react-grid-layout/css/styles.css'
import 'react-resizable/css/styles.css'
// this should be imported after react-grid-layout styles
import '../styles/globals.css'

export type NextPageWithLayout<T = any> = NextPage<T> & {
  getLayout?: (page: ReactElement) => ReactNode
}

type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout
}

function MyApp({ Component, pageProps }: AppPropsWithLayout) {
  const getLayout = Component.getLayout ?? ((page) => page)
  const { pathname } = useRouter()

  return (
    <UserProvider supabaseClient={supabaseClient} pathname={pathname}>
      {getLayout(<Component {...pageProps} />)}
    </UserProvider>
  )
}

export default MyApp
