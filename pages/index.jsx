import Head from 'next/head'
import { getApartments } from '@/services/blockchain'
import { Category, Collection } from '@/components'
import { Main } from '@/components/Main'
//import { Main } from 'next/document'

export default function Home() {
  return (
    <div>
      <Head>
        <title>Home Page</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Category />
    </div>
  )
}
