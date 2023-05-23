import {extendTheme,theme} from "@chakra-ui/react";

const colors = {
    "main-bg": "#EBEBEB",
    "white-text": "#DED1A4",
    "subtle-text": "#E87A01",
    "column-bg": "#100A0C",
    "column-header-bg": "#DED1A4",
    "card-bg": "#E87A01",
    "card-border": "#E87A01",
    "onDropColumn-bg":"#393b3c"
};

const fonts = {
   heading : "Roboto Slab, serif",
   body : "Roboto Slab, serif"
}

export default extendTheme({
    ...theme,
    colors,
    fonts
})