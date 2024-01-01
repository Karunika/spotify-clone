import { useState, useTransition, useRef, useEffect } from 'react';
import { styled } from '@mui/joy/styles';
import Stack from '@mui/joy/Stack';
import Slider from '@mui/joy/Slider';
import AspectRatio from '@mui/joy/AspectRatio';
import IconButton from '@mui/joy/IconButton';
import Typography from '@mui/joy/Typography';

import VolumeOff from '@mui/icons-material/VolumeOff';
import VolumeDown from '@mui/icons-material/VolumeDown';
import VolumeUp from '@mui/icons-material/VolumeUp';
import Pause from '@mui/icons-material/Pause';
import PlayArrow from '@mui/icons-material/PlayArrow';
import Forward10 from '@mui/icons-material/Forward10';
import Replay10 from '@mui/icons-material/Replay10';
import SkipNext from '@mui/icons-material/SkipNext';
import SkipPrevious from '@mui/icons-material/SkipPrevious';
import Repeat from '@mui/icons-material/Repeat';
import RepeatOn from '@mui/icons-material/RepeatOn';
import RepeatOneOn from '@mui/icons-material/RepeatOneOn';

import { useSelector } from 'react-redux';
import { usePlayer } from '../hooks/context/player';

const Footer = styled('div')(({ theme }) => ({
    zIndex: theme.zIndex.Footer,
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'stretch',
    columnGap: 2,
    padding: 1,
    width: '100%',
    bottom: 0,
    padding: 24,
    boxSizing: 'border-box',
    backgroundColor: theme.variants.plain.context,
}));

const timeStringFormat = (timestamp) => {
    const timeInSeconds = timestamp / 1000;

    const minutes = Math.floor(timeInSeconds / 60);
    const seconds = Math.round(timeInSeconds % 60);

    return minutes + ':' + (seconds < 10 ? '0' : '') + seconds;
};

const PlayerFooter = () => {
    const [isPending, startTransition] = useTransition();
    const {
        duration,
        paused,
        position,
        repeat_mode,
        track_window: { current_track },
    } = useSelector((store) => store.playback);

    const [currentTime, setCurrentTime] = useState(new Date().getTime());
    const [initialTime, setInitialTime] = useState(new Date().getTime());
    const [disabled, setDisabled] = useState(false);

    const player = usePlayer();
    const trackTimer = useRef(null);

    const elapsedTime = currentTime - initialTime;

    useEffect(() => {
        if (!paused) {
            setInitialTime(new Date().getTime() - position);
            setCurrentTime(new Date().getTime());
            trackTimer.current = setInterval(() => {
                setCurrentTime(new Date().getTime());
            }, 1000);

            return () => {
                clearInterval(trackTimer.current);
            };
        }
    }, [paused, position]);

    const handlePlayButtonClick = () => {
        setDisabled(true);

        if (paused) {
            player.resume().then(() => setDisabled(false));
        } else {
            player.pause().then(() => setDisabled(false));
        }
    };

    const prevButtonClickHandler = () => {
        setInitialTime(new Date().getTime());
        setCurrentTime(new Date().getTime());
        player.previousTrack();
    };

    const nextButtonClickHandler = () => {
        setInitialTime(new Date().getTime());
        setCurrentTime(new Date().getTime());
        player.nextTrack();
    };

    const goBack10Seconds = () => {
        player.seek(elapsedTime - 10_000);
    };

    const goForth10Seconds = () => {
        player.seek(elapsedTime + 10_000);
    };

    const trackSliderChangeHandler = (event, value) => {
        player.seek(value);
    };

    const activatePlayer = () => {
        player.activateElement();
    };

    const repeatModeClickHandler = () => {
        player.setRepeatMode((repeat_mode + 1) % 3);
    };

    const [volume, setVolume] = useState(0);

    const volumeSliderChangeHandler = (event, value) => {
        setVolume(value);
    };

    useEffect(() => {
        if (player) {
            player.setVolume(volume);
        }
    }, [volume]);

    // if (!player) {
    //     return <Footer>
    //         Loading...
    //     </Footer>
    // }

    return (
        <Footer onClick={activatePlayer} fullWitdh>
            <AspectRatio ratio="1" variant="solid" sx={{ width: 128 }}>
                <img src={current_track?.album?.images[1].url ?? ''} />
            </AspectRatio>
            <Stack sx={{ width: '100%', ml: 4 }}>
                <Stack
                    direction="row"
                    alignItems="center"
                    sx={{ justifyContent: 'space-between' }}
                >
                    <Stack spacing={3} direction="row" alignItems="center">
                        <IconButton
                            disabled={disabled}
                            onClick={goBack10Seconds}
                        >
                            <Replay10 />
                        </IconButton>
                        <IconButton
                            disabled={disabled}
                            onClick={prevButtonClickHandler}
                        >
                            <SkipPrevious />
                        </IconButton>
                        <IconButton
                            disabled={disabled}
                            onClick={handlePlayButtonClick}
                        >
                            {paused ? (
                                <PlayArrow
                                    sx={{ fontSize: 48 }}
                                    color="primary"
                                />
                            ) : (
                                <Pause sx={{ fontSize: 52 }} color="primary" />
                            )}
                        </IconButton>
                        <IconButton
                            disabled={disabled}
                            onClick={nextButtonClickHandler}
                        >
                            <SkipNext />
                        </IconButton>
                        <IconButton
                            disabled={disabled}
                            onClick={goForth10Seconds}
                        >
                            <Forward10 />
                        </IconButton>
                        <IconButton
                            disabled={disabled}
                            onClick={repeatModeClickHandler}
                        >
                            {repeat_mode === 0 ? (
                                <Repeat />
                            ) : repeat_mode === 1 ? (
                                <RepeatOn />
                            ) : repeat_mode === 2 ? (
                                <RepeatOneOn />
                            ) : (
                                <></>
                            )}
                        </IconButton>
                    </Stack>
                    <Stack direction="row" alignItems="center" spacing={2}>
                        <IconButton onClick={() => setVolume(0)}>
                            {volume * 100 < 2 ? (
                                <VolumeOff />
                            ) : volume * 100 < 50 ? (
                                <VolumeDown />
                            ) : (
                                <VolumeUp />
                            )}
                        </IconButton>
                        <Slider
                            sx={{
                                '--Slider-thumbSize': '6px',
                                '--Slider-thumbWidth': '10px',
                                width: 120,
                            }}
                            disabled={disabled}
                            variant="solid"
                            size="sm"
                            step={0.01}
                            min={0}
                            max={1}
                            value={volume}
                            onChange={volumeSliderChangeHandler}
                        />
                    </Stack>
                </Stack>
                <Stack
                    fullWidth
                    direction="row"
                    alignItems="center"
                    spacing={2}
                >
                    <Slider
                        sx={{
                            '--Slider-thumbSize': '6px',
                            '--Slider-thumbWidth': '10px',
                        }}
                        disabled={disabled}
                        variant="solid"
                        size="sm"
                        fullWitdh
                        min={0}
                        max={duration ? +duration : 0}
                        value={elapsedTime}
                        onChange={trackSliderChangeHandler}
                    />
                    <Typography level="body-sm">
                        {timeStringFormat(currentTime - initialTime)}/
                        {timeStringFormat(duration)}
                    </Typography>
                </Stack>
                <marquee>
                    <Stack direction="row">
                        <Typography level="title-sm">
                            {`${(current_track?.artists || [])
                                .map((n) => n.name)
                                .join(', ')}`}
                        </Typography>
                        <Typography level="body-sm">
                            {`: ${current_track?.name ?? ''} (${
                                current_track?.album?.name ?? ''
                            })`}
                        </Typography>
                    </Stack>
                </marquee>
            </Stack>
        </Footer>
    );
};

export default PlayerFooter;
