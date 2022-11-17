// the file makes dynamic routes because the file name is [id].js
import Layout from "../../components/layout";
import { getAllPostIds, getPostData } from "../../lib/posts";
import Head from "next/head";
import Date from "../../components/date";
import utilStyles from "../../styles/utils.module.css";
import { GetStaticProps, GetStaticPaths } from "next";

export default function Post({
  postData,
}: {
  postData: {
    title: string;
    date: string;
    id: string;
  };
}) {
  return (
    <Layout>
      <Head>
        <title>{postData.title}</title>
      </Head>
      {/* {postData.title}
      <br />
      {postData.id}
      <br />
      <Date dateString={postData.date} />
      <br /> */}
      <article>
        <h1 className={utilStyles.headingXl}>{postData.title}</h1>
        <div className={utilStyles.lightText}>
          <Date dateString={postData.date} />
        </div>
      </article>
      <div dangerouslySetInnerHTML={{ __html: postData.contentHtml }} />
    </Layout>
  );
}

// In development (npm run dev or yarn dev), getStaticPaths runs on every request.
// In production, getStaticPaths runs at build time

// must return an array of possible values for id
export const getStaticPaths: GetStaticProps = async () => {
  const paths = getAllPostIds();
  return {
    paths,
    fallback: false,
  };
};

// pass data to default function Post()
// params contains id because the file name is [id].js
export const getStaticProps: GetStaticProps = async ({ params }) => {
  // add await because getPostData() is async function
  // TODO: ?つけたらどうなる？
  const postData = await getPostData(params?.id as string);
  return {
    props: {
      postData,
    },
  };
};

// fallback
// false: any paths not returned by getStaticPaths will result in a 404 page.
// true, blocking
