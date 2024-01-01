import default_image from '../../assets/default_user.png';

const useSearchPageRelevantDetails = (result, type) => {
    switch (type) {
        case 'artist':
            return {
                name: result.name,
                image:
                    result.images && result.images.length >= 2
                        ? result.images[1].url
                        : default_image,
                desc: 'Artist',
                link: `/artist/${result.id}`,
            };

        case 'album':
            return {
                name: result.name,
                image:
                    result.images && result.images.length >= 2
                        ? result.images[1].url
                        : default_image,
                desc: 'Album',
            };

        case 'track':
            return {
                name: result.name,
                image:
                    result.album &&
                    result.album.images &&
                    result.album.images.length >= 1
                        ? result.album.images[1].url
                        : default_image,
                desc: 'Track',
                link: `/track/${result.id}`,
            };

        case 'playlist':
            return {
                name: result.name,
                image:
                    result.images && result.images.length >= 1
                        ? result.images[0].url
                        : default_image,
                desc: 'Playlist',
            };
    }

    return { name: 'name', image: 'image', desc: 'desc' };
};

export default useSearchPageRelevantDetails;
