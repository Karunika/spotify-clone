import { useEffect, useState } from 'react';
import FullScreenPlayer from '../components/fullScreenPlayer';
import { useParams } from 'react-router-dom';

const Track = ({ track }) => {
    const { trackId } = useParams();
    const [isLoading, setIsLoading] = useState(false);

    return isLoading ? (
        <div>loading...</div>
    ) : (
        <>
            <FullScreenPlayer />
            <div id="what">{trackId}</div>
        </>
    );
};

export default Track;
