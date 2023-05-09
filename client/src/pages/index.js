import Head from 'next/head'
import Image from 'next/image'
import { Inter } from 'next/font/google'
import styles from '@/styles/Home.module.css'
// import Pencil from './pencil'
// import Title from './title'
// import Main from './write'
import Link from 'next/link'
// const inter = Inter({ subsets: ['latin'] })

export default function Home() {
  return (
    <>
      <Head>
        <title>Almanac</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>



      <div className={styles.arrange}>
        <div className={styles.nav}>
          <Link href="/menu_page" className={styles.navlink}>Try Journal</Link>
        </div>
        <div className={styles.intro}>
          <h1 className={styles.introtitle}>
          Unlock your thoughts and unleash your creativity with our Journal app.
          </h1>
        </div>
      </div>
    </>
  );
}
