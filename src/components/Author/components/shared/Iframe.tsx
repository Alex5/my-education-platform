import React, {FC} from 'react';

interface IframeProps {
    height: string,
    src: string
}

const Iframe: FC<IframeProps> = ({height, src}) => {
    return (
        <iframe width="100%" height={height} src={src}
                title="YouTube video player" frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen/>
    );
};

export default Iframe;