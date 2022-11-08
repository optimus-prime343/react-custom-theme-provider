import "./styles.css";

import { Navbar } from "./layouts/navbar";
import { PostCommentList } from "./components/post-comment-list/post-comment-list";

import { useFetch } from "./hooks/use-fetch";
import { PostComment } from "./types/post-comment";

export default function App() {
  const { data: postComments = [] } = useFetch<PostComment[]>(
    "https://jsonplaceholder.typicode.com/posts/1/comments"
  );

  return (
    <>
      <Navbar />
      <PostCommentList postComments={postComments} />
    </>
  );
}
