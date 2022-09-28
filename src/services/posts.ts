import * as fs from "fs";
import * as path from "path";
import matter from "gray-matter";

export interface Post {
  slug: string;
  title: string;
  markdown: string;
}

export async function getAllPosts(): Promise<Post[]> {
  const postsDir = path.join(process.cwd(), "posts");
  const filenames = await fs.promises.readdir(postsDir);
  const posts = await Promise.all(
    filenames.map(async (filename) => {
      const content = await fs.promises.readFile(
        path.join(postsDir, filename),
        "utf-8"
      );

      const { content: markdown, data: meta } = matter(content);

      return { ...meta, markdown } as Post;
    })
  );

  return posts;
}

export async function getPostBySlug(slug: string): Promise<Post | null> {
  const postsDir = path.join(process.cwd(), "posts");
  const content = await fs.promises.readFile(
    path.join(postsDir, `${slug}.md`),
    "utf-8"
  );
  const { content: markdown, data: meta } = matter(content);
  const post = { ...meta, markdown } as Post;

  return post;
}
