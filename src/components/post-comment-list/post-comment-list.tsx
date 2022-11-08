import { useThemedStyles } from "../../context/theme";
import { PostComment } from "../../types/post-comment";
import { createStyles } from "../../utils/create-styles";

import { PostCommentItem } from "./post-comment-item/post-comment-item";

export interface PostCommentListProps {
  postComments: PostComment[];
}

const styles = createStyles((theme) => ({
  posts: {
    display: "flex",
    flexDirection: "column",
    gap: ".5rem",
    padding: "1rem"
  }
}));
export const PostCommentList = ({ postComments }: PostCommentListProps) => {
  const { style } = useThemedStyles(styles);

  const renderPostComments = () => {
    return postComments.map((postComment) => (
      <PostCommentItem key={postComment.id} postComment={postComment} />
    ));
  };
  return <div style={style.posts}>{renderPostComments()}</div>;
};
