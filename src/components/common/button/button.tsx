import { HTMLAttributes } from "react";
import { useThemedStyles } from "../../../context/theme";
import { createStyles } from "../../../utils/create-styles";

export interface ButtonProps extends HTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "outline";
}

const styles = createStyles((theme) => ({
  button: {
    color: "#fff",
    padding: ".2rem .6rem",
    border: "none",
    outline: "none",
    borderRadius: ".3rem",
    cursor: "pointer"
  },
  primary: {
    backgroundColor: theme.primary
  },
  outline: {
    border: `1px solid ${theme.primary}`
  }
}));

export const Button = ({
  style: buttonStyle,
  variant,
  ...props
}: ButtonProps) => {
  const { style } = useThemedStyles(styles);

  const variantStyle = variant === "outline" ? style.outline : style.primary;
  return (
    <button
      style={{ ...buttonStyle, ...style.button, ...variantStyle }}
      {...props}
    />
  );
};
