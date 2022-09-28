import { NextApiHandler } from "next";
import { getAllPosts } from "../../services/posts";

const handler: NextApiHandler = async (req, res) => {
  const posts = await getAllPosts();

  res.status(200).json(posts);
};

export default handler;
