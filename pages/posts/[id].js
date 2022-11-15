// the file makes dynamic routes because the file name is [id].js 
import Layout from '../../components/layout';
import { getAllPostIds, getPostData } from '../../lib/posts';
import Head from 'next/head';
import Date from '../../components/date';
import utilStyles from '../../styles/utils.module.css';

export default function Post({ postData }) {
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
  )
}

// must return an array of possible values for id
export async function getStaticPaths() {
  const paths = getAllPostIds();
  return {
    paths,
    fallback: false,
  };
}

// pass data to default function Post()
// params contains id because the file name is [id].js
export async function getStaticProps({ params }) {
  // add await because getPostData() is async function
  const postData = await getPostData(params.id);
  return {
    props: {
      postData,
    },
  };
}