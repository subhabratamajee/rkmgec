import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'
import clientPromise from "../lib/mongodb";
import Link from "next/link";

export default function Home({ users }) {
  return (
    <>
    <Head>
      <title>rkmgec</title>
      <meta name="description" content="Rkmgec" />
      <meta name="viewport" content="width=device-width, initial-scale=1" />
      <link rel="icon" href="/favicon.ico" />
    </Head>
    <div className={styles.body}>
    </div>
    <div className={styles.notifibar}>
          <div className={styles.notifibox}>
            <li>
              <a>NEW NOTIFICATIONS </a>
            </li>
          </div>
        </div>

        <div className={styles.boxcontainer}>
          <div className={styles.box}>
            <Link href="/"><a>
            <Image
              className={styles.img}
              src="/bookicon.png"
              alt=""
              height={200}
              width={200}
            />
            <div className={styles.content}>
              <h3 className={styles.h3}> Materials</h3>
              <p className={styles.p}>
              Here you can sell/buy/donate your books.
              </p>
            </div>
            </a>
            </Link>
          </div>
          <div className={styles.box}>
            <Link href="/"><a>
            <Image
              className={styles.img}
              src="/gateicon.jpeg"
              alt=""
              height={180}
              width={200}
            />
            <div className={styles.content}>
              <h3 className={styles.h3}> Gate </h3>
              <p className={styles.p}>
              Suggestions & notes form senior students of our college.
              </p>
            </div>
            </a>
            </Link>
          </div>
        </div>

     
</>
);
}
