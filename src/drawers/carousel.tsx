import {Box, Drawer, DrawerBody, DrawerContent, DrawerOverlay, Flex} from "@chakra-ui/react";
import React, {useEffect} from "react";
import Image from "next/image";
import useEmblaCarousel from "embla-carousel-react";
import ReactPlayer from "react-player";
import {NextButton, PrevButton, usePrevNextButtons} from "@/drawers/carousel-buttons";
import {X} from "react-feather";

interface IProps {
    medias: any[];
    currentIndex: number;
    isOpen: boolean;
    onClose: () => void;
}

export default function CarouselDrawer({medias, currentIndex, isOpen, onClose}: IProps) {
    const [emblaRef, emblaApi] = useEmblaCarousel({
        startIndex: currentIndex,
        loop: true,
        duration: 0
    });
    const {
        prevBtnDisabled,
        nextBtnDisabled,
        onPrevButtonClick,
        onNextButtonClick
    } = usePrevNextButtons(emblaApi);

    useEffect(() => {
        const handleKeyDown = (event: KeyboardEvent) => {
            if (event.key === 'ArrowLeft') {
                onPrevButtonClick();
            } else if (event.key === 'ArrowRight') {
                onNextButtonClick();
            }
        };

        window.addEventListener('keydown', handleKeyDown);

        return () => {
            window.removeEventListener('keydown', handleKeyDown);
        };
    }, [onPrevButtonClick, onNextButtonClick]);

    return (
        <Drawer isOpen={isOpen} size={'full'} onClose={onClose}>
            <DrawerOverlay/>
            <DrawerContent>
                <DrawerBody p={0}>
                    <div className="embla" ref={emblaRef} style={{overflow: 'hidden', height: '100vh'}}>
                        <div className="embla__container" style={{display: 'flex', height: '100%'}}>
                            {medias.map((media, index) => {
                                const isVideo = media.type.startsWith("video");

                                return (
                                    <div className="embla__slide" key={`media${index}`} style={{
                                        flex: '0 0 100%',
                                        minWidth: '0',
                                        position: 'relative',
                                        height: '100%'
                                    }}>
                                        {isVideo ? (
                                            <ReactPlayer
                                                url={media.url}
                                                width='100%'
                                                height='100%'
                                                controls
                                                style={{position: 'absolute', top: 0, left: 0}}
                                            />
                                        ) : (
                                            <Image
                                                src={media.url}
                                                alt={`media ${index}`}
                                                layout="fill"
                                                objectFit="contain"
                                                style={{
                                                    width: '100%',
                                                    height: '100%'
                                                }}
                                            />
                                        )}
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                    <Flex
                        position="absolute"
                        zIndex={1}
                        width={'full'}
                        flexDir={'row'}
                        justifyContent={'space-between'}
                        top={0}
                        p={5}
                    >
                        <Box backgroundColor={'white'} rounded={'full'} p={1}>
                            <X size={30} onClick={onClose} style={{cursor: 'pointer'}} color={'#000'}/>
                        </Box>
                    </Flex>
                    <Box
                        position="absolute"
                        zIndex={9}
                        top="50%"
                        width="100%"
                        display={{base: 'none', md: 'flex'}}
                        justifyContent="space-between"
                        alignItems="center"
                        transform="translateY(-50%)"
                        px={4}
                    >
                        <PrevButton onClick={onPrevButtonClick} disabled={prevBtnDisabled}/>
                        <NextButton onClick={onNextButtonClick} disabled={nextBtnDisabled}/>
                    </Box>
                </DrawerBody>
            </DrawerContent>
        </Drawer>
    );
}
