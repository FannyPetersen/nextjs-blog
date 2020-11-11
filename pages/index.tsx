import Head from "next/head";
import Layout, { siteTitle } from "../components/layout";
import utilStyles from "../styles/utils.module.css";
import Link from "next/link";
import Date from "../components/date";
import { GetStaticProps } from "next";
import { fetchEntries } from "../lib/contentfulPosts";
import Footer from "../components/Footer";

export default function Home({
  posts,
}: {
  posts: {
    title: string;
    date: string;
    body: string;
    id: string;
  }[];
}) {
  return (
    <Layout home>
      <Head>
        <title>{siteTitle}</title>
      </Head>
      <section className={utilStyles.headingMd}>
        <p>
          Hi, we are Fanny Petersen and Jorge Casal, two coding noobs explaining
          JavaScript.
        </p>
      </section>
      <section className={`${utilStyles.headingMd} ${utilStyles.padding1px}`}>
        <h2 className={utilStyles.headingLg}>Blog</h2>
        <ul className={utilStyles.list}>
          {posts.map(({ date, title, id }) => (
            <li className={utilStyles.listItem} key={id}>
              <Link href={`/posts/${id}`}>
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
      <Footer />
    </Layout>
  );
}

export const getStaticProps: GetStaticProps = async () => {
  const res = await fetchEntries();
  const posts = res.map((p) => {
    p.fields.id = p.fields.title.replace(/ /g, "-");
    return p.fields;
  });

  posts.sort((a, b) => {
    if (a.date < b.date) {
      return 1;
    } else {
      return -1;
    }
  });

  return {
    props: {
      posts,
    },
  };
};
