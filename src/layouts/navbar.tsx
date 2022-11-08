import { CSSProperties, useEffect, useState, useMemo } from "react";
import { useTheme, useThemedStyles } from "../context/theme";
import { createStyles, withTransition } from "../utils/create-styles";

import { Button } from "../components/common/button/button";

const styles = createStyles((theme) => ({
  header: withTransition({
    backgroundColor: theme.surface,
    padding: ".5rem 1rem"
  }),
  navbar: {
    display: "flex",
    justifyContent: "space-between"
  }
}));

export const Navbar = () => {
  const [isHeaderSticky, setIsHeaderSticky] = useState(false);

  const { style } = useThemedStyles(styles);
  const { toggleTheme } = useTheme();

  const headerStyle: CSSProperties = useMemo(
    () =>
      isHeaderSticky
        ? {
            ...style.header,
            position: "sticky",
            top: 0,
            left: 0,
            zIndex: 100,
            marginBottom: "10rem"
          }
        : { ...style.header },
    [isHeaderSticky, style.header]
  );

  useEffect(() => {
    const handleScroll = (event: Event) => {
      setIsHeaderSticky(window.scrollY > 100);
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);
  return (
    <header style={headerStyle}>
      <nav style={style.navbar}>
        <h2>Post Comments</h2>
        <Button variant="primary" onClick={toggleTheme}>
          Toggle Theme
        </Button>
      </nav>
    </header>
  );
};
