import React, {useState} from "react";
import {Skeleton} from "@chakra-ui/react";
import Image from "next/image"; // Utilisation du composant Image de Next.js

interface MediaItemProps {
    uri: string
}

export default function MediaItem({uri}: MediaItemProps) {
    const [isLoading, setIsLoading] = useState(true);

    return (
        <Skeleton isLoaded={!isLoading} width={162} height={240}>
            <Image
                onClick={() => alert(uri)}
                src={uri}
                alt={`media`}
                width={162}
                height={240}
                onLoadingComplete={() => setIsLoading(false)}
                style={{
                    cursor: 'pointer',
                    objectFit: 'cover',
                    width: 162,
                    height: 240,
                    borderRadius: 5
                }}
            />
        </Skeleton>
    );
}
