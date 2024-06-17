import {Box, SimpleGrid, Spinner} from "@chakra-ui/react";
import React, {useEffect, useState} from "react";
import axios from "axios";
import {useRouter} from "next/router";
import MediaItem from "@/components/media-item";
import CarouselDrawer from "@/drawers/carousel";

export default function MediasList() {
    const {query} = useRouter();
    const [medias, setMedias] = useState<any[]>([]);
    const [loading, setLoading] = useState<boolean>(false);
    const [drawerIsOpen, setDrawerIsOpen] = useState<boolean>(false);
    const [currentIndex, setCurrentIndex] = useState<number>();
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
            <SimpleGrid columns={[2, 3, 4, 6]} spacing={4}>
                {medias.map((media, index) => (
                    <MediaItem uri={media.url} key={`media${index}`} onSelect={() => {
                        setDrawerIsOpen(true);
                        setCurrentIndex(index)
                    }}/>
                ))}
            </SimpleGrid>
            {medias.length > 0 && currentIndex !== undefined && (
                <CarouselDrawer
                    medias={medias}
                    currentIndex={currentIndex}
                    isOpen={drawerIsOpen}
                    onClose={() => setDrawerIsOpen(false)}
                />
            )}
        </>
    );
}
