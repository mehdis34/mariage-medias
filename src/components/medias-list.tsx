import {Box, SimpleGrid, Spinner} from "@chakra-ui/react";
import React, {useEffect, useState} from "react";
import axios from "axios";
import {useRouter} from "next/router";
import MediaItem from "@/components/media-item";


export default function MediasList() {
    const {query} = useRouter();
    const [medias, setMedias] = useState<any[]>([]);
    const [loading, setLoading] = useState(false);
    const getMedias = async (path: string) => {
        setMedias([])
        setLoading(true);
        const res = await axios.get('/api/medias?folder=' + path);
        setMedias(res.data.files);
        setLoading(false);
    };

    useEffect(() => {
        getMedias((query.folder as string) ?? 'photoboot').then();
    }, [query]);

    return (
        <>
            {loading && (
                <Box gridColumn="span 3" textAlign="center" py={4}>
                    <Spinner size="xl"/>
                </Box>
            )}
            <SimpleGrid columns={[1, 3, 6]} spacing={4}>
                {medias.map((media, index) => (
                    <MediaItem uri={media.url} key={`media${index}`}/>
                ))}
            </SimpleGrid>
        </>
    );
}
