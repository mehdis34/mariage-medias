import {Box, SimpleGrid, Spinner} from "@chakra-ui/react";
import React, {useEffect, useRef, useState} from "react";
import axios from "axios";
import Image from "next/image";

export default function Page() {
    const [medias, setMedias] = useState<any[]>([]);
    const [loading, setLoading] = useState(false);
    const [continuationToken, setContinuationToken] = useState<string | null>(null);
    const observer = useRef<IntersectionObserver>();

    const getMedias = async (token: string | null = null) => {
        setLoading(true);
        const res = await axios.get('/api/medias', {
            params: {
                continuationToken: token
            }
        });
        setMedias(prevMedias => [...prevMedias, ...res.data.files]);
        setContinuationToken(res.data.continuationToken);
        setLoading(false);
    };

    useEffect(() => {
        getMedias();
    }, []);

    const lastMediaElementRef = useRef<HTMLDivElement | null>(null);

    useEffect(() => {
        if (loading) return;
        if (observer.current) observer.current.disconnect();
        observer.current = new IntersectionObserver(entries => {
            if (entries[0].isIntersecting && continuationToken) {
                getMedias(continuationToken);
            }
        });
        if (lastMediaElementRef.current) {
            observer.current.observe(lastMediaElementRef.current);
        }
    }, [loading, continuationToken]);

    return (
        <SimpleGrid columns={[1, 3]} spacing={4}>
            {medias.map((media, index) => {
                if (index === medias.length - 1) {
                    return (
                        <Box key={index} ref={lastMediaElementRef}>
                            <Image
                                src={media.url}
                                alt={`media-${index}`}
                                width={100}
                                height={100}
                                style={{
                                    objectFit: 'cover',
                                }}/>
                        </Box>
                    );
                } else {
                    return (
                        <Box key={index}>
                            <Image
                                src={media.url}
                                alt={`media-${index}`}
                                width={100}
                                height={100}
                                style={{
                                    objectFit: 'cover',
                                    width: 100,
                                    height: 100,
                                }}/>
                        </Box>
                    );
                }
            })}
            {loading && (
                <Box gridColumn="span 3" textAlign="center" py={4}>
                    <Spinner size="xl"/>
                </Box>
            )}
        </SimpleGrid>
    );
}
