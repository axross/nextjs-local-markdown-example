import type { GetStaticProps, NextPage } from "next";
import Link from "next/link";
import Head from "next/head";
import { Post, getAllPosts } from "../services/posts";

interface IndexPageProps {
  posts: Post[];
}

const IndexPage: NextPage<IndexPageProps> = ({ posts }) => {
  return (
    <>
      <Head>
        <title>Local Markdown Example</title>
      </Head>

      <h1>Local Markdown Example</h1>

      <h2>Posts</h2>

      <ul>
        {posts.map((post) => (
          <li key={post.slug}>
            <Link href={`/${post.slug}`}>
              <a>{post.title}</a>
            </Link>
          </li>
        ))}
      </ul>
    </>
  );
};

export const getStaticProps: GetStaticProps = async (context) => {
  const posts = await getAllPosts();

  return {
    props: { posts },
  };
};

export default IndexPage;
