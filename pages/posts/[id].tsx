import Layout from "../../components/layout";
import { getAllPostIds } from "../../lib/contentfulPosts";
import { getPostData } from "../../lib/contentfulPosts";
import Head from "next/head";
import Date from "../../components/date";
import utilStyles from "../../styles/utils.module.css";
import { GetStaticProps, GetStaticPaths, GetServerSideProps } from "next";

import { documentToReactComponents } from '@contentful/rich-text-react-renderer';


export default function Post({
  postData,
}: {
  postData: {
    title: string;
    image: string;
    date: string;
    body: any;
    id: string;
    introduction: string;
  };
}) {
  const body = documentToReactComponents(postData.body);
  console.log('BODY FRONTEND', body);

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
        {/*<div dangerouslySetInnerHTML={{ __html: postData.body }} />*/}
  <div>{body}</div>
  <div>
  <img key={postData.image} src={`${postData.image}`} className="img" />
  </div>
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
