import { useColorScheme } from '@mui/joy/styles';
import Button from '@mui/joy/Button';

const ModeToggle = () => {
    const { mode, setMode } = useColorScheme();
    return (
        <Button
            variant="outlined"
            color="neutral"
            onClick={() => setMode(mode === 'dark' ? 'light' : 'dark')}
        >
            {mode === 'dark' ? 'Turn light' : 'Turn dark'}
        </Button>
    );
};

export default ModeToggle;
