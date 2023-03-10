import Head from 'next/head'
import Image from 'next/image'
import DailyTaskDefault from './components/Layout/DailyTaskDefault'


export default function Home() {
  return (
    <>
      <Head>
        <title>Daily Task</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main role="main" className='relative'>
      <DailyTaskDefault/>
      </main>
    </>
  )
}
