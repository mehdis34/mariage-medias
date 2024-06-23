import {Box, Flex, SimpleGrid, Spinner, Text} from "@chakra-ui/react";
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
    const getMedias = async () => {
        setMedias([])
        setLoading(true);
        const res = await axios.get('/api/medias?folder=' + query.folder as string);
        setMedias(res.data.files);
        setLoading(false);
    };

    useEffect(() => {
        getMedias().then();
    }, [query.folder]);

    return (
        <>
            {loading && (
                <Box gridColumn="span 3" textAlign="center" my={20}>
                    <Spinner size="lg"/>
                </Box>
            )}
            {!loading && medias.length === 0 && (
                <Flex my={20} flexDirection="column" alignItems={'center'} gap={2}>
                    <Text fontSize={'xx-large'}>😕</Text>
                    <Text fontSize={'sm'}>Aucune photo pour le moment dans ce dossier.</Text>
                </Flex>
            )}
            <Flex justifyContent={'center'}>
                <SimpleGrid columns={[2, 3, 5, 6]} spacing={3}>
                    {medias.map((media, index) => (
                        <MediaItem uri={media.url} type={media.type} key={`media${index}`} onSelect={() => {
                            setDrawerIsOpen(true);
                            setCurrentIndex(index)
                        }}/>
                    ))}
                </SimpleGrid>
            </Flex>
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
