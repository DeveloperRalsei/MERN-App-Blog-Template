import { createRoot } from "react-dom/client";
import { MantineProvider, createTheme } from "@mantine/core";
import '@mantine/core/styles.css';
import PageRenderer from './PageRenderer'

const theme = createTheme({
  primaryColor: "red"
});

const root = document.getElementById("root");

createRoot(root!).render(
    <MantineProvider theme={theme}>
      <PageRenderer/>
    </MantineProvider>
)