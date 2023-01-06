import { useState, useEffect } from 'react'
import Hero from '../components/Hero/Hero'
import Dashboard from './dashboard'
import Head from 'next/head'
import supabaseClient from '../utils/supabaseClient'

export default function Home() {
  const [session, setSession] = useState(null)

  useEffect(() => {
    let mounted = true

    const { subscription } = supabaseClient.auth.onAuthStateChange(
      (_event, session) => {
        setSession(session)
      }
    )

    return () => {
      mounted = false

      subscription?.unsubscribe()
    }
  }, [])

  return (<>
  <Head>
        <title>Techno QR System</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>
    <div className="container" style={{ padding: '0px 0 0px 0' }}>
      {!session ? (
        <Hero />
      ) : (
        <Dashboard/>
      )}
    </div>
    </>
  )
}