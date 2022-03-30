import React from "react";
import { IconButton, useColorMode, Tooltip } from "@chakra-ui/react";
import { FaMoon } from "react-icons/fa";
import { FaSun } from "react-icons/fa";


const ToggleColorMode = () => {
  const { colorMode, toggleColorMode } = useColorMode();
  const Icon = colorMode === "light" ? <FaMoon/> : <FaSun/>;
  return (
    <Tooltip label="Toggle colour mode!" placement="left">
      <IconButton
        position={"fixed"}
        right={3}
        bottom={3}
        onClick={toggleColorMode}
        icon={Icon}
      />
    </Tooltip>
    
  );
};
export default ToggleColorMode;