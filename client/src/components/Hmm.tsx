import { useHotkeys } from "@mantine/hooks";

const Hmm = () => {
  useHotkeys([
    ['mod+shift+y', () => window.open("https://www.youtube.com/watch?v=V9_Hw4P19BU", "_blank")]
  ])

  return null
};

export default Hmm