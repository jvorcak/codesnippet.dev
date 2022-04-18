import { useUser, Auth } from '@supabase/supabase-auth-helpers/react'
import { supabaseClient } from '@supabase/supabase-auth-helpers/nextjs'
import { ReactElement, useEffect, useState } from 'react'
import Layout from '../components/Layout'
import Home from './index'

const LoginPage = () => {
  const { user, error } = useUser()
  const [data, setData] = useState()

  useEffect(() => {
    async function loadData() {
      const { data } = await supabaseClient.from('test').select('*')
      // @ts-ignore
      setData(data)
    }
    // Only run query once user is logged in.
    if (user) loadData()
  }, [user])

  if (!user)
    return (
      <>
        {error && <p>{error.message}</p>}
        <Auth
          supabaseClient={supabaseClient}
          providers={['twitter']}
          socialLayout="horizontal"
          socialButtonSize="xlarge"
        />
      </>
    )

  return (
    <>
      <button onClick={() => supabaseClient.auth.signOut()}>Sign out</button>
      <p>user:</p>
      <pre>{JSON.stringify(user, null, 2)}</pre>
      <p>client-side data fetching with RLS</p>
      <pre>{JSON.stringify(data, null, 2)}</pre>
    </>
  )
}

LoginPage.getLayout = function getLayout(page: ReactElement) {
  return <Layout>{page}</Layout>
}

export default LoginPage
