import { IconSun, IconMoon } from "@tabler/icons-react";
import { HeaderButton } from "./HeaderButton";
import { useMantineColorScheme } from "@mantine/core";

const ToggleColorScheme = () => {
  const { toggleColorScheme, colorScheme } = useMantineColorScheme();
  return (
    <HeaderButton onClick={toggleColorScheme} color={colorScheme === 'dark' ? "yellow" : 'blue'}>
      {colorScheme === 'dark' ? <IconSun /> : <IconMoon />}
    </HeaderButton>
  );
};

export default ToggleColorScheme;