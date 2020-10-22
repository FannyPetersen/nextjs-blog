import Layout from "../../components/layout";
import { getAllPostIds } from "../../lib/contentfulPosts";
import { getPostData } from "../../lib/contentfulPosts";
import Head from "next/head";
import Date from "../../components/date";
import utilStyles from "../../styles/utils.module.css";
import { GetStaticProps, GetStaticPaths, GetServerSideProps } from "next";

export default function Post({
  postData,
}: {
  postData: {
    title: string;
    date: string;
    body: string;
    id: string;
    introduction: string;
  };
}) {
  return (
    <Layout>
      <Head>
        <title>{postData.title}</title>
      </Head>
      <article>
        <h1 className={utilStyles.headingXL}>{postData.title}</h1>
        <div className={utilStyles.lightText}>
          <Date dateString={postData.date} />
        </div>
        <div
          className={utilStyles.headingMd}
          dangerouslySetInnerHTML={{ __html: postData.introduction }}
        />
        <br></br>
        <div dangerouslySetInnerHTML={{ __html: postData.body }} />
      </article>
    </Layout>
  );
}

export const getStaticPaths: GetStaticPaths = async () => {
  const paths = await getAllPostIds();
  return {
    paths,
    fallback: false,
  };
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const postData = await getPostData(params.id as string);
  return {
    props: {
      postData,
    },
  };
};
