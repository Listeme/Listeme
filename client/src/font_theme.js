import { extendTheme } from "@chakra-ui/react";
import "@fontsource/public-sans"
const font_theme = extendTheme({
    fonts: {
      heading: 'Public Sans, sans-serif',
      body: 'Public Sans',
    },
});
export default font_theme;