import React from 'react'
import Head from "next/head";
import Image from "next/image";
import styles from "../styles/Navbar.module.css";
import { useState } from "react";
import Link from "next/link";

export default function Navbar() {
    const [open, setOpen] = useState(false);
  
    return (
      <>
        <Head>
          <title>rkmgec</title>
          <meta name="description" content="Rkmgec" />
          <meta name="viewport" content="width=device-width, initial-scale=1" />
          <link rel="icon" href="/favicon.ico" />
        </Head>
        <div className={styles.body}>
          <div className={styles.logobox}>
            <a href="https://rkmgec.ac.in">
              <Image
                src="/embb-min.png" alt='logo'
                className={styles.ashokstamv}
                height={50}
                width={40}
              />
              <h3 className={styles.collegename}>
                Ramkrishna Mahato
                <br />
                Government Engineering College <br />
                Purulia
              </h3>
            </a>
            <div className={styles.clearfixed}></div>
            <div className={styles.formaly}>
              <h5>
                <strong>FORMERLY:PURULIA GOVERNMENT ENGINEERING COLLEGE</strong>
              </h5>
            </div>
          </div>
  
          <div className={styles.logotringle}></div>
          <div className={styles.yellowbar}></div>
  
          <div className={open===false?styles.menubar : styles.close} onClick={() => setOpen(!open)}>
            <div className={open===false ? styles.menuicons : styles.menuicons+" "+styles.active}></div>
            <div className={open===false ? styles.menuicons : styles.menuicons+" "+styles.active}></div>
            <div className={open===false ? styles.menuicons : styles.menuicons+" "+styles.active}></div>
          </div>
  
          <div
            className={open===false ? styles.navbar : styles.navbar+" "+styles.active}
            // className={styles.navbar}
          >
            <ul>
              <li>
               <Link href="/">Home</Link>
              </li>
              <li>
                <Link href="/aboutus">About </Link>
              </li>
              <li>
                <Link href="/">Contuct us</Link>
              </li>
              <li>
                <Link href="/memberships"> Membership request</Link>
              </li>
              <li>
                <Link href="/">Upcoming events</Link>
              </li>
              <li>
                <Link href="/">Querry</Link>
              </li>
            </ul>
          </div>
  
        </div>
      </>
    );
  }
  