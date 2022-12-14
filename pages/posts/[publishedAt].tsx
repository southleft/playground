import type { NextPage } from 'next'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react';
import Head from 'next/head'
import styles from '../../styles/Home.module.css'

interface articleType {
    urlToImage?: string;
    title?: string;
    author?: string;
    content?: string;
}

const Post: NextPage = () => {

  const router = useRouter()
  const { publishedAt } = router.query
  const [article, setArticle] = useState<articleType>();


  useEffect(() => {
    getArticle();
  }, []);

  const getArticle = async () => {
    const response = await fetch(
      `/api/posts`
    );

    const {articles, status, message} = await response.json();

    if (articles && articles.length > 0) {
      articles.filter((article) => 
        article.publishedAt == publishedAt
      )
      setArticle(
        articles.filter((article) => 
          article.publishedAt == publishedAt
        )[0]
      );
    } else if (status == 'error') {
      console.error(message);
    }
  }



  return (
    <div className={styles.container}>
      <Head>
        <title>Post</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className={styles.main}>
        <h1 className={styles.title}>
          Welcome to <a href="https://nextjs.org">Next.js!</a>
        </h1>
        <div className={styles.grid}>
          {article && 
            <>
              <img src={article.urlToImage} />
              <h2>{article.title}</h2>
              <p>{article.author}</p>
              <div>
                {article.content}
              </div>
            </>
          }
        </div>
      </main>
    </div>
  )
}

export default Post
