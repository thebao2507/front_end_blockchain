import type { NextPage } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'
import InvestView from '../src/views/invest'

const Home: NextPage = () => {
  return (
    <InvestView />
  )
}

export default Home
