import { useThemedStyles } from "../../../context/theme";
import { PostComment } from "../../../types/post-comment";
import { createStyles, withTransition } from "../../../utils/create-styles";

export interface PostCommentItemProps {
  postComment: PostComment;
}

const styles = createStyles((theme) => ({
  container: withTransition({
    display: "flex",
    flexDirection: "column",
    gap: ".5rem",
    padding: "1rem",
    backgroundColor: theme.surface,
    borderRadius: "6px"
  }),
  email: {
    padding: ".2rem .4rem",
    borderRadius: "2rem",
    color: "#fff",
    backgroundColor: theme.primary,
    maxWidth: "fit-content"
  }
}));
export const PostCommentItem = ({ postComment }: PostCommentItemProps) => {
  const { style } = useThemedStyles(styles);
  return (
    <div style={style.container}>
      <h6 style={style.email}>{postComment.email}</h6>
      <h4>{postComment.name}</h4>
      <p>{postComment.body}</p>
    </div>
  );
};
