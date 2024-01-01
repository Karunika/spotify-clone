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
    const [slideWidth, setSlideWidth] = useState(0);

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
                setSlideWidth(childRefs.current[0].offsetWidth);
            };

            const resizeObserver = new ResizeObserver(recaliberateWidth);

            resizeObserver.observe(parentRef.current);
            for (let child of childRefs.current) {
                resizeObserver.observe(child);
            }

            return () => {
                resizeObserver.disconnect();
            };
        }
    }, [children]);

    const slidesPerFrame = Math.floor(frameWidth / slideWidth);
    const gapWidth =
        (frameWidth - slidesPerFrame * slideWidth) / (slidesPerFrame - 1);
    const width =
        gapWidth * (children.length - 1) + slideWidth * children.length;

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
                <Box
                    sx={{
                        display: 'inline-flex',
                        transition: '0.2s ease',
                        transform: `translateX(${
                            -(slideWidth + gapWidth) * current
                        }px)`,
                        justifyContent: 'space-between',
                        ...(width && { width }),
                    }}
                    ref={parentRef}
                >
                    {children.map((child, index) => (
                        <Fragment key={index}>
                            {cloneElement(child, {
                                ref: (el) => (childRefs.current[index] = el),
                            })}
                        </Fragment>
                    ))}
                </Box>
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
