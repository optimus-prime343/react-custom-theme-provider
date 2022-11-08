import { CSSProperties } from "react";
import { Theme } from "../context/theme";

export const withTransition = (
  styles: CSSProperties,
  transition = "background 150ms ease-in-out,color 150ms ease-in-out"
): CSSProperties => {
  return { ...styles, transition };
};

export const createStyles = <TReturnPayload>(
  createStyleCallback: (
    theme: Theme
  ) => Record<keyof TReturnPayload, CSSProperties>
) => (theme: Theme) => {
  return createStyleCallback(theme);
};
