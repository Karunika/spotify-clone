import { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import useAuth from '../hooks/spotify/useAuth';

const Callback = () => {
    const { fetchAccessToken } = useAuth();
    const initialized = useRef(false);
    const [error, setError] = useState('');

    const navigate = useNavigate();

    useEffect(() => {
        if (!initialized.current) {
            initialized.current = true;
            const urlParams = new URLSearchParams(window.location.search);
            let code = urlParams.get('code');
            if (code) {
                fetchAccessToken(code).catch(setError);
                navigate('/');
            }
        }
    }, []);

    return <div>{error ? 'error' : 'success'}</div>;
};

export default Callback;
