import { extendTheme } from '@mui/joy/styles';

const theme = extendTheme({
    mixins: {
        toolbar: {
            height: 56,
        },
    },
    zIndex: {
        AppBar: 400,
        Footer: 500,
    },
});

export default theme;
