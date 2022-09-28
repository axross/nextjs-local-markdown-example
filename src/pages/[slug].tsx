import type { GetStaticPaths, GetStaticProps, NextPage } from "next";
import Head from "next/head";
import { Post, getAllPosts, getPostBySlug } from "../services/posts";

type PostPageParams = Record<"slug", string>;

interface PostPageProps {
  post: Post;
}

const PostPage: NextPage<PostPageProps> = ({ post }) => {
  return (
    <>
      <Head>
        <title>{post.title}</title>
      </Head>

      <h1>{post.title}</h1>

      <pre>{post.markdown}</pre>

      <footer>
        <span>{"Do you want to propose some modification? "}</span>

        <a
          href={`https://github.com/axross/nextjs-local-markdown-example/blob/main/posts/${post.slug}.md`}
        >
          Please make a pull request or issue on GitHub!
        </a>
      </footer>
    </>
  );
};

export const getStaticPaths: GetStaticPaths<PostPageParams> = async () => {
  const posts = await getAllPosts();

  return {
    paths: posts.map((post) => ({
      params: { slug: post.slug },
    })),
    fallback: false,
  };
};

export const getStaticProps: GetStaticProps<
  PostPageProps,
  PostPageParams
> = async ({ params }) => {
  const post = await getPostBySlug(params!.slug);

  if (post === null) {
    return {
      notFound: true,
    };
  }

  return {
    props: { post },
  };
};

export default PostPage;
