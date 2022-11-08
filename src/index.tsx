import { render } from "react-dom";

import App from "./App";
import { ThemeProvider } from "./context/theme";

const rootElement = document.getElementById("root");
render(
  <ThemeProvider>
    <App />
  </ThemeProvider>,
  rootElement
);
