import Head from "next/head";
import Layout, { siteTitle } from "../components/layout";
import utilStyles from "../styles/utils.module.css";
import Link from "next/link";
import Date from "../components/date";
import { GetStaticProps } from "next";
import { fetchEntries } from "../lib/contentfulPosts";

export default function Home({
  posts,
}: {
  posts: {
    title: string;
    date: string;
    body: string;
    postId: number;
  }[];
}) {
  return (
    <Layout home>
      <Head>
        <title>{siteTitle}</title>
      </Head>
      <section className={utilStyles.headingMd}>
        <p>Hi, we are two coding noobs.</p>
      </section>
      <section className={`${utilStyles.headingMd} ${utilStyles.padding1px}`}>
        <h2 className={utilStyles.headingLg}>Blog</h2>
        <ul className={utilStyles.list}>
          {posts.map(({ postId, date, title }) => (
            <li className={utilStyles.listItem} key={postId}>
              <Link href={`/posts/${title.replace(/ /g, '-')}`}>
                <a>{title}</a>
              </Link>
              <br />
              <small className={utilStyles.lightText}>
                <Date dateString={date} />
              </small>
            </li>
          ))}
        </ul>
      </section>
    </Layout>
  );
}

export const getStaticProps: GetStaticProps = async () => {
  const res = await fetchEntries();
  const posts = res.map((p) => {
    return p.fields;
  });

  posts.sort((a, b) => {
    if (a.date < b.date) {
      return 1;
    } else {
      return -1;
    }
  });

  console.log("POSTS", posts);

  return {
    props: {
      posts,
    },
  };
};
