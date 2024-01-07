import {
    useMemo,
    useState,
    useRef,
    useEffect,
    cloneElement,
    Fragment,
    createRef,
} from 'react';
import { styled } from '@mui/joy/styles';
import IconButton from '@mui/joy/IconButton';
import Box from '@mui/joy/Box';
import Grid from '@mui/joy/Grid';
import ChevronLeft from '@mui/icons-material/ChevronLeft';
import ChevronRight from '@mui/icons-material/ChevronRight';

const ArrowButton = styled(IconButton)(() => ({
    position: 'absolute',
    zIndex: 20,
    alignSelf: 'center',
}));

const Carousel = ({ children }) => {
    const [current, setCurrent] = useState(0);
    const [frameWidth, setFrameWidth] = useState(0);

    const parentRef = useRef();
    const childRefs = useRef([]);

    const leftClickHandler = () => {
        setCurrent((prev) => prev - 1);
    };

    const rightClickHandler = () => {
        setCurrent((prev) => prev + 1);
    };

    useEffect(() => {
        childRefs.current = Array(children.length)
            .fill()
            .map((_, i) => childRefs.current[i] || createRef());

        if (parentRef.current && childRefs.current && childRefs.current[0]) {
            const recaliberateWidth = () => {
                setFrameWidth(parentRef.current.offsetWidth);
            };

            const resizeObserver = new ResizeObserver(recaliberateWidth);

            resizeObserver.observe(parentRef.current);

            return () => {
                resizeObserver.disconnect();
            };
        }
    }, [children]);

    const slidesPerFrame =
        frameWidth < 360
            ? 1
            : frameWidth < 520
              ? 2
              : frameWidth < 700
                ? 3
                : frameWidth < 900
                  ? 4
                  : 5;
    const gapWidth = 4 * 8; // 1 gap == 8px
    const slideWidth =
        (frameWidth - (slidesPerFrame - 1) * gapWidth) / slidesPerFrame;
    const translateWidth = slideWidth + gapWidth;
    const width = children.length * (slideWidth + gapWidth) - gapWidth;

    return (
        <Box
            sx={{
                flexDirection: 'row',
                display: 'flex',
                position: 'relative',
            }}
        >
            <ArrowButton
                disabled={current <= 0}
                onClick={leftClickHandler}
                sx={{ left: 4 }}
            >
                <ChevronLeft />
            </ArrowButton>
            <Box sx={{ overflowX: 'hidden' }} ref={parentRef}>
                <Grid
                    display="inline-flex"
                    justifyContent="space-between"
                    gap={gapWidth / 8}
                    sx={{
                        transition: '0.2s ease',
                        transform: `translateX(${-translateWidth * current}px)`,
                        ...(width && { width }),
                    }}
                >
                    {children.map((child, index) => (
                        <Fragment key={index}>
                            {cloneElement(child, {
                                ref: (el) => (childRefs.current[index] = el),
                            })}
                        </Fragment>
                    ))}
                </Grid>
            </Box>
            <ArrowButton
                disabled={current >= children.length - slidesPerFrame}
                onClick={rightClickHandler}
                sx={{ right: 4 }}
            >
                <ChevronRight />
            </ArrowButton>
        </Box>
    );
};

export default Carousel;
