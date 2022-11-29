import type { NextPage } from 'next'
import { useEffect, useState } from 'react';
import Head from 'next/head'
import Image from 'next/image'
import styles from '../../styles/Home.module.css'

const Home: NextPage = () => {

  const [articles, setArticles] = useState([]);


  useEffect(() => {
    getArticles();
  }, []);

  const getArticles = async () => {
    const response = await fetch(
      `/api/posts`
    );
    const {articles, status, message} = await response.json();
    if (articles && articles.length > 0) {
      setArticles(articles);
    } else if (status == 'error') {
      console.error(message);
    }
  }



  return (
    <div className={styles.container}>
      <Head>
        <title>Post Archive</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className={styles.main}>
        <h1 className={styles.title}>
          Welcome to <a href="https://nextjs.org">Next.js!</a>
        </h1>
        <div className={styles.grid}>
          {articles.length > 0 ? 
            articles.slice(0, 10).map((article, index) => {
              return (
                <a key={index} href={`posts/${article.publishedAt}`} className={styles.card}>
                  <img src={article.urlToImage} alt="iamge" className={styles.postImage} />
                  <h2>{article.title}</h2>
                  <p>{article.description}</p>
                </a>
              )
            })
            : <p>There are no Articles to be viewed</p>
          }
        </div>
      </main>
    </div>
  )
}

export default Home
