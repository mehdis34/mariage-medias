import React, {useState} from "react";
import {Skeleton} from "@chakra-ui/react";
import Image from "next/image";
import ReactPlayer from "react-player"; // Utilisation du composant Image de Next.js

interface MediaItemProps {
    uri: string
    onSelect: () => void
    type: string;
}

export default function MediaItem({uri, onSelect, type}: MediaItemProps) {
    const [isLoading, setIsLoading] = useState(true);
    const isVideo = type.startsWith("video");

    return (
        <>
            {isVideo ? (
                <div
                    style={{
                        cursor: "pointer",
                        width: 162,
                        height: 240,
                        overflow: "hidden",
                        position: "relative",
                    }}
                    onClick={onSelect}
                >
                    <ReactPlayer
                        url={uri}
                        light={'/thumb.png'}
                        width="100%"
                        height="100%"
                    />
                </div>
            ) : (
                <Skeleton isLoaded={!isLoading} width={162} height={240}>
                    <Image
                        onClick={onSelect}
                        src={uri}
                        alt={`media`}
                        width={162}
                        height={240}
                        onLoad={() => setIsLoading(false)}
                        style={{
                            cursor: "pointer",
                            objectFit: "cover",
                            width: 162,
                            height: 240,
                        }}
                    />
                </Skeleton>
            )}
        </>

    );
}
