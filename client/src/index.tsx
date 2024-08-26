import { createRoot } from "react-dom/client";
import { MantineProvider, createTheme } from "@mantine/core";
import '@mantine/core/styles.css';
import '@mantine/tiptap/styles.css';
import '@mantine/nprogress/styles.css';
import PageRenderer from './PageRenderer';
import { NavigationProgress } from "@mantine/nprogress";
import { MDXProvider } from "@mdx-js/react";
import './style.css'
import Hmm from "./components/Hmm";

const theme = createTheme({
  primaryColor: "pink",
  colors: {
    dark: [
      '#C1C2C5',
      '#A6A7AB',
      '#909296',
      '#5c5f66',
      '#373A40',
      '#2C2E33',
      '#25262b',
      '#1A1B1E',
      '#141517',
      '#101113',
    ]
  }
});

const root = document.getElementById("root");

createRoot(root!).render(
  <MantineProvider theme={theme} defaultColorScheme="dark">
    <MDXProvider>
      <NavigationProgress color={theme.primaryColor} />
      <PageRenderer />
      <Hmm />
    </MDXProvider>
  </MantineProvider>
);